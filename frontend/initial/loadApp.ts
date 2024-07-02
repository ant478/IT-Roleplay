const imagesToLoad = [
  '/resources/images/App_Background.gif',
  '/resources/images/DefaultAvatar.jpg',
  '/resources/images/ErrorPage__Message.gif',
  '/resources/images/ErrorPage__Init.gif',
  '/resources/images/MainLoader__Background.gif',
  '/resources/images/UndergroundBroadcast__NoSignal.gif',
  '/resources/images/UndergroundBroadcast__WeakSignal.gif',
  '/resources/images/UndergroundBroadcast__Play.gif',
];

function showLoadingScreen(): void {
  const initialLoadingScreen = document.createElement('div');
  initialLoadingScreen.className = 'initial-loading-screen';

  initialLoadingScreen.innerHTML = `
    <div class="initial-loading-screen__spinner">
      <div class="initial-loading-screen__spinner-part-1">
        <div class="initial-loading-screen__spinner-part-2">
          <div class="initial-loading-screen__spinner-part-3">
            <div class="initial-loading-screen__spinner-part-4">
              <div class="initial-loading-screen__spinner-part-5"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="initial-loading-screen__spinner-message">Loading</div>
    </div>
  `;

  const body = document.getElementsByTagName('body')[0];
  body.appendChild(initialLoadingScreen);
}

function hideLoadingScreen(): void {
  const loader = document.getElementsByClassName('initial-loading-screen')[0];

  loader!.parentNode!.removeChild(loader!);
}

function loadImages(): Promise<any> {
  const loadingImages = imagesToLoad.map((path: string) => {
    return new Promise((resolve) => {
      const img = new Image();

      img.src = path;
      img.onload = resolve;
      img.onerror = resolve;
    });
  });

  return Promise.all(loadingImages);
}

function loadBundle(): Promise<void> {
  return new Promise((resolve) => {
    const bundle = document.createElement('script');

    bundle.src = '/main.js';
    bundle.onload = () => resolve();
    bundle.onerror = () => resolve();

    document.getElementsByTagName('html')[0].appendChild(bundle);
  });
}

function loadStyles(): Promise<void> {
  return new Promise((resolve) => {
    const style = document.createElement('link');

    style.rel = 'stylesheet';
    style.href = '/main.css';
    style.onload = () => resolve();
    style.onerror = () => resolve();

    document.getElementsByTagName('head')[0].appendChild(style);
  });
}

function delay(timeout: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function loadApp(): void {
  showLoadingScreen();

  // @ts-ignore
  if (IS_DEVELOPMENT) {
    const script = document.createElement('script');
    script.src = '/fps-meter/index.js';
    document.head.appendChild(script);
  }

  Promise.all([
    loadImages(),
    loadStyles(),
    loadBundle(),
  ]).then(() =>
    delay(1000),
  ).then(() =>
    hideLoadingScreen(),
  );
}
