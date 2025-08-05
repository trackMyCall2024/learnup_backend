import { Module } from '@nestjs/common';
import { ChunkController } from './chunk.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chunk, ChunkSchema } from './chunk.schema';
import { ChunkService } from './chunk.service';

@Module({
  controllers: [ChunkController],
  imports: [MongooseModule.forFeature([{ name: Chunk.name, schema: ChunkSchema }])],
  providers: [ChunkService],
  exports: [ChunkService]
})
export class ChunkModule {}
