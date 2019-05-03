import * as _ from 'lodash';
import * as React from 'react';
import locale from '../../services/LocalisationService';

interface MainLoaderProps {
  isInitiallyDisplayed: boolean;
}

interface MainLoaderState {
  isDisplayed: boolean;
}

type Async = Promise<any>;

const delay = (timeout: number) => new Promise((resolve) => { setTimeout(() => resolve(), timeout); });

const MIN_DELAY_TO_SHOW = 500;
const MIN_DISPLAY_TIME = 1000;

export default class MainLoader extends React.Component<MainLoaderProps, MainLoaderState> {
  public static async withLoader<T>(asyncCallback: () => Promise<T>): Promise<T> {
    this.show();

    const asyncOperation = asyncCallback();
    this.asincs.push(asyncOperation);

    Promise.all(this.asincs).then(() => {
      _.remove(this.asincs, async => async === asyncOperation);

      if (this.asincs.length === 0) {
        this.hide();
      }
    }).finally(() => {
      this.asincs = [];
    });

    return asyncOperation;
  }

  public static show(): void {
    if (!this.isDisplayed() && !this.timeoutToShow) {
      this.timeoutToShow = setTimeout(
        () => {
          this.showImmediately();
          this.timeoutToShow = null;
          this.promiseToHide = delay(MIN_DISPLAY_TIME);
        },
        MIN_DELAY_TO_SHOW);
    }
  }

  public static hide(): void {
    if (this.timeoutToShow) {
      clearTimeout(this.timeoutToShow);
      this.timeoutToShow = null;
    }

    if (this.isDisplayed()) {
      this.promiseToHide.then(() => this.hideImmediately());
    }
  }

  public static isDisplayed(): boolean {
    return this.singletonInstance!.state.isDisplayed;
  }

  private static asincs: Async[] = [];
  private static timeoutToShow: NodeJS.Timeout | null = null;
  private static promiseToHide: Promise<any> = delay(MIN_DISPLAY_TIME);
  private static singletonInstance: MainLoader | null = null;

  private static showImmediately(): void {
    this.singletonInstance!.setState({ isDisplayed: true });
  }

  private static hideImmediately(): void {
    this.singletonInstance!.setState({ isDisplayed: false });
  }

  constructor(props: MainLoaderProps) {
    super(props);

    this.state = {
      isDisplayed: this.props.isInitiallyDisplayed,
    };

    MainLoader.singletonInstance = this;
  }

  public shouldComponentUpdate(_nextProps: {}, nextState: MainLoaderState): boolean {
    return nextState.isDisplayed !== this.state.isDisplayed;
  }

  public render(): React.ReactNode {
    if (!this.state.isDisplayed) {
      return null;
    }

    return (
      <div className="main-loader">
        <span className="main-loader__message">{locale.getMessage('mainLoader.loadingMessage')}</span>
      </div>
    );
  }
}
