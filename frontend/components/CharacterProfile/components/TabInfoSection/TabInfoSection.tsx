import * as React from 'react';

interface TabInfoSectionProps {
  leftSectionLabel: string;
  topRightSectionLabel?: string;
  bottomRightSectionLabel?: string ;
  leftSectionValue: string | number;
  topRightSectionValue: string | number;
  bottomRightSectionValue: string | number;
}

export default class TabInfoSection extends React.PureComponent<TabInfoSectionProps, {}> {
  public renderLeftSection(): React.ReactNode {
    return (
      <div className="tab-info-section__left">
        <span className="tab-info-section__left-label">{this.props.leftSectionLabel}</span>
        <span className="tab-info-section__left-value">{this.props.leftSectionValue}</span>
      </div>
    );
  }

  public renderTopRightSection(): React.ReactNode {
    const topRightLabel = this.props.topRightSectionLabel ?
      <span className="tab-info-section__top-right-label">{this.props.topRightSectionLabel}</span> :
      null;

    return (
      <div className="tab-info-section__top-right">
        <span className="tab-info-section__top-right-value">{this.props.topRightSectionValue}</span>
        {topRightLabel}
      </div>
    );
  }

  public renderBottomRightSection(): React.ReactNode {
    const bottomRightLabel = this.props.bottomRightSectionLabel ?
      <span className="tab-info-section__bottom-right-label">{this.props.bottomRightSectionLabel}</span> :
      null;

    return (
      <div className="tab-info-section__bottom-right">
        <span className="tab-info-section__bottom-right-value">{this.props.bottomRightSectionValue}</span>
        {bottomRightLabel}
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="tab-info-section">
        {this.renderLeftSection()}
        <div className="tab-info-section__right">
          {this.renderTopRightSection()}
          {this.renderBottomRightSection()}
        </div>
      </div>
    );
  }
}
