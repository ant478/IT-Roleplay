import { ComponentClass } from 'react';
import { TechnologyKey } from '../../../services/RolePlayingSystem';
import { HTML, JavaScript, CSS } from '../tabs/TechnologiesTab/icons';

type TechnologyIconsConfig = {
  [key in TechnologyKey]: ComponentClass;
};

const technologyIcons: TechnologyIconsConfig = {
  HTML1: CSS,
  HTML2: CSS,
  HTML3: CSS,
  JavaScript1: JavaScript,
  JavaScript2: JavaScript,
  JavaScript3: JavaScript,
  JavaScript4: JavaScript,
  JavaScript5: JavaScript,
  CSS1: CSS,
  CSS2: CSS,
  CSS3: CSS,
};

export default technologyIcons;
