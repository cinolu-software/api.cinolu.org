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
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateWithGoogleDto } from './dto/sign-up-with-google.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { EVENTS, HTTP_MESSAGES, APP_CONSTANTS } from '../../common/constants/app.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventEmitter: EventEmitter2,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException(HTTP_MESSAGES.INVALID_CREDENTIALS);
    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException(HTTP_MESSAGES.INVALID_CREDENTIALS);
    return user;
  }

  async findOrCreate(dto: CreateWithGoogleDto): Promise<User> {
    try {
      return await this.usersService.findOrCreate(dto);
    } catch {
      throw new BadRequestException(HTTP_MESSAGES.BAD_REQUEST);
    }
  }

  async signInWithGoogle(@Res() res: Response): Promise<void> {
    const frontendUri = this.configService.get<string>('FRONTEND_URI');
    if (!frontendUri) {
      throw new BadRequestException(HTTP_MESSAGES.BAD_REQUEST);
    }
    return res.redirect(frontendUri);
  }

  async signIn(@Req() req: Request): Promise<User> {
    if (!req.user) {
      throw new UnauthorizedException(HTTP_MESSAGES.UNAUTHORIZED);
    }
    return req.user as User;
  }

  async signUp(dto: SignUpDto): Promise<User> {
    try {
      const user = await this.usersService.signUp(dto);
      return user;
    } catch {
      throw new BadRequestException(HTTP_MESSAGES.BAD_REQUEST);
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
      throw new UnauthorizedException(HTTP_MESSAGES.UNAUTHORIZED);
    }
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
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
      throw new BadRequestException(HTTP_MESSAGES.BAD_REQUEST);
    }
  }

  async updatePassword(currentUser: User, dto: UpdatePasswordDto): Promise<User> {
    try {
      await this.usersService.updatePassword(currentUser.id, dto.password);
      return await this.usersService.findByEmail(currentUser.email);
    } catch {
      throw new BadRequestException(HTTP_MESSAGES.BAD_REQUEST);
    }
  }

  async forgotPassword(dto: forgotPasswordDto): Promise<void> {
    try {
      const user = await this.usersService.findByEmail(dto.email);
      const token = await this.generateToken(user, APP_CONSTANTS.TOKEN_EXPIRY.PASSWORD_RESET);
      const frontendUri = this.configService.get<string>('FRONTEND_URI');
      const link = `${frontendUri}/reset-password?token=${token}`;
      this.eventEmitter.emit(EVENTS.PASSWORD_RESET_REQUESTED, { user, link });
    } catch {
      throw new BadRequestException(HTTP_MESSAGES.BAD_REQUEST);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<User> {
    const { token, password } = resetPasswordDto;
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, { secret });
      const user = await this.usersService.updatePassword(payload.sub, password);
      this.eventEmitter.emit(EVENTS.PASSWORD_RESET_COMPLETED, { user });
      return user;
    } catch {
      throw new BadRequestException(HTTP_MESSAGES.BAD_REQUEST);
    }
  }
}
