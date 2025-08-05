import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Directory } from "src/directory/directory.schema";
import { Page } from "src/page/page.schema";

export type ChunkDocument = HydratedDocument<Chunk>;

@Schema()
export class Chunk {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Directory.name, required: true })
    section: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Page.name, required: true })
    page: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number, required: true })
    index: number;

    @Prop({ type: String, required: true })
    data: string;

    @Prop({ type: [Number], required: true })
    embedding: number[];
}

export const ChunkSchema = SchemaFactory.createForClass(Chunk);