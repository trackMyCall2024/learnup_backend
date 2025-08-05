import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note, NoteSchema } from './note.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
    controllers: [NoteController],
    providers: [NoteService],
    exports: [NoteService],
})
export class NoteModule {}
