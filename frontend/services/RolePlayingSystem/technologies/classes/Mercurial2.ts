import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Mercurial1 from './Mercurial1';
import expect from '../../helpers/requirementsHelper';

export default class Mercurial2 extends Technology {
  public static id = 114;
  public static key: TechnologyKey = 'Mercurial2';
  public static tags: TechnologyTag[] = ['Mercurial'];
  public static basePrice = 2;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'VCS';
  public static parent = Mercurial1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
