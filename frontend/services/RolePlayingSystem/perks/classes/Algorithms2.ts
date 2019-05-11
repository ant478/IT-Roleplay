import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Algorithms1 from './Algorithms1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class Algorithms2 extends PassivePerk {
  public static id = 2;
  public static key: PerkKey = 'Algorithms2';
  public static complexityLevel = 1;
  public static parent = Algorithms1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHavePerk(this.parent.key)
      .isMatch();
  }
}
