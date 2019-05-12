import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';
import locale from '../../services/LocalisationService';
import imagePreloader from '../../utils/ImagePreloader';
import CancelablePromise from '../../utils/CancelablePromise';
import BikerGirl from './resources/images/UndergroundBroadcast__BikerGirl.gif';
import BikerInTheRain from './resources/images/UndergroundBroadcast__BikerInTheRain.gif';
import BionicLimp from './resources/images/UndergroundBroadcast__BionicLimp.gif';
import Cam from './resources/images/UndergroundBroadcast__Cam.gif';
import Circuit from './resources/images/UndergroundBroadcast__Circuit.gif';
import ControlPanels from './resources/images/UndergroundBroadcast__ControlPanels.gif';
import CyborgGirl from './resources/images/UndergroundBroadcast__CyborgGirl.gif';
import Data from './resources/images/UndergroundBroadcast__Data.gif';
import Delivery from './resources/images/UndergroundBroadcast__Delivery.gif';
import DeLorean from './resources/images/UndergroundBroadcast__DeLorean.gif';
import Dendy from './resources/images/UndergroundBroadcast__Dendy.gif';
import HeadScheme from './resources/images/UndergroundBroadcast__HeadScheme.gif';
import Mallplex from './resources/images/UndergroundBroadcast__Mallplex.gif';
import NightCity from './resources/images/UndergroundBroadcast__NightCity.gif';
import PiramidInSpace from './resources/images/UndergroundBroadcast__PiramidInSpace.gif';
import PurpleWindow from './resources/images/UndergroundBroadcast__PurpleWindow.gif';
import ReplicantRed from './resources/images/UndergroundBroadcast__ReplicantRed.gif';
import SunsetRide from './resources/images/UndergroundBroadcast__SunsetRide.gif';
import UndergroundRebel from './resources/images/UndergroundBroadcast__UndergroundRebel.gif';
import VirtualGirl from './resources/images/UndergroundBroadcast__VirtualGirl.gif';

const delay = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout)) as Promise<void>;

const ENABLING_DELAY = 1000;
const CONNECTION_LOST_DELAY = 1000;
const ESTABLISHING_CONNECTION_DELAY = 1000;

interface Broadcast {
  readonly name: string;
  readonly url: string;
  readonly duration: number;
}

const broadcasts: Broadcast[] = [{
  name: 'BikerGirl',
  url: BikerGirl,
  duration: 4000,
}, {
  name: 'BikerInTheRain',
  url: BikerInTheRain,
  duration: 4000,
}, {
  name: 'BionicLimp',
  url: BionicLimp,
  duration: 4000,
}, {
  name: 'Cam',
  url: Cam,
  duration: 3000,
}, {
  name: 'Circuit',
  url: Circuit,
  duration: 4000,
}, {
  name: 'ControlPanels',
  url: ControlPanels,
  duration: 3000,
}, {
  name: 'CyborgGirl',
  url: CyborgGirl,
  duration: 5000,
}, {
  name: 'Data',
  url: Data,
  duration: 3000,
}, {
  name: 'Delivery',
  url: Delivery,
  duration: 5000,
}, {
  name: 'DeLorean',
  url: DeLorean,
  duration: 5000,
}, {
  name: 'Dendy',
  url: Dendy,
  duration: 5000,
}, {
  name: 'HeadScheme',
  url: HeadScheme,
  duration: 5000,
}, {
  name: 'Mallplex',
  url: Mallplex,
  duration: 7000,
}, {
  name: 'NightCity',
  url: NightCity,
  duration: 5000,
}, {
  name: 'PiramidInSpace',
  url: PiramidInSpace,
  duration: 4000,
}, {
  name: 'PurpleWindow',
  url: PurpleWindow,
  duration: 3000,
}, {
  name: 'ReplicantRed',
  url: ReplicantRed,
  duration: 3000,
}, {
  name: 'SunsetRide',
  url: SunsetRide,
  duration: 5000,
}, {
  name: 'UndergroundRebel',
  url: UndergroundRebel,
  duration: 5000,
}, {
  name: 'VirtualGirl',
  url: VirtualGirl,
  duration: 3000,
}];

enum ConnectionStatus {
  disabled = 'disabled',
  lost = 'lost',
  establishing = 'establishing',
  established = 'established',
}

interface UndergroundBroadcastProps {
  isDisplayed: boolean;
}

interface UndergroundBroadcastState {
  currentBroadcast: Broadcast | null;
  nextBroadcast: Broadcast | null;
  preloadingNextBroadcast: Promise<void>;
  connectionStatus: ConnectionStatus;

  waitingForEnabling: CancelablePromise<void>;
  waitingForConnection: CancelablePromise<void>;
  establishingConnection: CancelablePromise<void>;
  broadcasting: CancelablePromise<void>;
}

