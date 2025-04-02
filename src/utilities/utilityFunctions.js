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

    logMessage(message, color, status) {
        const colorCode = this.colors[color] || this.colors.white;
        const timestamp = new Date().toISOString();
        process.stdout.write(`${colorCode}${status} ${colorCode}${timestamp}${this.colors.reset} - ${message} \n`);
        return;
    }

    success(message) {
        this.logMessage(message, "green", "success");
    }

    error(message) {
        this.logMessage(message, "red", "error");
    }

    waring(message) {
        this.logMessage(message, "yellow", "warning");
    }

    info(message) {
        this.logMessage(message, "blue", "info");
    }
}

// Creating and exporting an instance of the Customlogger class for logging purposes.
const logger = new Customlogger();

module.exports = {
    success: logger.success.bind(logger),
    errorMessage: logger.error.bind(logger),
    waring: logger.waring.bind(logger),
    info: logger.info.bind(logger),
};