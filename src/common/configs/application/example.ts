import { IApplicationConfig } from '.';

const config: IApplicationConfig = {
    tokens: {
        // 1 hour default
        accessTokenTTL: process.env.ACCESS_TOKEN_TTL
            ? parseInt(process.env.ACCESS_TOKEN_TTL)
            : 1,
        // 24 hours default
        refreshTokenTTL: process.env.REFRESH_TOKEN_TTL
            ? parseInt(process.env.REFRESH_TOKEN_TTL)
            : 1,
    },
};

export default config;
