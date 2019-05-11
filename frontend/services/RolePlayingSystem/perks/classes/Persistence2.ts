import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import Persistence1 from './Persistence1';
import { attributeKeys } from '../../attributes';

export default class Persistence2 extends PassivePerk {
  public static id = 26;
  public static key: PerkKey = 'Persistence2';
  public static complexityLevel = 1;
  public static parent = Persistence1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.endurance, 15)
      .isMatch();
  }
}
