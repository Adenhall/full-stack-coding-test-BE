import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private firebaseAuth: FirebaseAuthenticationService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async create(signup: SignUpDto): Promise<User> {
    const { email, name, dateOfBirth, password } = signup;

    const firebaseUser = await this.firebaseAuth.createUser({
      email,
      password,
    });

    const user: User = await this.usersService.create({
      id: firebaseUser.uid,
      email,
      name,
      dateOfBirth: new Date(dateOfBirth),
    });

    return user;
  }

  async login(idToken: string) {
    const firebaseUser = await this.firebaseAuth.verifyIdToken(idToken);

    if (firebaseUser) {
      const user = await this.usersService.findOne(firebaseUser.uid);
      const payload = { email: user.email, id: user.id, role: user.role };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException();
  }
}
