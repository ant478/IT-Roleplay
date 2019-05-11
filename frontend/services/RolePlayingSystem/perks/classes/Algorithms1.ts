import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';

export default class Algorithms1 extends PassivePerk {
  public static id = 1;
  public static key: PerkKey = 'Algorithms1';
  public static complexityLevel = 0;
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
