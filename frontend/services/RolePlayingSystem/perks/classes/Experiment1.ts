import Character from '../../Character';
import ActivePerk from './ActivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Experiment1 extends ActivePerk {
  public static id = 19;
  public static key: PerkKey = 'Experiment1';
  public static complexityLevel = 0;
  public static parent = null;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinValueOfAttribute(attributeKeys.dexterity, 12)
      .isMatch();
  }
}
