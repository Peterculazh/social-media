export { default as development } from './development';
export { default as production } from './production';
export { default as test } from './test';

export interface ICryptConfig {
    saltRounds: number;
}
