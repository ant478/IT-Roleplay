import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import ExperienceExchange1 from './ExperienceExchange1';
import { attributeKeys } from '../../attributes';

export default class ExperienceExchange2 extends PassivePerk {
  public static id = 53;
  public static key: PerkKey = 'ExperienceExchange2';
  public static complexityLevel = 1;
  public static parent = ExperienceExchange1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.charisma, 15)
      .isMatch();
  }
}
