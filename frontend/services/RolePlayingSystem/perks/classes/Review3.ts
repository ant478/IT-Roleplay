import Character from '../../Character';
import ActivePerk from './ActivePerk';
import Review2 from './Review2';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { roleKeys } from '../../roles';

export default class Review3 extends ActivePerk {
  public static id = 42;
  public static key: PerkKey = 'Review3';
  public static complexityLevel = 2;
  public static parent = Review2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevelInRole(roleKeys.reviewer, 5)
      .isMatch();
  }

  public static isVisibleForCharacter(character: Character): boolean {
    return expect(character)
      .toHaveMinLevelInRole(roleKeys.reviewer, 1)
      .isMatch();
  }
}
