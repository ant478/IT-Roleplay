import * as React from 'react';
import { ShortCharacterData } from '../../services/Api/CharacterService';

interface CharactersListProps {
  characters: ShortCharacterData[];
}

export default class CharactersList extends React.Component<CharactersListProps, {}> {
  public render(): React.ReactNode {
    const { characters } = this.props;

    return (
      <div>{JSON.stringify(characters)}</div>
    );
  }
}
