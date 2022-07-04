const { default: depot } = require('../dist');

(async () => {
  // set syntax

  // nested
  await depot.set('doc', { path: { key: true } });

  // single
  await depot.set('document', 1);

  // get syntax
  const value = await depot.get('doc.path.key');
  console.log(value);
})();
