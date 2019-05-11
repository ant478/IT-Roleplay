import Role from './Role';
import Character from '../../Character';
import { RoleKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Teamlead extends Role {
  public static id = 2;
  public static key: RoleKey = 'Teamlead';
  public static technologiesPointsCountForLevel = 1.5;
  public static perksPointsCountForLevel = 1;
  public static skillsPointsCountForLevel = 4;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(15)
      .toHaveMinValueOfAttribute(attributeKeys.charisma, 14)
      .isMatch();
  }
}
