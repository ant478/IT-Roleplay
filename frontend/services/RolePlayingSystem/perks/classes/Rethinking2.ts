import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import Rethinking1 from './Rethinking1';
import { attributeKeys } from '../../attributes';

export default class Rethinking2 extends PassivePerk {
  public static id = 47;
  public static key: PerkKey = 'Rethinking2';
  public static complexityLevel = 1;
  public static parent = Rethinking1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.wisdom, 15)
      .isMatch();
  }
}
