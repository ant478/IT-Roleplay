import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Multitasking2 from './Multitasking2';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { attributeKeys } from '../../attributes';

export default class Multitasking3 extends PassivePerk {
  public static id = 18;
  public static key: PerkKey = 'Multitasking3';
  public static complexityLevel = 2;
  public static parent = Multitasking2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.dexterity, 18)
      .isMatch();
  }
}
