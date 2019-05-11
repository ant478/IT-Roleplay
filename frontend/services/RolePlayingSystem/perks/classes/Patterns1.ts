import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';

export default class Patterns1 extends PassivePerk {
  public static id = 4;
  public static key: PerkKey = 'Patterns1';
  public static complexityLevel = 0;
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
