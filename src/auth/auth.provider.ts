import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from './interfaces/token_payload';

@Injectable()
export class AuthProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateHashPassword(password: string) {
    const saltOrRounds = +this.configService.getOrThrow('SALT_OR_ROUNDS');
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }

  async isMatchPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async generateAccessToken(payload: TokenPayload) {
    return await this.jwtService.signAsync(payload);
  }
}
