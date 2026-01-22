import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { BadRequestException, Injectable, UnauthorizedException, Req, Res } from '@nestjs/common';
import UpdateProfileDto from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { User } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { CreateWithGoogleDto } from './dto/sign-up-with-google.dto';
import { SignUpDto } from './dto/sign-up.dto';
// import { EVENTS } from '../../shared/constants/app.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Les identifiants saisis sont invalides');
    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Les identifiants saisis sont invalides');
    return user;
  }

  async findOrCreate(dto: CreateWithGoogleDto): Promise<User> {
    try {
      return await this.usersService.findOrCreate(dto);
    } catch {
      throw new BadRequestException('Requête invalide');
    }
  }

  async signInWithGoogle(@Res() res: Response): Promise<void> {
    const frontendUri = this.configService.get<string>('FRONTEND_URI');
    if (!frontendUri) {
      throw new BadRequestException('Requête invalide');
    }
    return res.redirect(frontendUri);
  }

  async signIn(@Req() req: Request): Promise<User> {
    if (!req.user) {
      throw new UnauthorizedException('Non autorisé');
    }
    return req.user as User;
  }

  async signUp(dto: SignUpDto): Promise<User> {
    try {
      return await this.usersService.signUp(dto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  signOut(@Req() request: Request): void {
    request.session.destroy(() => {});
  }

  async verifyToken(token: string): Promise<User> {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, { secret });
      return await this.usersService.findOne(payload.sub);
    } catch {
      throw new UnauthorizedException('Non autorisé');
    }
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword || '');
  }

  async generateToken(user: User, expiresIn: number | string = '1d'): Promise<string> {
    const secret = this.configService.get<string>('JWT_SECRET');
    const payload = { sub: user.id, name: user.name, email: user.email };
    const options: Record<string, unknown> = { secret };
    options['expiresIn'] = expiresIn;
    return this.jwtService.signAsync(payload, options);
  }

  async profile(user: User): Promise<User> {
    return this.usersService.findByEmail(user.email);
  }

  async updateProfile(user: User, dto: UpdateProfileDto): Promise<User> {
    try {
      return await this.usersService.updateProfile(user, dto);
    } catch {
      throw new BadRequestException('Requête invalide');
    }
  }

  async updatePassword(currentUser: User, dto: UpdatePasswordDto): Promise<User> {
    try {
      await this.usersService.updatePassword(currentUser.id, dto.password);
      return await this.usersService.findByEmail(currentUser.email);
    } catch {
      throw new BadRequestException('Requête invalide');
    }
  }

  async forgotPassword(dto: forgotPasswordDto): Promise<void> {
    try {
      const user = await this.usersService.findByEmail(dto.email);
      const token = await this.generateToken(user, '15m');
      const frontendUri = this.configService.get<string>('FRONTEND_URI');
      const link = `${frontendUri}/reset-password?token=${token}`;
      this.eventEmitter.emit('user.reset-password', { user, link });
    } catch {
      throw new BadRequestException('Requête invalide');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<User> {
    const { token, password } = resetPasswordDto;
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, { secret });
      const user = await this.usersService.updatePassword(payload.sub, password);
      return user;
    } catch {
      throw new BadRequestException('Mot de passe invalide');
    }
  }
}
