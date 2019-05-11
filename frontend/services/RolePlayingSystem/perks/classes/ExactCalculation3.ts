import Character from '../../Character';
import ActivePerk from './ActivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import ExactCalculation2 from './ExactCalculation2';
import { attributeKeys } from '../../attributes';

export default class ExactCalculation3 extends ActivePerk {
  public static id = 33;
  public static key: PerkKey = 'ExactCalculation3';
  public static complexityLevel = 2;
  public static parent = ExactCalculation2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.intelligence, 18)
      .isMatch();
  }
}
