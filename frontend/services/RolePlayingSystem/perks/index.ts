import { getInstances, getBooleanData, BooleanDataProperty } from '../helpers/characterBooleanDataConverter';
import Algorithms1 from './classes/Algorithms1';
import Algorithms2 from './classes/Algorithms2';
import Algorithms3 from './classes/Algorithms3';
import Patterns1 from './classes/Patterns1';
import Patterns2 from './classes/Patterns2';
import Patterns3 from './classes/Patterns3';
import Experience1 from './classes/Experience1';
import Experience2 from './classes/Experience2';
import Experience3 from './classes/Experience3';
import Boldness1 from './classes/Boldness1';
import Boldness2 from './classes/Boldness2';
import Boldness3 from './classes/Boldness3';
import Concentration1 from './classes/Concentration1';
import Concentration2 from './classes/Concentration2';
import Concentration3 from './classes/Concentration3';
import Multitasking1 from './classes/Multitasking1';
import Multitasking2 from './classes/Multitasking2';
import Multitasking3 from './classes/Multitasking3';
import Experiment1 from './classes/Experiment1';
import Experiment2 from './classes/Experiment2';
import Experiment3 from './classes/Experiment3';
import Quality1 from './classes/Quality1';
import Quality2 from './classes/Quality2';
import Quality3 from './classes/Quality3';
import Persistence1 from './classes/Persistence1';
import Persistence2 from './classes/Persistence2';
import Persistence3 from './classes/Persistence3';
import BasicKnowledge1 from './classes/BasicKnowledge1';
import BasicKnowledge2 from './classes/BasicKnowledge2';
import BasicKnowledge3 from './classes/BasicKnowledge3';
import ExactCalculation1 from './classes/ExactCalculation1';
import ExactCalculation2 from './classes/ExactCalculation2';
import ExactCalculation3 from './classes/ExactCalculation3';
import Pride1 from './classes/Pride1';
import Pride2 from './classes/Pride2';
import Pride3 from './classes/Pride3';
import LiveIssue1 from './classes/LiveIssue1';
import LiveIssue2 from './classes/LiveIssue2';
import LiveIssue3 from './classes/LiveIssue3';
import Review1 from './classes/Review1';
import Review2 from './classes/Review2';
import Review3 from './classes/Review3';
import Leadership1 from './classes/Leadership1';
import Leadership2 from './classes/Leadership2';
import Leadership3 from './classes/Leadership3';
import Rethinking1 from './classes/Rethinking1';
import Rethinking2 from './classes/Rethinking2';
import Rethinking3 from './classes/Rethinking3';
import Guesswork1 from './classes/Guesswork1';
import Guesswork2 from './classes/Guesswork2';
import Guesswork3 from './classes/Guesswork3';
import ExperienceExchange1 from './classes/ExperienceExchange1';
import ExperienceExchange2 from './classes/ExperienceExchange2';
import ExperienceExchange3 from './classes/ExperienceExchange3';
import Character from '../Character';

export type PerkKey = 'Algorithms1' | 'Algorithms2' | 'Algorithms3' |
  'Patterns1' | 'Patterns2' | 'Patterns3' |
  'Experience1' | 'Experience2' | 'Experience3' |

  'Boldness1' | 'Boldness2' | 'Boldness3' |
  'Concentration1' | 'Concentration2' | 'Concentration3' |

  'Multitasking1' | 'Multitasking2' | 'Multitasking3' |
  'Experiment1' | 'Experiment2' | 'Experiment3' |

  'Quality1' | 'Quality2' | 'Quality3' |
  'Persistence1' | 'Persistence2' | 'Persistence3' |

  'BasicKnowledge1' | 'BasicKnowledge2' | 'BasicKnowledge3' |
  'ExactCalculation1' | 'ExactCalculation2' | 'ExactCalculation3' |

  'Rethinking1' | 'Rethinking2' | 'Rethinking3' |
  'Guesswork1' | 'Guesswork2' | 'Guesswork3' |

  'ExperienceExchange1' | 'ExperienceExchange2' | 'ExperienceExchange3' |
  'Pride1' | 'Pride2' | 'Pride3' |

  'LiveIssue1' | 'LiveIssue2' | 'LiveIssue3' |
  'Review1' | 'Review2' | 'Review3' |
  'Leadership1' | 'Leadership2' | 'Leadership3';

type PerkUsageTypeName = 'active' | 'passive';
export type PerkUsageTypeKey = 'Active' | 'Passive';

export const perkUsageTypes: Record<PerkUsageTypeName, PerkUsageTypeKey> = {
  active: 'Active',
  passive: 'Passive',
};

export const perkClasses = [
  LiveIssue1, LiveIssue2, LiveIssue3,
  Review1, Review2, Review3,
  Leadership1, Leadership2, Leadership3,

  Algorithms1, Algorithms2, Algorithms3,
  Patterns1, Patterns2, Patterns3,
  Experience1, Experience2, Experience3,

  Boldness1, Boldness2, Boldness3,
  Concentration1, Concentration2, Concentration3,

  Multitasking1, Multitasking2, Multitasking3,
  Experiment1, Experiment2, Experiment3,

  Quality1, Quality2, Quality3,
  Persistence1, Persistence2, Persistence3,

  BasicKnowledge1, BasicKnowledge2, BasicKnowledge3,
  ExactCalculation1, ExactCalculation2, ExactCalculation3,

  Rethinking1, Rethinking2, Rethinking3,
  Guesswork1, Guesswork2, Guesswork3,

  ExperienceExchange1, ExperienceExchange2, ExperienceExchange3,
  Pride1, Pride2, Pride3,
];

export type PerkClass = typeof perkClasses[0];
export type Perk = InstanceType<PerkClass>;
export type Perks = Record<PerkKey, Perk>;

export const perkClassesWithKeys = perkClasses.reduce(
  (acc, Class) => ({ ...acc, [Class.key]: Class }),
  {} as Record<PerkKey, PerkClass>,
);

export function getPerks(character: Character, ids: BooleanDataProperty[]): Perks {
  return getInstances<Perks>(character, ids, perkClasses);
}

export function getPerksData(perks: Perks): BooleanDataProperty[] {
  return getBooleanData<Perks>(perks, perkClassesWithKeys);
}
