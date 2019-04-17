import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';
import locale from '../../../../services/LocalisationService';
import { Character, TechnologyClass, technologyClassesWithKeys, TechnologyGroup } from '../../../../services/RolePlayingSystem';
import MouseFollowingPopup from '../../../../components/MouseFollowingPopup';

const COMPLEXITY_LEVELS = [0, 1, 2, 3, 4];

interface TechnologiesProps {
  character: Character;
  onAvailablePointsUpdate: () => any;
}

interface TechnologiesState {
  selectedTechnology: TechnologyClass | null;
}

export default class TechnologiesTab extends React.Component<TechnologiesProps, TechnologiesState> {
  constructor(props: TechnologiesProps) {
    super(props);

    this.state = {
      selectedTechnology: null,
    };

    this.onTechnologyToggle = this.onTechnologyToggle.bind(this);
    this.onTechnologySelect = this.onTechnologySelect.bind(this);
  }

  public onTechnologyToggle(technologyClass: TechnologyClass): void {
    const character = this.props.character;
    const isAdded = !!character.technologies[technologyClass.key];

    if (!isAdded && technologyClass.canBeAddedToCharacter(character)) {
      technologyClass.addToCharacter(character);
      this.props.onAvailablePointsUpdate();
      return;
    }

    if (isAdded && technologyClass.canBeRemovedFromCharacter(character)) {
      technologyClass.removeFromCharacter(character);
      this.props.onAvailablePointsUpdate();
      return;
    }
  }

  public renderTechnologyInfoPopup(technologyClass: TechnologyClass): React.ReactNode {
    return (
      <div className="technology-info-popup">
        {locale.getMessage(`rolePlayingSystem.technologies.${technologyClass.key}.summary`)}
      </div>
    );
  }

  public onTechnologySelect(technologyClass: TechnologyClass | null): void {
    if (technologyClass) {
      const popup = this.renderTechnologyInfoPopup(technologyClass);

      MouseFollowingPopup.render(popup);
    } else {
      MouseFollowingPopup.hide();
    }

    this.setState({ selectedTechnology: technologyClass });
  }

  public renderAvailablePointsSection(): React.ReactNode {
    const character = this.props.character;
    const availablePointsLabel = locale.getMessage('characterProfile.tabs.technologies.availablePointsLabel');
    const availablePoints = character.isLevelUpInProgress() ? Math.floor(character.availablePoints.technologies) : '-';

    return (
      <div className="technologies-tab__available-points">
        <span className="technologies-tab__available-points-label">{availablePointsLabel}</span>
        <span className="technologies-tab__available-points-value">{availablePoints}</span>
      </div>
    );
  }

  public renderPriceSection(): React.ReactNode {
    const character = this.props.character;
    const priceLabel = locale.getMessage('characterProfile.tabs.technologies.priceLabel');
    const price = character.isLevelUpInProgress() && this.state.selectedTechnology ?
      this.state.selectedTechnology.getPrice(character) :
      '-';

    return (
      <div className="technologies-tab__price">
        <span className="technologies-tab__price-value">{price}</span>
        <span className="technologies-tab__price-label">{priceLabel}</span>
      </div>
    );
  }

  public renderNameSection(): React.ReactNode {
    const name = this.state.selectedTechnology ?
      locale.getMessage(`rolePlayingSystem.technologies.${this.state.selectedTechnology.key}.name`) :
      '-';

    return (
      <div className="technologies-tab__name">{name}</div>
    );
  }

  public renderInfoSection(): React.ReactNode {
    return (
      <div className="technologies-tab__info">
        {this.renderAvailablePointsSection()}
        <div className="technologies-tab__price-and-name-wrapper">
          {this.renderPriceSection()}
          {this.renderNameSection()}
        </div>
      </div>
    );
  }

