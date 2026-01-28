import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';

@Injectable()
export class AiUsersService {
  private model: ChatOllama;

  constructor(private readonly configService: ConfigService) {
    this.model = new ChatOllama({
      model: 'llama3.2:1b',
      temperature: 0.7,
      baseUrl: this.configService.get<string>('OLLAMA_BASE_URL')
    });
  }

  async generateJoke(user: User): Promise<string> {
    console.log(user);
    const inputs = {
      name: user?.name ?? "Quelqu'un",
      biography: user?.biography ?? 'aucune biographie',
      phone_number: user?.phone_number ?? 'non renseigné',
      city: user?.city ?? 'une ville inconnue',
      country: user?.country ?? 'un pays mystère',
      gender: user?.gender ?? 'non spécifié',
      birth_date: user?.birth_date ?? 'date inconnue',
      instruction: 'Generate a joke based on the user profile'
    };
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
          Écris une blague courte en français, sympa et respectueuse.
        `
      ]
    ]);
    const chain = prompt.pipe(this.model);
    const response = await chain.invoke(inputs);
    return response.content as string;
  }
}
