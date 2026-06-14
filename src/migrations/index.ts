import * as migration_20260612_174424_initial from './20260612_174424_initial';

export const migrations = [
  {
    up: migration_20260612_174424_initial.up,
    down: migration_20260612_174424_initial.down,
    name: '20260612_174424_initial'
  },
];
