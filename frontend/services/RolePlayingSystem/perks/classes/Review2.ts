import Character from '../../Character';
import ActivePerk from './ActivePerk';
import Review1 from './Review1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { roleKeys } from '../../roles';

export default class Review2 extends ActivePerk {
  public static id = 41;
  public static key: PerkKey = 'Review2';
  public static complexityLevel = 1;
  public static parent = Review1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevelInRole(roleKeys.reviewer, 3)
      .isMatch();
  }

  public static isVisibleForCharacter(character: Character): boolean {
    return expect(character)
      .toHaveMinLevelInRole(roleKeys.reviewer, 1)
      .isMatch();
  }
}
