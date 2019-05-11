import Character from '../../Character';
import PassivePerk from './PassivePerk';
import Experience2 from './Experience2';
import { PerkKey } from '../index';
import expect from '../../helpers/requirementsHelper';
import { roleKeys } from '../../roles';

export default class Experience3 extends PassivePerk {
  public static id = 9;
  public static key: PerkKey = 'Experience3';
  public static complexityLevel = 2;
  public static parent = Experience2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    const withoutReview = expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(18)
      .isMatch();

    const withReview = expect(character)
      .toHavePerk(this.parent.key)
      .toHaveMinLevel(15)
      .toHaveMinLevelInRole(roleKeys.reviewer, 5)
      .isMatch();

    return withoutReview || withReview;
  }
}
