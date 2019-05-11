import Character from '../../Character';
import ActivePerk from './ActivePerk';
import Experiment1 from './Experiment1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Experiment2 extends ActivePerk {
  public static id = 20;
  public static key: PerkKey = 'Experiment2';
  public static complexityLevel = 1;
  public static parent = Experiment1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.dexterity, 15)
      .isMatch();
  }
}
