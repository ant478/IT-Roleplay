import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Patterns1 from './Patterns1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class Patterns2 extends PassivePerk {
  public static id = 5;
  public static key: PerkKey = 'Patterns2';
  public static complexityLevel = 1;
  public static parent = Patterns1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHavePerk(this.parent.key)
      .isMatch();
  }
}
