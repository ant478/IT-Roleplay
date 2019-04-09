import Character from '../Character';
import { TechnologyKey } from '../technologies';
import { PerkKey } from '../perks';

class RequirementsChainableObject {
  private _isMatch: boolean = true;

  constructor(private readonly character: Character) {}

  public toHaveMinLevel(minLevel: number): RequirementsChainableObject {
    this._isMatch = this._isMatch && (this.character.getLevel() >= minLevel);
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
