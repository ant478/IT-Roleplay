import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import HTML2 from './HTML2';

export default class Handlebars1 extends Technology {
  public static id = 24;
  public static key: TechnologyKey = 'Handlebars1';
  public static tags: TechnologyTag[] = ['HTML', 'Handlebars', 'Frontend'];
  public static basePrice = 1;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = null;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(HTML2.key)
      .isMatch();
  }
}
