import { ICryptConfig } from ".";

const cryptConfig: ICryptConfig = {
    saltRounds: parseInt(process.env.SALT_ROUNDS),
}

export default cryptConfig;
