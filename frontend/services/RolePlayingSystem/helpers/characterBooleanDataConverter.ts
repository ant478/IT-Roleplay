import Character from '../Character';
import { ValueOf } from 'ts-essentials';

export type BooleanDataProperty = number; // id

type Instance = object;

interface CharacterInstances {
  [key: string]: Instance;
}

interface Class<T extends Instance> {
  id: number;
  key: string;
  new(character: Character): T;
}

type Classes<T extends Instance> = Class<T>[];

interface ClassesWithKeys<T extends Instance> {
  [key: string]: Class<T>;
}

export function getInstances<Instances extends CharacterInstances>(character: Character, classIds: BooleanDataProperty[], classes: Classes<ValueOf<Instances>>): Instances {
  return classIds.reduce(
    (instances, classId) => {
      const InstanceClass = classes.find(({ id }) => id === classId);

      if (!InstanceClass) {
        throw new Error(`Unknown class id:${classId}`);
      }

      return {
        ...instances,
        [InstanceClass.key]: new InstanceClass(character),
      };
    },
    {} as Instances,
  );
}

export function getBooleanData<Instances extends CharacterInstances>(instances: Instances, classesWithKeys: ClassesWithKeys<ValueOf<Instances>>): BooleanDataProperty[] {
  return Object.keys(instances).reduce(
    (ids, classKey) => {
      const InstanceClass = classesWithKeys[classKey];

      if (!InstanceClass) {
        throw new Error(`Unknown class ${classKey}`);
      }

      return [...ids, InstanceClass.id];
    },
    [] as BooleanDataProperty[],
  );
}
