# AGENTS

## Project overview
- Monorepo for Formily + Ant Design (v5) components, adapters, and designable tooling.
- Primary package is `@ducui/antd-v6` with related designable packages.
- Tooling: Yarn workspaces + Lerna; builds via `formily-tpl`; docs via Dumi.

## Packages
- `packages/components`: main Formily Ant Design component library (`@ducui/antd-v6`).
- `packages/renderer`: designable renderer (`@ducui/antd-v6-renderer`).
- `packages/setters`: designable component adapters (`@ducui/antd-v6-setters`).
- `packages/settings-form`: designable settings form (`@ducui/antd-v6-settings-form`).
- `packages/prototypes`: designable component prototypes (`@ducui/antd-v6-prototypes`).

## Docs and demos
- `docs/index.md`: Dumi site landing page.
- `docs/components/`: component docs (Markdown).
- `docs/demos/`: demo TSX files grouped by component.

## Tests
- Jest + ts-jest in jsdom (`jest.config.js`).
- Global setup lives in `global.config.ts`.

## Common commands
- `yarn start`: run Dumi dev site.
- `yarn build`: build all packages with `formily-tpl`.
- `yarn build:docs`: build documentation site.
- `yarn lint`: run ESLint across the repo.
- `yarn test` / `yarn test:prod`: run Jest with coverage.

## Release and versioning
- `yarn release`: publish via Lerna from existing package versions.
- `yarn version:*`: bump versions with Lerna (alpha/beta/rc/major/minor/patch).
