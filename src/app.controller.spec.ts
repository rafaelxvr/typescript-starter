import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();
  });

  describe('Health', () => {
    it('should return "Application is Running!"', () => {
      const appController = app.get(AppController);
      expect(appController.health()).toBe('Application is Running!');
    });
  });
});
