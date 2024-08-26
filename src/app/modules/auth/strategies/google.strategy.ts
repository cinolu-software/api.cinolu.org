import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateWithGoogleDto } from '../../users/dto/create-with-google.dto';
import { UsersService } from '../../users/users.service';

export interface IProfile {
  emails: { value: string }[];
  name: { givenName: string; familyName: string };
  photos: { value: string }[];
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly userService: UsersService,
    readonly configService: ConfigService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      callbackURL: configService.get('GOOGLE_REDIRECT_URI'),
      scope: ['email', 'profile']
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: IProfile, done: VerifyCallback) {
    const { emails, name, photos } = profile;
    const userDto: CreateWithGoogleDto = {
      email: emails[0].value,
      first_name: name.givenName,
      last_name: name.familyName,
      name: `${name.givenName} ${name.familyName}`,
      google_image: photos[0].value
    };
    const { data: user } = await this.userService.findOrCreate(userDto);
    done(null, user);
  }
}
