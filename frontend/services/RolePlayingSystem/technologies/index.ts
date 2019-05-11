import Character from '../Character';
import JavaScript1 from './classes/JavaScript1';
import JavaScript2 from './classes/JavaScript2';
import JavaScript3 from './classes/JavaScript3';
import JavaScript4 from './classes/JavaScript4';
import JavaScript5 from './classes/JavaScript5';
import Dart1 from './classes/Dart1';
import Dart2 from './classes/Dart2';
import Dart3 from './classes/Dart3';
import TypeScript1 from './classes/TypeScript1';
import TypeScript2 from './classes/TypeScript2';
import TypeScript3 from './classes/TypeScript3';
import CoffeeScript1 from './classes/CoffeeScript1';
import CoffeeScript2 from './classes/CoffeeScript2';
import CoffeeScript3 from './classes/CoffeeScript3';
import ScalaJS1 from './classes/ScalaJS1';
import ScalaJS2 from './classes/ScalaJS2';
import ScalaJS3 from './classes/ScalaJS3';
import HTML1 from './classes/HTML1';
import HTML2 from './classes/HTML2';
import HTML3 from './classes/HTML3';
import HTML4 from './classes/HTML4';
import HAML1 from './classes/HAML1';
import HAML2 from './classes/HAML2';
import Handlebars1 from './classes/Handlebars1';
import Handlebars2 from './classes/Handlebars2';
import CSS1 from './classes/CSS1';
import CSS2 from './classes/CSS2';
import CSS3 from './classes/CSS3';
import CSS4 from './classes/CSS4';
import SASS1 from './classes/SASS1';
import SASS2 from './classes/SASS2';
import LESS1 from './classes/LESS1';
import LESS2 from './classes/LESS2';
import Stylus1 from './classes/Stylus1';
import Stylus2 from './classes/Stylus2';
import PostCSS1 from './classes/PostCSS1';
import PostCSS2 from './classes/PostCSS2';
import VueJS1 from './classes/VueJS1';
import VueJS2 from './classes/VueJS2';
import VueJS3 from './classes/VueJS3';
import AngularJS1 from './classes/AngularJS1';
import AngularJS2 from './classes/AngularJS2';
import AngularJS3 from './classes/AngularJS3';
import React1 from './classes/React1';
import React2 from './classes/React2';
import React3 from './classes/React3';
import EmberJS1 from './classes/EmberJS1';
import EmberJS2 from './classes/EmberJS2';
import EmberJS3 from './classes/EmberJS3';
import BackboneJS1 from './classes/BackboneJS1';
import BackboneJS2 from './classes/BackboneJS2';
import BackboneJS3 from './classes/BackboneJS3';
import KnockoutJS1 from './classes/KnockoutJS1';
import KnockoutJS2 from './classes/KnockoutJS2';
import KnockoutJS3 from './classes/KnockoutJS3';
import Rails1 from './classes/Rails1';
import Rails2 from './classes/Rails2';
import Rails3 from './classes/Rails3';
import Rails4 from './classes/Rails4';
import Rails5 from './classes/Rails5';
import NodeJS1 from './classes/NodeJS1';
import NodeJS2 from './classes/NodeJS2';
import NodeJS3 from './classes/NodeJS3';
import Java1 from './classes/Java1';
import Java2 from './classes/Java2';
import Java3 from './classes/Java3';
import Java4 from './classes/Java4';
import Java5 from './classes/Java5';
import Python1 from './classes/Python1';
import Python2 from './classes/Python2';
import Python3 from './classes/Python3';
import Python4 from './classes/Python4';
import Python5 from './classes/Python5';
import PHP1 from './classes/PHP1';
import PHP2 from './classes/PHP2';
import PHP3 from './classes/PHP3';
import PHP4 from './classes/PHP4';
import PHP5 from './classes/PHP5';
import CPlusPlus1 from './classes/CPlusPlus1';
import CPlusPlus2 from './classes/CPlusPlus2';
import CPlusPlus3 from './classes/CPlusPlus3';
import CPlusPlus4 from './classes/CPlusPlus4';
import CPlusPlus5 from './classes/CPlusPlus5';
import CSharp1 from './classes/CSharp1';
import CSharp2 from './classes/CSharp2';
import CSharp3 from './classes/CSharp3';
import CSharp4 from './classes/CSharp4';
import CSharp5 from './classes/CSharp5';
import MySQL1 from './classes/MySQL1';
import MySQL2 from './classes/MySQL2';
import MySQL3 from './classes/MySQL3';
import MySQL4 from './classes/MySQL4';
import PostgreSQL1 from './classes/PostgreSQL1';
import PostgreSQL2 from './classes/PostgreSQL2';
import PostgreSQL3 from './classes/PostgreSQL3';
import PostgreSQL4 from './classes/PostgreSQL4';
import MongoDB1 from './classes/MongoDB1';
import MongoDB2 from './classes/MongoDB2';
import MongoDB3 from './classes/MongoDB3';
import SQLite1 from './classes/SQLite1';
import SQLite2 from './classes/SQLite2';
import SQLite3 from './classes/SQLite3';
import OracleDatabase1 from './classes/OracleDatabase1';
import OracleDatabase2 from './classes/OracleDatabase2';
import OracleDatabase3 from './classes/OracleDatabase3';
import OracleDatabase4 from './classes/OracleDatabase4';
import Git1 from './classes/Git1';
import Git2 from './classes/Git2';
import Git3 from './classes/Git3';
import SVN1 from './classes/SVN1';
import SVN2 from './classes/SVN2';
import SVN3 from './classes/SVN3';
import Mercurial1 from './classes/Mercurial1';
import Mercurial2 from './classes/Mercurial2';
import Mercurial3 from './classes/Mercurial3';

