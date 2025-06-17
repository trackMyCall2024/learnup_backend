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
import { CourseModule } from "src/course/course.module";
import { ChapterModule } from "src/chapter/chapter.module";
import { SectionModule } from "src/section/section.module";
import { BlockerModule } from "src/blocker/blocker.module";
import { FriendModule } from "src/friend/friend.module";
import { HistoryModule } from "src/history/history.module";
import { SettingsModule } from "src/settings/settings.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
            isGlobal: true,
          }),
        MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.aa07acy.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`),
        UserModule,
        CourseModule,
        ChapterModule,
        SectionModule,
        BlockerModule,
        FriendModule,
        HistoryModule,
        SettingsModule,
        LoggerModule,
        PassportModule.register({ session: true })
    ],
    controllers: [AppController],
    providers: [AppService, SessionSerializer, JwtStrategy],
})
export class AppModule {}
