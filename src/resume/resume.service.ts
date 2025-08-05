import { Injectable } from '@nestjs/common';
import { Resume, ResumeDocument } from './resume.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ResumeService {

    constructor(@InjectModel(Resume.name) private readonly resumeModel: Model<ResumeDocument>) {}

    async getResume(sectionID: string) {
        return this.resumeModel.find({ section: sectionID }).exec();
    }

    async createResume(newData: ResumeDocument) {
        const resume = new this.resumeModel(newData);
        return resume.save();
    }

    async updateResume(resumeID: string, newData: ResumeDocument) {
        return this.resumeModel.findByIdAndUpdate(resumeID, newData, { new: true }).exec();
    }
}
