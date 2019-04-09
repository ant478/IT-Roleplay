import * as _ from 'lodash';
import Character from './Character';
import { RoleClass, roleClassesWithKeys } from './roles';
import { PerkClass, perkClassesWithKeys } from './perks';
import { TechnologyClass, technologyClassesWithKeys } from './technologies';

export interface CharacterPerkInfo {
  perk: PerkClass;
  child: CharacterPerkInfo | null;
  complexityLevel: number;
  isVisible: boolean;
  areRequirementsMatch: boolean;
  isOwned: boolean;
}

export interface CharacterTechnologyInfo {
  technology: TechnologyClass;
  child: CharacterTechnologyInfo | null;
  complexityLevel: number;
  price: number;
}

export interface CharacterRoleInfo {
  role: RoleClass;
  level: number;
  areRequirementsMatch: boolean;
}

interface ElementWithChild {
  child: ElementWithChild | null;
}

class RolePlayingSystem {
  public getCharacterRoleInfo(character: Character): CharacterRoleInfo[] {
    return Object.values(roleClassesWithKeys).map(Class => ({
      role: Class,
      level: character.roles[Class.key] ? character.roles[Class.key]!.level : 0,
      areRequirementsMatch: Class.isCharacterMatchRequirements(character),
    }));
  }

  public getCharacterPerkInfo(character: Character): CharacterPerkInfo[] {
    const characterPerkInfoRaw = Object.values(perkClassesWithKeys).map(Class => ({
      perk: Class,
      child: null,
      complexityLevel: Class.complexityLevel,
      isVisible: Class.isVisibleForCharacter(character),
      areRequirementsMatch: Class.isCharacterMatchRequirements(character),
      isOwned: !!character.perks[Class.key],
    }));

    return this.formTree<CharacterPerkInfo>(
      characterPerkInfoRaw,
      (element, potentialParent) => element.perk.parent === potentialParent.perk,
    );
  }

  public getCharacterTechnologyInfo(character: Character): CharacterTechnologyInfo[] {
    const technologyPerkInfoRaw = Object.values(technologyClassesWithKeys).map(Class => ({
      technology: Class,
      child: null,
      complexityLevel: Class.complexityLevel,
      price: Class.getPrice(character),
      areRequirementsMatch: Class.isCharacterMatchRequirements(character),
      isOwned: !!character.technologies[Class.key],
    }));

    return this.formTree<CharacterTechnologyInfo>(
      technologyPerkInfoRaw,
      (element, potentialParent) => element.technology.parent === potentialParent.technology,
    );
  }

  private formTree<T extends ElementWithChild>(elements: T[], isParentOf: (element: T, potentialParent: T) => boolean): T[] {
    return elements.reduce(
      (roots, element, _index, array) => {
        const parent = array.find(_.partial(isParentOf, element));

        if (!parent) {
          return [...roots, element];
        }

        parent.child = element;

        return roots;
      },
      [] as T[],
    );
  }
}

export default new RolePlayingSystem();
