import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/api/user/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    const decoded = this.jwt.decode(token, null);
    console.log('Decoded token:', decoded);
    return decoded;
  }

  // Get User by User ID we get from decode()
  async validateUser(payload: { id: number; email: string }): Promise<User | undefined> {
    console.log('Validating user in AuthHelper:', payload);
  
    // Use findOne with conditions to find the user by id and email
    const user = await this.repository.findOne({
      where: { id: payload.id, email: payload.email },
    });
  
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  

  // Generate JWT Token
  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  async validate(token: string): Promise<User | undefined> {
    try {
      const decoded = this.jwt.verify(token); // Altere esta linha
      
      if (typeof decoded === 'object' && 'id' in decoded && 'email' in decoded) {
        const user: User = await this.validateUser(decoded as { id: number; email: string });
        return user;
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  
  
}
