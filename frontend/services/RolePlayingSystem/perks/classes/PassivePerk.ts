import Perk from './Perk';
import { PerkUsageTypeKey } from '../index';

export default abstract class PassivePerk extends Perk {
  public static usageType = 'Passive' as PerkUsageTypeKey;
}
