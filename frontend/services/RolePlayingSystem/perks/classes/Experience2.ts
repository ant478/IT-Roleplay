import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Experience1 from './Experience1';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { roleKeys } from '../../roles';

export default class Experience2 extends PassivePerk {
  public static id = 8;
  public static key: PerkKey = 'Experience2';
  public static complexityLevel = 1;
  public static parent = Experience1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    const withoutReview = expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(13)
      .isMatch();

    const withReview = expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(10)
      .toHaveMinLevelInRole(roleKeys.reviewer, 3)
      .isMatch();

    return withoutReview || withReview;
  }
}
