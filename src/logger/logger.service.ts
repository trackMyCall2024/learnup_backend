import { LoggerService as Logger, Injectable } from "@nestjs/common";

@Injectable()
export class LoggerService implements Logger {
    /**
     * Write a 'log' level log.
     */
    log(message: any, ...optionalParams: any[]) {
        console.log('LOG:',message);
    }

    /**
     * Write a 'fatal' level log.
     */
    fatal(message: any, ...optionalParams: any[]) {
        console.log('FATAL',message, optionalParams);
    }

    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]) {
        console.error('ERROR:',message, optionalParams);
    }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        console.warn('WARN',message, optionalParams);
    }

    /**
     * Write a 'debug' level log.
     */
    debug?(message: any, ...optionalParams: any[]) {
        console.debug('DEBUG:',message, optionalParams);
    }

    /**
     * Write a 'verbose' level log.
     */
    verbose?(message: any, ...optionalParams: any[]) {
        console.log('VERBOSE',message, optionalParams);
    }
}
