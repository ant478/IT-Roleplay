import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Git2 from './Git2';
import expect from '../../helpers/requirementsHelper';

export default class Git3 extends Technology {
  public static id = 109;
  public static key: TechnologyKey = 'Git3';
  public static tags: TechnologyTag[] = ['Git'];
  public static basePrice = 3;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'VCS';
  public static parent = Git2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