import { getInstances, getBooleanData, BooleanDataProperty } from '../helpers/characterBooleanDataConverter';

export type TechnologyKey = 'JavaScript1' | 'JavaScript2' | 'JavaScript3' | 'JavaScript4' | 'JavaScript5' |
  'ScalaJS1' | 'ScalaJS2' | 'ScalaJS3' |
  'TypeScript1' | 'TypeScript2' |'TypeScript3' |
  'CoffeeScript1' | 'CoffeeScript2' |'CoffeeScript3' |
  'Dart1' | 'Dart2' |'Dart3' |

  'HTML1' | 'HTML2' | 'HTML3' | 'HTML4' |
  'HAML1' | 'HAML2' |
  'Handlebars1' | 'Handlebars2' |

  'CSS1' | 'CSS2' | 'CSS3' | 'CSS4' |
  'SASS1' | 'SASS2' |
  'LESS1' | 'LESS2' |
  'Stylus1' | 'Stylus2' |
  'PostCSS1' | 'PostCSS2' |

  'VueJS1' | 'VueJS2' | 'VueJS3' |
  'AngularJS1' | 'AngularJS2' | 'AngularJS3' |
  'React1' | 'React2' | 'React3' |
  'EmberJS1' | 'EmberJS2' | 'EmberJS3' |
  'BackboneJS1' | 'BackboneJS2' | 'BackboneJS3' |
  'KnockoutJS1' | 'KnockoutJS2' | 'KnockoutJS3' |

  'Rails1' | 'Rails2' | 'Rails3' | 'Rails4' | 'Rails5' |
  'NodeJS1' | 'NodeJS2' | 'NodeJS3' |
  'Java1' | 'Java2' | 'Java3' | 'Java4' | 'Java5' |
  'Python1' | 'Python2' | 'Python3' | 'Python4' | 'Python5' |
  'PHP1' | 'PHP2' | 'PHP3' | 'PHP4' | 'PHP5' |
  'CPlusPlus1' | 'CPlusPlus2' | 'CPlusPlus3' | 'CPlusPlus4' | 'CPlusPlus5' |
  'CSharp1' | 'CSharp2' | 'CSharp3' | 'CSharp4' | 'CSharp5' |

  'MySQL1' | 'MySQL2' | 'MySQL3' | 'MySQL4' |
  'PostgreSQL1' | 'PostgreSQL2' | 'PostgreSQL3' | 'PostgreSQL4' |
  'MongoDB1' | 'MongoDB2' | 'MongoDB3' |
  'SQLite1' | 'SQLite2' | 'SQLite3' |
  'OracleDatabase1' | 'OracleDatabase2' | 'OracleDatabase3' | 'OracleDatabase4' |

  'Git1' | 'Git2' | 'Git3' |
  'SVN1' | 'SVN2' | 'SVN3' |
  'Mercurial1' | 'Mercurial2' | 'Mercurial3';

