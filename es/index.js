import packageJSON from '../package.json';

/**
 * Reformats a Boom error that wraps an Axios error so it has the underlying status code
 * @param  {boom.Error} error
 */
function normalizeAxiosError(error) {
  const axiosStatusCode = error.response && error.response.status;

  if (axiosStatusCode) {
    // eslint-disable-next-line no-param-reassign
    error.output.statusCode = axiosStatusCode;
    error.reformat();
  }
}

/**
 * Hapi plugin to convert unhandled Axios errors into Boom errors
 * @type {Object}
 */
const HapiAxiosErrors = {
  /**
   * @param  {hapi.Server}  server
   * @param  {Object}       options
   * @param  {Function}     next
   */
  register(server, options, next) {
    /**
     * Error handling
     */
    server.ext('onPreResponse', (request, reply) => {
      const { response } = request;

      if (response && response.isBoom) {
        normalizeAxiosError(response);
      }

      return reply.continue();
    });

    next();
  },
};

HapiAxiosErrors.register.attributes = {
  pkg: packageJSON,
};

export default HapiAxiosErrors;
