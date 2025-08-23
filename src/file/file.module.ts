import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File, FileSchema } from './file.schema';
import { AiModule } from '../ai/ai.module';
import { ChunkModule } from 'src/chunk/chunk.module';
import { PageModule } from 'src/page/page.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
        forwardRef(() => AiModule),
        forwardRef(() => ChunkModule),
        forwardRef(() => PageModule),
    ],
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService],
})
export class FileModule {}