export type TechnologyTag = 'JavaScript' | 'Dart' | 'TypeScript' | 'CoffeeScript' | 'ScalaJS' | 'Frontend' | 'Backend' |
  'CSS' | 'HTML' | 'Handlebars' | 'HAML' | 'SASS' | 'LESS' | 'Stylus' | 'PostCSS' |
  'VueJS' | 'AngularJS' | 'React' | 'EmberJS' | 'BackboneJS' | 'KnockoutJS' |
  'Rails' | 'NodeJS' | 'Java' | 'Python' | 'PHP' | 'CPlusPlus' | 'CSharp' |
  'MySQL' | 'PostgreSQL' | 'MongoDB' | 'SQLite' | 'OracleDatabase' |
  'Git' | 'SVN' | 'Mercurial';

type technologyGroupNames = 'frontend' | 'frontendFramework' | 'backend' | 'DBMS' | 'VCS';
export type TechnologyGroup = 'Frontend' | 'FrontendFramework' | 'Backend' | 'DBMS' | 'VCS';

export const technologyGroups: Record<technologyGroupNames, TechnologyGroup> = {
  frontend: 'Frontend',
  frontendFramework: 'FrontendFramework',
  backend: 'Backend',
  DBMS: 'DBMS',
  VCS: 'VCS',
};

export const technologyClasses = [
  JavaScript1, JavaScript2, JavaScript3, JavaScript4, JavaScript5,
  CoffeeScript1, CoffeeScript2, CoffeeScript3,
  Dart1, Dart2, Dart3,
  ScalaJS1, ScalaJS2, ScalaJS3,
  TypeScript1, TypeScript2, TypeScript3,
  HTML1, HTML2, HTML3, HTML4,
  HAML1, HAML2,
  Handlebars1, Handlebars2,
  CSS1, CSS2, CSS3, CSS4,
  SASS1, SASS2,
  LESS1, LESS2,
  Stylus1, Stylus2,
  PostCSS1, PostCSS2,
  VueJS1, VueJS2, VueJS3,
  AngularJS1, AngularJS2, AngularJS3,
  React1, React2, React3,
  EmberJS1, EmberJS2, EmberJS3,
  BackboneJS1, BackboneJS2, BackboneJS3,
  KnockoutJS1, KnockoutJS2, KnockoutJS3,
  Rails1, Rails2, Rails3, Rails4, Rails5,
  NodeJS1, NodeJS2, NodeJS3,
  Java1, Java2, Java3, Java4, Java5,
  Python1, Python2, Python3, Python4, Python5,
  PHP1, PHP2, PHP3, PHP4, PHP5,
  CPlusPlus1, CPlusPlus2, CPlusPlus3, CPlusPlus4, CPlusPlus5,
  CSharp1, CSharp2, CSharp3, CSharp4, CSharp5,
  MySQL1, MySQL2, MySQL3, MySQL4,
  PostgreSQL1, PostgreSQL2, PostgreSQL3, PostgreSQL4,
  MongoDB1, MongoDB2, MongoDB3,
  SQLite1, SQLite2, SQLite3,
  OracleDatabase1, OracleDatabase2, OracleDatabase3, OracleDatabase4,
  Git1, Git2, Git3,
  SVN1, SVN2, SVN3,
  Mercurial1, Mercurial2, Mercurial3,
];

export type TechnologyClass = typeof technologyClasses[0];

export const technologyClassesWithKeys = technologyClasses.reduce(
  (acc, Class) => ({ ...acc, [Class.key]: Class }),
  {} as Record<TechnologyKey, TechnologyClass>,
);

export type Technology = InstanceType<TechnologyClass>;
export type Technologies = Record<TechnologyKey, Technology>;

export function getTechnologies(character: Character, ids: BooleanDataProperty[]): Technologies {
  return getInstances<Technologies>(character, ids, technologyClasses);
}

export function getTechnologiesData(technologies: Technologies): BooleanDataProperty[] {
  return getBooleanData<Technologies>(technologies, technologyClassesWithKeys);
}
