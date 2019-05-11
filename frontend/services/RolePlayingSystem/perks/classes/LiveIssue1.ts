import Character from '../../Character';
import ActivePerk from './ActivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { roleKeys } from '../../roles';

export default class LiveIssue1 extends ActivePerk {
  public static id = 37;
  public static key: PerkKey = 'LiveIssue1';
  public static complexityLevel = 0;
  public static parent = null;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevelInRole(roleKeys.supportEngineer, 1)
      .isMatch();
  }

  public static isVisibleForCharacter(character: Character): boolean {
    return expect(character)
      .toHaveMinLevelInRole(roleKeys.supportEngineer, 1)
      .isMatch();
  }
}
