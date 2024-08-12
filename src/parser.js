import { WebScriptError } from './stdlib.js'
import { KEYWORDMAP, TOKENS } from '../generated/tokens.js'
import Ast from './ast.js'

// Function to check if a token is an operator
const isOp = type =>
    [   
        TOKENS.Or,
        TOKENS.And,
        TOKENS.Equiv,
        TOKENS.NotEquiv,
        TOKENS.Gt,
        TOKENS.Gte,
        TOKENS.Lt,
        TOKENS.Lte,
        TOKENS.Plus,
        TOKENS.Minus,
        TOKENS.Asterisk,
        TOKENS.Slash
    ].includes(type)

// Define the order of operations (PEDMAS, BODMAS, BIMDAS, etc.)
const opOrder = {
    '<': 0,
    '<=': 0,
    '>': 0,
    '>=': 0,
    '!=': 0,
    '==': 0,
    '&&': 0,
    '||': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
}

// Contains all the attributes and methods in the parser
export class Parser {
    constructor(tokens) {
        this.tokens = tokens
        this.ast = []
        this.current = 0
    }

    error(token, msg) {
        throw new WebScriptError(
            `Syntax error on ${token.line}:${token.column}: ${msg}`
        )
    }

    // Return the next token unless it's EOF
    peek() {
        if (this.current >= this.tokens.length) return null
        return this.tokens[this.current]
    }

    // Return the type of the next token
    peekType() {
        if (this.current >= this.tokens.length) return null
        return this.tokens[this.current].type
    }

    // Return the next token if it's a keyword
    peekKeyword(keyword) {
        if (this.peekType() !== TOKENS.Keyword || this.peek().value !== keyword)
            return null
        return this.peek()
    }

    // Return the next token if it's the specified type, otherwise throw an error
    eat(type) {
        if (this.peekType() === type) return this.tokens[this.current++]
        this.error(
            this.peek(),
            `Expected ${type} but got ${this.peekType().toString()}`
        )
    }

    // Return the next token if it's the specified keyword, otherwise throw an error
    eatKeyword(keyword) {
        if (this.peekType() !== TOKENS.Keyword)
            this.error(
                this.peek(),
                `Expected ${TOKENS.Keyword} but got ${this.peekType()}`
            )
        else if (this.peek().value !== keyword)
            this.error(
                this.peek(),
                `Expected keyword ${keyword} but got keyword ${this.peek().value}`
            )
        return this.eat(TOKENS.Keyword)
    }

    // Return a list of expressions
    exprList() {
        let exprs = []
        exprs.push(this.expr())
        while (this.peekType() === TOKENS.Comma) {
            this.eat(TOKENS.Comma)
            exprs.push(this.expr())
        }
        return exprs
    }

    // Return a list of identifiers
    identifierList() {
        let identifiers = []
        identifiers.push(this.eat(TOKENS.Identifier).value)
        while (this.peekType() === TOKENS.Comma) {
            this.eat(TOKENS.Comma)
            identifiers.push(this.eat(TOKENS.Identifier).value)
        }
        return identifiers
    }

    // Handle instances, strings, numbers, booleans, arrays, and variables
    simple() {
        let token = this.eat(this.peekType())
        switch (token.type) {
            case TOKENS.Keyword: {
                if (token.value === KEYWORDMAP['prep']) {
                    const id = this.eat(TOKENS.Identifier).value
                    
                    this.eat(TOKENS.LeftParen)
                    let members = {}
                    while (this.peekType() !== TOKENS.RightParen) {
                        const member = this.eat(TOKENS.Identifier).value
                        this.eat(TOKENS.Colon)
                        members[member] = this.expr()
                        if (this.peekType() === TOKENS.Comma) this.eat(TOKENS.Comma)
                    }
                    this.eat(TOKENS.RightParen)

                    return new Ast.Instance(id, members)
                }
                break
            }
            case TOKENS.String:
            case TOKENS.Number:
            case TOKENS.Boolean: {
                return new Ast.Literal(token.content)
            }
            case TOKENS.LeftBracket: {
                let items = []
                if (this.peekType() !== TOKENS.RightBracket) items = this.exprList()
                this.eat(TOKENS.RightBracket)
                return new Ast.Array(items)
            }
            case TOKENS.Identifier: {
                return new Ast.Var(token.value)
            }
            case TOKENS.LeftParen: {
                const expr = this.expr()
                this.eat(TOKENS.RightParen)
                return expr
            }
        }
        this.error(token, "Expected expression but got " + token)
    }

    // Handle calls (object.func(), object.attr, etc.)
    call() {
        let expr = this.simple()
        while (true) {
            if (this.peekType() === TOKENS.LeftParen) {
                this.eat(TOKENS.LeftParen)
                let args = []
                if (this.peekType() !== TOKENS.RightParen) args = this.exprList()
                this.eat(TOKENS.RightParen)
                expr = new Ast.Call(expr, args)
            } else if (this.peekType() === TOKENS.LeftBracket) {
                this.eat(TOKENS.LeftBracket)
                const property = this.expr()
                this.eat(TOKENS.RightBracket)
                expr = new Ast.Get(expr, property, true)
            } else if (this.peekType() === TOKENS.Period) {
                this.eat(TOKENS.Period)
                const property = this.eat(TOKENS.Identifier).value
                expr = new Ast.Get(expr, property)
            } else break
        }
        return expr
    }

    // Handle NOT
    unary() {
        if (this.peekType() === TOKENS.Not) {
            const op = this.eat(this.peekType()).value
            return new Ast.Unary(op, this.unary())
        }

        return this.call()
    }

