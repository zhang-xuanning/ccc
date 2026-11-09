---
kind: upgrade-guide
description: "The macOS desktop application name changes from DeepSeek Harness to 察心智能."
---

# macOS desktop application name changes

English | [中文](guide.zh.md)

## Change

The macOS application bundle and executable are named 察心智能. Electron's default user-data directory also follows the application name. Existing settings are not automatically migrated from the old product directory.

## Migration

1. Back up the old application's user data before installing the renamed application. Do not delete the old directory or the shared `.dsh` directory.
2. Confirm the new application opens and check its settings before removing the old application. Retain the old data if settings are missing; do not merge active application data directories.
