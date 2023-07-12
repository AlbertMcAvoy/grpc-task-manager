import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './mediaController';
import { MediaService } from './media.service';

describe('AppController', () => {
  let appController: MediaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaService],
    }).compile();

    appController = app.get<MediaController>(MediaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