    // Handle binary expressions
    expr() {
        const left = this.unary()
        if (isOp(this.peekType())) {
            const op = this.eat(this.peekType()).value
            let right = this.expr()
            if (right instanceof Ast.Binary && opOrder[op] > opOrder[right.operator])
                return new Ast.Binary(
                    new Ast.Binary(left, op, right.left),
                    right.operator,
                    right.right
                )
            return new Ast.Binary(left, op, right)
        }
        return left
    }

    // Handle statements: returns, functions, for loops, while loops, structs, conditionals, and variable assignments
    stmt() {
        const returnStmt = () => {
            this.eatKeyword('return')
            return new Ast.Return(this.expr())
        }

        // Functions
        const funcStmt = () => {
            this.eatKeyword(KEYWORDMAP['func'])
            const name = this.eat(TOKENS.Identifier).value

            // Parameters
            let params = []
            if (this.peekKeyword(KEYWORDMAP['needs'])) {
                this.eatKeyword(KEYWORDMAP['needs'])
                this.eat(TOKENS.LeftParen)
                params = this.identifierList()
                this.eat(TOKENS.RightParen)
            }
            
            // Body
            this.eat(TOKENS.LeftBrace)
            let body = []
            while (this.peekType() !== TOKENS.RightBrace) body.push(this.stmt())
            this.eat(TOKENS.RightBrace)

            return new Ast.Func(name, params, body)
        }

        const forStmt = () => {
            // Counter (i)
            this.eatKeyword(KEYWORDMAP['loop'])
            const id = this.eat(TOKENS.Identifier).value
            this.eatKeyword(KEYWORDMAP['through'])

            // Start and End
            this.eat(TOKENS.LeftParen)
            const range = this.exprList()
            if (range.length !== 2)
                this.error(
                    range[range.length - 1],
                    'Expected (start, end) range but received more arguments than expected'
                )
            this.eat(TOKENS.RightParen)

            // Body
            this.eat(TOKENS.LeftBrace)
            let body = []
            while (this.peekType() !== TOKENS.RightBrace) body.push(this.stmt())
            this.eat(TOKENS.RightBrace)
            
            return new Ast.For(id, range, body)
        }

        const whileStmt = () => {
            this.eatKeyword(KEYWORDMAP['while'])

            // Condition
            this.eat(TOKENS.LeftParen)
            const condition =  this.expr()
            this.eat(TOKENS.RightParen)

            // Body
            this.eat(TOKENS.LeftBrace)
            let body = []
            while (this.peekType() !== TOKENS.RightBrace) body.push(this.stmt())
            this.eat(TOKENS.RightBrace)

            return new Ast.While(condition, body)
        }

        const conditionalStmt = keyword => {
            this.eatKeyword(keyword)

            // Condition
            let condition = new Ast.Literal(true)
            if (keyword !== KEYWORDMAP['else']) {
                this.eat(TOKENS.LeftParen)
                condition = this.expr()
                this.eat(TOKENS.RightBrace)
            }

            // Body
            this.eat(TOKENS.LeftBrace)
            let body = []
            while (this.peekType() !== TOKENS.RightBrace) body.push(this.stmt())
            this.eat(TOKENS.RightBrace)

            // Elif/Else
            let otherwise = []
            while (this.peekKeyword(KEYWORDMAP['elif']) || this.peekKeyword(KEYWORDMAP['else']))
                otherwise.push(conditionalStmt(this.peek().value))

            return new Ast.Conditional(condition, body, otherwise)
        }

        // Variable assignments
        const assignStmt = () => {
            this.eatKeyword(KEYWORDMAP['prepare'])
            const name = this.eat(TOKENS.Identifier).value
            if (this.peekType() === TOKENS.Period) {
                this.eat(TOKENS.Period)
                const property = this.eat(TOKENS.Identifier).value
                this.eatKeyword(KEYWORDMAP['as'])
                const value = this.expr()
                return new Ast.Set(name, property, value)
            }
            this.eatKeyword(KEYWORDMAP['as'])
            const value = this.expr()
            return new Ast.Var(name, value)
        }

        const structStmt = () => {
            this.eatKeyword(KEYWORDMAP['type'])
            const name = this.eat(TOKENS.Identifier).value
            this.eatKeyword(KEYWORDMAP['has'])
            this.eat(TOKENS.LeftBrace)
            const members = this.identifierList()
            this.eat(TOKENS.RightBrace)
            return new Ast.Struct(name, members)
        }

        // Call one of the above functions depending on the Keyword
        const next = this.peek()
        switch(next.type) {
            case TOKENS.Keyword: {
                switch (next.value) {
                    case KEYWORDMAP['type']:
                        return structStmt()
                    case KEYWORDMAP['prepare']:
                        return assignStmt()
                    case KEYWORDMAP['if']:
                        return conditionalStmt('if')
                    case KEYWORDMAP['while']:
                        return whileStmt()
                    case KEYWORDMAP['loop']:
                        return forStmt()
                    case KEYWORDMAP['finished']:
                        return returnStmt()
                    case KEYWORDMAP['func']:
                        return funcStmt()
                }
            }
            default: {
                return this.expr()
            }
        }
    }

    // Run the reverse chain (statements, expressions, unary operators, calls, and simple expressions) in a loop over all tokens
    parse() {
        while (this.peekType() !== TOKENS.EOF) this.ast.push(this.stmt())
        return this.ast
    }
}