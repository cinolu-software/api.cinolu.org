import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Le nom de la catégorie est obligatoire' })
  name: string;
}
