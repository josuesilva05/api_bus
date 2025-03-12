import { Test, TestingModule } from '@nestjs/testing';
import { LinhasController } from './linhas.controller';

describe('LinhasController', () => {
  let controller: LinhasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinhasController],
    }).compile();

    controller = module.get<LinhasController>(LinhasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
