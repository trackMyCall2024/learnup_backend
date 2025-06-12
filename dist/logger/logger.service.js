"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
let LoggerService = class LoggerService {
    log(message, ...optionalParams) {
        console.log('LOG:', message);
    }
    fatal(message, ...optionalParams) {
        console.log('FATAL', message, optionalParams);
    }
    error(message, ...optionalParams) {
        console.error('ERROR:', message, optionalParams);
    }
    warn(message, ...optionalParams) {
        console.warn('WARN', message, optionalParams);
    }
    debug(message, ...optionalParams) {
        console.debug('DEBUG:', message, optionalParams);
    }
    verbose(message, ...optionalParams) {
        console.log('VERBOSE', message, optionalParams);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)()
], LoggerService);
//# sourceMappingURL=logger.service.js.map