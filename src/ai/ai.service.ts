import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import axios from 'axios';
import { FileService } from '../file/file.service';
// import { Page } from 'src/section/section.schema';

export interface History {
    role: string;
    content: string;
}

enum JsonKeys {
    STRUCTURED_TEXT = 'structuredText',
    RESUME = 'resume',
    CONTENU_INCOMPLET = 'contenuIncomplet',
    TITLE_PAGE = 'titlePage',
}

export interface StructuredCourse {
    titlePage: string;
    structuredText: string;
    resume: string;
    contenuIncomplet: string;
}

@Injectable()
export class AiService {
    private openai: OpenAI;

    constructor(private readonly fileService: FileService) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            baseURL: 'https://openrouter.ai/api/v1', // 👈 Obligatoire pour DeepSeek
        });
    }

    private defaultJson = {
        titlePage: '',
        structuredText: '',
        resume: '',
        contenuIncomplet: '',
    };

    private exportPrompt = `Tu es un expert en structuration et rédaction de cours académiques avec une expertise approfondie en pédagogie et en traitement du langage naturel.`;
    private transformPrompt = `Ta mission CRITIQUE est de restructurer et améliorer un texte de cours en CONSERVANT 100% DE SON CONTENU ET DE SA LONGUEUR ORIGINALE.`;
    private correctPrompt = `STRUCTURE : Organise le contenu en paragraphes logiques avec des sauts de ligne appropriés. COHÉRENCE : Si les phrases manquent de fluidité, reformule-les en préservant exactement le même sens et la même quantité d'informations. COMPLÉTUDE : Si tu détectes des transitions abruptes ou des concepts non développés, ajoute des phrases de liaison qui maintiennent la continuité logique tout en conservant l'intégralité du message original.`;
    private generateResumePrompt = `Génère un résumé synthétique mais COMPLET du cours structuré, en capturant tous les points clés et concepts abordés.`;

    private detectIncompleteContentPrompt = `ANALYSE CRITIQUE : Si tu détectes qu'un nouveau sujet ou concept commence mais n'est pas développé, ne l'intègre PAS dans le cours structuré et place-le dans le champ "contenuIncomplet". Si un sujet est déjà présent et développé dans le cours structuré, ne l'inclus PAS dans "contenuIncomplet". Ce champ doit contenir UNIQUEMENT les éléments vraiment inachevés.`;
    private conservationPrompt = `🚨 RÈGLE ABSOLUE ET NON-NÉGOCIABLE : Le texte structuré final DOIT avoir une longueur IDENTIQUE ou SUPÉRIEURE au texte original. Tu peux éliminer les répétitions verbales, les hésitations, les "donc", "alors", "voilà" superflus, mais tu DOIS CONSERVER 100% des informations, concepts, exemples, dates, noms, définitions, détails techniques, anecdotes et nuances. Si tu enlèves du contenu, tu DOIS le compenser par des reformulations plus détaillées ou des explications supplémentaires. Le texte final doit être PLUS LISIBLE, MIEUX STRUCTURÉ, mais JAMAIS plus court. VÉRIFIE que chaque idée du texte original est présente dans ta version.`;
    private returnJsonPrompt = `Retourne UNIQUEMENT un objet JSON strict au format : {"titlePage": "...", "structuredText": "...", "resume": "...", "contenuIncomplet": "..."}. Les champs "resume" et "contenuIncomplet" peuvent être vides si non pertinents. Le champ "structuredText" DOIT contenir le cours complet restructuré.`;
    private inputExample = `// input destructured course example -> donc bonjour à tous donc aujourd'hui je me présente nouveau professeur de psychologie du travail on aura 4 cm ensemble le lundi 25 le mardi 24 et samedi à 5h du matin le 28 et enfin le 4 août à 15h30 donc on aura 4h à chaque fois et donc on va apprendre à psychologie du travail est-ce que vous savez déjà qu'on a vraiment qui d'entre vous connais le mot psychologie travail est-ce que vous savez c'est ça tourne un peu autour de quoi de quoi est-ce qu'on parle et cetera et cetera est-ce qu'il y a des volontaires dans la salle non oui d'accord donc je vais commencer le cours ça va être plus rapide donc 4h donc là on va commencer donc déjà premièrement ce qu'il faut savoir c'est que la psychologie du travail ça reste un domaine qui fait partie du champ de la psychologie savoir qu'on allait absolument cognitive du développement psychologique du développement psychologique la psychologie travail c'est vraiment la psychologie appliquée dans le monde du travail comme vous pouvez en prendre et donc c'est l'étude des comportements humains au travail est-ce que vous avez une idée de ce qu'on pourrait étudier dans notre travail en tant que psychologue du travail blablablablabla du coup du coup elle répond donc il faut savoir que à l'heure actuelle dans le monde du travail vous tombez à pic parce que on a de plus en plus de burn out on a de plus en plus de borax c'est pas de Bora mais en tout cas de Burn Out c'est réel le mal-être au travail la perte de sang ce travail ce sont des choses ce sont des concepts qui aujourd'hui font sens et qui parle à beaucoup de goûts et ça c'est lié à l'organisation du travail alors ce qu'on va faire c'est que aujourd'hui on adapte l'homme au travail alors que nous notre métier c'est d'adapter le travail à l'homme c'est-à-dire qu'on doit arriver sur le champ on doit voir comment le travail est organisé pour pouvoir prendre des actions et mettre des solutions en place pour pas qu'il y ait des entités d'impact sur la santé du salarié Salarié qu'un état mental wood c'est un salaire qui va être performant ok donc voilà suffit quand j'arrête de rester continuer encore des heures maintenant nous allons parler de la psychologie des annimeaux le canard est`;

    private outputExample = `
    // Output example (json format) ->
    {
        "titlePage": "Introduction à la psychologie du travail",

        "structuredText": "Bonjour à tous.\n\nAujourd'hui, je me présente : nouveau professeur de psychologie du travail. Nous aurons 4 cours magistraux ensemble : le lundi 25, le mardi 24, le samedi 28 à 5h du matin, et enfin le 4 août à 15h30. Chaque séance durera 4 heures.\n\nNous allons donc aborder la psychologie du travail. Est-ce que vous savez déjà ce que signifie ce terme ? De quoi parle-t-on exactement ? Y a-t-il des volontaires dans la salle ? Non ? Oui ? D'accord, je vais commencer directement le cours.\n\nLa psychologie du travail fait partie du champ plus large de la psychologie, aux côtés de la psychologie cognitive ou de la psychologie du développement. Elle correspond à l'application des connaissances psychologiques dans le monde professionnel et consiste à étudier les comportements humains au travail.\n\nÀ l'heure actuelle, cette discipline est particulièrement pertinente car on constate une augmentation des burn-out et du mal-être au travail, ainsi qu'une perte de sens ressentie par de nombreux salariés. Ces phénomènes sont étroitement liés à l'organisation du travail.\n\nTraditionnellement, on adapte l'homme au travail. Notre métier consiste au contraire à adapter le travail à l'homme, en observant et en analysant l'organisation pour mettre en place des solutions préservant la santé mentale des salariés.\n\nUn salarié en bonne santé mentale est un salarié performant. C'est pourquoi notre discipline prend toute son importance dans le monde professionnel actuel.",
    
        "resume": "Le professeur, nouvel enseignant en psychologie du travail, se présente et annonce 4 cours magistraux de 4 heures chacun, aux dates précisées. Il explique que la psychologie du travail est une branche appliquée de la psychologie, centrée sur l'étude des comportements humains au travail. Elle se distingue des autres domaines comme la psychologie cognitive ou du développement. Le métier du psychologue du travail consiste à adapter le travail à l'homme, et non l'inverse, afin de préserver la santé mentale des salariés. Il évoque l'actualité du sujet, notamment la montée des burn-out et du mal-être au travail, liés à l'organisation professionnelle. Un salarié en bonne santé mentale est plus performant, d'où l'importance d'actions et de solutions adaptées.",
    
        "contenuIncomplet": "Maintenant, nous allons parler de la psychologie des animaux. Le canard est..."
    }`;

    private getPrompt(): string {
        return `${this.exportPrompt} ${this.transformPrompt} ${this.correctPrompt} ${this.generateResumePrompt} ${this.detectIncompleteContentPrompt} ${this.conservationPrompt} ${this.returnJsonPrompt} ${this.inputExample} => ${this.outputExample}`;
    }

    private checkIfJsonIsGood(content: string): boolean {
        // Vérifier que les clés requises existent dans le JSON
        const requiredKeys = [JsonKeys.STRUCTURED_TEXT, JsonKeys.RESUME, JsonKeys.TITLE_PAGE];
        const keysAlreadyExist = requiredKeys.every((key) => content.includes(key));

        // Log pour debug
        console.log('@@checkIfJsonIsGood - content:', content);
        console.log('@@checkIfJsonIsGood - requiredKeys:', requiredKeys);
        console.log('@@checkIfJsonIsGood - keysAlreadyExist:', keysAlreadyExist);

        return keysAlreadyExist;
    }

    private validateStructuredTextLength(originalText: string, structuredText: string): boolean {
        const originalLength = originalText.length;
        const structuredLength = structuredText.length;
        const minRequiredLength = originalLength * 0.95; // 95% de la longueur originale minimum

        console.log('@@validateStructuredTextLength - originalLength:', originalLength);
        console.log('@@validateStructuredTextLength - structuredLength:', structuredLength);
        console.log('@@validateStructuredTextLength - minRequiredLength:', minRequiredLength);
        console.log(
            '@@validateStructuredTextLength - isValid:',
            structuredLength >= minRequiredLength,
        );

        return structuredLength >= minRequiredLength;
    }

    async createChat(texte: string, history: History[] = []) {
        const messages = [...history, { role: 'user', content: texte }] as any;

        const response = await this.openai.chat.completions.create({
            model: 'deepseek/deepseek-chat',
            messages,
            stream: false,
        });

        return response;
    }

    async createChatStream(texte: string, history: History[] = []) {
        const messages = [...history, { role: 'user', content: texte }] as any;

        const response = await this.openai.chat.completions.create({
            model: 'deepseek/deepseek-chat',
            messages,
            stream: true,
        });

        return response;
    }

    async getStructuredCourse(
        destructuredCourse: string,
        history: History[] = [],
    ): Promise<StructuredCourse> {
        const prompt = `|prompt|: ${this.getPrompt()}\n\n |destructured course|: ${destructuredCourse}`;

        const response = (await this.createChat(prompt, history)) as any;

        console.log('@@response', response);
        const content = response?.choices?.[0]?.message?.content?.trim();

        if (!content) {
            return this.defaultJson;
        }

        console.log('@@content', content);

        try {
            const jsonContent = content.match(/```json\n(.*)\n```/s);
            if (jsonContent) {
                console.log('@@jsonContent[1]:', jsonContent[1]);

                const isJsonGood = this.checkIfJsonIsGood(jsonContent[1]);
                console.log('@@isJsonGood:', isJsonGood);

                const parsed = isJsonGood ? JSON.parse(jsonContent[1]) : this.defaultJson;

                console.log('@@parsed result:', parsed);
                return parsed;
            }

            return this.defaultJson;
        } catch (err) {
            console.error('Erreur de parsing JSON', err, content);
            return this.defaultJson;
        }
    }

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

    async transcribeAudio(audioBuffer: Buffer, id: string): Promise<string> {
        try {
            // Convert buffer to base64 for sending in HTTP body
            const base64Audio = audioBuffer.toString('base64');

            const response = await axios.post(
                `${process.env.PYTHON_SERVER_URL}/transcribe`,
                {
                    audio_data: base64Audio,
                    audio_format: 'webm',
                    id: id,
                },
                {
                    timeout: 30000, // 30 secondes timeout
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.data && response.data.transcript) {
                return response.data.transcript;
            } else {
                throw new Error('Invalid response from Python server');
            }
        } catch (error) {
            console.error('❌ Error transcribing audio:', error);
            throw error;
        }
    }

    async sendToTranscriptionQueue(filePath: string): Promise<{ task_id: string; status: string }> {
        try {
            // Récupérer le fichier audio depuis S3
            const audioBuffer = await this.fileService.getAudioBufferFromPath(filePath);
            const fileId = filePath?.split('/')?.[0] || 'anonymous';
            if (!audioBuffer) {
                throw new Error('❌ Impossible de récupérer le fichier audio');
            }

            // Convertir en base64
            const base64Audio = audioBuffer.toString('base64');

            // Envoyer à la queue Python (réponse immédiate)
            const response = await axios.post(
                `${process.env.PYTHON_SERVER_URL}/transcribe`,
                {
                    audio_data: base64Audio,
                    audio_format: 'webm',
                    id: fileId,
                },
                {
                    timeout: 10000, // 10 secondes timeout pour la queue
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.data && response.data.task_id) {
                return {
                    task_id: response.data.task_id,
                    status: response.data.status,
                };
            } else {
                throw new Error('Invalid response from Python server queue');
            }
        } catch (error) {
            console.error('❌ Error sending to transcription queue:', error);
            throw error;
        }
    }
}
