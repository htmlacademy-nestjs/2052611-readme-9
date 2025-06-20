import { TokenPayload } from '@project/shared';

export interface RequestWithTokenPayload {
	user?: TokenPayload
}