import * as React from 'react';
import { CharacterShort } from '../../services/CharactersService';

interface CharactersListProps {
  characters: CharacterShort[];
}

export default class CharactersList extends React.Component<CharactersListProps, {}> {
  public render(): React.ReactNode {
    const { characters } = this.props;

    return (
      <div>{JSON.stringify(characters)}</div>
    );
  }
}
