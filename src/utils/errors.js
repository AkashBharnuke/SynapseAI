class TimeoutError extends Error {
    constructor(message = "Provider timeout") {
        super(message);
        this.name = "TimeoutError";
        this.timedOut = true;
    }
}

export { TimeoutError }