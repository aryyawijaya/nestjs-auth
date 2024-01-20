import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { SignInDto } from './dto/sign_in.dto';
import { TestHelper } from '../helper/random';
import { UserRepository } from '../db/repositories/user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DbModule } from '../db/db.module';
import { HelperModule } from '../helper/helper.module';
import { AuthProvider } from './auth.provider';

describe('AuthService', () => {
  let authService: AuthService;
  let testHelper: TestHelper;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.getOrThrow('JWT_SECRET_KEY'),
            signOptions: {
              expiresIn: configService.getOrThrow('JWT_EXPIRES_IN'),
            },
          }),
        }),
        DbModule,
        HelperModule,
      ],
      providers: [AuthService, AuthProvider],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);

    const configService = moduleRef.get<ConfigService>(ConfigService);
    const jwtService = moduleRef.get<JwtService>(JwtService);
    testHelper = new TestHelper(configService, jwtService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('POST /auth/sign-in', () => {
    it('OK', async () => {
      const passPlain = 'pass123';
      const currUser = testHelper.randUser();
      currUser.password = await testHelper.genPassword(passPlain);

      const signInDto: SignInDto = {
        username: currUser.username,
        password: passPlain,
      };

      jest
        .spyOn(UserRepository.prototype, 'findByUsername')
        .mockImplementation(async () => currUser);

      expect(await authService.signIn(signInDto)).not.toThrow;
    });
  });
});
