import { Test, TestingModule } from '@nestjs/testing';
import { ItnerariosController } from './itnerarios.controller';

describe('ItnerariosController', () => {
  let controller: ItnerariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItnerariosController],
    }).compile();

    controller = module.get<ItnerariosController>(ItnerariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
