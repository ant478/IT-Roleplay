import Character from '../Character';
import { ValueOf } from 'ts-essentials';

interface Instance {
  getDataValue: () => number;
}

interface CharacterInstances {
  [key: string]: Instance;
}

interface Class<T extends Instance> {
  id: number;
  key: string;
  new(character: Character, value?: number): T;
}

interface ClassesWithKeys<T extends Instance> {
  [key: string]: Class<T>;
}

export default function getDefaultAttributes<Instances extends CharacterInstances>(character: Character, classesWithKeys: ClassesWithKeys<ValueOf<Instances>>): Instances {
  return Object.entries(classesWithKeys).reduce(
    (defaultAttributes, [classKey, InstanceClass]) => {
      return {
        ...defaultAttributes,
        [classKey]: new InstanceClass(character),
      };
    },
    {} as Instances,
  );
}
