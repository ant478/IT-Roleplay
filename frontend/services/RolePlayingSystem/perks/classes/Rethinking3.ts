import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import Rethinking2 from './Rethinking2';
import { attributeKeys } from '../../attributes';

export default class Rethinking3 extends PassivePerk {
  public static id = 48;
  public static key: PerkKey = 'Rethinking3';
  public static complexityLevel = 2;
  public static parent = Rethinking2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.wisdom, 18)
      .isMatch();
  }
}
