import * as migration_20260612_174424_initial from './20260612_174424_initial';
import * as migration_20260816_154813_add_localization from './20260816_154813_add_localization';

export const migrations = [
  {
    up: migration_20260612_174424_initial.up,
    down: migration_20260612_174424_initial.down,
    name: '20260612_174424_initial',
  },
  {
    up: migration_20260816_154813_add_localization.up,
    down: migration_20260816_154813_add_localization.down,
    name: '20260816_154813_add_localization'
  },
];
