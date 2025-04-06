// custom logger for logging messages with different colors and statuses

class Customlogger {
    constructor() {
        this.colors = {
            reset: "\x1b[0m",
            black: "\x1b[30m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m",
        };
    }

    logMessage(color, status, ...args) {
        const message = args.join(' ');
        const colorCode = this.colors[color] || this.colors.white;
        const timestamp = new Date().toISOString();

        const formattedMessage = `${colorCode}${status} ${colorCode}${timestamp}${this.colors.reset} - ${message}`;
        
        if (process.env.NODE_ENV !== "debug") {
            console.log(formattedMessage);
        } else {
            console.debug(formattedMessage);
        }
        
        return;
    }

    success(...args) {
        this.logMessage("green", "success", ...args);
    }

    error(...args) {
        this.logMessage("red", "error", ...args);
    }

    warning(...args) {
        this.logMessage("yellow", "warning", ...args);
    }

    info(...args) {
        this.logMessage("blue", "info", ...args);
    }
}

// Creating and exporting an instance of the Customlogger class for logging purposes.
const logger = new Customlogger();

module.exports = {
    success: logger.success.bind(logger),
    errorMessage: logger.error.bind(logger),
    warning: logger.warning.bind(logger),
    info: logger.info.bind(logger),
};