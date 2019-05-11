import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import HTML3 from './HTML3';
import Handlebars1 from './Handlebars1';

export default class Handlebars2 extends Technology {
  public static id = 25;
  public static key: TechnologyKey = 'Handlebars2';
  public static tags: TechnologyTag[] = ['HTML', 'Handlebars', 'Frontend'];
  public static basePrice = 2;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = Handlebars1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(HTML3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
