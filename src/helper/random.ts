import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from 'src/auth/interfaces/token_payload';

export class TestHelper {
  private chars: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }

  public randString(length: number): string {
    let result = '';
    const charactersLength = this.chars.length;
    for (let i = 0; i < length; i++) {
      result += this.chars.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  public randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public randUser(): User {
    return {
      id: this.randInt(1, 100),
      username: this.randString(5),
      password: this.randString(5),
      role: Role.STAFF,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: this.randString(5),
    };
  }

  public async genPassword(passPlain: string): Promise<string> {
    const saltOrRounds = +this.configService.getOrThrow('SALT_OR_ROUNDS');
    const hash = await bcrypt.hash(passPlain, saltOrRounds);

    return hash;
  }
}
