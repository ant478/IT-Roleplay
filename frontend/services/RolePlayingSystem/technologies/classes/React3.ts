import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript4 from './JavaScript4';
import React2 from './React2';

export default class React3 extends Technology {
  public static id = 44;
  public static key: TechnologyKey = 'React3';
  public static tags: TechnologyTag[] = ['JavaScript', 'React', 'Frontend'];
  public static basePrice = 4;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = React2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript4.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
