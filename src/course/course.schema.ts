import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../user/user.schema";

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    logo: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);