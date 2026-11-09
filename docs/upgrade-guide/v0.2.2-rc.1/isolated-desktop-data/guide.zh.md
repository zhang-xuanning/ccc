---
kind: upgrade-guide
description: "打包后的察心智能使用独立的 Electron 和 Host 数据目录，不再使用官方安装的默认目录。"
---

# 打包桌面应用的数据隔离

[English](guide.md) | 中文

## 变更

打包后的察心智能使用 `chaxin-intelligence` Electron 包身份，避免单实例锁指向官方应用。默认 Host 目录为 Electron 用户数据路径加上 `-harness` 后缀，位于 Windows 卸载时会删除的用户数据目录之外。显式设置的 `DSH_HOME` 含义不变。

## 迁移

1. 保留并备份原应用数据和 `~/.dsh`。已有设置与会话不会自动复制到新目录。
2. 不继承 `DSH_HOME` 启动察心智能即可使用隔离的默认目录。删除任何旧安装前先确认设置；只有停止另一个应用后，才应显式选择共享目录。
