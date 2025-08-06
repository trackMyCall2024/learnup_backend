import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NoteDocument } from './note.schema';
import { Model } from 'mongoose';

@Injectable()
export class NoteService {
    constructor(@InjectModel('Note') private readonly noteModel: Model<NoteDocument>) {}

    async getNote(sectionID: string) {
        return this.noteModel.findOne({ section: sectionID }).exec();
    }

    async createNote(newData: NoteDocument) {
        const note = new this.noteModel(newData);
        return note.save();
    }

    async updateNote(noteID: string, newData: NoteDocument) {
        return this.noteModel.findByIdAndUpdate(noteID, newData, { new: true }).exec();
    }

    async deleteNote(noteID: string) {
        return this.noteModel.findByIdAndDelete(noteID).exec();
    }
}
