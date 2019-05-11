import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Mercurial2 from './Mercurial2';
import expect from '../../helpers/requirementsHelper';

export default class Mercurial3 extends Technology {
  public static id = 115;
  public static key: TechnologyKey = 'Mercurial3';
  public static tags: TechnologyTag[] = ['Mercurial'];
  public static basePrice = 3;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'VCS';
  public static parent = Mercurial2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
