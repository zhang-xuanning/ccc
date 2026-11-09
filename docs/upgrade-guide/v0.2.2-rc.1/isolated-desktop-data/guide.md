---
kind: upgrade-guide
description: "Packaged 察心智能 uses separate Electron and Host data directories instead of the official installation's defaults."
---

# Packaged desktop data is isolated

English | [中文](guide.zh.md)

## Change

Packaged 察心智能 uses the `chaxin-intelligence` Electron package identity so its single-instance lock does not target the official application. Its default Host home is the Electron user-data path plus `-harness`, outside the user-data directory removed by Windows uninstall. An explicit `DSH_HOME` retains its existing meaning.

## Migration

1. Retain and back up the original application data and `~/.dsh`. Existing settings and sessions are not automatically copied into the new home.
2. Launch 察心智能 without an inherited `DSH_HOME` to use the isolated default. Confirm its settings before removing any old installation. Select a shared home explicitly only when the other application is stopped.
