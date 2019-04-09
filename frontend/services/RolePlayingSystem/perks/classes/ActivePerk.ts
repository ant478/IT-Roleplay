import Perk from './Perk';
import { PerkUsageTypeKey } from '../index';

export default abstract class ActivePerk extends Perk {
  public static usageType = 'Active' as PerkUsageTypeKey;
}
