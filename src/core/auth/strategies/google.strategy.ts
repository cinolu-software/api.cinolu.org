import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateWithGoogleDto } from '../dto/sign-up-with-google.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    configService: ConfigService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      callbackURL: configService.get('GOOGLE_REDIRECT_URI'),
      scope: ['email', 'profile']
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) {
    const { emails, name, photos } = profile;
    const userDto: CreateWithGoogleDto = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      google_image: photos[0].value
    };
    const user = await this.authService.findOrCreate(userDto);
    done(null, user);
  }
}
