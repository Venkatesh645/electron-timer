

**Having issues installing? See our [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
   *Note: This runs a `postinstall` script to ensure `release/app` dependencies are correctly set up.*

2. **Start Development Server**:
   ```bash
   npm start
   ```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Recent Updates (Development Log)

### Features & Improvements
- **Success Window**:
  - Implemented a dedicated success window that opens upon timer completion (0%).
  - Used `HashRouter` to correctly route to `#/success`.
  - Added a "Close" button functionality via IPC (`close-success-window`).
  - Window is centered on screen with fixed dimensions (600x400).
- **Main Window Customization**:
  - **Position**: Anchored to the bottom-right of the primary display.
  - **Size**: Width set to 400px; Height dynamically calculated as 10% of the screen height.
  - **Style**: Disabled native rounded corners (`roundedCorners: false`) for a sharp look.

### Bug Fixes
- **Native Bindings**: Resolved `rspack-resolver` native binding errors by running `electron-rebuild`.
- **Dependencies**: Fixed missing `bootstrap` CSS by installing the package and re-adding the import.

## Release Workflow

### Automated Releases
Releases are fully automated via GitHub Actions.
1. **Trigger**: Push code to the `main` branch.
2. **Build**: The workflow builds a portable Windows executable (`.exe`).
3. **Publish**: The executable is automatically uploaded to a GitHub Release.

### Tagging Mechanism
- The release tag version is derived directly from the `version` field in `package.json` (e.g., `"version": "4.6.0"` -> `v4.6.0`).
- **Important**: You must update the `version` in `package.json` before merging/pushing to `main`.
- The workflow automatically checks if the tag exists:
  - If it does not exist, it creates the tag `v<version>`.
  - If it exists, it proceeds with the release for that tag.
