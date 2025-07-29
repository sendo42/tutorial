export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "AuthenticationError"
        Object.setPrototypeOf(this, AuthenticationError.prototype)
    }
}

export class ApplicationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ApplicationError"
        Object.setPrototypeOf(this, ApplicationError.prototype)
    }
}

