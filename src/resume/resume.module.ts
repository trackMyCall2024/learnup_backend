import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resume, ResumeSchema } from './resume.schema';
import { ResumeService } from './resume.service';

@Module({
  controllers: [ResumeController],
  imports: [MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }])],
  providers: [ResumeService],
  exports: [ResumeService]
})
export class ResumeModule {}
