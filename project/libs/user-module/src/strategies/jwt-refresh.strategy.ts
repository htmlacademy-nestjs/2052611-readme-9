import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from 'src/lib/user-config';
import { UserService } from 'src/lib/user/user.service';
import { TokenPayload } from '@project/shared';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		@Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
		private readonly service: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtOptions.refreshTokenSecret,
		});
	}

	public async validate(payload: TokenPayload) {
		return this.service.getUserByEmail(payload.email);
	}
}