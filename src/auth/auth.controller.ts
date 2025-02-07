import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import UpdateProfileDto from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Auth } from '../shared/decorators/auth.decorators';
import { CurrentUser } from '../shared/decorators/user.decorator';
import { RoleEnum } from '../shared/enums/roles.enum';
import { User } from '../users/entities/user.entity';

@Controller('auth')
@Auth(RoleEnum.User)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @Auth(RoleEnum.Guest)
  @UseGuards(LocalAuthGuard)
  singIn(@Req() req: Request): Promise<Express.User> {
    return this.authService.signIn(req);
  }

  @Get('sign-in')
  @Auth(RoleEnum.Guest)
  @UseGuards(GoogleAuthGuard)
  signInWithGoogle(): void {}

  @Get('google/redirect')
  @Auth(RoleEnum.Guest)
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Res() res: Response): Promise<void> {
    return this.authService.signInWithGoogle(res);
  }

  @Post('sign-out')
  signOut(@Req() req: Request) {
    return this.authService.signOut(req);
  }

  @Get('profile')
  profile(@CurrentUser() user: User): Promise<User> {
    return this.authService.profile(user);
  }

  @Patch('profile')
  @Auth(RoleEnum.User)
  updateProfile(@CurrentUser() currentUser: User, @Body() dto: UpdateProfileDto): Promise<User> {
    return this.authService.updateProfile(currentUser, dto);
  }

  @Patch('update-password')
  @Auth(RoleEnum.User)
  updatePassword(@CurrentUser() user: User, @Body() dto: UpdatePasswordDto): Promise<User> {
    return this.authService.updatePassword(user, dto);
  }

  @Post('forgot-password')
  @Auth(RoleEnum.Guest)
  forgotPassword(@Body() dto: forgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @Auth(RoleEnum.Guest)
  resetPassword(@Body() dto: ResetPasswordDto): Promise<User> {
    return this.authService.resetPassword(dto);
  }
}
