import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth') // Agrupa no Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login e gera o access_token' })
  @ApiBody({ type: LoginDto })
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
