'use strict';

const Hapi = require('hapi');
const path = require('path');

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.file(path.join(__dirname, 'public', 'index1.html'));
    }
  });

  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, 'public')
      }
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
