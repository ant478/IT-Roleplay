import Character from '../../Character';
import ActivePerk from './ActivePerk';
import Experiment2 from './Experiment2';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Experiment3 extends ActivePerk {
  public static id = 21;
  public static key: PerkKey = 'Experiment3';
  public static complexityLevel = 2;
  public static parent = Experiment2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.dexterity, 18)
      .isMatch();
  }
}
