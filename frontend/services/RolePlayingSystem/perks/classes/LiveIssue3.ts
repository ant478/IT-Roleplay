import Character from '../../Character';
import ActivePerk from './ActivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import LiveIssue2 from './LiveIssue2';
import { roleKeys } from '../../roles';

export default class LiveIssue3 extends ActivePerk {
  public static id = 39;
  public static key: PerkKey = 'LiveIssue3';
  public static complexityLevel = 2;
  public static parent = LiveIssue2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevelInRole(roleKeys.supportEngineer, 5)
      .isMatch();
  }

  public static isVisibleForCharacter(character: Character): boolean {
    return expect(character)
      .toHaveMinLevelInRole(roleKeys.supportEngineer, 1)
      .isMatch();
  }
}
