import Role from './Role';
import Character from '../../Character';
import { RoleKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Reviewer extends Role {
  public static id = 3;
  public static key: RoleKey = 'Reviewer';
  public static technologiesPointsCountForLevel = 1;
  public static perksPointsCountForLevel = 1.51;
  public static skillsPointsCountForLevel = 2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.wisdom, 14)
      .isMatch();
  }
}
