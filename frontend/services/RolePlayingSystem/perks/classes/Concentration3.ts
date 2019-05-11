import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Concentration2 from './Concentration2';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Concentration3 extends PassivePerk {
  public static id = 15;
  public static key: PerkKey = 'Concentration3';
  public static complexityLevel = 2;
  public static parent = Concentration2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.strength, 18)
      .isMatch();
  }
}
