import * as bcrypt from 'bcrypt';
import { cryptConfig } from '../../../common/configs';
import { InvalidUserCreationParamsException } from '../exceptions/InvalidUserCreationParams.exception';
import { v4 as uuidv4 } from 'uuid';

export interface IUserEntityParams {
  id: string;
  email: string;
  nickname: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity {
  private _id: string;
  private _email: string;
  private _nickname: string;
  private _password?: string;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  private constructor({
    id,
    email,
    nickname,
    createdAt,
    updatedAt,
    password,
  }: IUserEntityParams) {
    this._id = id;
    this._email = email;
    this._nickname = nickname;
    this._password = password;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  static async create({
    email,
    nickname,
    password,
  }: {
    email: string;
    nickname: string;
    password: string;
  }): Promise<UserEntity> {
    if (!email || !nickname) {
      throw new InvalidUserCreationParamsException(
        'Email and nickname are required for creating a user.',
      );
    }
    const now = new Date();
    const hashedPassword = await UserEntity.hashPassword(password);
    return new UserEntity({
      id: uuidv4(),
      email,
      nickname,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstruct({
    id,
    email,
    nickname,
    password,
    createdAt,
    updatedAt,
  }: IUserEntityParams): UserEntity {
    if (!id || !email || !nickname) {
      throw new InvalidUserCreationParamsException(
        'Missing parameters for reconstructing user.',
      );
    }
    return new UserEntity({
      id,
      email,
      nickname,
      password,
      createdAt,
      updatedAt,
    });
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
    this._updatedAt = new Date();
  }

  get nickname(): string {
    return this._nickname;
  }

  set nickname(nickname: string) {
    this._nickname = nickname;
    this._updatedAt = new Date();
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  get password(): string {
    return this._password;
  }

  public async setPassword(password: string): Promise<void> {
    this._password = await UserEntity.hashPassword(password);
  }

  private static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, cryptConfig.saltRounds);
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this._password);
  }

  public removeSensitiveData(): void {
    this._password = undefined;
  }
}
