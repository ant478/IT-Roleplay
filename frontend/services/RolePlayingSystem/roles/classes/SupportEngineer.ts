import Role from './Role';
import Character from '../../Character';
import { RoleKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class SupportEngineer extends Role {
  public static id = 4;
  public static key: RoleKey = 'SupportEngineer';
  public static technologiesPointsCountForLevel = 1;
  public static perksPointsCountForLevel = 0.67;
  public static skillsPointsCountForLevel = 6;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.endurance, 14)
      .isMatch();
  }
}
