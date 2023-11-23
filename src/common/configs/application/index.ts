export { default as development } from './development';
export { default as production } from './production';
export { default as test } from './test';

export interface IApplicationConfig {
  tokens: {
    accessTokenTTL: number | string;
    refreshTokenTTL: number | string;
  };
}
