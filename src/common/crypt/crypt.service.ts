import { cryptConfig } from '../configs';
import { ICryptService } from '../contracts/i.crypt.service';
import * as bcrypt from 'bcrypt';

export class CryptService implements ICryptService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, cryptConfig.saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
