import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Concentration1 from './Concentration1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Concentration2 extends PassivePerk {
  public static id = 14;
  public static key: PerkKey = 'Concentration2';
  public static complexityLevel = 1;
  public static parent = Concentration1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.strength, 15)
      .isMatch();
  }
}
