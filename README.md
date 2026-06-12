# Twilight（本仓库说明）

本仓库基于开源项目 [Spr_Aachen/Twilight](https://github.com/Spr-Aachen/Twilight) 进行修改与本地化处理。原作者版权与许可信息保留在 LICENSE 文件中。

下文为本仓库的变更说明、开发者脚本及使用方法。原模板文档与功能介绍保留在 `docs/` 中，需完整参考原文档请见上游链接。

## 本仓库改动摘要
- 侧边栏目录项本地化：支持把 `src/content/posts` 下的文件夹 slug（如 `essays`/`novels`/`poetry`）映射为中文显示。
- 本地化映射文件：新增 `src/i18n/folders/zh.json` 与 `src/i18n/folders/en.json`，用于存放 slug -> 显示名 映射。
- 映射工具：新增 `src/i18n/folder-map.ts`，统一按站点语言读取映射并返回显示名。
- 目录生成更新：`src/utils/directory.ts` 已改为使用 `getFolderDisplayName`，仅修改显示文本，不改文章路由。
- 自动化脚本：新增 `scripts/generate-folder-mapping.cjs`，用于扫描 `src/content/posts` 并补全映射占位（生成后需手动在 `src/i18n/folders/*.json` 填写翻译）。

## 快速使用说明（开发者）

- 启动开发服务器：
```bash
pnpm install
pnpm dev
```

- 生成/补全映射占位（可直接运行脚本）：
```bash
node scripts/generate-folder-mapping.cjs
```
该脚本会把在 `src/content/posts` 中发现但尚未在 `src/i18n/folders/*.json` 中定义的 slug 写入为占位（值等于 key），并在运行结束提示需要翻译的条目。

- 可选：在 `package.json` 中添加 npm 脚本以便记忆与 CI 使用，示例：
```json
"scripts": {
  "gen-folder-map": "node scripts/generate-folder-mapping.cjs"
}
```
然后可通过 `pnpm run gen-folder-map`（或 `npm run gen-folder-map`）运行。

## 编辑本地化显示名

生成脚本会写入占位后，手动编辑以下文件以填写最终翻译：

- `src/i18n/folders/zh.json`（中文）
- `src/i18n/folders/en.json`（英文）

示例（`src/i18n/folders/zh.json`）：
```json
{
  "essays": "随笔",
  "novels": "小说",
  "poetry": "诗歌"
}
```

修改完毕后重新构建或刷新开发服务器页面即可看到侧边栏显示更新（仅影响显示文本，链接仍指向原始路由）。

## 文档与原始说明

原项目的完整使用说明与功能介绍保留在 `docs/` 中，或访问上游文档： https://docs.twilight.spr-aachen.com/en 。

## 许可证与致谢

本仓库保留原项目的 LICENSE 与致谢信息。对于在本仓库中新增的脚本与文档（如 `scripts/generate-folder-mapping.cjs` 与 `src/i18n/folders/*`），同样遵循本仓库的开源许可约定。

如需我将原 README 的重要部分（如功能列表、快速开始）迁移到本 README 中的其他位置，请告诉我要保留哪些段落。
