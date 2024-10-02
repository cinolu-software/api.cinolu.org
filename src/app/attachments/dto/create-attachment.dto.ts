import { IsNotEmpty } from 'class-validator';

export class CreateAttachmentDto {
  @IsNotEmpty({ message: 'Le nom de la pièce jointe est obligatoire' })
  name: string;
}
