import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './section.schema';

@Injectable()
export class SectionService {
    constructor(@InjectModel(Section.name) private readonly sectionModel: Model<SectionDocument>) {}

    async createSection(data: Partial<Section>): Promise<SectionDocument> {
        const newSection = new this.sectionModel(data);
        return newSection.save();
    }

    async getSectionsPaginated(
        chapterId: string,
        search?: string,
        page = 1,
        limit = 20,
    ): Promise<{ rows: SectionDocument[]; hasMore: boolean }> {
        const skip = (page - 1) * limit;

        const filter: Record<string, any> = { chapter: chapterId };
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const rows = await this.sectionModel.find(filter).skip(skip).limit(limit).exec();
        const totalMatching = await this.sectionModel.countDocuments(filter).exec();
        const hasMore = skip + rows.length < totalMatching;

        return { rows, hasMore };
    }

    async updateSection(id: string, updateData: Partial<Section>): Promise<SectionDocument> {
        const updated = await this.sectionModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            throw new NotFoundException('Section not found');
        }

        return updated;
    }

    async deleteSection(id: string): Promise<boolean> {
        const result = await this.sectionModel.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }
}
