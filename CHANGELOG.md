# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1-beta1] - 2026-07-08

### Added

- Add a github action for release management.

## [1.1.0] - 2026-07-08

### Fixed
- Improve fixed scroll layout with vertical stacking for messages panel

### Documentation
- Add full YAML configuration reference to README

## [1.0.0] - 2026-07-08

### Added
- **Companion Integration support** — full compatibility with [IDF Mobilité Assistant](https://github.com/yyrkoon94/idf-mobilite-assistant) (100% UI configuration, automatic entity creation, integrated stop search)
- **New card editor** — fully rewritten with tabbed navigation (First stop / Second stop / Messages), dynamic options per line type (BUS / RER / SNCF), advanced filters (lines, references, destinations), multi-entity support for messages
- **Full PRIM message support** — select multiple message entities, filter by text, display disruptions / alerts / info messages separately, option to disable scrolling
- Display options: screen mode, borderless mode, station display, platform, time, grouping
- Replacement bus support for RER/SNCF lines
- Native disruption management through the companion integration
- RER/SNCF line status management

### Changed
- Complete rework of the card architecture for better maintainability and clarity
- Modernised UI (Shoelace components + Home Assistant style)
- Improved REST sensor detection (Siri / disruptions)
- Better handling of conditional options in the editor
- Improved compatibility with Home Assistant light and dark themes

### Fixed
- Several display inconsistencies
- Line and reference filtering
- Switch behaviour in the card editor
- Grouped destination display
- StopArea / StopPoint support
- Terminus display
- RER wall panel display
- Local SVG icons restored after regression

## [0.1.0] - 2026-06-19

### Added
- Initial public release of the forked card
- Bus line rendering
- RER line rendering
- Basic card editor
- Local SVG transport icons

### Fixed
- README images
- Missing SVG icons added

[Unreleased]: https://github.com/bontiv/lovelace-idf-mobilite/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/bontiv/lovelace-idf-mobilite/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/bontiv/lovelace-idf-mobilite/releases/tag/v0.1.0
