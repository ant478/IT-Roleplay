import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';
import technologyIcons from '../../config/technologyIcons';
import romanNumbers from '../../../../config/romanNumbers';
import { Character, TechnologyClass, TechnologyKey } from '../../../../../../services/RolePlayingSystem';

const COMPLEXITY_LEVELS = [0, 1, 2, 3, 4];
type TechnologyLevel = 1 | 2 | 3 | 4 | 5;

interface CharacterTechnologyState {
  key: TechnologyKey;
  isAdded: boolean;
  canBeAdded: boolean;
  canBeRemoved: boolean;
  notAvailable: boolean;
}

interface TechnologiesRowProps {
  character: Character;
  technologiesRow: TechnologyClass[];
  onTechnologySelect: (technologyClass: TechnologyClass | null) => void;
  onTechnologyToggle: (technologyClass: TechnologyClass) => void;
}

interface TechnologiesRowState {
  technologiesState: CharacterTechnologyState[];
}

export default class TechnologiesRow extends React.Component<TechnologiesRowProps, TechnologiesRowState> {
  constructor(props: TechnologiesRowProps) {
    super(props);

    this.state = {
      technologiesState: props.technologiesRow.map(technologyClass => this.getTechnologyState(technologyClass, props.character)),
    };
  }

  public componentWillReceiveProps(nextProps: TechnologiesRowProps): void {
    if (nextProps.technologiesRow !== this.props.technologiesRow || nextProps.character !== this.props.character) {
      this.setState({
        technologiesState: nextProps.technologiesRow.map(technologyClass => this.getTechnologyState(technologyClass, nextProps.character)),
      });
    }
  }

  public shouldComponentUpdate(_nextProps: TechnologiesRowProps, nextState: TechnologiesRowState): boolean {
    return !_.isEqual(nextState.technologiesState, this.state.technologiesState);
  }

  public onTechnologySelect = (event: React.MouseEvent): void => {
    const index = Number((event.currentTarget as Element).getAttribute('data-index'));
    const technologyClass = this.props.technologiesRow[index];

    this.props.onTechnologySelect(technologyClass);
  }

  public onTechnologyDeselect = (): void => {
    this.props.onTechnologySelect(null);
  }

  public onTechnologyToggle = (event: React.MouseEvent): void => {
    const index = Number((event.currentTarget as Element).getAttribute('data-index'));
    const technologyClass = this.props.technologiesRow[index];

    this.props.onTechnologyToggle(technologyClass);
  }

  public render(): React.ReactNode {
    const character = this.props.character;
    const technologies = COMPLEXITY_LEVELS.map((complexityLevel) => {
      const technologyClassIndex = _.findIndex(this.props.technologiesRow, technologyClassInRow => technologyClassInRow.complexityLevel === complexityLevel);

      if (technologyClassIndex < 0) {
        return (<div key={`placeholder${complexityLevel}`} className="technologies-tab__technology-wrapper"/>);
      }

      const technologyClass = this.props.technologiesRow[technologyClassIndex];
      const isNotLastInRow = technologyClassIndex !== this.props.technologiesRow.length - 1;
      const characterTechnologyState = this.state.technologiesState[technologyClassIndex];

      const technologyClassNames = classNames('technologies-tab__technology', `technologies-tab__technology_complexity-${complexityLevel}`, {
        'technologies-tab__technology_is-added': characterTechnologyState.isAdded,
        'technologies-tab__technology_can-be-added': characterTechnologyState.canBeAdded,
        'technologies-tab__technology_can-be-removed': characterTechnologyState.canBeRemoved,
        'technologies-tab__technology_not-available': characterTechnologyState.notAvailable,
      });

      const nextInRow = isNotLastInRow ? this.props.technologiesRow[technologyClassIndex + 1] : null;
      const isArrowHighLighted = nextInRow ? !!character.technologies[nextInRow.key] || nextInRow.canBeAddedToCharacter(character) : false;

      const arrowClasses = classNames('technologies-tab__technology-arrow', `technologies-tab__technology-arrow_complexity-${complexityLevel}`, {
        'technologies-tab__technology-arrow_not-available': !isArrowHighLighted,
      });

      const TechnologyIcon = technologyIcons[technologyClass.key];
      const level = (technologyClassIndex + 1) as TechnologyLevel;

      return (
        <div key={technologyClass.key} className="technologies-tab__technology-wrapper">
          <div
            className={technologyClassNames}
            data-index={technologyClassIndex}
            data-level={romanNumbers[level]}
            onMouseOver={this.onTechnologySelect}
            onMouseLeave={this.onTechnologyDeselect}
            onClick={this.onTechnologyToggle}
          >
            <div className="technologies-tab__icon"><TechnologyIcon/></div>
          </div>
          {isNotLastInRow ? <div className={arrowClasses}/> : null}
        </div>
      );
    });

    return (
      <div className="technologies-tab__technologies-row">{technologies}</div>
    );
  }

  private getTechnologyState(technologyClass: TechnologyClass, character: Character): CharacterTechnologyState {
    const isAdded = !!character.technologies[technologyClass.key];

    return {
      isAdded,
      key: technologyClass.key,
      canBeAdded: !isAdded && technologyClass.canBeAddedToCharacter(character),
      canBeRemoved: isAdded && technologyClass.canBeRemovedFromCharacter(character),
      notAvailable: !isAdded && !technologyClass.canBeAddedToCharacter(character),
    };
  }
}
