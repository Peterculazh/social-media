export interface ITokenService {
  generateAccessToken(params: {
    userId: string;
    email: string;
    nickname: string;
  }): Promise<string>;
  generateRefreshToken(userId: string): Promise<string>;
  getUserIdFromRefreshToken(token: string): Promise<string | null>;
  revokeRefreshToken(token: string): Promise<void>;
}

export const ITokenService = Symbol('ITokenService');
