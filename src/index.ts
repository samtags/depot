import Redis from 'ioredis';
import getPath from 'utils/getPath';

const redis = new Redis();

const depot = {
  // authenticate(token: string) {},

  async get(path: string) {
    const [key, nestedPath] = getPath(path);
    // accessing array in nested JSON
    // JSON.get <key> .<nestedKey>[0]

    if (nestedPath) {
      return JSON.parse(
        // @ts-ignore
        await redis.call('JSON.GET', key, `$.${nestedPath}`)
      )?.[0];
    }

    // get syntax
    // JSON.get <key> .<nestedKey> -- '.' means root

    // @ts-ignore
    return JSON.parse(await redis.call('JSON.GET', key));
  },

  async set(path: string, value?: any) {
    const [key, nestedPath] = getPath(path);

    // set nested
    // JSON.SET <key> $.name "\"Facti Uie\""
    if (nestedPath)
      return await redis.call(
        'JSON.SET',
        key,
        `$.${nestedPath}`,
        // @ts-ignore
        JSON.stringify(value)
      );

    // set syntax
    // JSON.SET <key> $ '{"name":"Leonard Cohen","lastSeen":1478476800,"loggedOut": true}'

    // @ts-ignore
    return await redis.call('JSON.SET', key, '$', JSON.stringify(value));
  },
};

export default depot;

// Client usage:

// AUTHENTICATE CLIENT
// depot.authenticate("TOKEN")

// RETRIEVE
// depot.get('doc.path.key');

// CREATE / UPDATE
// depot.set('doc', 'path.key', true);

// DELETE
// depot.del('doc', 'path.key');
