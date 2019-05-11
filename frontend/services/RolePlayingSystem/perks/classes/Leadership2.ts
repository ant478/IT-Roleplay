import Character from '../../Character';
import ActivePerk from './ActivePerk';
import Leadership1 from './Leadership1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { roleKeys } from '../../roles';

export default class Leadership2 extends ActivePerk {
  public static id = 44;
  public static key: PerkKey = 'Leadership2';
  public static complexityLevel = 1;
  public static parent = Leadership1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevelInRole(roleKeys.teamlead, 3)
      .isMatch();
  }

  public static isVisibleForCharacter(character: Character): boolean {
    return expect(character)
      .toHaveMinLevelInRole(roleKeys.teamlead, 1)
      .isMatch();
  }
}
