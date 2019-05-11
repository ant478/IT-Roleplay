import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import Persistence2 from './Persistence2';
import { attributeKeys } from '../../attributes';

export default class Persistence3 extends PassivePerk {
  public static id = 27;
  public static key: PerkKey = 'Persistence3';
  public static complexityLevel = 2;
  public static parent = Persistence2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.endurance, 18)
      .isMatch();
  }
}
