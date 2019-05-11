import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import ExperienceExchange2 from './ExperienceExchange2';
import { attributeKeys } from '../../attributes';

export default class ExperienceExchange3 extends PassivePerk {
  public static id = 54;
  public static key: PerkKey = 'ExperienceExchange3';
  public static complexityLevel = 2;
  public static parent = ExperienceExchange2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.charisma, 18)
      .isMatch();
  }
}
