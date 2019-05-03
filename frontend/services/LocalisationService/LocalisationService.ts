import * as _ from 'lodash';
import russian from './locales/russian';

enum localeKey {
  russian = 'ru',
}

type LocaleConfig = object;

const locales: Record<localeKey, LocaleConfig> = {
  [localeKey.russian]: russian,
};

export class LocalisationService {
  private readonly localeConfig: LocaleConfig;

  constructor(key: localeKey) {
    if (!locales[key]) {
      throw new Error(`Locale ${key} does not exist.`);
    }

    this.localeConfig = locales[key];
  }

  public getMessage(path: string, args: Record<string, string | number> = {}): string {
    const rawMessage = _.get(this.localeConfig, path);

    if (!_.isString(rawMessage)) {
      throw new Error('Message does not exist.');
    }

    return _.template(rawMessage)(args);
  }
}

export default new LocalisationService(localeKey.russian);
