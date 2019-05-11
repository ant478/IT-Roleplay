import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import CSS3 from './CSS3';
import PostCSS1 from './PostCSS1';

export default class PostCSS2 extends Technology {
  public static id = 35;
  public static key: TechnologyKey = 'PostCSS2';
  public static tags: TechnologyTag[] = ['CSS', 'PostCSS', 'Frontend'];
  public static basePrice = 2;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = PostCSS1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(CSS3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
