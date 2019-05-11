import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';
import { Character, perkClasses, PerkClass } from '../../../../services/RolePlayingSystem';
import locale from '../../../../services/LocalisationService';
import PropertyDescription from '../../components/PropertyDescription';
import TabInfoSection from '../../components/TabInfoSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import perkIcons from './config/perkIcons';
import romanNumbers from '../../config/romanNumbers';
import OrangeScrollbar from '../../../OrangeScrollbar';
import buildRows from '../../helpers/buildRows';

const COMPLEXITY_LEVELS = [0, 1, 2];
type PerkLevel = 1 | 2 | 3;

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
      selectedPerk: perkClasses.find(Perk => Perk.isVisibleForCharacter(props.character))!,
    };
  }

  public onPerkToggle = (perkClass: PerkClass): void => {
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

  public onPerkSelect = (perkClass: PerkClass): void => {
    this.setState({ selectedPerk: perkClass });
  }

  public renderInfoSection(): React.ReactNode {
    const character = this.props.character;
    const isLevelUpInProgress = character.isLevelUpRoleSelected();

    const props = {
      leftSectionLabel: locale.getMessage('characterProfile.tabs.perks.availablePointsLabel'),
      topRightSectionLabel: locale.getMessage('characterProfile.tabs.perks.priceLabel'),
      leftSectionValue: isLevelUpInProgress ? Math.floor(this.props.character.availablePoints.perks) : '-',
      topRightSectionValue: isLevelUpInProgress ? 1 : '-',
      bottomRightSectionValue: locale.getMessage(`rolePlayingSystem.perks.${this.state.selectedPerk.key}.name`),
    };

    return <TabInfoSection {...props}/>;
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
      const isNotLastInRow = perkClassIndex !== perksRow.length - 1;

      const perkClassNames = classNames('perk-tab__perk', `perk-tab__perk_complexity-${complexityLevel}`, {
        'perk-tab__perk_is-added': isAdded,
        'perk-tab__perk_can-be-added': !isAdded && perkClass.canBeAddedToCharacter(character),
        'perk-tab__perk_can-be-removed': isAdded && perkClass.canBeRemovedFromCharacter(character),
        'perk-tab__perk_not-available': !isAdded && !perkClass.canBeAddedToCharacter(character),
      });

      const nextInRow = isNotLastInRow ? perksRow[perkClassIndex + 1] : null;
      const isArrowHighLighted = nextInRow ? !!character.perks[nextInRow.key] || nextInRow.canBeAddedToCharacter(character) : false;
      const level = (perkClassIndex + 1) as PerkLevel;

      const arrowClasses = classNames('perk-tab__perk-arrow', `perk-tab__perk-arrow_complexity-${complexityLevel}`, {
        'perk-tab__perk-arrow_not-available': !isArrowHighLighted,
      });

      return (
        <div key={perkClass.key} className="perk-tab__perk-wrapper">
          <div
            className={perkClassNames}
            data-level={romanNumbers[level]}
            onMouseEnter={this.onPerkSelect.bind(this, perkClass)}
            onClick={this.onPerkToggle.bind(this, perkClass)}
          >
            <FontAwesomeIcon className="perk-tab__icon" icon={perkIcons[perkClass.key]}/>
          </div>
          {isNotLastInRow ? <div className={arrowClasses}/> : null}
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
    return (
      <div className="perks-tab__perks-rows-wrapper">
        <OrangeScrollbar>
          <div className="perks-tab__perks-rows">
            {this.getPerksRows().map(perksRow => this.renderPerksRow(perksRow))}
          </div>
        </OrangeScrollbar>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="perks-tab">
        {this.renderInfoSection()}
        <div className="perks-tab__controls-and-description-wrapper">
          {this.renderPerksRowsSection()}
          <PropertyDescription messageKey={`rolePlayingSystem.perks.${this.state.selectedPerk.key}.description`}/>
        </div>
      </div>
    );
  }

  private getPerksRows(): PerkClass[][] {
    const perks = perkClasses.filter(Perk => Perk.isVisibleForCharacter(this.props.character));

    return buildRows(perks);
  }
}
