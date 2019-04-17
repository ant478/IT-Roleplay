import * as _ from 'lodash';
import Character, { AvailablePoints } from './Character';
import { IntegerDataProperty, BooleanDataProperty } from '../Api/CharacterService';
import { getAttributes, getAttributesData } from './attributes';
import { getSkills, getSkillsData } from './skills';
import { getRoles, getRolesData } from './roles';
import { getTechnologies, getTechnologiesData } from './technologies';
import { getPerks, getPerksData } from './perks';

export interface CharacterBackupManagerEmpty extends CharacterBackupManager {
  attributes: null;
  roles: null;
  skills: null;
  technologies: null;
  perks: null;
  availablePoints: null;
  isFilled(): false;
  isEmpty(): true;
}

export interface CharacterBackupManagerFilled extends CharacterBackupManager {
  attributes: IntegerDataProperty[];
  roles: IntegerDataProperty[];
  skills: IntegerDataProperty[];
  technologies: BooleanDataProperty[];
  perks: BooleanDataProperty[];
  availablePoints: AvailablePoints;
  isFilled(): true;
  isEmpty(): false;
}

export default class CharacterBackupManager {
  public _isEmpty = true;

  public attributes: IntegerDataProperty[] | null = null;
  public roles: IntegerDataProperty[] | null = null;
  public skills: IntegerDataProperty[] | null = null;
  public technologies: BooleanDataProperty[] | null = null;
  public perks: BooleanDataProperty[] | null = null;
  public availablePoints: AvailablePoints | null = null;

  constructor(private readonly owner: Character) {}

  public isEmpty(): this is CharacterBackupManagerEmpty {
    return this._isEmpty;
  }

  public isFilled(): this is CharacterBackupManagerFilled {
    return !this._isEmpty;
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
    if (this._isEmpty) {
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
