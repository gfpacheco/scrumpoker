import { adjectives, animals, uniqueNamesGenerator } from 'unique-names-generator';

const config = {
  dictionaries: [adjectives, animals],
  separator: '-',
};

export default function generateName() {
  return uniqueNamesGenerator(config);
}
