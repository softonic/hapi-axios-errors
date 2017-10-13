# @softonic/hapi-axios-errors

Hapi plugin to convert unhandled axios errors into boom errors

## Installation

```bash
npm install @softonic/hapi-axios-errors
```

## Usage

```js
// CommonJS
// const HapiAxiosErrors = require('@softonic/hapi-axios-errors');

// ES2015
import HapiAxiosErrors from '@softonic/hapi-axios-errors';

server.register([
  HapiAxiosErrors
]);
```

## Testing

Clone the repository and execute:

```bash
npm test
```

## Contribute

1. Fork it: `git clone https://github.com/softonic/hapi-axios-errors.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Check the build: `npm run build`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
