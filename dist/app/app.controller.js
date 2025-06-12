"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_service_1 = require("../user/user.service");
const jwt_auth_guard_1 = require("../authentification/jwt-auth.guard");
const logger_service_1 = require("../logger/logger.service");
let AppController = class AppController {
    constructor(userService, loggerService, connection) {
        this.userService = userService;
        this.loggerService = loggerService;
        this.connection = connection;
    }
    getStatus() {
        const status = this.connection.readyState === 1 ? "connected" : "disconnected";
        return { status };
    }
    async getUser(userData) {
        const emailQeury = userData?.email;
        this.loggerService.debug("enter", emailQeury);
        if (!emailQeury) {
            return;
        }
        const doesUserAlreadyExist = await this.userService.doesUserAlreadyExist(userData?.email);
        if (!doesUserAlreadyExist) {
            this.loggerService.debug("no user");
            return;
        }
        const user = await this.userService.getUserByEmail(userData?.email);
        this.loggerService.debug("user", user);
        return user;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("status_db"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("get_user"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUser", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(2, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [user_service_1.UserService,
        logger_service_1.LoggerService,
        mongoose_1.Connection])
], AppController);
//# sourceMappingURL=app.controller.js.map