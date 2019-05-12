import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Leadership2 from './Leadership2';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { roleKeys } from '../../roles';

export default class Leadership3 extends PassivePerk {
  public static id = 45;
  public static key: PerkKey = 'Leadership3';
  public static complexityLevel = 2;
  public static parent = Leadership2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevelInRole(roleKeys.teamlead, 5)
      .isMatch();
  }

  public static isVisibleForCharacter(character: Character): boolean {
    return expect(character)
      .toHaveMinLevelInRole(roleKeys.teamlead, 1)
      .isMatch();
  }
}
