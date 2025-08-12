import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
// import { Page } from 'src/section/section.schema';

@Injectable()
export class AiService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            baseURL: 'https://openrouter.ai/api/v1', // 👈 Obligatoire pour DeepSeek
        });
    }

    private exportPrompt = `Tu es un expert en structuration et rédaction de cours académiques.`;
    private transformPrompt = `Ta mission est de transformer un texte brut et déstructuré (issu de la transcription speech-to-text) en un cours clair, cohérent et complet, sans perte d'information.`;
    private correctPrompt = `Corrige les fautes de transcription, reformule les phrases incomplètes, ajoute majuscules, ponctuation, paragraphes, titres et sous-titres pertinents.`;
    private structurePrompt = `Structure le contenu pour qu’il soit fluide et lisible en conservant toutes les idées originales.`;
    private generateResumePrompt = `Génère également un résumé synthétique du cours structuré.`;

    private detectIncompleteContentPrompt = `Si tu détectes qu’un nouveau sujet ou concept commence mais n’est pas développé, ne l’intègre pas dans le cours structuré et place-le dans un champ séparé nommé "contenuIncomplet".`;
    private returnJsonPrompt = `Retourne uniquement un objet JSON strict au format : {"structuredText": "...", "resume": "...", "contenuIncomplet": "..."}. Les champs "resume" et "contenuIncomplet" peuvent être vides si non pertinents.`;

    private firstExemple = `
    {
        "structuredText": "...",
        "resume": "...",
        "contenuIncomplet": "..."
    }`;

    private secondExemple = `
    {
        "structuredText": "...",
    }`;

    private getPrompt(isFirstPage: boolean): string {
        if (isFirstPage) {
            return `${this.exportPrompt} ${this.transformPrompt} ${this.correctPrompt} ${this.structurePrompt} ${this.generateResumePrompt} ${this.detectIncompleteContentPrompt} ${this.returnJsonPrompt} ${this.firstExemple}`;
        }

        return `${this.exportPrompt} ${this.transformPrompt} ${this.correctPrompt} ${this.structurePrompt} ${this.generateResumePrompt} ${this.detectIncompleteContentPrompt} ${this.returnJsonPrompt} ${this.secondExemple}`;
    }

    private continuationPrompt = `
    Tu es en train de structurer un long cours pédagogique.
    Voici le prompt précédent : ${this.structurePrompt}
    
    Voici le contexte de la dernière page structurée :
    ___CONTEXTE_DERNIERE_PAGE___
    
    Continue à structurer la suite du texte brut suivant, en gardant le même style et la même logique. Ne répète pas inutilement. 
    Retourne uniquement l'objet JSON {"structuredText": "...", "resume": "...", "contenuIncomplet": "..."}.
    `;

    private lastPageContext = '';

    async createChat(texte: string, history: any[] = []) {
        const messages = [...history, { role: 'user', content: texte }];

        const response = await this.openai.chat.completions.create({
            model: 'deepseek/deepseek-chat',
            messages,
            stream: false,
        });

        return response;
    }

    async createChatStream(texte: string, history: any[] = []) {
        const messages = [...history, { role: 'user', content: texte }];

        const response = await this.openai.chat.completions.create({
            model: 'deepseek/deepseek-chat',
            messages,
            stream: true,
        });

        return response;
    }

    async getStructuredCourse(
        destructuredCourse: string[],
        isFirstPage: boolean,
        history: any[] = [],
    ): Promise<{ structuredText: string; resume: string; contenuIncomplet: string }> {
        const basePrompt = isFirstPage
            ? this.structurePrompt
            : this.continuationPrompt.replace('___CONTEXTE_DERNIERE_PAGE___', this.lastPageContext);

        const prompt = `${basePrompt}\n\n${destructuredCourse.join('\n')}`;

        const response = (await this.createChat(prompt, history)) as any;

        console.log('response', response);
        const content = response.choices[0].message.content.trim();

        try {
            const parsed = JSON.parse(content);
            if (parsed && typeof parsed === 'object') {
                // Sauvegarder le contexte de la dernière page pour la suite
                this.lastPageContext = parsed.structuredText || '';
                return {
                    structuredText: parsed.structuredText || '',
                    resume: parsed.resume || '',
                    contenuIncomplet: parsed.contenuIncomplet || '',
                };
            }
        } catch (err) {
            console.error('Erreur de parsing JSON', err, content);
        }

        return { structuredText: '', resume: '', contenuIncomplet: '' };
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
}
