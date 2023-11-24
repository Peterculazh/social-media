import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ICryptService } from '../../contracts/i.crypt.service';
import { CryptService } from '../crypt.service';

describe('CryptService', () => {
    let service: ICryptService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: ICryptService,
                    useClass: CryptService,
                },
            ],
        }).compile();

        service = module.get<ICryptService>(ICryptService);
    });

    it('Should be defined', () => {
        expect(service).toBeDefined();
    });

    it(`Should salt password`, async () => {
        const password = `password`;
        const hashedPassword = await service.hashPassword(password);
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual(password);
    });

    it(`Should compare password`, async () => {
        const password = `password`;
        const hashedPassword = await service.hashPassword(password);
        const isMatched = await service.comparePassword(
            password,
            hashedPassword,
        );
        expect(isMatched).toBeTruthy();
    });
});
