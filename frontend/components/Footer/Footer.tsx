import * as React from 'react';

export default class Header extends React.Component {
  public render(): React.ReactNode {
    return (
      <footer
        className="footer"
        data-htc-no-draggable="true"
      >
        {/* tslint:disable-next-line:jsx-no-multiline-js */}
        {/*
          // @ts-ignore */}
        <ant478-footer></ant478-footer>{/* tslint:disable-line:jsx-self-close */}
      </footer>
    );
  }
}
