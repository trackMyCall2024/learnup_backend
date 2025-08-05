import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PageDocument } from './page.schema';
import { Model } from 'mongoose';

@Injectable()
export class PageService {
    constructor(@InjectModel('Page') private readonly pageModel: Model<PageDocument>) {}

    async getPages(sectionID: string) {
        return this.pageModel.find({ section: sectionID }).exec();
    }

    async createPage(newData: PageDocument) {
        const page = new this.pageModel(newData);
        return page.save();
    }

    async deletePage(pageID: string) {
        return this.pageModel.deleteOne({ _id: pageID }).exec();
    }

    async updatePage(pageID: string, newData: PageDocument) {
        return this.pageModel.findByIdAndUpdate(pageID, newData, { new: true }).exec();
    }
}
