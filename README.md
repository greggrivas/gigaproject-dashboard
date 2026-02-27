# GigaProject Dashboard

Portfolio-ready public copy of the GigaProject dashboard app.

![GigaProject Dashboard screenshot](./dashboard_screenshot.png)

This repository intentionally excludes the private OpenBridge source that the app depends on. The dashboard code is public here for portfolio review, but the OpenBridge components and styles are not redistributed.

## Repository layout

The current source imports expect this structure:

```text
gigaproject-dashboard-public/
  packages/
    gigaproject-dashboard-app/
    openbridge-webcomponents/   # private dependency, not included here
```

`packages/openbridge-webcomponents` must be provided separately by an authorized user with access to the private repository.

## What is included

- The dashboard application source
- Public assets used by the app
- Pencil AI exports and specs used during implementation

## What is not included

- `packages/openbridge-webcomponents`
- any private source code from the OpenBridge repository
- `node_modules`
- build output such as `dist`

## Run locally

1. Clone this repository.
2. Obtain the private OpenBridge repository through the appropriate access-controlled channel.
3. Place that private repository at `packages/openbridge-webcomponents`.
4. Install dependencies.
5. Start the dashboard app.

Example:

```bash
npm install
npm run dev
```

If the private dependency is missing, the code can still be reviewed, but the app will not build or run.

## Portfolio note

This project is published as a portfolio artifact. The application architecture, UI composition, and integration work are visible here, while proprietary dependencies remain private.
