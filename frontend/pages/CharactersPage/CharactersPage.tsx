import * as _ from 'lodash';
import * as React from 'react';
import CharactersList from '../../components/CharactersList';
import characterService, { ShortCharacterData } from '../../services/Api/CharacterService';
import locale from '../../services/LocalisationService';
import { RouteComponentProps, match } from 'react-router-dom';
import MainLoader from '../../components/MainLoader';
import imagePreloader from '../../utils/ImagePreloader';
import { getCharactersListAvatarUrl } from '../../services/CharacterAvatarService';
import OrangeScrollbar from '../../components/OrangeScrollbar';
import PageHeader from '../../components/PageHeader';
import { positionValues } from 'react-custom-scrollbars';
import SimpleLoader from '../../components/SimpleLoader';
import CancelablePromise from '../../utils/CancelablePromise';

const BATCH_SIZE = 10;

interface CharactersPageProps extends RouteComponentProps {
  characters: ShortCharacterData[];
}

interface CharactersPageState {
  preloadedBatch: ShortCharacterData[] | null;
  updatingNextBatch: Promise<void>;
  loadingNextBatch: CancelablePromise<ShortCharacterData[]>;
  isGettingCharactersInProgress: boolean;
  isBatchLoading: boolean;
  isLastBatchLoaded: boolean;
  loadedBatchesCount: number;
  characters: ShortCharacterData[];
}

export default class CharactersPage extends React.Component<CharactersPageProps, CharactersPageState> {
  public static async preload(_matchParams: match): Promise<Partial<CharactersPageProps>> {
    const characters = await MainLoader.withLoader(async () => {
      const shortCharactersData = await CharactersPage.loadBatch(0);

      await this.preloadAvatars(shortCharactersData);

      return shortCharactersData;
    });

    return { characters };
  }

  private static async preloadAvatars(shortCharacterData: ShortCharacterData[]): Promise<void> {
    await Promise.all(
      shortCharacterData
        .filter(character => !!character.avatarId)
        .map(character => imagePreloader.preloadImage(getCharactersListAvatarUrl(character.avatarId!), true)),
    );
  }

  private static loadBatch(batchIndex: number): Promise<ShortCharacterData[]> {
    return characterService.getCharacters({
      offset: batchIndex * BATCH_SIZE,
      limit: BATCH_SIZE,
    });
  }

  constructor(props: CharactersPageProps) {
    super(props);

    this.state = {
      preloadedBatch: null,
      updatingNextBatch: Promise.resolve(),
      loadingNextBatch: new CancelablePromise(Promise.resolve([])),
      isGettingCharactersInProgress: false,
      isBatchLoading: false,
      isLastBatchLoaded: props.characters.length < BATCH_SIZE,
      loadedBatchesCount: 1,
      characters: [...props.characters],
    };
  }

  public shouldComponentUpdate(_nextProps: CharactersPageProps, nextState: CharactersPageState): boolean {
    const areCharactersChanged = nextState.characters !== this.state.characters;
    const isGettingCharactersStateChanged = nextState.isGettingCharactersInProgress !== this.state.isGettingCharactersInProgress;

    return areCharactersChanged || isGettingCharactersStateChanged;
  }

  public componentWillUnmount(): void {
    this.state.loadingNextBatch.cancel();
  }

  public componentDidMount(): void {
    document.title = locale.getMessage('pageTitle.charactersList');
    this.preloadNextBatch();
  }

  public handleClickOnCharacter = (characterId: number): void  => {
    this.props.history.push(`/characters/${characterId}`);
  }

  public handleScroll = (values: positionValues): void => {
    const { top } = values;
    const { loadedBatchesCount } = this.state;

    if (top > 1 - 0.5 / loadedBatchesCount) {
      this.getMoreCharacters();
    }
  }

  public renderLoader(): React.ReactNode {
    if (!this.state.isGettingCharactersInProgress) {
      return null;
    }

    return (
      <div className="characters-page__infinite-scroll-loader">
        <SimpleLoader/>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="page characters-page">
        <OrangeScrollbar onUpdate={this.handleScroll}>
          <PageHeader message={locale.getMessage('charactersPage.header')}/>
          <div className="characters-page__content-wrapper">
            <CharactersList characters={this.state.characters} onCharacterClick={this.handleClickOnCharacter}/>
            {this.renderLoader()}
          </div>
        </OrangeScrollbar>
      </div>
    );
  }

  private async preloadNextBatch(): Promise<void> {
    const { isBatchLoading, isLastBatchLoaded, preloadedBatch, loadedBatchesCount } = this.state;

    if (isBatchLoading || isLastBatchLoaded || preloadedBatch) {
      return;
    }

    const loadingNextBatch = new CancelablePromise((async () => {
      const nextBatch = await CharactersPage.loadBatch(loadedBatchesCount);
      await CharactersPage.preloadAvatars(nextBatch);

      return nextBatch;
    })());

    const updatingNextBatch = loadingNextBatch.promise().then((nextBatch) => {
      this.setState({
        preloadedBatch: nextBatch,
        isBatchLoading: false,
        loadedBatchesCount: loadedBatchesCount + 1,
        isLastBatchLoaded: nextBatch.length < BATCH_SIZE,
      });
    });

    updatingNextBatch.catch((error) => {
      if (!CancelablePromise.isPromiseCanceledError(error)) {
        throw error;
      }
    });

    this.setState({
      loadingNextBatch,
      updatingNextBatch,
      isBatchLoading: true,
    });
  }

  private async getMoreCharacters(): Promise<void> {
    const { updatingNextBatch, isGettingCharactersInProgress, isBatchLoading, preloadedBatch } = this.state;

    if (isGettingCharactersInProgress || !isBatchLoading && !preloadedBatch) {
      return;
    }

    this.setState({ isGettingCharactersInProgress: true });

    try {
      await updatingNextBatch;

      this.setState({
        isGettingCharactersInProgress: false,
        characters: _.uniqBy([...this.state.characters, ...this.state.preloadedBatch!], 'id'),
        preloadedBatch: null,
      });

      this.preloadNextBatch();
    } catch (error) {
      if (!CancelablePromise.isPromiseCanceledError(error)) {
        throw error;
      }
    }
  }
}
