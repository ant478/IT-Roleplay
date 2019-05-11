import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Pride1 extends PassivePerk {
  public static id = 34;
  public static key: PerkKey = 'Pride1';
  public static complexityLevel = 0;
  public static parent = null;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinValueOfAttribute(attributeKeys.charisma, 12)
      .isMatch();
  }
}
