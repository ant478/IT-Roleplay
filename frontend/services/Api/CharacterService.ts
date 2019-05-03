import * as _ from 'lodash';
import { User } from './AuthService';
import BaseAPIService from './BaseAPIService';
import { DeepPartial } from 'ts-essentials';

const CHARACTERS_API_LOCATION = '/api/characters';

// for testing
// const delay = (timeout) =>
//   (...args) =>
//     new Promise((resolve) => { setTimeout(() => resolve(...args), timeout)},
//     );

export interface AvailablePoints {
  roles: number;
  attributes: number;
  skills: number;
  technologies: number;
  perks: number;
}

export interface IntegerDataProperty {
  id: number;
  value: number;
}

export type BooleanDataProperty = number; // id

export interface CharacterRoleplayData {
  attributes: IntegerDataProperty[];
  roles: IntegerDataProperty[];
  skills: IntegerDataProperty[];
  technologies: BooleanDataProperty[];
  perks: BooleanDataProperty[];
  availablePoints: AvailablePoints;
}

export interface CharacterData {
  id: number;
  name: string;
  avatarId?: string | null;
  author: User;
  data: CharacterRoleplayData;
  createdAt: string;
  updatedAt: string;
}

export interface ShortCharacterData {
  id: number;
  name: string;
  avatarId?: string | null;
  author: User;
  data: Pick<CharacterRoleplayData, 'attributes' | 'roles'>;
  createdAt: string;
  updatedAt: string;
}

export type CreateCharacterData = Pick<CharacterData, 'name' | 'avatarId' | 'data'>;
export type UpdateCharacterData = DeepPartial<CreateCharacterData>;

interface GetCharactersParams {
  limit?: number;
  offset?: number;
}

export class CharacterService extends BaseAPIService {
  public getCharacters(params?: GetCharactersParams): Promise<ShortCharacterData[]> {
    const url = !!params && !_.isEmpty(params) ?
      `${CHARACTERS_API_LOCATION}?${this.getQueryString(params)}` :
      CHARACTERS_API_LOCATION;

    return this.makeRequest<ShortCharacterData[]>(url);
  }

  public getCharacter(characterId: number): Promise<CharacterData> {
    return this.makeRequest<CharacterData>(`${CHARACTERS_API_LOCATION}/${characterId}`);
  }

  public createCharacter(createCharacterData: CreateCharacterData): Promise<CharacterData> {
    const options = { method: 'POST', body: JSON.stringify(createCharacterData) };

    return this.makeRequest<CharacterData>(CHARACTERS_API_LOCATION, options);
  }

  public updateCharacter(characterId: number, updateCharacterData: UpdateCharacterData): Promise<CharacterData> {
    const location = `${CHARACTERS_API_LOCATION}/${characterId}`;
    const options = { method: 'PUT', body: JSON.stringify(updateCharacterData) };

    return this.makeRequest<CharacterData>(location, options);
  }

  public deleteCharacter(characterId: number): Promise<void> {
    const location = `${CHARACTERS_API_LOCATION}/${characterId}`;
    const options = { method: 'DELETE' };

    return this.makeRequest<void>(location, options);
  }
}

export default new CharacterService();
