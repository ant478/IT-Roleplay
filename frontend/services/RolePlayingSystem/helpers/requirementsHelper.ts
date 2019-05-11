import Character from '../Character';
import { TechnologyKey } from '../technologies';
import { PerkKey } from '../perks';
import { RoleKey } from '../roles';
import { AttributeKey } from '../attributes';

class RequirementsChainableObject {
  private _isMatch: boolean = true;

  constructor(private readonly character: Character) {}

  public toHaveMinLevel(minLevel: number): RequirementsChainableObject {
    this._isMatch = this._isMatch && (this.character.getLevel() >= minLevel);
    return this;
  }

  public toHaveMinLevelInRole(roleKey: RoleKey, minLevel: number): RequirementsChainableObject {
    const levelInRole = this.character.roles[roleKey] ? this.character.roles[roleKey]!.level : 0;

    this._isMatch = this._isMatch && (levelInRole >= minLevel);
    return this;
  }

  public toHaveMinValueOfAttribute(attributeKey: AttributeKey, minLevel: number): RequirementsChainableObject {
    this._isMatch = this._isMatch && (this.character.attributes[attributeKey].value >= minLevel);
    return this;
  }

  public toHaveTechnology(technologyKey: TechnologyKey): RequirementsChainableObject {
    this._isMatch = this._isMatch && !!this.character.technologies[technologyKey];
    return this;
  }

  public toHavePerk(perkKey: PerkKey): RequirementsChainableObject {
    this._isMatch = this._isMatch && !!this.character.perks[perkKey];
    return this;
  }

  public isMatch(): boolean {
    return this._isMatch;
  }
}

export default function expect(character: Character): RequirementsChainableObject {
  return new RequirementsChainableObject(character);
}
