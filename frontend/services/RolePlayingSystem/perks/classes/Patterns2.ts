import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Patterns1 from './Patterns1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class Patterns2 extends PassivePerk {
  public static id = 5;
  public static key = 'Patterns2' as PerkKey;
  public static complexityLevel = 2;
  public static parent = Patterns1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHavePerk(this.parent.key)
      .isMatch();
  }
}