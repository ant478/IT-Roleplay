import Character from '../../Character';
import ActivePerk from './ActivePerk';
import Review2 from './Review2';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class Review3 extends ActivePerk {
  public static id = 9;
  public static key = 'Review3' as PerkKey;
  public static complexityLevel = 3;
  public static parent = Review2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHavePerk(this.parent.key)
      .isMatch();
  }
}
