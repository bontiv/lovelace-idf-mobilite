# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-07-08

### Changed
- `.github/workflows/release.yml`: when publishing a prerelease (tag containing `-`, e.g. `v1.2.0-beta.1`), the `[Unreleased]` section in `CHANGELOG.md` is no longer renamed to the version number, `package.json` is not bumped, and no commit is pushed. The release notes are taken from the `[Unreleased]` section content.
- `package.json`: updated `license` field from `MIT` to `GPL-3.0-only` to match the actual `LICENSE` file (GNU General Public License v3).
- `hacs.json`: updated minimum required Home Assistant version from `2025.5.1` to `2022.11.0`, which corresponds to the oldest HA release supporting `<ha-input>` (the most restrictive HA component used in the card editor). Lit 2.8.0 is bundled and does not add any additional constraint.

### Removed
- `@rollup/plugin-babel`, `@rollup/plugin-commonjs` and `@rollup/plugin-json` rollup plugins removed from `rollup.config.js` and `package.json`: the source code uses only standard ES modules with no `require()`, no JSON imports, and no Babel-specific syntax, making these plugins unnecessary for the build.

### Added
- `AGENTS.md` and `.github/copilot-instructions.md` with a rule requiring every code change to be accompanied by a `CHANGELOG.md` update under the `[Unreleased]` section (Keep a Changelog format)

### Fixed
- `tgv-white.png` renamed to `tgv_white.png` to match the naming convention used by all other `_white` variants — the TGV icon was broken in `wall_panel` mode due to this mismatch
- HACS installation: `idf-mobilite.zip` (containing `idf-mobilite.js` + `images/`) and `idf-mobilite.js` are now both uploaded as release assets; `hacs.json` uses `zip_release: true` with `filename: idf-mobilite.js` so HACS extracts the zip (getting the images) and registers the correct JS resource URL

### Documentation
- Moved README images into a dedicated `images/` folder
- Updated README image links to use relative URIs instead of absolute GitHub raw URLs
- Removed unused images from the repository root (`areacode.png`, `cardeditor_old.png`, `cardeditor_old2.png`, `lineref1.png`, `lineref2.png`, `screenshot3.png`, `stoparea1.png`, `stoparea2.png`)
- Identified and documented unused images in `src/images/`: `info.png`, `tgv-white.png` (naming bug), `trainsq.png`, `trainsq_white.png`

## [1.1.1] - 2026-07-08

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
