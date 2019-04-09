import Character from '../Character';
import Strength from './classes/Strength';
import Dexterity from './classes/Dexterity';
import Endurance from './classes/Endurance';
import Intelligence from './classes/Intelligence';
import Wisdom from './classes/Wisdom';
import Charisma from './classes/Charisma';
import { getInstances, getIntegerData, IntegerDataProperty } from '../helpers/characterIntegerDataConverter';
import getDefaultInstances from '../helpers/defaultInstancesHelper';

const attributeClasses = [Strength, Dexterity, Endurance, Intelligence, Wisdom, Charisma];
type AttributeKeyName = 'strength' | 'dexterity' | 'endurance' | 'intelligence' | 'wisdom' | 'charisma';

export const attributeKeys: Record<AttributeKeyName, AttributeKey> = {
  strength: 'STR',
  dexterity: 'DEX',
  endurance: 'END',
  intelligence: 'INT',
  wisdom: 'WIS',
  charisma: 'CHA',
};

export const attributeClassesWithKeys = attributeClasses.reduce(
  (acc, Class) => ({ ...acc, [Class.key]: Class }),
  {} as Record<AttributeKey, AttributeClass>,
);

export type AttributeKey = 'STR' | 'DEX' | 'END' | 'INT' | 'WIS' | 'CHA';
export type Attribute = Strength | Dexterity | Endurance | Intelligence | Wisdom | Charisma;
export type Attributes = Record<AttributeKey, Attribute>;
export type AttributeClass = typeof attributeClasses[0];

export function getAttributes(character: Character, attributesData: IntegerDataProperty[]): Attributes {
  return getInstances<Attributes>(character, attributesData, attributeClassesWithKeys);
}

export function getAttributesData(attributes: Attributes): IntegerDataProperty[] {
  return getIntegerData<Attributes>(attributes, attributeClassesWithKeys);
}

export function getDefaultAttributes(character: Character): Attributes {
  return getDefaultInstances<Attributes>(character, attributeClassesWithKeys);
}
