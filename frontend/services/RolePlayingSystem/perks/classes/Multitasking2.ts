import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Multitasking1 from './Multitasking1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Multitasking2 extends PassivePerk {
  public static id = 17;
  public static key: PerkKey = 'Multitasking2';
  public static complexityLevel = 1;
  public static parent = Multitasking1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.dexterity, 15)
      .isMatch();
  }
}
