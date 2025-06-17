import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Course, CourseSchema } from "./course.schema";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { LoggerService } from "src/logger/logger.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],
  controllers: [CourseController],
  providers: [CourseService, LoggerService],
})

export class CourseModule {}