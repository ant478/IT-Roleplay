import * as React from 'react';
import locale from '../../../../services/LocalisationService';
import OrangeScrollbar from '../../../OrangeScrollbar';

interface PropertyDescriptionProps {
  messageKey: string;
}

export default class PropertyDescription extends React.PureComponent<PropertyDescriptionProps, {}> {
  public render(): React.ReactNode {
    return (
      <div className="property-description">
        <OrangeScrollbar>
          <div className="property-description__text">
            {locale.getMessage(this.props.messageKey)}
          </div>
        </OrangeScrollbar>
      </div>
    );
  }
}
