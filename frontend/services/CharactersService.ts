import { User } from './AuthService';
import BaseAPIService from './BaseAPIService';

const CHARACTERS_API_LOCATION = '/api/characters';

interface DataIntegerProperty {
  id: number;
  value: number;
}

export interface CharacterShort {
  id: number;
  name: string;
  avatarUrl?: string;
  author: User;
  data: {
    attributes: DataIntegerProperty[];
    classes: DataIntegerProperty[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface Character {
  id: number;
  name: string;
  avatarUrl?: string;
  author: User;
  data: {
    attributes: DataIntegerProperty[];
    classes: DataIntegerProperty[];
    skills: DataIntegerProperty[];
    technologies: number[];
    perks: number[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateCharacterData {
  name: string;
  avatarUrl?: string | null;
  data: {
    attributes: DataIntegerProperty[];
    classes: DataIntegerProperty[];
    skills: DataIntegerProperty[];
    technologies: number[];
    perks: number[];
  };
}

export type UpdateCharacterData = Partial<CreateCharacterData>;

export class CharactersService extends BaseAPIService {
  public getCharacters(): Promise<CharacterShort[]> {
    return this.makeRequest<CharacterShort[]>(CHARACTERS_API_LOCATION);
  }

  public getCharacter(characterId: number): Promise<Character> {
    return this.makeRequest<Character>(`${CHARACTERS_API_LOCATION}/${characterId}`);
  }

  public createCharacter(createCharacterData: CreateCharacterData): Promise<Character> {
    const options = { method: 'POST', body: JSON.stringify(createCharacterData) };

    return this.makeRequest<Character>(CHARACTERS_API_LOCATION, options);
  }

  public updateCharacter(characterId: number, updateCharacterData: UpdateCharacterData): Promise<Character> {
    const location = `${CHARACTERS_API_LOCATION}/${characterId}`;
    const options = { method: 'PUT', body: JSON.stringify(updateCharacterData) };

    return this.makeRequest<Character>(location, options);
  }

  public deleteCharacter(characterId: number): Promise<void> {
    const location = `${CHARACTERS_API_LOCATION}/${characterId}`;
    const options = { method: 'DELETE' };

    return this.makeRequest<void>(location, options);
  }
}

export default new CharactersService();
