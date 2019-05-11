import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import Pride2 from './Pride2';
import { attributeKeys } from '../../attributes';

export default class Pride3 extends PassivePerk {
  public static id = 36;
  public static key: PerkKey = 'Pride3';
  public static complexityLevel = 2;
  public static parent = Pride2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.charisma, 18)
      .isMatch();
  }
}
