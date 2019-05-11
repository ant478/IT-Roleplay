import Character from '../../Character';
import ActivePerk from './ActivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import Quality1 from './Quality1';
import { attributeKeys } from '../../attributes';

export default class Quality2 extends ActivePerk {
  public static id = 23;
  public static key: PerkKey = 'Quality2';
  public static complexityLevel = 1;
  public static parent = Quality1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.endurance, 15)
      .isMatch();
  }
}
