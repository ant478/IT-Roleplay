import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import Guesswork1 from './Guesswork1';
import { attributeKeys } from '../../attributes';

export default class Guesswork2 extends PassivePerk {
  public static id = 50;
  public static key: PerkKey = 'Guesswork2';
  public static complexityLevel = 1;
  public static parent = Guesswork1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.wisdom, 15)
      .isMatch();
  }
}
