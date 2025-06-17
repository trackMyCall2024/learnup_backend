import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../user/user.schema';
import { Course } from '../course/course.schema';
import { Section } from '../section/section.schema';
import { Chapter } from '../chapter/chapter.schema';

export type HistoryDocument = HydratedDocument<History>;

export type HistoryType = 'courses' | 'chapters' | 'sections';

@Schema()
export class HistoryList {
    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Course.name }],
        default: [],
        validate: [(arr: any[]) => arr.length <= 4, 'Max 4 courses'],
    })
    courses: mongoose.Schema.Types.ObjectId[];

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Chapter.name }],
        default: [],
        validate: [(arr: any[]) => arr.length <= 4, 'Max 4 chapters'],
    })
    chapters: mongoose.Schema.Types.ObjectId[];

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Section.name }],
        default: [],
        validate: [(arr: any[]) => arr.length <= 4, 'Max 4 sections'],
    })
    sections: mongoose.Schema.Types.ObjectId[];
}

@Schema()
export class History {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: HistoryList, required: true })
    history: HistoryList;
}

export const HistorySchema = SchemaFactory.createForClass(History);
