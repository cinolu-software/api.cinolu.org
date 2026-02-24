export default class CreateUserDto {
  email: string;
  name: string;
  phone_number?: string;
  gender?: string;
  city?: string;
  birth_date?: Date;
  country?: string;
  biography?: string;
  google_image?: string;
  roles?: string[];
}
