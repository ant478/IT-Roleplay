import Character from '../../Character';
import ActivePerk from './ActivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import LiveIssue1 from './LiveIssue1';
import { roleKeys } from '../../roles';

export default class LiveIssue2 extends ActivePerk {
  public static id = 38;
  public static key: PerkKey = 'LiveIssue2';
  public static complexityLevel = 1;
  public static parent = LiveIssue1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevelInRole(roleKeys.supportEngineer, 3)
      .isMatch();
  }

  public static isVisibleForCharacter(character: Character): boolean {
    return expect(character)
      .toHaveMinLevelInRole(roleKeys.supportEngineer, 1)
      .isMatch();
  }
}
