import * as _ from 'lodash';
import Character, { AvailablePoints } from './Character';
import { IntegerDataProperty, BooleanDataProperty } from '../Api/CharacterService';
import { getAttributes, getAttributesData } from './attributes';
import { getSkills, getSkillsData } from './skills';
import { getRoles, getRolesData } from './roles';
import { getTechnologies, getTechnologiesData } from './technologies';
import { getPerks, getPerksData } from './perks';

export default class CharacterBackupManager {
  public _isEmpty = true;

  public attributes: IntegerDataProperty[] | null = null;
  public roles: IntegerDataProperty[] | null = null;
  public skills: IntegerDataProperty[] | null = null;
  public technologies: BooleanDataProperty[] | null = null;
  public perks: BooleanDataProperty[] | null = null;
  public availablePoints: AvailablePoints | null = null;

  constructor(private readonly owner: Character) {}

  public isEmpty(): boolean {
    return this._isEmpty;
  }

  public make(): void {
    this.attributes = getAttributesData(this.owner.attributes);
    this.roles = getRolesData(this.owner.roles);
    this.skills = getSkillsData(this.owner.skills);
    this.technologies = getTechnologiesData(this.owner.technologies);
    this.perks = getPerksData(this.owner.perks);
    this.availablePoints = _.cloneDeep(this.owner.availablePoints);

    this._isEmpty = false;
  }

  public restore(): void {
    if (this.isEmpty()) {
      throw new Error('Backup is empty.');
    }

    this.owner.attributes = getAttributes(this.owner, this.attributes!);
    this.owner.roles = getRoles(this.owner, this.roles!);
    this.owner.skills = getSkills(this.owner, this.skills!);
    this.owner.technologies = getTechnologies(this.owner, this.technologies!);
    this.owner.perks = getPerks(this.owner, this.perks!);
    this.owner.availablePoints = this.availablePoints!;

    this.reset();
  }

  public reset(): void {
    this.attributes = null;
    this.roles = null;
    this.skills = null;
    this.technologies = null;
    this.perks = null;
    this.availablePoints = null;

    this._isEmpty = true;
  }
}
