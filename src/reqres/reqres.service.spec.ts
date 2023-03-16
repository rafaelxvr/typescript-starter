import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ReqresService } from './reqres.service';
import { AxiosResponse, AxiosRequestHeaders } from 'axios';
import { of } from 'rxjs';

describe('ReqresService', () => {
  let service: ReqresService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReqresService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<ReqresService>(ReqresService);
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const userId = 1;
      const user = {
        id: userId,
        email: 'george.bluth@reqres.in',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://reqres.in/img/faces/1-image.jpg'
      };
      const axiosResponse: AxiosResponse = {
        data: {
          data: user
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          url: 'https://example.com/api',
          method: 'GET',
          params: {
            id: '123',
            name: 'John Doe'
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
          } as AxiosRequestHeaders,
          data: {
            message: 'Hello, world!'
          }
        }
      };
      jest.spyOn(httpService, 'get').mockReturnValue(of(axiosResponse));

      const result = await service.getUser(userId);

      expect(result).toEqual(user);
      expect(httpService.get).toHaveBeenCalled();
    });
  });
});
