import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../user/user.schema';
import { Directory } from '../directory/directory.schema';

export type HistoryDocument = HydratedDocument<History>;

@Schema()
export class HistoryList {
    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Directory.name }],
        default: [],
        validate: [(arr: any[]) => arr.length <= 4, 'Max 4 courses'],
    })
    courses: mongoose.Schema.Types.ObjectId[];

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Directory.name }],
        default: [],
        validate: [(arr: any[]) => arr.length <= 4, 'Max 4 chapters'],
    })
    chapters: mongoose.Schema.Types.ObjectId[];

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Directory.name }],
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
