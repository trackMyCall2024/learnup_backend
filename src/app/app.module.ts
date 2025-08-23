import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { SessionSerializer } from '../session.serializer';
import { JwtStrategy } from "src/authentification/jwt.strategy";
import { LoggerModule } from "src/logger/logger.module";
import { BlockerModule } from "src/blocker/blocker.module";
import { FriendModule } from "src/friend/friend.module";
import { HistoryModule } from "src/history/history.module";
import { SettingsModule } from "src/settings/settings.module";
import { DirectoryModule } from "src/directory/directory.module";
import { NoteModule } from "src/note/note.module";
import { ChatModule } from "src/chat/chat.module";
import { ChunkModule } from "src/chunk/chunk.module";
import { PageModule } from "src/page/page.module";
import { ResumeModule } from "src/resume/resume.module";
import { AiModule } from "src/ai/ai.module";
import { FileModule } from "src/file/file.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
            isGlobal: true,
          }),
        MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.aa07acy.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`),
        UserModule,
        BlockerModule,
        FriendModule,
        HistoryModule,
        SettingsModule,
        LoggerModule,
        NoteModule,
        DirectoryModule,
        ChatModule,
        ChunkModule,
        PageModule,
        ResumeModule,
        AiModule,
        FileModule,
        PassportModule.register({ session: true })
    ],
    controllers: [AppController],
    providers: [AppService, SessionSerializer, JwtStrategy],
})
export class AppModule {}
