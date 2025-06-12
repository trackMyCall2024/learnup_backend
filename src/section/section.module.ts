import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Section, SectionSchema } from "./section.schema";
import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}