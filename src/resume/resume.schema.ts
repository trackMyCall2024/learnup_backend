import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Directory } from "src/directory/directory.schema";

export type ResumeDocument = HydratedDocument<Resume>;

@Schema()
export class Resume {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Directory.name, required: true })
    section: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, required: true })
    data: string;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);