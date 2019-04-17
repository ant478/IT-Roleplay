import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';
import { Character, perkClassesWithKeys, PerkClass } from '../../../../services/RolePlayingSystem';
import locale from '../../../../services/LocalisationService';

const COMPLEXITY_LEVELS = [0, 1, 2];

interface PerksProps {
  character: Character;
  onAvailablePointsUpdate: () => any;
}

interface PerksState {
  selectedPerk: PerkClass;
}

export default class PerksTab extends React.Component<PerksProps, PerksState> {
  constructor(props: PerksProps) {
    super(props);

    this.state = {
      selectedPerk: Object.values(perkClassesWithKeys).find(Perk => Perk.isVisibleForCharacter(props.character))!,
    };

    this.onPerkToggle = this.onPerkToggle.bind(this);
    this.onPerkSelect = this.onPerkSelect.bind(this);
  }

  public onPerkToggle(perkClass: PerkClass): void {
    const character = this.props.character;
    const isAdded = !!character.perks[perkClass.key];

    if (!isAdded && perkClass.canBeAddedToCharacter(character)) {
      perkClass.addToCharacter(character);
      this.props.onAvailablePointsUpdate();
      return;
    }

    if (isAdded && perkClass.canBeRemovedFromCharacter(character)) {
      perkClass.removeFromCharacter(character);
      this.props.onAvailablePointsUpdate();
      return;
    }
  }

  public onPerkSelect(perkClass: PerkClass): void {
    this.setState({ selectedPerk: perkClass });
  }

  public renderAvailablePointsSection(): React.ReactNode {
    const character = this.props.character;
    const availablePointsLabel = locale.getMessage('characterProfile.tabs.perks.availablePointsLabel');
    const availablePoints = character.isLevelUpInProgress() ? Math.floor(character.availablePoints.perks) : '-';

    return (
      <div className="perks-tab__available-points">
        <span className="perks-tab__available-points-label">{availablePointsLabel}</span>
        <span className="perks-tab__available-points-value">{availablePoints}</span>
      </div>
    );
  }

  public renderPriceSection(): React.ReactNode {
    const character = this.props.character;
    const priceLabel = locale.getMessage('characterProfile.tabs.perks.priceLabel');
    const price = character.isLevelUpInProgress() ? '1' : '-';

    return (
      <div className="perks-tab__price">
        <span className="perks-tab__price-value">{price}</span>
        <span className="perks-tab__price-label">{priceLabel}</span>
      </div>
    );
  }

  public renderNameSection(): React.ReactNode {
    return (
      <div className="technologies-tab__name">
        {locale.getMessage(`rolePlayingSystem.perks.${this.state.selectedPerk.key}.name`)}
      </div>
    );
  }

  public renderInfoSection(): React.ReactNode {
    return (
      <div className="perks-tab__info">
        {this.renderAvailablePointsSection()}
        <div className="perks-tab__price-and-name-wrapper">
          {this.renderPriceSection()}
          {this.renderNameSection()}
        </div>
      </div>
    );
  }

  public renderDescriptionSection(): React.ReactNode {
    return (
      <div className="perks-tab__description">
        <div className="perks-tab__description-text-container">
          <div className="perks-tab__description-text">
            {locale.getMessage(`rolePlayingSystem.perks.${this.state.selectedPerk.key}.description`)}
          </div>
        </div>
      </div>
    );
  }

  public renderPerksRow(perksRow: PerkClass[]): React.ReactNode {
    const character = this.props.character;
    const perks = COMPLEXITY_LEVELS.map((complexityLevel) => {
      const perkClassIndex = _.findIndex(perksRow, perkClassInRow => perkClassInRow.complexityLevel === complexityLevel);

      if (perkClassIndex < 0) {
        return (<div key={`placeholder${complexityLevel}`} className="perks-tab__perk-wrapper"/>);
      }

      const perkClass = perksRow[perkClassIndex];
      const isAdded = !!character.perks[perkClass.key];
      const isLastInRow = perkClassIndex === perksRow.length - 1;

      const perkClasses = classNames('perk-tab__perk', `perk-tab__perk_complexity-${complexityLevel}`, {
        'perk-tab__perk_is-added': isAdded,
        'perk-tab__perk_can-be-added': !isAdded && perkClass.canBeAddedToCharacter(character),
        'perk-tab__perk_can-be-removed': isAdded && perkClass.canBeRemovedFromCharacter(character),
        'perk-tab__perk_selected': this.state.selectedPerk.key === perkClass.key,
        'perk-tab__perk_not-available': !isAdded && !perkClass.canBeAddedToCharacter(character),
      });

      const arrowClasses = classNames('perk-tab__perk-arrow', `perk-tab__perk-arrow_complexity-${complexityLevel}`, {
        'perk-tab__perk-arrow_filled': isAdded,
      });

      return (
        <div key={perkClass.key} className="perk-tab__perk-wrapper">
          <div
            className={perkClasses}
            onMouseEnter={this.onPerkSelect.bind(this, perkClass)}
            onClick={this.onPerkToggle.bind(this, perkClass)}
          />
          {!isLastInRow ? <div className={arrowClasses}/> : null}
        </div>
      );
    });

    return (
      <div key={`${perksRow[0].key}-row`} className={`perks-tab__perk-row perks-tab__perk-row_${_.kebabCase(perksRow[0].usageType)}`}>
        {perks}
      </div>
    );
  }

  public renderPerksRowsSection(): React.ReactNode {
    const perkRows = this.getPerksRows();

    return (
      <div className="perks-tab__perks-rows">
        {perkRows.map(perksRow => this.renderPerksRow(perksRow))}
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="perks-tab">
        {this.renderInfoSection()}
        {this.renderPerksRowsSection()}
        {this.renderDescriptionSection()}
      </div>
    );
  }

  private getPerksRows(): PerkClass[][] {
    const perks = Object.values(perkClassesWithKeys).filter(Perk => Perk.isVisibleForCharacter(this.props.character));
    const rowHeads = perks.filter(({ parent }) => !parent);

    return rowHeads.reduce(
      (perksRows, perkClass) => {
        const row = [];
        let nextInRow: PerkClass | null = perkClass;

        while (nextInRow !== null) {
          row.push(nextInRow);
          nextInRow = perks.find(({ parent }) => parent === nextInRow) || null;
        }

        return [...perksRows, row];
      },
      [] as PerkClass[][],
    );
  }
}
