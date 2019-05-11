import Character from '../../Character';
import PassivePerk from './PassivePerk';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { roleKeys } from '../../roles';

export default class Experience1 extends PassivePerk {
  public static id = 7;
  public static key: PerkKey = 'Experience1';
  public static complexityLevel = 0;
  public static parent = null;

  public static isCharacterMatchRequirements(character: Character): boolean {
    const withoutReview = expect(character).toHaveMinLevel(8).isMatch();
    const withReview = expect(character).toHaveMinLevel(5).toHaveMinLevelInRole(roleKeys.reviewer, 1).isMatch();

    return withoutReview || withReview;
  }
}
