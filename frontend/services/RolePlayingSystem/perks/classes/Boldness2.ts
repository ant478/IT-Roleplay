import Character from '../../Character';
import ActivePerk from './ActivePerk';
import Boldness1 from './Boldness1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Boldness2 extends ActivePerk {
  public static id = 11;
  public static key: PerkKey = 'Boldness2';
  public static complexityLevel = 1;
  public static parent = Boldness1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.strength, 15)
      .isMatch();
  }
}
