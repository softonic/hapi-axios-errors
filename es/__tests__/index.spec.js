import hapi from 'hapi';
import HapiAxiosErrors from '../index';

function createServerWithPlugin(options) {
  const server = new hapi.Server();

  server.register({
    plugin: HapiAxiosErrors,
    options,
  });
  return { server };
}

describe('HapiAxiosErrors', () => {
  it('should be a Hapi plugin', () => {
    expect(HapiAxiosErrors.register).toBeInstanceOf(Function);
    expect(HapiAxiosErrors.pkg.name).toBe('@softonic/hapi-axios-errors');
  });

  describe('when it is registered', () => {
    it('should ignore non-error responses', async () => {
      const { server } = createServerWithPlugin();

      server.route({
        method: 'GET',
        path: '/',
        handler: () => 'ok',
      });

      const response = await server.inject({
        method: 'GET',
        url: '/',
      });

      expect(response.statusCode).toBe(200);
      expect(response.result).toBe('ok');
    });

    it('should ignore non-axios responses', async () => {
      const { server } = createServerWithPlugin();

      server.route({
        method: 'GET',
        path: '/error',
        handler: () => new Error('foo'),
      });

      const notFoundResponse = await server.inject({
        method: 'GET',
        url: '/notFound',
      });
      expect(notFoundResponse.statusCode).toBe(404);

      const errorResponse = await server.inject({
        method: 'GET',
        url: '/error',
      });
      expect(errorResponse.statusCode).toBe(500);
    });

    it('should propagate axios error status codes', async () => {
      const { server } = createServerWithPlugin();

      server.route({
        method: 'GET',
        path: '/',
        handler: () => {
          const axiosError = new Error('Axios error');
          axiosError.response = {
            status: 400,
          };
          return axiosError;
        },
      });

      const response = await server.inject({
        method: 'GET',
        url: '/',
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
