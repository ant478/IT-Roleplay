import Character from '../../Character';
import ActivePerk from './ActivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Quality1 extends ActivePerk {
  public static id = 22;
  public static key: PerkKey = 'Quality1';
  public static complexityLevel = 0;
  public static parent = null;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinValueOfAttribute(attributeKeys.endurance, 12)
      .isMatch();
  }
}
