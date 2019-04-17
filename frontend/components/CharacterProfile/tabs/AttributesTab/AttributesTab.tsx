import * as React from 'react';
import classNames from 'classnames';
import locale from '../../../../services/LocalisationService';
import { Character, AttributeClass, Attribute, attributeClassesWithKeys } from '../../../../services/RolePlayingSystem';

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
      selectedAttribute: Object.values(attributeClassesWithKeys)[0],
    };

    this.onAttributeSelect = this.onAttributeSelect.bind(this);
    this.onAttributeUp = this.onAttributeUp.bind(this);
    this.onAttributeDown = this.onAttributeDown.bind(this);
  }

  public onAttributeSelect(attributeClass: AttributeClass): void {
    this.setState({ selectedAttribute: attributeClass });
  }

  public onAttributeUp(attribute: Attribute): void {
    attribute.up();
    this.props.onAvailablePointsUpdate();
  }

  public onAttributeDown(attribute: Attribute): void {
    attribute.down();
    this.props.onAvailablePointsUpdate();
  }

  public renderAvailablePointsSection(): React.ReactNode {
    const character = this.props.character;
    const availablePointsLabel = locale.getMessage('characterProfile.tabs.attributes.availablePointsLabel');
    const availablePoints = character.isLevelUpInProgress() ? Math.floor(character.availablePoints.attributes) : '-';

    return (
      <div className="attributes-tab__available-points">
        <span className="attributes-tab__available-points-label">{availablePointsLabel}</span>
        <span className="attributes-tab__available-points-value">{availablePoints}</span>
      </div>
    );
  }

  public renderPriceSection(): React.ReactNode {
    const character = this.props.character;
    const priceLabel = locale.getMessage('characterProfile.tabs.attributes.priceLabel');
    const price = character.isLevelUpInProgress() ?
      character.attributes[this.state.selectedAttribute.key].getPrice() :
      '-';

    return (
      <div className="attributes-tab__price">
        <span className="attributes-tab__price-value">{price}</span>
        <span className="attributes-tab__price-label">{priceLabel}</span>
      </div>
    );
  }

  public renderModifierSection(): React.ReactNode {
    const character = this.props.character;
    const charactersAttribute = character.attributes[this.state.selectedAttribute.key];
    const modifierLabel = locale.getMessage('characterProfile.tabs.attributes.modifierLabel');
    const modifier = charactersAttribute.getModifier();

    return (
      <div className="attributes-tab__modifier">
        <span className="attributes-tab__modifier-value">{modifier > 0 ? `+${modifier}` : modifier}</span>
        <span className="attributes-tab__modifier-label">{modifierLabel}</span>
      </div>
    );
  }

  public renderInfoSection(): React.ReactNode {
    return (
      <div className="attributes-tab__info">
        {this.renderAvailablePointsSection()}
        <div className="attributes-tab__price-and-modifier-wrapper">
          {this.renderPriceSection()}
          {this.renderModifierSection()}
        </div>
      </div>
    );
  }

  public renderControl(attributeClass: AttributeClass): React.ReactNode {
    const attribute = this.props.character.attributes[attributeClass.key];
    const controlLabel = locale.getMessage(`rolePlayingSystem.attributes.${attribute.getKey()}.name`);
    const controlClasses = classNames('attributes-tab__control', {
      'attributes-tab__control_can-be-upped': attribute.canBeUpped(),
      'attributes-tab__control_can-be-downed': attribute.canBeDowned(),
      'attributes-tab__control_selected': attribute.getKey() === this.state.selectedAttribute.key,
    });

    return (
      <li key={attribute.getKey()} className={controlClasses} onMouseEnter={this.onAttributeSelect.bind(this, attributeClass)}>
        <span className="attributes-tab__control-label">{controlLabel}</span>
        <div className="attributes-tab__control-value-area">
          <div className="attributes-tab__control-down" onClick={this.onAttributeDown.bind(this, attribute)}/>
          <span className="attributes-tab__control-value">{attribute.getCleanValue()}</span>
          <div className="attributes-tab__control-up" onClick={this.onAttributeUp.bind(this, attribute)}/>
        </div>
      </li>
    );
  }

  public renderControlsSection(): React.ReactNode {
    const controls = Object.values(attributeClassesWithKeys).map(attributeClass =>
      this.renderControl(attributeClass),
    );

    return (
      <div className="attributes-tab__controls">
        <ul className="attributes-tab__controls-list">
          {controls}
        </ul>
      </div>
    );
  }

  public renderDescriptionSection(): React.ReactNode {
    return (
      <div className="attributes-tab__description">
        <div className="attributes-tab__description-text-container">
          <div className="attributes-tab__description-text">
            {locale.getMessage(`rolePlayingSystem.attributes.${this.state.selectedAttribute.key}.description`)}
          </div>
        </div>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="attributes-tab">
        {this.renderInfoSection()}
        {this.renderControlsSection()}
        {this.renderDescriptionSection()}
      </div>
    );
  }
}
