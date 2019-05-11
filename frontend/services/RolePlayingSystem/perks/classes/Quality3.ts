import Character from '../../Character';
import ActivePerk from './ActivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import Quality2 from './Quality2';
import { attributeKeys } from '../../attributes';

export default class Quality3 extends ActivePerk {
  public static id = 24;
  public static key: PerkKey = 'Quality3';
  public static complexityLevel = 2;
  public static parent = Quality2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.endurance, 18)
      .isMatch();
  }
}
