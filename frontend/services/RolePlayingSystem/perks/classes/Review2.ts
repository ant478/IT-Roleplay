import Character from '../../Character';
import ActivePerk from './ActivePerk';
import Review1 from './Review1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class Review2 extends ActivePerk {
  public static id = 8;
  public static key = 'Review2' as PerkKey;
  public static complexityLevel = 2;
  public static parent = Review1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHavePerk(this.parent.key)
      .isMatch();
  }
}
