import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import UpdateProfileDto from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @Public()
  signUp(@Body() dto: SignUpDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  @Public()
  @UseGuards(LocalAuthGuard)
  singIn(@Req() req: Request): Promise<User> {
    return this.authService.signIn(req);
  }

  @Get('sign-in')
  @Public()
  @UseGuards(GoogleAuthGuard)
  signInWithGoogle(): void {}

  @Get('google/redirect')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Res() res: Response): Promise<void> {
    return this.authService.signInWithGoogle(res);
  }

  @Get('admin/google/redirect')
  @Public()
  @UseGuards(GoogleAuthGuard)
  adminGoogleAuthRedirect(@Res() res: Response): Promise<void> {
    return this.authService.adminSignInWithGoogle(res);
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
  updateProfile(@CurrentUser() user: User, @Body() dto: UpdateProfileDto): Promise<User> {
    return this.authService.updateProfile(user, dto);
  }

  @Patch('update-password')
  updatePassword(@CurrentUser() user: User, @Body() dto: UpdatePasswordDto): Promise<User> {
    return this.authService.updatePassword(user, dto);
  }

  @Post('forgot-password')
  @Public()
  forgotPassword(@Body() dto: forgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @Public()
  resetPassword(@Body() dto: ResetPasswordDto): Promise<User> {
    return this.authService.resetPassword(dto);
  }
}
