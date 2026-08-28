---
title: '使用 GitHub Pages 与 Hexo 搭建个人博客'
pubDate: 2025-12-27
updatedDate: 2026-08-28
description: '从本地安装 Hexo、配置 GitHub Pages，到部署站点与绑定自定义域名的完整入门指南。'
author: 'Xueyufei Zhang'
isPinned: true
type: guide
status: complete
language: zh
excerpt: '一篇面向初学者的 Hexo 博客搭建指南：完成本地预览、GitHub Pages 部署，以及可选的自定义域名配置。'
image:
  src:
  alt:
tags: ['Blog', 'Hexo', 'GitHub Pages']
---

想要一个可以长期记录学习与生活的个人空间，并不一定要从租服务器、配置数据库开始。对于以文字和图片为主的博客，Hexo 可以在本地把 Markdown 文章生成成静态网页，GitHub Pages 则负责免费托管这些网页。两者组合起来，成本低、维护简单，也很适合作为第一次独立建站的起点。

这篇教程以 Windows 为例，最终会完成以下流程：

1. 安装 Node.js 与 Git；
2. 在本地创建并预览 Hexo 博客；
3. 将生成的网站部署到 GitHub Pages；
4. 可选：为博客绑定自己的域名并启用 HTTPS。

> 本文示例中的 `username`、邮箱和域名都需要替换成你自己的信息。软件界面与版本会持续变化，遇到差异时请以 [Hexo 文档](https://hexo.io/docs/) 和 [GitHub Pages 文档](https://docs.github.com/pages) 为准。

<!-- more -->

## 一、准备开发环境

### 1. 安装 Node.js

从 [Node.js 官网](https://nodejs.org/) 下载并安装当前的 LTS 版本。Hexo 依赖 Node.js，而 npm 会随 Node.js 一同安装。

安装完成后，打开 PowerShell、Windows Terminal 或 Git Bash，检查版本：

```bash
node --version
npm --version
```

如果两条命令都能输出版本号，说明 Node.js 与 npm 已经可以正常使用。

### 2. 安装 Git

从 [Git 官网](https://git-scm.com/download/win) 下载 Windows 安装程序。大多数情况下保留默认选项即可，安装程序会自动配置命令行路径。

完成后检查 Git 版本：

```bash
git --version
```

如果系统提示找不到命令，先关闭并重新打开终端；仍然无效时，再检查 Git 是否已加入系统的 `PATH` 环境变量。

## 二、创建 Hexo 博客

### 1. 初始化项目

选择一个便于管理的位置作为博客目录。本文以 PowerShell 和 `D:\blog` 为例：

```powershell
mkdir D:\blog
cd D:\blog
```

安装 Hexo 命令行工具，并在当前空目录中初始化项目：

```bash
npm install --global hexo-cli
hexo init .
npm install
```

> 目录不必位于 D 盘，但执行 `hexo init .` 时，当前目录应为空。

### 2. 启动本地预览

在博客根目录运行：

```bash
hexo server
```

浏览器访问 `http://localhost:4000`。如果能看到 Hexo 的默认页面，说明博客已经成功运行。

如果 `4000` 端口已被占用，可以临时换一个端口：

```bash
hexo server --port 5000
```

此时访问 `http://localhost:5000` 即可。停止预览时，在终端按 `Ctrl+C`。

## 三、认识 Hexo 的基本工作流

Hexo 默认将文章保存在 `source/_posts/` 中。创建新文章可以使用：

```bash
hexo new "文章标题"
```

写完后，通常按照下面的顺序预览和发布：

```bash
hexo clean       # 清除上一次生成的静态文件
hexo generate    # 重新生成网站，简写为 hexo g
hexo server      # 在本地预览，简写为 hexo s
hexo deploy      # 部署网站，简写为 hexo d
```

`hexo clean` 并非每次都必须执行，但在更换主题、修改配置或生成结果异常时很有用。

## 四、创建 GitHub Pages 仓库

1. 登录 [GitHub](https://github.com/)；
2. 新建一个仓库；
3. 将仓库命名为 `username.github.io`，其中 `username` 必须与你的 GitHub 用户名完全一致；
4. 完成创建后，记下仓库的 SSH 地址：

```text
git@github.com:username/username.github.io.git
```

这个命名方式对应 GitHub Pages 的用户站点。部署成功后，默认地址就是：

```text
https://username.github.io
```

## 五、配置 GitHub 身份验证

### 1. 设置 Git 提交身份

在 Git Bash 中运行：

```bash
git config --global user.name "username"
git config --global user.email "your_email@example.com"
```

这里的用户名用于标识提交者，邮箱可以填写 GitHub 账户邮箱，也可以使用 GitHub 提供的隐私邮箱。

### 2. 创建并添加 SSH 密钥

先检查 `C:\Users\你的用户名\.ssh` 是否已有可用密钥，避免覆盖旧文件。如果没有，创建一对新的 Ed25519 密钥：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

按提示选择保存位置并设置密码。随后打开生成的 `id_ed25519.pub`，复制其中的全部内容。

进入 GitHub 的 **Settings → SSH and GPG keys → New SSH key**，粘贴公钥并保存。最后在终端测试连接：

```bash
ssh -T git@github.com
```

第一次连接时需要确认主机指纹。看到包含 `Hi username!` 的提示，就说明验证成功。

> `.pub` 文件是可以上传的公钥；不要把没有 `.pub` 后缀的私钥发送给任何人，也不要提交到代码仓库。

## 六、部署 Hexo 到 GitHub Pages

### 1. 安装部署插件

回到博客根目录，安装 Hexo 的 Git 部署插件：

```bash
npm install --save hexo-deployer-git
```

### 2. 修改站点配置

打开博客根目录中的 `_config.yml`，先将站点地址改为自己的 GitHub Pages 地址：

```yaml
url: https://username.github.io
```

然后找到或添加 `deploy` 配置：

```yaml
deploy:
  type: git
  repo: git@github.com:username/username.github.io.git
  branch: gh-pages
```

YAML 对缩进敏感，请使用空格，不要使用 Tab。仓库地址中的两个 `username` 都需要替换。

### 3. 首次发布

执行：

```bash
hexo clean
hexo generate
hexo deploy
```

部署完成后，进入 GitHub 仓库的 **Settings → Pages**：

1. 在 **Build and deployment** 中选择 **Deploy from a branch**；
2. 将分支设为 `gh-pages`，目录设为 `/ (root)`；
3. 保存并等待 GitHub 完成发布。

几分钟后访问 `https://username.github.io`。之后每次更新文章，可以让 Hexo 在部署前自动生成站点：

```bash
hexo clean && hexo deploy --generate
```

如果你希望明确观察每一步，也可以继续使用 `hexo clean && hexo generate && hexo deploy`。单独执行 `hexo deploy` 只会部署现有的生成结果，不会自动重新生成。

## 七、绑定自定义域名（可选）

如果 `username.github.io` 已经满足需求，可以跳过这一节。绑定域名通常包含三部分：GitHub Pages 配置、DNS 解析，以及 Hexo 中的 `CNAME` 文件。

### 1. 在 GitHub 中填写域名

进入仓库的 **Settings → Pages**，在 **Custom domain** 中填写你的域名，例如：

```text
example.com
```

保存后，GitHub 会开始检查 DNS 配置。

### 2. 配置 DNS 解析

在域名服务商的控制台中，为根域名添加以下四条 `A` 记录：

| 主机记录 | 类型 | 记录值            |
| -------- | ---- | ----------------- |
| `@`      | `A`  | `185.199.108.153` |
| `@`      | `A`  | `185.199.109.153` |
| `@`      | `A`  | `185.199.110.153` |
| `@`      | `A`  | `185.199.111.153` |

如果还希望使用 `www.example.com`，再添加：

| 主机记录 | 类型    | 记录值               |
| -------- | ------- | -------------------- |
| `www`    | `CNAME` | `username.github.io` |

不要通过 `ping` 得到的临时结果替代 GitHub 官方公布的记录值，也不要为该域名配置通配符 DNS 记录。DNS 更新可能需要一段时间才能在全球生效。

### 3. 创建持久化的 CNAME 文件

在本地博客的 `source/` 目录中新建一个名为 `CNAME` 的文件，文件没有扩展名，内容只写一行域名：

```text
example.com
```

这个文件会随每次部署一起进入 `gh-pages` 分支，避免自定义域名配置被新的部署覆盖。

重新部署：

```bash
hexo clean && hexo deploy --generate
```

DNS 检查通过且证书签发完成后，回到 **Settings → Pages** 启用 **Enforce HTTPS**。

## 八、常见问题

### 本地预览正常，但线上页面没有更新

先确认部署命令没有报错，再检查 Pages 的发布分支是否为 `gh-pages`。浏览器缓存也可能造成短暂差异，可以稍等片刻后强制刷新。

### 执行部署时提示权限不足

运行 `ssh -T git@github.com` 检查 SSH 身份验证，并确认 `_config.yml` 中的仓库地址、GitHub 用户名和仓库名称均正确。

### 自定义域名在重新部署后失效

确认 `source/CNAME` 存在，文件名没有 `.txt` 后缀，内容也不包含 `https://` 或路径。

## 结语

至此，一个可在本地写作、通过 GitHub Pages 发布，并支持自定义域名与 HTTPS 的 Hexo 博客就搭建完成了。真正值得长期维护的不是初始主题，而是稳定的写作流程：用 Markdown 记录内容，在本地检查效果，再把确认无误的版本发布出去。
