import { ICryptConfig } from './crypt';
import * as redisConfigs from './redis';
import { IRedisConfig } from './redis';
import * as cryptConfigs from './crypt';
import { IApplicationConfig } from './application';
import * as applicationConfigs from './application';

export const redisConfig: IRedisConfig = {
    ...redisConfigs[process.env.NODE_ENV],
};

export const cryptConfig: ICryptConfig = {
    ...cryptConfigs[process.env.NODE_ENV],
};

export const applicationConfig: IApplicationConfig = {
    ...applicationConfigs[process.env.NODE_ENV],
};
