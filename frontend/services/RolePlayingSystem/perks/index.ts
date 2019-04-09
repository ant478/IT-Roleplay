import Character from '../Character';
import Algorithms1 from './classes/Algorithms1';
import Algorithms2 from './classes/Algorithms2';
import Algorithms3 from './classes/Algorithms3';
import Patterns1 from './classes/Patterns1';
import Patterns2 from './classes/Patterns2';
import Patterns3 from './classes/Patterns3';
import Review1 from './classes/Review1';
import Review2 from './classes/Review2';
import Review3 from './classes/Review3';
import { getInstances, getBooleanData, BooleanDataProperty } from '../helpers/characterBooleanDataConverter';

type PerkKeyName = 'algorithms1' | 'algorithms2' | 'algorithms3' |
  'patterns1' | 'patterns2' | 'patterns3' |
  'review1' | 'review2' | 'review3';

export type PerkKey = 'Algorithms1' | 'Algorithms2' | 'Algorithms3' |
  'Patterns1' | 'Patterns2' | 'Patterns3' |
  'Review1' | 'Review2' | 'Review3';

export const perkKeys: Record<PerkKeyName, PerkKey> = {
  algorithms1: 'Algorithms1',
  algorithms2: 'Algorithms2',
  algorithms3: 'Algorithms3',
  patterns1: 'Patterns1',
  patterns2: 'Patterns2',
  patterns3: 'Patterns3',
  review1: 'Review1',
  review2: 'Review2',
  review3: 'Review3',
};

type PerkUsageTypeName = 'active' | 'passive';
export type PerkUsageTypeKey = 'Active' | 'Passive';

export const perkUsageTypes: Record<PerkUsageTypeName, PerkUsageTypeKey> = {
  active: 'Active',
  passive: 'Passive',
};

const perkClasses = [
  Algorithms1, Algorithms2, Algorithms3,
  Patterns1, Patterns2, Patterns3,
  Review1, Review2, Review3,
];

export type PerkClass = typeof perkClasses[0];

export const perkClassesWithKeys = perkClasses.reduce(
  (acc, Class) => ({ ...acc, [Class.key]: Class }),
  {} as Record<PerkKey, PerkClass>,
);

export type Perk = Algorithms1 | Algorithms2 | Algorithms3 |
  Patterns1 | Patterns2 | Patterns3 |
  Review1 | Review2 | Review3;

export type Perks = Record<PerkKey, Perk>;

export function getPerks(character: Character, ids: BooleanDataProperty[]): Perks {
  return getInstances<Perks>(character, ids, perkClassesWithKeys);
}

export function getPerksData(perks: Perks): BooleanDataProperty[] {
  return getBooleanData<Perks>(perks, perkClassesWithKeys);
}
