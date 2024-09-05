import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { BadRequestException, Injectable, Req, Res } from '@nestjs/common';
import { CurrentUser } from './decorators/user.decorator';
import { SignupDto } from './dto/sign-up.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import { User } from '../../modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../modules/users/users.service';
import { Request, Response } from 'express';
import { EmailService } from 'src/app/core/modules/email/email.service';
import { randomPassword } from 'src/app/core/utils/helpers/random-password';
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

  private async verifyPassword(password: string, encrypted: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, encrypted);
    if (!isMatch) throw new BadRequestException();
    return isMatch;
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, name: user.name };
    return await this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_SECRET') });
  }

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
      const access_token = await this.generateToken(user);
      return { access_token };
    } catch {
      throw new BadRequestException('Les identifiants saisis sont invalides');
    }
  }

  async signInWithGoogle(@Req() req: Request, @Res() res: Response): Promise<void> {
    const access_token = await this.generateToken(req.user as User);
    res.redirect(`${this.configService.get('FRONTEND_URL')}/auth/google?access_token=${access_token}`);
  }

  async profile(@CurrentUser() user: User): Promise<{ data: User }> {
    const { data } = await this.usersService.findOne(user.id);
    return { data };
  }

  async updateProfile(@CurrentUser() currentUser: User, dto: UpdateProfileDto): Promise<{ data: User }> {
    return await this.usersService.updateProfile(currentUser, dto);
  }

  async signUp(dto: SignupDto): Promise<{ data: User }> {
    const { data } = await this.usersService.signUp(dto);
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
