import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';

@Injectable()
export class AiUsersService {
  private model: ChatOllama;

  constructor(
    configService: ConfigService,
    private usersService: UsersService
  ) {
    this.model = new ChatOllama({
      model: 'llama3.2:1b',
      temperature: 0.7,
      baseUrl: configService.get<string>('OLLAMA_BASE_URL')
    });
  }

  async generateJoke(userId: string): Promise<string> {
    const user = await this.usersService.findOne(userId);
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'Tu es un humoriste professionnel. Tu génères des blagues courtes et intelligentes.'],
      [
        'human',
        `
          PROFIL UTILISATEUR :
          - Nom : {name}
          - Biographie : {biography}
          - Ville : {city}
          - Pays : {country}
          - Genre : {gender}
          - Date de naissance : {birth_date}
            TÂCHE : {instruction}
        `
      ]
    ]);
    const chain = prompt.pipe(this.model);
    const response = await chain.invoke([
      {
        name: user.name,
        biography: user?.biography ?? 'aucune biographie',
        phone_number: user?.phone_number ?? 'non renseigné',
        city: user?.city ?? 'une ville inconnue',
        country: user?.country ?? 'un pays mystère',
        gender: user?.gender ?? 'non spécifié',
        birth_date: user?.birth_date ?? 'date inconnue',
        instruction: 'Écris une blague courte en français, sympa et respectueuse.'
      }
    ]);
    return response.content as string;
  }
}
