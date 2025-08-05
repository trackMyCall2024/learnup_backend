import { Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
// import { SectionService } from 'src/section/section.service';

@Controller('ai')
export class AiController {
    // constructor(
    //     private readonly aiService: AiService,
    //     private readonly sectionService: SectionService,
    // ) {}


    // private maxWords = 500;

    // @Post('insert-section-content')
    // async insertSectionContent(sectionId: string, unstructuredCourse: string[]) {
    //     const structuredPages = await this.aiService.getStructuredPages(unstructuredCourse);

    //     for (const page of structuredPages) {
    //         await this.sectionService.insertPage(sectionId, page);
    //     }

    //     const pages = await this.sectionService.getPages(sectionId);

    //     for (const page of pages) {
    //         const chunks = await this.aiService.generateChunks(page.data, this.maxWords);

    //         const preparedChunks = await Promise.all(
    //             chunks.map(async (chunk: string, i: number) => {
    //                 const embedding = await this.aiService.getEmbedding(chunk);
    //                 const start = i + 1 * this.maxWords;
    //                 const end = start + this.maxWords;
    
    //                 return {
    //                     section: sectionId,
    //                     index: i,
    //                     text: chunk,
    //                     embedding,
    //                     position: { start, end },
    //                 };
    //             }),
    //         );

    //         //await this.sectionService.insertChunks(sectionId, preparedChunks);
    //     }

    //     return { message: 'Cours de section inséré avec embeddings' };
    // }
}
