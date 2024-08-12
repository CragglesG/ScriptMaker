// The Standard Library, provides all useful pre-defined functions and methods in WebScript

import { XMLHttpRequest } from "xmlhttprequest"

export class WebScriptError extends Error {
    constructor(msg) {
        super()
        this.message = msg
    }

    toString() {
        return this.message
    }
}

// XMLHttpRequest Request Object
export class Request {
    constructor(url) {
        this.url = url
    }

    // Send a GET request
    get(headers=[]) {
        const HTTPRequest = new XMLHttpRequest()
        HTTPRequest.open("GET", this.url, false)
        for (let i = 0; i < headers.length; i++) {
            HTTPRequest.setRequestHeader(headers[i][0], headers[i][1])
        }
        HTTPRequest.send(null)
        return HTTPRequest
    }

    // Send a POST request
    post(args=[]) {
        // May be unstable - has not yet been tested
        let body = null
        let headers = []
        if (args.length >= 1) body = args[0]
        if (args.length >= 2) headers = args[1]

        const HTTPRequest = new XMLHttpRequest()
        HTTPRequest.open("POST", this.url, false)
        for (let i = 0; i < headers.length; i++) {
            HTTPRequest.setRequestHeader(headers[i][0], headers[i][1])
        }
        HTTPRequest.setRequestHeader()
        HTTPRequest.send(body)
        return HTTPRequest
    }

    // Send a PUT request
    put(args=[]) {
        // May be unstable - has not yet been tested
        let body = null
        let headers = []
        if (args.length >= 1) body = args[0]
        if (args.length >= 2) headers = args[1]

        const HTTPRequest = new XMLHttpRequest()
        HTTPRequest.open("PUT", this.url, false)
        for (let i = 0; i < headers.length; i++) {
            HTTPRequest.setRequestHeader(headers[i][0], headers[i][1])
        }
        HTTPRequest.send(body)
        return HTTPRequest
    }

    // Send a DELETE request
    delete(args=[]) {
        // May be unstable - has not yet been tested
        let body = null
        let headers = []
        if (args.length >= 1) body = args[0]
        if (args.length >= 2) headers = args[1]

        const HTTPRequest = new XMLHttpRequest()
        HTTPRequest.open("DELETE", this.url, false)
        for (let i = 0; i < headers.length; i++) {
            HTTPRequest.setRequestHeader(headers[i][0], headers[i][1])
        }
        HTTPRequest.send(body)
        return HTTPRequest
    }
}

// Export the standard library
export default {
    // request makes a new request object
    request: url => new Request(url),
    // display() prints to the console
    display: args => console.log(...args),
    // random() generates a random number within a min and max
    random: ([min, max]) => {
        if (min >= 0 && max <= 1) return Math.random()
        return Math.random() * (max - min + 1) + min
    },
    // round() rounds a float/double to the nearest whole number
    round: number => Math.round(number)
}