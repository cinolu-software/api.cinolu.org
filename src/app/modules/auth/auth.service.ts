import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { CurrentUser } from './decorators/user.decorator';
import { SignupDto } from './dto/sign-up.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { EmailService } from 'src/app/shared/modules/email/email.service';
import { randomPassword } from 'src/app/shared/utils/helpers/random-password';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(email: string, pass: string): Promise<{ data: User }> {
    try {
      const { data: user } = await this.usersService.findBy('email', email);
      const { password, ...result } = user;
      await this.verifyPassword(pass, password);
      return { data: result as User };
    } catch {
      throw new BadRequestException('Les identifiants saisis sont invalides');
    }
  }

  async signIn(@CurrentUser() user: User): Promise<{ access_token: string }> {
    try {
      const payload = { sub: user.id, name: user.name };
      const access_token = await this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_SECRET') });
      return { access_token };
    } catch {
      throw new BadRequestException('Les identifiants saisis sont invalides');
    }
  }

  private async verifyPassword(password: string, encrypted: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, encrypted);
    if (!isMatch) throw new BadRequestException();
    return isMatch;
  }

  async signInWithGoogle(@Res() res: Response): Promise<void> {
    return res.redirect(process.env.FRONTEND_URI);
  }

  async profile(@CurrentUser() user: User): Promise<{ data: User }> {
    const { data } = await this.usersService.findOne(user.id);
    return { data };
  }

  async updateProfile(@CurrentUser() currentUser: User, dto: UpdateProfileDto): Promise<{ data: User }> {
    return await this.usersService.updateProfile(currentUser, dto);
  }

  async register(registerDto: SignupDto): Promise<{ data: User }> {
    const { data } = await this.usersService.register(registerDto);
    return { data };
  }

  async updatePassword(@CurrentUser() user: User, dto: UpdatePasswordDto): Promise<{ data: User }> {
    try {
      await this.verifyPassword(dto.old_password, user.password);
      await this.usersService.updatePassword(user.id, dto.password);
      return { data: user };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du mot de passe');
    }
  }

  async forgotPassword(dto: forgotPasswordDto): Promise<{ data: User }> {
    try {
      const { data: user } = await this.usersService.findBy('email', dto.email);
      const token = randomPassword();
      await this.usersService.update(user.id, { token });
      await this.emailService.sendResetPasswordEmail(user, token);
      return { data: user };
    } catch {
      throw new BadRequestException('Erreur lors de la réinitialisation du mot de passe');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ data: User }> {
    const { token, password } = resetPasswordDto;
    const { data } = await this.usersService.findByResetToken(token);
    try {
      await this.usersService.updatePassword(data.id, password);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la réinitialisation du mot de passe');
    }
  }
}
