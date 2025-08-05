import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDocument } from './note.schema';

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Get(':sectionID')
    async getNote(@Param('sectionID') sectionID: string) {
        return this.noteService.getNote(sectionID);
    }

    @Post()
    async createNote(@Body() note: NoteDocument) {
        return this.noteService.createNote(note);
    }

    @Put(':noteID')
    async updateNote(@Param('noteID') noteID: string, @Body() newData: NoteDocument) {
        return this.noteService.updateNote(noteID, newData);
    }

    @Delete(':noteID')
    async deleteNote(@Param('noteID') noteID: string) {
        return this.noteService.deleteNote(noteID);
    }
}