  public renderTechnologiesRow(technologyRow: TechnologyClass[]): React.ReactNode {
    const character = this.props.character;
    const technologies = COMPLEXITY_LEVELS.map((complexityLevel) => {
      const technologyClassIndex = _.findIndex(technologyRow, technologyClassInRow => technologyClassInRow.complexityLevel === complexityLevel);

      if (technologyClassIndex < 0) {
        return (<div key={`placeholder${complexityLevel}`} className="technologies-tab__technology-wrapper"/>);
      }

      const technologyClass = technologyRow[technologyClassIndex];
      const isAdded = !!character.technologies[technologyClass.key];
      const isLastInRow = technologyClassIndex === technologyRow.length - 1;

      const technologyClasses = classNames('technologies-tab__technology', `technologies-tab__technology_complexity-${complexityLevel}`, {
        'technologies-tab__technology_is-added': isAdded,
        'technologies-tab__technology_can-be-added': !isAdded && technologyClass.canBeAddedToCharacter(character),
        'technologies-tab__technology_can-be-removed': isAdded && technologyClass.canBeRemovedFromCharacter(character),
        'technologies-tab__technology_selected': this.state.selectedTechnology && this.state.selectedTechnology.key === technologyClass.key,
        'technologies-tab__technology_not-available': !isAdded && !technologyClass.canBeAddedToCharacter(character),
      });

      const arrowClasses = classNames('technologies-tab__technology-arrow', `technologies-tab__technology-arrow_complexity-${complexityLevel}`, {
        'technologies-tab__technology-arrow_filled': isAdded,
      });

      return (
        <div key={technologyClass.key} className="technologies-tab__technology-wrapper">
          <div
            className={technologyClasses}
            onMouseEnter={this.onTechnologySelect.bind(this, technologyClass)}
            onMouseLeave={this.onTechnologySelect.bind(this, null)}
            onClick={this.onTechnologyToggle.bind(this, technologyClass)}
          />
          {!isLastInRow ? <div className={arrowClasses}/> : null}
        </div>
      );
    });

    return (
      <div key={`${technologyRow[0].key}-row`} className="technologies-tab__technologies-row">{technologies}</div>
    );
  }

  public renderTechnologiesGroup(technologyGroup: TechnologyGroup, technologiesRows: TechnologyClass[][]): React.ReactNode {
    const groupLabel = locale.getMessage(`rolePlayingSystem.technologies.groups.${technologyGroup}.name`);

    return (
      <div key={technologyGroup} className={`technologies-tab__technologies-group technologies-tab__technologies-group_${_.kebabCase(technologyGroup)}`}>
        <span className="technologies-tab__technologies-group-label">{groupLabel}</span>
        {technologiesRows.map(technologyRow => this.renderTechnologiesRow(technologyRow))}
      </div>
    );
  }

  public renderTechnologiesRowsSection(): React.ReactNode {
    const groupedTechnologiesRows = _.groupBy(this.getTechnologiesRows(), technologyRow => technologyRow[0].group);
    const technologiesRows = Object.entries(groupedTechnologiesRows).map(
      ([technologyGroup, groupTechnologiesRows]) => this.renderTechnologiesGroup(technologyGroup as TechnologyGroup, groupTechnologiesRows),
    );

    return (
      <div className="technologies-tab__technologies-rows">{technologiesRows}</div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="technologies-tab">
        {this.renderInfoSection()}
        {this.renderTechnologiesRowsSection()}
      </div>
    );
  }

  private getTechnologiesRows(): TechnologyClass[][] {
    const technologies = Object.values(technologyClassesWithKeys);
    const rowHeads = technologies.filter(({ parent }) => !parent);

    return rowHeads.reduce(
      (technologiesRows, technologyClass) => {
        const row = [];
        let nextInRow: TechnologyClass | null = technologyClass;

        while (nextInRow !== null) {
          row.push(nextInRow);
          nextInRow = technologies.find(({ parent }) => parent === nextInRow) || null;
        }

        return [...technologiesRows, row];

      },
      [] as TechnologyClass[][],
    );
  }
}
