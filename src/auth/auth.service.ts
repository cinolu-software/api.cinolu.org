import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { BadRequestException, Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import UpdateProfileDto from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateWithGoogleDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    try {
      const user = await this.usersService.findByEmail(email);
      await this.verifyPassword(pass, user.password);
      return user;
    } catch {
      throw new NotFoundException('Les identifiants saisis sont invalides');
    }
  }

  async findOrCreate(dto: CreateWithGoogleDto): Promise<User> {
    try {
      return await this.usersService.findOrCreate(dto);
    } catch {
      throw new NotFoundException();
    }
  }

  async signInWithGoogle(@Res() res: Response): Promise<void> {
    return res.redirect(process.env.FRONTEND_URI);
  }

  async signIn(@Req() req: Request): Promise<User> {
    return req.user as User;
  }

  async signOut(@Req() request: Request): Promise<void> {
    request.session.destroy(() => {});
  }

  async verifyToken(token: string): Promise<User> {
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
      return await this.usersService.findOne(payload.sub);
    } catch {
      throw new BadRequestException();
    }
  }

  async verifyPassword(password: string, encrypted: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, encrypted);
    if (!isMatch) throw new BadRequestException();
    return isMatch;
  }

  async generateToken(user: User, expiresIn: string): Promise<string> {
    const payload = { sub: user.id, name: user.name };
    return this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn });
  }

  async profile(user: User): Promise<User> {
    return user;
  }

  async updateProfile(user: User, dto: UpdateProfileDto): Promise<User> {
    return await this.usersService.updateProfile(user, dto);
  }

  async updatePassword(currentUser: User, dto: UpdatePasswordDto): Promise<User> {
    try {
      await this.usersService.updatePassword(currentUser.id, dto.password);
      const user = await this.usersService.findByEmail(currentUser.email);
      return user;
    } catch {
      throw new BadRequestException();
    }
  }

  async forgotPassword(dto: forgotPasswordDto): Promise<void> {
    try {
      const user = await this.usersService.findByEmail(dto.email);
      const token = await this.generateToken(user, '15min');
      const link = process.env.FRONTEND_URI + 'reset-password?token=' + token;
      this.eventEmitter.emit('user.reset-password', { user, link });
    } catch {
      throw new BadRequestException();
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<User> {
    const { token, password } = resetPasswordDto;
    try {
      await this.verifyToken(token);
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
      return await this.usersService.updatePassword(payload.sub, password);
    } catch {
      throw new BadRequestException();
    }
  }
}
