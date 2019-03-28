import _ from 'lodash';
import russian from './locales/russian';

enum localeKey {
  russian = 'ru',
}

type locale = object;

const locales: Record<localeKey, locale> = {
  ru: russian,
};

export class LocalisationService {
  public locale: locale;

  constructor(key: localeKey) {
    if (!locales[key]) {
      throw new Error(`Locale ${key} does not exist.`);
    }

    this.locale = locales[key];
  }

  public getMessage(path: string, args: Record<string, any> = {}): string {
    const rawMessage = _.get(this.locale, path);

    if (!_.isString(rawMessage)) {
      throw new Error('Message does not exist.');
    }

    return _.template(rawMessage)(args);
  }
}

export default new LocalisationService(localeKey.russian);
