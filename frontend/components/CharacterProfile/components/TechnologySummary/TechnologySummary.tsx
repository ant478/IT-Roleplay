import * as React from 'react';
import locale from '../../../../services/LocalisationService';

interface TechnologySummaryProps {
  messageKey: string;
}

export default class TechnologySummary extends React.PureComponent<TechnologySummaryProps, {}> {
  public render(): React.ReactNode {
    return (
      <div className="technology-summary">
        {locale.getMessage(this.props.messageKey)}
      </div>
    );
  }
}
