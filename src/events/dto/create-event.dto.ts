import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { EventType } from '../utils/event-type.enum';

export class CreateEventDto {
  @IsNotEmpty({ message: "'Le nom de l'évémement est obligatoire'" })
  name: string;

  @IsNotEmpty({ message: "La description de l'évémement est obligatoire" })
  description: string;

  @IsNotEmpty({ message: 'Le nombre des participants est obligatoire' })
  attendees: number;

  @IsEnum(EventType)
  event_type: EventType;

  @ValidateIf((e) => e.eventType === 'physical')
  @IsString()
  location: string;

  @IsOptional()
  online_link: string;

  @IsNotEmpty({ message: "'La date de début de l'évémement est obligatoire'" })
  started_at: Date;

  @IsNotEmpty({ message: "La date de fin de l'évémement est obligatoire'" })
  ended_at: Date;

  @IsNotEmpty({ message: 'Le responsable est obligatoire' })
  responsible: string;

  @IsArray({ message: 'Le type est obligatoire' })
  types: string[];
}
