import * as migration_20260815_091520_initial from './20260815_091520_initial';

export const migrations = [
  {
    up: migration_20260815_091520_initial.up,
    down: migration_20260815_091520_initial.down,
    name: '20260815_091520_initial'
  },
];
