import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';
import locale from '../../../../services/LocalisationService';
import { Character, TechnologyClass, technologyClasses, TechnologyGroup } from '../../../../services/RolePlayingSystem';
import MouseFollowingPopup from '../../../../components/MouseFollowingPopup';
import TabInfoSection from '../../components/TabInfoSection';
import TechnologySummary from '../../components/TechnologySummary';
import romanNumbers from '../../config/romanNumbers';
import technologyIcons from '../../config/technologyIcons';
import OrangeScrollbar from '../../../OrangeScrollbar';
import buildRows from '../../helpers/buildRows';

const COMPLEXITY_LEVELS = [0, 1, 2, 3, 4];
type TechnologyLevel = 1 | 2 | 3 | 4 | 5;

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
  }

  public onTechnologyToggle = (technologyClass: TechnologyClass): void => {
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

  public onTechnologySelect = (technologyClass: TechnologyClass | null): void => {
    if (technologyClass) {
      MouseFollowingPopup.render((
        <TechnologySummary messageKey={`rolePlayingSystem.technologies.${technologyClass.key}.summary`} />
      ));
    } else {
      MouseFollowingPopup.hide();
    }

    this.setState({ selectedTechnology: technologyClass });
  }

  public renderInfoSection(): React.ReactNode {
    const character = this.props.character;
    const isLevelUpInProgress = character.isLevelUpRoleSelected();

    const price = isLevelUpInProgress && this.state.selectedTechnology ?
      this.state.selectedTechnology.getPrice(character) :
      '-';

    const technologyName = this.state.selectedTechnology ?
      locale.getMessage(`rolePlayingSystem.technologies.${this.state.selectedTechnology.key}.name`) :
      '-';

    const props = {
      leftSectionLabel: locale.getMessage('characterProfile.tabs.technologies.availablePointsLabel'),
      topRightSectionLabel: locale.getMessage('characterProfile.tabs.technologies.priceLabel'),
      leftSectionValue: isLevelUpInProgress ? Math.floor(this.props.character.availablePoints.technologies) : '-',
      topRightSectionValue: price,
      bottomRightSectionValue: technologyName,
    };

    return <TabInfoSection {...props}/>;
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
      const isNotLastInRow = technologyClassIndex !== technologyRow.length - 1;

      const technologyClassNames = classNames('technologies-tab__technology', `technologies-tab__technology_complexity-${complexityLevel}`, {
        'technologies-tab__technology_is-added': isAdded,
        'technologies-tab__technology_can-be-added': !isAdded && technologyClass.canBeAddedToCharacter(character),
        'technologies-tab__technology_can-be-removed': isAdded && technologyClass.canBeRemovedFromCharacter(character),
        'technologies-tab__technology_not-available': !isAdded && !technologyClass.canBeAddedToCharacter(character),
      });

      const nextInRow = isNotLastInRow ? technologyRow[technologyClassIndex + 1] : null;
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
            data-level={romanNumbers[level]}
            onMouseEnter={this.onTechnologySelect.bind(this, technologyClass)}
            onMouseLeave={this.onTechnologySelect.bind(this, null)}
            onClick={this.onTechnologyToggle.bind(this, technologyClass)}
          >
            <div className="technologies-tab__icon"><TechnologyIcon/></div>
          </div>
          {isNotLastInRow ? <div className={arrowClasses}/> : null}
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
    const groupedTechnologiesRows = _.groupBy(buildRows(technologyClasses), technologyRow => technologyRow[0].group);
    const technologiesRows = Object.entries(groupedTechnologiesRows).map(
      ([technologyGroup, groupTechnologiesRows]) => this.renderTechnologiesGroup(technologyGroup as TechnologyGroup, groupTechnologiesRows),
    );

    return (
      <div className="technologies-tab__technologies-rows-wrapper">
        <OrangeScrollbar>
          <div className="technologies-tab__technologies-rows">
            {technologiesRows}
          </div>
        </OrangeScrollbar>
      </div>
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
}
