import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { BadRequestException, Injectable, Req, Res } from '@nestjs/common';
import { SignupDto } from './dto/sign-up.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import CreateUserDto from '../users/users/dto/create-user.dto';
import { User } from '../users/users/entities/user.entity';
import { UsersService } from '../users/users/users.service';

@Injectable()
export class AuthService {
  private _jwtSecret = this.configService.get('JWT_SECRET');
  private _frontEndUrl = this.configService.get('FRONTEND_URI');

  constructor(
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, pass: string): Promise<{ data: User }> {
    try {
      const { data } = await this.usersService.getVerifiedUser(email);
      await this.verifyPassword(pass, data.password);
      return { data };
    } catch {
      throw new BadRequestException('Les identifiants saisis sont invalides');
    }
  }

  async signInWithGoogle(@Res() res: Response): Promise<void> {
    return res.redirect(this._frontEndUrl);
  }

  async signIn(@Req() req: Request): Promise<{ data: Express.User }> {
    const data: Express.User = req.user;
    return { data };
  }

  async signOut(@Req() request: Request): Promise<void> {
    request.session.destroy(() => {});
  }

  async signUp(dto: SignupDto): Promise<{ data: User }> {
    try {
      const { data: user } = await this.usersService.signUp(dto);
      const token = await this.generateToken(user, '30min');
      const link = this._frontEndUrl + 'sign-in?token=' + token;
      this.eventEmitter.emit('user.sign-up', { user, link });
      return { data: user };
    } catch {
      throw new BadRequestException("Erreur lors de l'inscription");
    }
  }

  async addUser(dto: CreateUserDto): Promise<{ data: User }> {
    try {
      const { data, password } = await this.usersService.create(dto);
      this.eventEmitter.emit('user.created', { user: data, password });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la création de l'utilisateur");
    }
  }

  async verifyEmail(token: string): Promise<{ data: User }> {
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this._jwtSecret });
      const { data: user } = await this.usersService.findOne(payload.sub);
      const { data } = await this.usersService.verifyEmail(user.email);
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la vérification de l'email");
    }
  }

  async verifyToken(token: string): Promise<{ data: User }> {
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this._jwtSecret });
      const { data } = await this.usersService.findOne(payload.sub);
      return { data };
    } catch {
      throw new BadRequestException('Token invalide');
    }
  }

  async verifyPassword(password: string, encrypted: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, encrypted);
    if (!isMatch) throw new BadRequestException('Les mot de passe ne correspondent pas');
    return isMatch;
  }

  async generateToken(user: User, expiresIn: string): Promise<string> {
    const payload = { sub: user.id, name: user.name };
    return this.jwtService.signAsync(payload, { secret: this._jwtSecret, expiresIn });
  }

  async profile(user: User): Promise<{ data: User }> {
    try {
      const { data } = await this.usersService.getVerifiedUser(user.email);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du profil');
    }
  }

  async updateProfile(user: User, dto: UpdateProfileDto): Promise<{ data: User }> {
    return await this.usersService.updateProfile(user, dto);
  }

  async updatePassword(user: User, dto: UpdatePasswordDto): Promise<{ data: User }> {
    try {
      await this.verifyPassword(dto.old_password, user.password);
      await this.usersService.updatePassword(user.id, dto.password);
      return { data: user };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du mot de passe');
    }
  }

  async forgotPassword(dto: forgotPasswordDto): Promise<void> {
    try {
      const { data: user } = await this.usersService.findByEmail(dto.email);
      const token = await this.generateToken(user, '15min');
      const link = this.configService.get('FRONTEND_URI') + 'reset-password?token=' + token;
      this.eventEmitter.emit('user.reset-password', { user, link });
    } catch {
      throw new BadRequestException('Aucun utilisateur trouvé avec cet email');
    }
  }

  async resendToken(email: string): Promise<void> {
    try {
      const { data: user } = await this.usersService.findByEmail(email);
      const token = await this.generateToken(user, '30min');
      const link = this._frontEndUrl + 'sign-in?token=' + token;
      this.eventEmitter.emit('user.sign-up', { user, link });
    } catch {
      throw new BadRequestException("Erreur lors de l'envoie du token");
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ data: User }> {
    const { token, password } = resetPasswordDto;
    try {
      await this.verifyToken(token);
      const payload = await this.jwtService.verifyAsync(token, { secret: this._jwtSecret });
      const { data } = await this.usersService.updatePassword(payload.sub, password);
      return { data };
    } catch {
      throw new BadRequestException('Le lien de réinitialisation du mot de passe est invalide');
    }
  }
}