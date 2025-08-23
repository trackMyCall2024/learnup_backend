import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Directory } from 'src/directory/directory.schema';

export type FileDocument = HydratedDocument<File>;

export enum TranscribeStatus {
    Pending = 'pending',
    Processing = 'processing',
    TranscribedByPython = 'transcribedByPython',
    TranscribedByDeepSeek = 'transcribedByDeepSeek',
    Error = 'error',
}

@Schema()
export class File {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number, required: true })
    index: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Directory.name, required: true })
    section: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, required: true })
    path: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: String, required: true, enum: TranscribeStatus })
    transcribeStatus: TranscribeStatus;

    @Prop({ type: String, required: false })
    titlePage: string;

    @Prop({ type: String, required: false })
    transcript: string;

    @Prop({ type: String, required: false })
    resume: string;

    @Prop({ type: String, required: false })
    contenuIncomplet: string;

    @Prop({ type: String, required: false })
    structuredText: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