export default class UndergroundBroadcast extends React.Component<UndergroundBroadcastProps, UndergroundBroadcastState> {
  constructor(props: UndergroundBroadcastProps) {
    super(props);

    this.state = {
      currentBroadcast: null,
      nextBroadcast: null,
      preloadingNextBroadcast: Promise.resolve(),
      connectionStatus: ConnectionStatus.disabled,

      waitingForEnabling: new CancelablePromise(Promise.resolve()),
      waitingForConnection: new CancelablePromise(Promise.resolve()),
      establishingConnection: new CancelablePromise(Promise.resolve()),
      broadcasting: new CancelablePromise(Promise.resolve()),
    };
  }

  public shouldComponentUpdate(_nextProps: UndergroundBroadcastProps, nextState: UndergroundBroadcastState): boolean {
    return nextState.connectionStatus !== this.state.connectionStatus;
  }

  public componentWillReceiveProps(nextProps: UndergroundBroadcastProps): void {
    if (nextProps.isDisplayed && !this.props.isDisplayed) {
      this.enable();
    }

    if (!nextProps.isDisplayed && this.props.isDisplayed) {
      this.disable();
    }
  }

  public render(): React.ReactNode {
    const { connectionStatus, currentBroadcast } = this.state;
    const currentBroadcastName = currentBroadcast ? currentBroadcast.name : '';

    const message = locale.getMessage(`undergroundBroadcast.connectionStatus.${this.state.connectionStatus}`);

    const statusClasses = classNames('underground-broadcast__status', `underground-broadcast__status_${connectionStatus}`);
    const screenClasses = classNames('underground-broadcast__screen', {
      'underground-broadcast__screen_disabled': !this.isEnabled(),
      'underground-broadcast__screen_broadcasting': !!currentBroadcast,
      [`underground-broadcast__screen_${_.kebabCase(currentBroadcastName)}`]: !!currentBroadcast,
    });

    return (
      <div className="underground-broadcast">
        <div className={statusClasses}>
          <span className="underground-broadcast__status-message">{message}</span>
        </div>
        <div className={screenClasses}/>
      </div>
    );
  }

  public initNextBroadcast(): void {
    const nextBroadcastIndex = _.random(0, broadcasts.length - 1);
    const nextBroadcast = broadcasts[nextBroadcastIndex];
    const preloadingNextBroadcast = imagePreloader.preloadImage(nextBroadcast.url, true);

    this.setState({ nextBroadcast, preloadingNextBroadcast });
  }

  public async waitingForEnabling(): Promise<void> {
    const waitingForEnabling = new CancelablePromise(delay(ENABLING_DELAY));

    this.setState({ waitingForEnabling });

    await waitingForEnabling.promise();
  }

  public async waitForConnection(): Promise<void> {
    const waitingForConnection = new CancelablePromise(delay(CONNECTION_LOST_DELAY));

    this.setState({ waitingForConnection });

    await waitingForConnection.promise();
  }

  public async waitForEstablishing(): Promise<void> {
    const establishingConnection = new CancelablePromise(
      Promise.all([delay(ESTABLISHING_CONNECTION_DELAY), this.state.preloadingNextBroadcast]).then(_.noop),
    );

    this.setState({ establishingConnection });

    await establishingConnection.promise();
  }

  public async waitForBroadcasting(): Promise<void> {
    const broadcasting = new CancelablePromise(delay(this.state.currentBroadcast!.duration));

    this.setState({ broadcasting });

    await broadcasting.promise();
  }

  public async receiveNextBroadcast(): Promise<void> {
    try {
      await this.waitForConnection();

      this.setState({ connectionStatus: ConnectionStatus.establishing });

      await this.waitForEstablishing();

      this.setState({
        currentBroadcast: { ...this.state.nextBroadcast! },
        connectionStatus: ConnectionStatus.established,
      });
      this.initNextBroadcast();

      await this.waitForBroadcasting();

      this.setState({
        currentBroadcast: null,
        connectionStatus: ConnectionStatus.lost,
      });

      this.receiveNextBroadcast();
    } catch (error) {
      if (!CancelablePromise.isPromiseCanceledError(error)) {
        throw error;
      }
    }
  }

  public isEnabled(): boolean {
    return this.state.connectionStatus !== ConnectionStatus.disabled;
  }

  public async enable(): Promise<void> {
    try {
      await this.waitingForEnabling();
      this.setState({ connectionStatus: ConnectionStatus.lost });

      if (this.state.nextBroadcast === null) {
        this.initNextBroadcast();
      }

      this.receiveNextBroadcast();
    } catch (error) {
      if (!CancelablePromise.isPromiseCanceledError(error)) {
        throw error;
      }
    }
  }

  public disable(): void {
    this.state.waitingForEnabling.cancel();
    this.state.waitingForConnection.cancel();
    this.state.establishingConnection.cancel();
    this.state.broadcasting.cancel();

    this.setState({
      currentBroadcast: null,
      connectionStatus: ConnectionStatus.disabled,
    });
  }
}
