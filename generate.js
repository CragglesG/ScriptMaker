import { execFile } from 'node:child_process'
import fs from 'node:fs'
import readline from 'node:readline'

const readFile = location =>
    new Promise((resolve, reject) =>
        fs.readFile(location, 'utf-8', (err, data) => {
            if (err) return reject(err)
            resolve(data.toString().split(`\n`))
        })
    )

const writeFile = (location, data) =>
    new Promise((resolve, reject) =>
        fs.writeFile(location, data, err => {
        if (err) return reject(err)
        resolve()
        })
    )

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function generate(answers) {
    writeFile("./generated/tokens.js", `// List of Tokens
export const TOKENS = {
    LeftParen: 'LeftParen',
    RightParen: 'RightParen',
    LeftBrace: 'LeftBrace',
    RightBrace: 'RightBrace',
    LeftBracket: 'LeftBracket',
    RightBracket: 'RightBracket',
    Period: 'Period',
    Comma: 'Comma', 
    Colon: 'Colon',
    Keyword: 'Keyword',
    Identifier: 'Identifier',
    String: 'String',
    Number: 'Number',
    Or: 'Or',
    Not: 'Not',
    And: 'And',
    Equiv: 'Equiv',
    NotEquiv: 'NotEquiv',
    Gt: 'Gt',
    Gte: 'Gte',
    Lt: 'Lt',
    Lte: 'Lte',
    Plus: 'Plus',
    Minus: 'Minus',
    Asterisk: 'Asterisk',
    Slash: 'Slash',
    EOF: 'EOF'
}


// List of Keywords
export const KEYWORDS = {
    prepare: '${answers[1]}',
    as: '${answers[2]}', // Variables
    type: '${answers[3]}',
    prep: '${answers[5]}',
    has: '${answers[4]}', // Structs
    func: '${answers[6]}',
    needs: '${answers[7]}',
    return: '${answers[8]}', // Functions
    loop: '${answers[9]}',
    through: '${answers[10]}',
    while: '${answers[11]}', // Loops
    if: '${answers[12]}',
    elif: '${answers[13]}',
    else: '${answers[14]}', // Conditionals
}

export const KEYWORDMAP = {
    'prepare': '${answers[1]}',
    'as': '${answers[2]}', // Variables
    'type': '${answers[3]}',
    'prep': '${answers[5]}',
    'has': '${answers[4]}', // Structs
    'func': '${answers[6]}',
    'needs': '${answers[7]}',
    'return': '${answers[8]}', // Functions
    'loop': '${answers[9]}',
    'through': '${answers[10]}',
    'while': '${answers[11]}', // Loops
    'if': '${answers[12]}',
    'elif': '${answers[13]}',
    'else': '${answers[14]}', // Conditionals
}`)
    writeFile(`./generated/${answers[0]}`, `node ~/.${answers[0]}/src/webscript.js $1 $2`)
    
    writeFile(`./generated/install.sh`, `mkdir ~/.${answers[0]}
cp -r ./* ~/.${answers[0]}
chmod +x ~/.${answers[0]}/generated/${answers[0]}
echo '\n PATH=$PATH:$HOME/.${answers[0]}/generated' >>~/.bashrc \n`)
    
    writeFile("./generated/test", `// AUTO-GENERATED ${answers[0]} TEST FILE
${answers[1]} test ${answers[2]} "Testing... Testing"
display(test)
${answers[3]} T ${answers[4]} {t,e,s,t}
${answers[5]} T(t:1,e:2,s:3,t:4)
display(T)
${answers[6]} testFunc ${answers[7]} (a,b,c) {
    display(a,b,c)
    return a
}
${answers[1]} funcResponse ${answers[2]} testFunc(1,2,3)
${answers[9]} i ${answers[10]} (0,2) {
    display(i)
}
${answers[1]} wlh as 1
${answers[11]} (wlh==1) {
    display("Better get out of this while loop")
    ${answers[1]} wlh as 2
}
${answers[12]} (1==2) {
    display("PROBLEM - IF REACHED")
} ${answers[13]} (1==1) {
    display("YOU FOUND ME!")
} ${answers[14]} {
    display("PROBLEM - ELSE REACHED")
}`)

}

let answers = []

const addAnswer = ans => {
    answers.push(ans)
    counter++
    input.removeAllListeners()
    if (!(counter > prompts.length-1)) {
        input.question(prompts[counter], addAnswer)
    } else {
        generate(answers)
        console.log("--------------")
        console.log(`Successfully generated ${answers[0]} configuration`)
        console.log(`\nRun ./generated/install.sh to install ${answers[0]}`)
        input.close()
    }
}

const interactiveMode = () => {
    console.log("ScriptMaker (c) Craig Giles 2024")
    console.log("-------------")
    console.log("Welcome to ScriptMaker!")
    console.log("You will now be asked a series of questions necessary to generate your programming language.")

    let prompts = [
        "Name of langage (no spaces): ", 
        "Variable declaration keyword (var, const, etc.): ",
        "Variable assignment keyword (=, as, etc.): ",
        "Struct declaration keyword (struct, etc.): ",
        "Struct values keyword (has, etc.): ",
        "Instance creation keyword (new, etc.): ",
        "Function declaration keyword (func, function, etc.): ",
        "Function parameters keyword (needs, requires, etc.): ",
        "Return keyword: ",
        "For loop keyword (for, loop, etc.): ",
        "For loop range keyword (through, range, etc.): ",
        "While loop keyword (while, etc.): ",
        "If statement keyword (if, etc.): ",
        "Else if statement keyword (elif, etc.): ",
        "Else statement keyword (else, etc.): "
    ]
    let counter = 0
    input.question(prompts[counter], addAnswer)
}


const fileMode = (path) => {
    let file = readFile(path)
    for (i=0; i<file.length; i++) {
        answers.push(file[i])
    }
    generate(answers)
}

if (process.argv.length > 2) {
    fileMode(process.argv[2])
} else {
    interactiveMode()
}