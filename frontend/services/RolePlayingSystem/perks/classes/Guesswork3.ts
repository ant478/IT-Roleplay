import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import Guesswork2 from './Guesswork2';
import { attributeKeys } from '../../attributes';

export default class Guesswork3 extends PassivePerk {
  public static id = 51;
  public static key: PerkKey = 'Guesswork3';
  public static complexityLevel = 2;
  public static parent = Guesswork2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.wisdom, 18)
      .isMatch();
  }
}
