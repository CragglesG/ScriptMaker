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
let prompts = ["Name of langage: ", 
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
    return
}

const addAnswer = ans => {
    answers.push(ans)
    counter++
    input.removeAllListeners()
    if (!(counter > prompts.length-1)) {
        input.question(prompts[counter], addAnswer)
    } else {
        generate()
    }
}

input.question(prompts[counter], addAnswer)

