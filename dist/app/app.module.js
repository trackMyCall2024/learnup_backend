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
const blocker_module_1 = require("../blocker/blocker.module");
const friend_module_1 = require("../friend/friend.module");
const history_module_1 = require("../history/history.module");
const settings_module_1 = require("../settings/settings.module");
const directory_module_1 = require("../directory/directory.module");
const note_module_1 = require("../note/note.module");
const chat_module_1 = require("../chat/chat.module");
const chunk_module_1 = require("../chunk/chunk.module");
const page_module_1 = require("../page/page.module");
const resume_module_1 = require("../resume/resume.module");
const ai_module_1 = require("../ai/ai.module");
const aws_module_1 = require("../aws/aws.module");
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
            blocker_module_1.BlockerModule,
            friend_module_1.FriendModule,
            history_module_1.HistoryModule,
            settings_module_1.SettingsModule,
            logger_module_1.LoggerModule,
            note_module_1.NoteModule,
            directory_module_1.DirectoryModule,
            chat_module_1.ChatModule,
            chunk_module_1.ChunkModule,
            page_module_1.PageModule,
            resume_module_1.ResumeModule,
            ai_module_1.AiModule,
            aws_module_1.AwsModule,
            passport_1.PassportModule.register({ session: true })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, session_serializer_1.SessionSerializer, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map