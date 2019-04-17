import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Patterns2 from './Patterns2';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class Patterns3 extends PassivePerk {
  public static id = 6;
  public static key = 'Patterns3' as PerkKey;
  public static complexityLevel = 2;
  public static parent = Patterns2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHavePerk(this.parent.key)
      .isMatch();
  }
}
