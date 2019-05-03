const CANCEL_ERROR_MESSAGE = 'CancelablePromise: Canceled';

export default class CancelablePromise<T> {
  public static isPromiseCanceledError(error: Error): boolean {
    return error.message === CANCEL_ERROR_MESSAGE;
  }

  private _isCanceled: boolean = false;
  private readonly _promise: Promise<T>;

  constructor(promise: Promise<T>) {
    this._promise = new Promise((resolve, reject) => {
      promise.then(
        result => this._isCanceled ? reject(new Error(CANCEL_ERROR_MESSAGE)) : resolve(result),
      ).catch(
        error => this._isCanceled ? reject(new Error(CANCEL_ERROR_MESSAGE)) : reject(error),
      );
    }) as Promise<T>;
  }

  public promise(): Promise<T> {
    return this._promise;
  }

  public cancel(): void {
    this._isCanceled = true;
  }
}
