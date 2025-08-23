import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiService, History } from './ai.service';

@Controller('ai')
export class AiController {
    constructor(
        private readonly aiService: AiService,
    ) {}

    @Post('insert-section-content')
    async insertSectionContent(@Body() body: { unstructuredCourse: string }) {
        // const structuredPages = await this.aiService.getStructuredCourse(body.unstructuredCourse, body.history);

        // console.log('structuredPages', structuredPages);

        // return structuredPages;
    }

    @Get('test-deepseek')
    async testDeepseek() {
        const response = await this.aiService.createChat('Dis-moi bonjour en 3 façons différentes.');
        return response.choices[0].message.content;
    }
}
