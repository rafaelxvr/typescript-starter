import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDTO } from './dtos/user.dto';
import { User } from './interfaces/user.interface';
import { UserAvatar } from './interfaces/avatar.interface';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService]
    }).compile();

    service = moduleRef.get<UserService>(UserService);
  });

  describe('findUserById', () => {
    it('should return a user by ID', async () => {
      const user: User = { id: '1', email: 'test@gmail.com', first_name: 'John', last_name: 'Doe', avatar: 'https://link.com' };
      jest.spyOn(service, 'find').mockResolvedValue(user);

      const result = await controller.findUserById('1');

      expect(result).toBe(user);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const userDTO: UserDTO = { email: 'test@gmail.com', first_name: 'John', last_name: 'Doe', avatar: 'file.jpg' };
      const user: User = { id: '1', email: 'test@gmail.com', first_name: 'John', last_name: 'Doe', avatar: 'https://link.com' };
      jest.spyOn(service, 'create').mockResolvedValue(user);

      const result = await controller.createUser(userDTO);

      expect(result).toBe(user);
    });
  });

  describe('deleteAvatarByUserId', () => {
    it('should delete an avatar by user ID', async () => {
      const userAvatar: UserAvatar = { userId: '1', hash: '123456', fileName: 'test.jpg' };
      jest.spyOn(service, 'delete').mockResolvedValue(userAvatar);

      const result = await controller.deleteAvatarByUserId('1');

      expect(result).toBe(userAvatar);
    });
  });

  describe('findAvatarByUserId', () => {
    it('should return an avatar URL by user ID', async () => {
      const avatarUrl = 'http://example.com/avatar.jpg';
      jest.spyOn(service, 'findAvatarByUserId').mockResolvedValue(avatarUrl);

      const result = await controller.findAvatarByUserId('1');

      expect(result).toBe(avatarUrl);
    });
  });
});
