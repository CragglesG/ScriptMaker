import { execFile } from 'node:child_process'
import { writeFile } from 'node:fs'
import readline from 'node:readline'

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("ScriptMaker (c) Craig Giles 2024")
console.log("-------------")
console.log("Welcome to ScriptMaker!")
console.log("You will now be asked a series of questions necessary to generate your programming language.")

let answers = []
let prompts = ["Name of langage (no spaces): ", 
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
"Else statement keyword (else, etc.): "]
let counter = 0

function generate() {
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
    prep: '${answers[4]}',
    has: '${answers[5]}', // Structs
    func: '${answers[6]}',
    needs: '${answers[7]}',
    return: '${answers[8]}', // Functions
    loop: '${answers[9]}',
    through: '${answers[10]}',
    while: '${answers[11]}', // Loops
    if: '${answers[12]}',
    elif: '${answers[13]}',
    else: '${answers[14]}', // Conditionals
}`, (err) => {
        if (err) throw err;
    })
    writeFile(`./generated/${answers[0]}`, `node ~/.${answers[0]}/src/webscript.js $1 $2`, (err) => {
        if (err) throw err;
    })
    writeFile(`./generated/install.sh`, `mkdir ~/.${answers[0]}
cp -r ./* ~/.${answers[0]}
chmod +x ~/.${answers[0]}/generated/${answers[0]}
echo '\n PATH=$PATH:$HOME/.${answers[0]}/generated' >>~/.bashrc \n`, (err) => {
        if (err) throw err;
    })
}

const addAnswer = ans => {
    answers.push(ans)
    counter++
    input.removeAllListeners()
    if (!(counter > prompts.length-1)) {
        input.question(prompts[counter], addAnswer)
    } else {
        generate()
        console.log(`Successfully generated ${answers[0]} configuration`)
        console.log(`\nRun ./generated/install.sh to install ${answers[0]}`)
        input.close()
    }
}

input.question(prompts[counter], addAnswer)

