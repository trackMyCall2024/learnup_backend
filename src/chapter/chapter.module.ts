import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Chapter, ChapterSchema } from "./chapter.schema";
import { ChapterService } from "./chapter.service";
import { ChapterController } from "./chapter.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }])],
  controllers: [ChapterController],
  providers: [ChapterService],
})

export class ChapterModule {}