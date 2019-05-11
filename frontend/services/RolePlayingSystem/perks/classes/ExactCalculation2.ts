import Character from '../../Character';
import ActivePerk from './ActivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import ExactCalculation1 from './ExactCalculation1';
import { attributeKeys } from '../../attributes';

export default class ExactCalculation2 extends ActivePerk {
  public static id = 32;
  public static key: PerkKey = 'ExactCalculation2';
  public static complexityLevel = 1;
  public static parent = ExactCalculation1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.intelligence, 15)
      .isMatch();
  }
}
