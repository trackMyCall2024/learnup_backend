import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chapter, ChapterDocument } from "./chapter.schema";

@Injectable()
export class ChapterService {
    constructor(
        @InjectModel(Chapter.name) private readonly chapterModel: Model<ChapterDocument>,
    ) {}

    async createChapter(chapterData: Partial<Chapter>): Promise<ChapterDocument> {
        const newChapter = new this.chapterModel(chapterData);
        return newChapter.save();
    }

    async getChaptersPaginated(page = 1, limit = 20): Promise<{ chapters: ChapterDocument[]; hasMore: boolean }> {
        const skip = (page - 1) * limit;
        const chapters = await this.chapterModel.find().skip(skip).limit(limit).exec();
        const countTotal = await this.chapterModel.countDocuments().exec();
        const hasMore = skip + chapters.length < countTotal;
        return { chapters, hasMore };
    }

    async updateChapter(id: string, updateData: Partial<Chapter>): Promise<ChapterDocument> {
        const updated = await this.chapterModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            throw new NotFoundException("Chapter not found")
        };
        
        return updated;
    }

    async deleteChapter(id: string): Promise<boolean> {
        const result = await this.chapterModel.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }
}