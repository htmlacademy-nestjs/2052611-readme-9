import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { UserService } from '../lib/user/user.service';
import { User } from '../lib/user/user.interface';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly service: UserService) {
		super({ usernameField: USERNAME_FIELD_NAME });
	}

	public async validate(email: string, password: string): Promise<User> {
		return this.service.verify({ email, password })
	}
}