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
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  singIn(@Req() req: Request) {
    return this.authService.signIn(req);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('sign-in')
  signInWithGoogle(): void {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  googleAuthRedirect(@Res() res: Response): Promise<void> {
    return this.authService.signInWithGoogle(res);
  }

  @Public()
  @Post('sign-up')
  signUp(@Body() data: SignupDto): Promise<{ data: User }> {
    return this.authService.signUp(data);
  }

  @Post('sign-out')
  signOut(@Req() req: Request) {
    return this.authService.signOut(req);
  }

  @Get('profile')
  profile(@CurrentUser() user: User): Promise<{ data: User }> {
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
  forgotPassword(@Body() dto: forgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('verify-email/resend-token')
  resendSignupToken(@Body() dto: { email: string }): Promise<void> {
    return this.authService.resendToken(dto.email, 'verify-email');
  }

  @Public()
  @Post('reset-password/resend-token')
  resendResetPasswordToken(@Body() dto: { email: string }): Promise<void> {
    return this.authService.resendToken(dto.email, 'reset-password');
  }

  @Public()
  @Post('verify-email')
  verifyUserEmail(@Body() dto: { token: string }): Promise<{ data: User }> {
    return this.authService.verifyEmail(dto.token);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto): Promise<{ data: User }> {
    return this.authService.resetPassword(dto);
  }
}
