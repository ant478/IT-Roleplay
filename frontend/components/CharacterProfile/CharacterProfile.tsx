import * as React from 'react';
import { CharacterData } from '../../services/Api/CharacterService';

interface CharactersProfileProps {
  character: CharacterData;
}

export default class CharacterProfile extends React.Component<CharactersProfileProps, {}> {
  public render(): React.ReactNode {
    const { character } = this.props;

    return (
      <div>{JSON.stringify(character)}</div>
    );
  }
}
