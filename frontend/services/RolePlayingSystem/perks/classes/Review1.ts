import Character from '../../Character';
import ActivePerk from './ActivePerk';
import { PerkKey } from '../index';

export default class Review1 extends ActivePerk {
  public static id = 7;
  public static key = 'Review1' as PerkKey;
  public static complexityLevel = 1;
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
