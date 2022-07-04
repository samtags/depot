export default function getPath(path: string): string[] {
  let rootKey: string, remainingPath: string;

  // ex:
  // [dot notation]
  // path = "person.friends.name"
  // [bracket notation]
  // path = "person['friends'].name"

  // get the root of the path
  // in the example the root is "person"

  // gets the first delimiter
  // possible delimiter '.' or '[' -- dot or bracket notation
  let delimiter: '.' | '[';

  const useDot = path.split('.');
  const useBracket = path.split('[');

  if (useDot[0].length < useBracket[0].length) delimiter = '.';
  else if (useDot[0].length === useBracket[0].length) delimiter = '.';
  else delimiter = '[';

  if (delimiter === '.') rootKey = useDot[0];
  else rootKey = useBracket[0];

  // get the rest of the path without the root
  if (delimiter === '.') {
    useDot.shift();
    remainingPath = useDot.join('.');
  } else {
    useBracket.shift();
    remainingPath = '[' + useBracket.join('[');
  }

  return [rootKey, remainingPath];
}
