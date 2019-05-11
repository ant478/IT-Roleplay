import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Git1 from './Git1';
import expect from '../../helpers/requirementsHelper';

export default class Git2 extends Technology {
  public static id = 108;
  public static key: TechnologyKey = 'Git2';
  public static tags: TechnologyTag[] = ['Git'];
  public static basePrice = 2;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'VCS';
  public static parent = Git1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
