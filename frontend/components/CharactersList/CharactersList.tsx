import * as React from 'react';
import { ShortCharacterData } from '../../services/Api/CharacterService';
import CharacterSummary from './components/CharacterSummary';

interface CharactersListProps {
  characters: ShortCharacterData[];
  onCharacterClick: (characterId: number) => any;
}

export default class CharactersList extends React.Component<CharactersListProps, {}> {
  public shouldComponentUpdate(nextProps: CharactersListProps): boolean {
    return nextProps.characters !== this.props.characters;
  }

  public renderCharacter(character: ShortCharacterData): React.ReactNode {
    return (
      <li key={character.id} className="characters-list__character" >
        <CharacterSummary character={character} onClick={this.props.onCharacterClick}/>
      </li>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="characters-list">
        <ul className="characters-list__list">
          {this.props.characters.map(character => this.renderCharacter(character))}
        </ul>
      </div>
    );
  }
}
