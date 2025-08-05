import { Injectable } from '@nestjs/common';
// import { Page } from 'src/section/section.schema';

@Injectable()
export class AiService {
    async generateChunks(text: string, maxWords = 500): Promise<string[]> {
        const words = text.split(' ');
        const chunks = [];
        for (let i = 0; i < words.length; i += maxWords) {
          chunks.push(words.slice(i, i + maxWords).join(' '));
        }

        return chunks;
    }

    async getEmbedding(text: string): Promise<string> {
        return text;
    }

    // async getStructuredPages(text: string[]): Promise<Page[]> {
    //     return text.map((text) => ({
    //         title: text,
    //         subtitle: text,
    //         data: text,
    //     }));
    // }
}
