import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import BasicKnowledge1 from './BasicKnowledge1';
import { attributeKeys } from '../../attributes';

export default class BasicKnowledge2 extends PassivePerk {
  public static id = 29;
  public static key: PerkKey = 'BasicKnowledge2';
  public static complexityLevel = 1;
  public static parent = BasicKnowledge1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(5)
      .toHaveMinValueOfAttribute(attributeKeys.intelligence, 15)
      .isMatch();
  }
}
