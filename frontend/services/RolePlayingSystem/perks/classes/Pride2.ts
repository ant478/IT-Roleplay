import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import Pride1 from './Pride1';
import { attributeKeys } from '../../attributes';

export default class Pride2 extends PassivePerk {
  public static id = 35;
  public static key: PerkKey = 'Pride2';
  public static complexityLevel = 1;
  public static parent = Pride1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.charisma, 15)
      .isMatch();
  }
}
