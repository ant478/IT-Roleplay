import * as React from 'react';
import locale from '../../../../services/LocalisationService';
import { Character, AttributeClass, Attribute, attributeClasses } from '../../../../services/RolePlayingSystem';
import PropertyDescription from '../../components/PropertyDescription';
import IntegerPropertyControl from '../../components/IntegerPropertyControl';
import TabInfoSection from '../../components/TabInfoSection';
import OrangeScrollbar from '../../../OrangeScrollbar';

interface AttributesProps {
  character: Character;
  onAvailablePointsUpdate: () => any;
}

interface AttributesState {
  selectedAttribute: AttributeClass;
}

export default class AttributesTab extends React.Component<AttributesProps, AttributesState> {
  constructor(props: AttributesProps) {
    super(props);

    this.state = {
      selectedAttribute: attributeClasses[0],
    };
  }

  public onAttributeSelect = (attributeClass: AttributeClass): void => {
    this.setState({ selectedAttribute: attributeClass });
  }

  public onAttributeUp = (attribute: Attribute): void => {
    attribute.up();
    this.props.onAvailablePointsUpdate();
  }

  public onAttributeDown = (attribute: Attribute): void => {
    attribute.down();
    this.props.onAvailablePointsUpdate();
  }

  public renderInfoSection(): React.ReactNode {
    const attribute = this.props.character.attributes[this.state.selectedAttribute.key];
    const modifier = attribute.getModifier();

    const props = {
      leftSectionLabel: locale.getMessage('characterProfile.tabs.attributes.availablePointsLabel'),
      topRightSectionLabel: locale.getMessage('characterProfile.tabs.attributes.priceLabel'),
      bottomRightSectionLabel: locale.getMessage('characterProfile.tabs.attributes.modifierLabel'),
      leftSectionValue: this.props.character.isLevelUpRoleSelected() ? Math.floor(this.props.character.availablePoints.attributes) : '-',
      topRightSectionValue: this.props.character.isLevelUpRoleSelected() ? attribute.getPrice() : '-',
      bottomRightSectionValue: modifier > 0 ? `+${modifier}` : modifier,
    };

    return <TabInfoSection {...props}/>;
  }

  public renderControl(attributeClass: AttributeClass): React.ReactNode {
    const attribute = this.props.character.attributes[attributeClass.key];
    const flags = {
      canBeUpped: attribute.canBeUpped(),
      canBeDowned: attribute.canBeDowned(),
    };

    return (
      <li key={attribute.getKey()}  className="attributes-tab__control">
        <IntegerPropertyControl
          label={locale.getMessage(`rolePlayingSystem.attributes.${attribute.getKey()}.name`)}
          value={attribute.getCleanValue()}
          onMouseEnter={this.onAttributeSelect.bind(this, attributeClass)}
          onDown={this.onAttributeDown.bind(this, attribute)}
          onUp={this.onAttributeUp.bind(this, attribute)}
          flags={flags}
        />
      </li>
    );
  }

  public renderControlsSection(): React.ReactNode {
    return (
      <div className="attributes-tab__controls">
        <ul className="attributes-tab__controls-list">
          <OrangeScrollbar>
            {attributeClasses.map(attributeClass => this.renderControl(attributeClass))}
          </OrangeScrollbar>
        </ul>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="attributes-tab">
        {this.renderInfoSection()}
        <div className="attributes-tab__controls-and-description-wrapper">
          {this.renderControlsSection()}
          <PropertyDescription messageKey={`rolePlayingSystem.attributes.${this.state.selectedAttribute.key}.description`}/>
        </div>
      </div>
    );
  }
}
