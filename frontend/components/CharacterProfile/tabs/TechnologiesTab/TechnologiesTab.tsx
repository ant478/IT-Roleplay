import * as _ from 'lodash';
import * as React from 'react';
import locale from '../../../../services/LocalisationService';
import { Character, TechnologyClass, technologyClasses, TechnologyGroup } from '../../../../services/RolePlayingSystem';
import MouseFollowingPopup from '../../../../components/MouseFollowingPopup';
import TabInfoSection from '../../components/TabInfoSection';
import TechnologySummary from '../../components/TechnologySummary';
import OrangeScrollbar from '../../../OrangeScrollbar';
import buildRows from '../../helpers/buildRows';
import TechnologiesRow from './sections/TechnologiesRow';

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
      if (MouseFollowingPopup.isDisplayed()) {
        return;
      }

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

  public renderTechnologiesRow(technologiesRow: TechnologyClass[]): React.ReactNode {
    return (
      <TechnologiesRow
        key={`${technologiesRow[0].key}-row`}
        character={this.props.character}
        technologiesRow={technologiesRow}
        onTechnologySelect={this.onTechnologySelect}
        onTechnologyToggle={this.onTechnologyToggle}
      />
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
