import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign_in.dto';
import { AuthProvider } from './auth.provider';
import { UserRepository } from 'src/db/repositories/user.repository';
import { Validation } from 'src/helper/validation';
import { Wrapper } from 'src/helper/wrapper';
import { SignUpDto } from './dto/sign_up.dto';
import { TokenPayload } from './interfaces/token_payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly authProvider: AuthProvider,
    private readonly userRepository: UserRepository,
    private readonly validation: Validation,
    private readonly wrapper: Wrapper,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    const currUser = await this.userRepository.findByUsername(username);
    if (this.validation.isEmpty(currUser)) {
      throw new UnauthorizedException('Username or password is invalid');
    }

    const isMatchPassword = await this.authProvider.isMatchPassword(
      password,
      currUser.password,
    );
    if (!isMatchPassword) {
      throw new UnauthorizedException('Username or password is invalid');
    }

    const accessToken = await this.authProvider.generateAccessToken({
      id: currUser.id,
      username: currUser.username,
      role: currUser.role,
    });

    return this.wrapper.response(200, accessToken);
  }

  async signUp(signUpDto: SignUpDto, tokenPayload: TokenPayload) {
    const { username, password, role } = signUpDto;
    const usernameAdmin = tokenPayload.username;

    const user = await this.userRepository.findByUsername(username);
    if (!this.validation.isEmpty(user)) {
      throw new BadRequestException('Username already existed');
    }

    const hashedPassword =
      await this.authProvider.generateHashPassword(password);

    const createdUser = await this.userRepository.create({
      username: username,
      password: hashedPassword,
      role: role,
      createdBy: usernameAdmin,
    });

    delete createdUser.password;

    return this.wrapper.response(201, createdUser);
  }
}
