"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../user/user.module");
const passport_1 = require("@nestjs/passport");
const session_serializer_1 = require("../session.serializer");
const jwt_strategy_1 = require("../authentification/jwt.strategy");
const logger_module_1 = require("../logger/logger.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ".env",
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.aa07acy.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`),
            user_module_1.UserModule,
            logger_module_1.LoggerModule,
            passport_1.PassportModule.register({ session: true })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, session_serializer_1.SessionSerializer, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map