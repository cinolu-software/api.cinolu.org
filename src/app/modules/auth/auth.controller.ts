import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { SignupDto } from './dto/sign-up.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User } from '../users/entities/user.entity';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @UseGuards(AuthGuard('local'))
  singIn(@CurrentUser() user: User): Promise<{ access_token: string }> {
    return this.authService.signIn(user);
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('sign-in')
  signInWithGoogle(): void {}

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  googleAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.authService.signInWithGoogle(req, res);
  }

  @Public()
  @Post('sign-up')
  signUp(@Body() data: SignupDto): Promise<{ data: User }> {
    return this.authService.signUp(data);
  }

  @Get('profile')
  profile(@CurrentUser() user: User): Promise<{ data: User } | null> {
    return this.authService.profile(user);
  }

  @Patch('profile')
  updateProfile(@CurrentUser() currentUser: User, @Body() data: UpdateProfileDto): Promise<{ data: User }> {
    return this.authService.updateProfile(currentUser, data);
  }

  @Patch('update-password')
  updatePassword(@CurrentUser() user: User, @Body() dto: UpdatePasswordDto): Promise<{ data: User }> {
    return this.authService.updatePassword(user, dto);
  }

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() dto: forgotPasswordDto): Promise<{ data: User }> {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('resend-token')
  resendToken(@Body() dto: { email: string }): Promise<void> {
    return this.authService.resendToken(dto.email);
  }

  @Public()
  @Post('verify-email')
  verifyUserEmail(@Body() dto: { email: string }): Promise<{ data: User }> {
    return this.authService.verifyUserEmail(dto.email);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto): Promise<{ data: User }> {
    return this.authService.resetPassword(dto);
  }
}
