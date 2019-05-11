import Character from '../../Character';
import ActivePerk from './ActivePerk';
import Boldness2 from './Boldness2';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Boldness3 extends ActivePerk {
  public static id = 12;
  public static key: PerkKey = 'Boldness3';
  public static complexityLevel = 2;
  public static parent = Boldness2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.strength, 18)
      .isMatch();
  }
}
