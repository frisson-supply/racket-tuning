import * as migration_20260612_174424_initial from './20260612_174424_initial'
import * as migration_20260816_154813_add_localization from './20260816_154813_add_localization'
import * as migration_20260817_drop_header_enable_flyout from './20260817_drop_header_enable_flyout'
import * as migration_20260819_133459_add_about_us_section from './20260819_133459_add_about_us_section'

export const migrations = [
  {
    up: migration_20260612_174424_initial.up,
    down: migration_20260612_174424_initial.down,
    name: '20260612_174424_initial',
  },
  {
    up: migration_20260816_154813_add_localization.up,
    down: migration_20260816_154813_add_localization.down,
    name: '20260816_154813_add_localization',
  },
  {
    up: migration_20260817_drop_header_enable_flyout.up,
    down: migration_20260817_drop_header_enable_flyout.down,
    name: '20260817_drop_header_enable_flyout',
  },
  {
    up: migration_20260819_133459_add_about_us_section.up,
    down: migration_20260819_133459_add_about_us_section.down,
    name: '20260819_133459_add_about_us_section',
  },
]
