import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Algorithms2 from './Algorithms2';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class Algorithms3 extends PassivePerk {
  public static id = 3;
  public static key = 'Algorithms3' as PerkKey;
  public static complexityLevel = 2;
  public static parent = Algorithms2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHavePerk(this.parent.key)
      .isMatch();
  }
}
