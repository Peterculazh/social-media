export { default as development } from './development';
export { default as production } from './production';
export { default as test } from './test';

export interface IRedisConfig {
  host: string;
  port: number;
  db: number;
  password: string;
  keyPrefix: string;
}
