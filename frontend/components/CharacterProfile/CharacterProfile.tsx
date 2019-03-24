import * as React from 'react';
import { Character } from '../../services/CharactersService';

interface CharactersProfileProps {
  character: Character;
}

export default class CharacterProfile extends React.Component<CharactersProfileProps, {}> {
  public render(): React.ReactNode {
    const { character } = this.props;

    return (
      <div>{JSON.stringify(character)}</div>
    );
  }
}
