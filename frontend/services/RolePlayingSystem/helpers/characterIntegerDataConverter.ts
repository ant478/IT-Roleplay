import Character from '../Character';
import { ValueOf } from 'ts-essentials';

export interface IntegerDataProperty {
  id: number;
  value: number;
}

interface Instance {
  getDataValue: () => number;
}

interface CharacterInstances {
  [key: string]: Instance;
}

interface Class<T extends Instance> {
  id: number;
  key: string;
  new(character: Character, value: number): T;
}

interface ClassesWithKeys<T extends Instance> {
  [key: string]: Class<T>;
}

export function getInstances<Instances extends CharacterInstances>(character: Character, integerData: IntegerDataProperty[], classes: ClassesWithKeys<ValueOf<Instances>>): Instances {
  return integerData.reduce(
    (instances, integerDataProperty) => {
      const InstanceClass = Object.values(classes).find(({ id }) => integerDataProperty.id === id);

      if (!InstanceClass) {
        throw new Error(`Unknown class id:${integerDataProperty.id}`);
      }

      return {
        ...instances,
        [InstanceClass.key]: new InstanceClass(character, integerDataProperty.value),
      };
    },
    {} as Instances,
  );
}

export function getIntegerData<Instances extends CharacterInstances>(instances: Instances, classes: ClassesWithKeys<ValueOf<Instances>>): IntegerDataProperty[] {
  return Object.entries(instances).reduce(
    (integerData, [classKey, instance]) => {
      const InstanceClass = classes[classKey];

      if (!InstanceClass) {
        throw new Error(`Unknown class ${classKey}`);
      }

      const integerDataProperty = {
        id: InstanceClass.id,
        value: instance.getDataValue(),
      };

      return [...integerData, integerDataProperty];
    },
    [] as IntegerDataProperty[],
  );
}
