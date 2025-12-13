

**Having issues installing? See our [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

## Starting Development

Start the app in the `dev` environment:

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


## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

[github-actions-status]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/workflows/Test/badge.svg
[github-actions-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/actions
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg?label=version
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
[stackoverflow-img]: https://img.shields.io/badge/stackoverflow-electron_react_boilerplate-blue.svg
[stackoverflow-url]: https://stackoverflow.com/questions/tagged/electron-react-boilerplate

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

## Building Portable Windows Executable

To build a standalone portable executable for Windows:

1. **Ensure Configuration**: The `package.json` is configured with `"portable"` in the `build.win.target` array.
2. **Run Build**:
   ```bash
   npm run build
   npx electron-builder build --win --x64 --publish never
   ```
3. **Output**: The executable will be located in `release/build/` (e.g., `release/build/ElectronReact 4.6.0.exe`).
