import { Controller, Get, Post, Body, Param, Query, Put, Delete, NotFoundException } from '@nestjs/common';
import { SectionService } from './section.service';
import { Section } from './section.schema';

@Controller('section')
export class SectionController {
    constructor(private readonly sectionService: SectionService) {}

    @Post()
    async create(@Body() sectionData: Partial<Section>) {
        return this.sectionService.createSection(sectionData);
    }

    @Post('all')
    async createBulk(@Body() sectionData: Partial<Section[]>) {
        for (const section of sectionData) {
            await this.sectionService.createSection(section);
        }

        return 'ok';
    }

    @Get(':id')
    async getPaginated(
        @Param('id') chapterId: string,
        @Query('page') page: string,
        @Query('search') search: string,
    ) {
        const pageNum = parseInt(page) || 1;
        return this.sectionService.getSectionsPaginated(chapterId, search, pageNum);
    }

    @Get('single/:id')
    async getSection(
        @Param('id') sectionId: string,
    ) {
        if (!sectionId) {
            throw new NotFoundException('section id is not found');
        }

        return this.sectionService.getSectionById(sectionId);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: Partial<Section>) {
        return this.sectionService.updateSection(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.sectionService.deleteSection(id);
    }

    @Post('talk')
    async talk(@Body('section') { message, sectionId }: { message: string; sectionId: string }) {
        // configurer l'ia
        // Si c'est une nouvelle section -> précise d'oublier tout ce qui est ecrit précédemment et base toi sur le nouveau cours
        // envoyé le message à l'ia
        // recupérer la réponse
        // renvoyer par petit bout
        // Update la section chat
        // Une fois finit renvoie un signal pour dire que c'est fini l'ia à fini de répondre
        // Si une erreur se produit renvoie une alerte erreur -> ressaie coté front
    }
}
