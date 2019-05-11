import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import BasicKnowledge2 from './BasicKnowledge2';
import { attributeKeys } from '../../attributes';

export default class BasicKnowledge3 extends PassivePerk {
  public static id = 30;
  public static key: PerkKey = 'BasicKnowledge3';
  public static complexityLevel = 2;
  public static parent = BasicKnowledge2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinValueOfAttribute(attributeKeys.intelligence, 18)
      .isMatch();
  }
}
