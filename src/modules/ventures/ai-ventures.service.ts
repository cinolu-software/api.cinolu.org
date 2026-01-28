import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenturesService } from './ventures.service';
import { ChatOllama } from '@langchain/ollama';
import { VentureDocument } from './entities/document.entity';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AiVenturesService {
  private model: ChatOllama;

  private readonly DOCUMENT_KIT = [
    { type: 'EXECUTIVE_SUMMARY', prompt: "Rédige un résumé exécutif d'une page." },
    { type: 'PITCH_DECK_OUTLINE', prompt: 'Crée une structure de pitch deck de 10 diapositives.' },
    { type: 'MARKET_STRATEGY', prompt: 'Développe une stratégie de mise sur le marché (GTM).' },
    { type: 'LEAN_CANVAS', prompt: 'Complète un Lean Canvas détaillé.' }
  ];

  constructor(
    @InjectRepository(VentureDocument)
    private docRepo: Repository<VentureDocument>,
    private venturesService: VenturesService,
    configService: ConfigService
  ) {
    this.model = new ChatOllama({
      model: 'llama3.2:1b',
      temperature: 0.5,
      baseUrl: configService.get('OLLAMA_BASE_URL')
    });
  }

  @OnEvent('venture.generate-docs')
  async generateDocs(ventureId: string): Promise<VentureDocument[]> {
    const venture = await this.venturesService.findOne(ventureId);
    const inputs = this.DOCUMENT_KIT.map((doc) => ({
      name: venture.name,
      stage: venture.stage,
      sector: venture.sector || 'Général',
      problem: venture.problem_solved,
      market: venture.target_market,
      instruction: doc.prompt
    }));
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a Senior Startup Consultant at CINOLU (Centre d'Innovation de Lubumbashi). 
        Your tone is professional, encouraging, and highly analytical.
        RULES:
        1. Use clean Markdown (Headers, Bullet points, Bold text).
        2. Focus on actionable insights specifically for the {sector} sector.
        3. Keep the language professional.
        4. If the sector is in DR Congo/Africa context, suggest locally relevant strategies.
        5. DO NOT use flowery language; be direct and data-driven.`
      ],
      [
        'human',
        `VENTURE PROFILE:
        - Name: {name}
        - Current Stage: {stage}
        - Problem: {problem}
        - Market: {market}
        TASK: {instruction}
        Write the response in the language of the provided Venture Profile (English or French).`
      ]
    ]);
    const chain = prompt.pipe(this.model);
    const responses = await chain.batch(inputs);
    return await Promise.all(
      responses.map(async (res, index) => {
        return await this.docRepo.save({
          type: this.DOCUMENT_KIT[index].type,
          content: res.content as string,
          venture: { id: ventureId }
        });
      })
    );
  }
}
