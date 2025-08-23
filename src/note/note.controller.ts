import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDocument } from './note.schema';

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Get(':section_id')
    async getNote(@Param('section_id') section_id: string) {
        console.log('@@getNote - section_id', section_id);
        const note = await this.noteService.getNote(section_id);
        console.log('note', note);
        return note;
    }

    @Post()
    async createNote(@Body() note: NoteDocument) {
        return this.noteService.createNote(note);
    }

    @Put(':note_id')
    async updateNote(@Param('note_id') note_id: string, @Body() newData: NoteDocument) {
        return this.noteService.updateNote(note_id, newData);
    }

    @Delete(':note_id')
    async deleteNote(@Param('note_id') note_id: string) {
        return this.noteService.deleteNote(note_id);
    }
}
