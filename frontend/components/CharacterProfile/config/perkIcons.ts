import { PerkKey } from '../../../services/RolePlayingSystem';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUniversalAccess, faAd, faAirFreshener, faDraftingCompass, faAdjust, faFutbol, faFastBackward, faPastafarianism, faFemale } from '@fortawesome/free-solid-svg-icons';

type PerkIconsConfig = {
  [key in PerkKey]: IconProp;
};

const perkIcons: PerkIconsConfig = {
  Algorithms1: faUniversalAccess,
  Algorithms2: faAd,
  Algorithms3: faAirFreshener,
  Patterns1: faDraftingCompass,
  Patterns2: faAdjust,
  Patterns3: faFutbol,
  Review1: faFastBackward,
  Review2: faPastafarianism,
  Review3: faFemale,
};

export default perkIcons;
