import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';

@Injectable()
export class AiUsersService {
  private model: ChatOllama;

  constructor(configService: ConfigService) {
    this.model = new ChatOllama({
      model: 'llama3.2:1b',
      temperature: 0.7,
      baseUrl: configService.get('OLLAMA_BASE_URL')
    });
  }

  async generateJoke(user: User): Promise<string> {
    const inputs = {
      name: user.name,
      biography: user.biography,
      phone_number: user.phone_number,
      city: user.city,
      country: user.country,
      gender: user.gender,
      birth_date: user.birth_date,
      instruction: "Generate a joke based on the user's profile."
    };
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', `You are a comedian. You are tasked with generating a joke based on the user's profile.`],
      [
        'human',
        `USER PROFILE:
        - Name: {name}
        - Biography: {biography}
        - Phone Number: {phone_number}
        - City: {city}
        - Country: {country}
        - Gender: {gender}
        - Birth Date: {birth_date}
        TASK: {instruction}
        Write the response in French.
        The joke should be short and to the point.`
      ]
    ]);
    const chain = prompt.pipe(this.model);
    return (await chain.invoke(inputs)) as unknown as string;
  }
}
