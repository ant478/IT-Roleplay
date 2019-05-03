import Character from '../Character';
import JavaScript1 from './classes/JavaScript1';
import JavaScript2 from './classes/JavaScript2';
import JavaScript3 from './classes/JavaScript3';
import JavaScript4 from './classes/JavaScript4';
import JavaScript5 from './classes/JavaScript5';
import HTML1 from './classes/HTML1';
import HTML2 from './classes/HTML2';
import HTML3 from './classes/HTML3';
import CSS1 from './classes/CSS1';
import CSS2 from './classes/CSS2';
import CSS3 from './classes/CSS3';
import { getInstances, getBooleanData, BooleanDataProperty } from '../helpers/characterBooleanDataConverter';

type TechnologyKeyName = 'javaScript1' | 'javaScript2' | 'javaScript3' | 'javaScript4' | 'javaScript5' |
  'HTML1' | 'HTML2' | 'HTML3' |
  'CSS1' | 'CSS2' | 'CSS3';

export type TechnologyKey = 'JavaScript1' | 'JavaScript2' | 'JavaScript3' | 'JavaScript4' | 'JavaScript5' |
  'HTML1' | 'HTML2' | 'HTML3' |
  'CSS1' | 'CSS2' | 'CSS3';

export const technologyKeys: Record<TechnologyKeyName, TechnologyKey> = {
  javaScript1: 'JavaScript1',
  javaScript2: 'JavaScript2',
  javaScript3: 'JavaScript3',
  javaScript4: 'JavaScript4',
  javaScript5: 'JavaScript5',
  HTML1: 'HTML1',
  HTML2: 'HTML2',
  HTML3: 'HTML3',
  CSS1: 'CSS1',
  CSS2: 'CSS2',
  CSS3: 'CSS3',
};

type technologyTagNames = 'javaScript' | 'frontend' | 'CSS' | 'HTML';
export type TechnologyTag = 'JavaScript' | 'Frontend' | 'CSS' | 'HTML';

export const technologyTags: Record<technologyTagNames, TechnologyTag> = {
  javaScript: 'JavaScript',
  frontend: 'Frontend',
  HTML: 'HTML',
  CSS: 'CSS',
};

type technologyGroupNames = 'frontend' | 'backend';
export type TechnologyGroup = 'Frontend' | 'Backend';

export const technologyGroups: Record<technologyGroupNames, TechnologyGroup> = {
  frontend: 'Frontend',
  backend: 'Backend',
};

export const technologyClasses = [
  JavaScript1, JavaScript2, JavaScript3, JavaScript4, JavaScript5,
  HTML1, HTML2, HTML3,
  CSS1, CSS2, CSS3,
];

export type TechnologyClass = typeof technologyClasses[0];

export const technologyClassesWithKeys = technologyClasses.reduce(
  (acc, Class) => ({ ...acc, [Class.key]: Class }),
  {} as Record<TechnologyKey, TechnologyClass>,
);

export type Technology = JavaScript1 | JavaScript2 | JavaScript3 | JavaScript4 | JavaScript5 |
  HTML1 | HTML2 | HTML3 |
  CSS1 | CSS2 | CSS3;

export type Technologies = Record<TechnologyKey, Technology>;

export function getTechnologies(character: Character, ids: BooleanDataProperty[]): Technologies {
  return getInstances<Technologies>(character, ids, technologyClasses);
}

export function getTechnologiesData(technologies: Technologies): BooleanDataProperty[] {
  return getBooleanData<Technologies>(technologies, technologyClassesWithKeys);
}
