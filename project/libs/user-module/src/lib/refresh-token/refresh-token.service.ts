import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';
import { RefreshTokenPayload } from '@project/shared';
import { parseTime } from '@project/shared';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenEntity } from './refresh-token.entity';
import { jwtConfig } from '../user-config';

@Injectable()
export class RefreshTokenService {
	constructor(
		private readonly repository: RefreshTokenRepository,
		@Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
	) { }

	public async createRefreshSession(payload: RefreshTokenPayload) {
		const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
		const refreshToken = new RefreshTokenEntity({
			tokenId: payload.tokenId,
			createdAt: new Date(),
			userId: payload.id,
			expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate()
		});

		return this.repository.save(refreshToken);
	}

	public async deleteRefreshSession(tokenId: string): Promise<void> {
		await this.deleteExpiredRefreshTokens();
		await this.repository.deleteByTokenId(tokenId)
	}

	public async isExists(tokenId: string): Promise<boolean> {
		const refreshToken = await this.repository.findByTokenId(tokenId);
		return (refreshToken !== null);
	}

	public async deleteExpiredRefreshTokens() {
		await this.repository.deleteExpiredTokens();
	}
}