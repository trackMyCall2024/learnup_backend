import { Body, Controller, Get, Post, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { AiService, History } from '../ai/ai.service';
import { FileDocument, TranscribeStatus } from './file.schema';
import { ChunkService } from 'src/chunk/chunk.service';
import { PageService } from 'src/page/page.service';
import { PageDocument } from 'src/page/page.schema';

const fileInterceptorOptions = {
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
    },
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
};

@Controller('file')
export class FileController {
    constructor(
        private readonly fileService: FileService,
        private readonly aiService: AiService,
        private readonly chunkService: ChunkService,
        private readonly pageService: PageService,
    ) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('audio', fileInterceptorOptions))
    async uploadFile(@UploadedFile() audioFile: Express.Multer.File, @Body() body: any) {
        if (!audioFile || !body.sectionId) {
            console.error('❌ Aucun fichier audio reçu');
            return { error: 'Aucun fichier audio reçu' };
        }

        const sectionId = body.sectionId;
        const index = body.index;

        await this.fileService.uploadFile(audioFile, sectionId);

        // create a tmp transcript with sectionId
        const file = {
            section: sectionId,
            index: Number(index),
            path: `${sectionId}/${audioFile.originalname}`,
            name: audioFile.originalname,
            date: new Date(),
            transcribeStatus: TranscribeStatus.Pending,
            titlePage: '',
            transcript: '',
            resume: '',
            contenuIncomplet: '',
            structuredText: '',
        } as FileDocument;

        const createdFile = await this.fileService.createTempFileMetadata(file);

        // 🚀 ENVOI À LA QUEUE PYTHON + WEBHOOK AUTOMATIQUE
        try {
            const queueResult = await this.aiService.sendToTranscriptionQueue(createdFile.path);

            // Mettre à jour le statut
            createdFile.transcribeStatus = TranscribeStatus.Processing;
            await this.fileService.updateTempFileByFileId(createdFile._id.toString(), createdFile);

            return {
                ...createdFile,
                message: 'Fichier uploadé et envoyé en transcription',
                task_id: queueResult.task_id,
                estimated_time: '2-3 minutes',
                status: 'processing',
            };
        } catch (error) {
            console.error('❌ Erreur envoi queue:', error);
            // En cas d'erreur, on garde le statut Pending
            return {
                ...createdFile,
                error: "Erreur lors de l'envoi en transcription",
                status: 'error',
            };
        }
    }

    @Post('webhook/transcription-complete')
    async transcriptionComplete(@Body() body: any) {
        try {
            const { task_id, transcript, tmp_file_section_id } = body;

            if (!task_id || !transcript || !tmp_file_section_id) {
                console.error('❌ Données webhook incomplètes:', body);
                return { error: 'Données manquantes' };
            }

            let updatedFile = await this.fileService.updateTempFileBySection(tmp_file_section_id, {
                transcript: transcript,
                transcribeStatus: TranscribeStatus.TranscribedByPython,
            });

            updatedFile = await this.fileService.getTempFileBySection(tmp_file_section_id);

            // await this.fileService.deleteFile(updatedFile.path);

            // create history
            const history: History[] = await this.createHistory(updatedFile);

            // get structured course
            const course = await this.aiService.getStructuredCourse(
                updatedFile.transcript,
                history,
            );

            if (!course.structuredText) {
                throw new Error('No structured text');
            }

            updatedFile = await this.fileService.updateTempFileBySection(tmp_file_section_id, {
                transcribeStatus: TranscribeStatus.TranscribedByDeepSeek,
                titlePage: course.titlePage,
                structuredText: course.structuredText,
                resume: course.resume,
                contenuIncomplet: course.contenuIncomplet,
            });

            // create page
            const page = await this.pageService.createPage({
                title: course.titlePage,
                section: updatedFile.section,
            } as PageDocument);

            const chunks = await this.aiService.generateChunks(course.structuredText);

            // store chunk without embedding
            await this.chunkService.createChunks(
                page._id.toString(),
                updatedFile.section.toString(),
                chunks,
            );

            // console.log(`✅ Transcription terminée pour task_id: ${task_id}`);

            // TODO: Récupérer le fichier par task_id et mettre à jour
            // Pour l'instant, on log juste
            // console.log(`📝 Transcript: ${transcript}`);

            // return { success: true, message: 'Webhook reçu', course };
        } catch (error) {
            console.error('❌ Erreur webhook:', error);
            return { error: 'Erreur webhook' };
        }
    }

    @Get('status/:taskId')
    async getTranscriptionStatus(@Param('taskId') taskId: string) {
        try {
            // TODO: Vérifier le statut depuis le serveur Python
            // GET /transcribe/status/{task_id}

            console.log(`🔍 Vérification statut pour task_id: ${taskId}`);

            // Pour l'instant, retourner un statut fictif
            return {
                task_id: taskId,
                status: 'processing', // ou 'completed', 'failed'
                message: 'Vérifiez le statut sur le serveur Python',
            };
        } catch (error) {
            console.error('❌ Erreur vérification statut:', error);
            return { error: 'Erreur vérification statut' };
        }
    }

    @Get('test')
    async getTest() {
        return this.fileService.getS3Client();
    }

    @Get('upload/test')
    async uploadFileTest() {
        const fileKey = '68a81ce34c0b4a274bd9df4f/1.webm';
        await this.aiService.sendToTranscriptionQueue(fileKey);
    }

    async createHistory(currentFile: FileDocument): Promise<History[]> {
        // if is not first page -> get resume and contenuIncomplet
        const isFirstFile = currentFile.index === 0;

        if (isFirstFile) {
            return [];
        }

        const previousFileIndex = currentFile.index - 1;
        const previousFile = await this.fileService.getPreviousFile(
            previousFileIndex,
            currentFile.section.toString(),
        );

        if (!previousFile) {
            return [];
        }

        return [
            {
                role: 'user',
                content: `Summary of the previous lesson: ${previousFile.resume}`,
            },
            previousFile?.contenuIncomplet
                ? {
                      role: 'user',
                      content: `Start of new course content: ${previousFile.contenuIncomplet}`,
                  }
                : { role: 'user', content: '' },
        ];
    }
}
