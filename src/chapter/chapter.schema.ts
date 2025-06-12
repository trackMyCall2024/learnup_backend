import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Course } from "../course/course.schema";

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;
    
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Course.name, required: true })
    course: mongoose.Schema.Types.ObjectId;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);