---
layout: ../../layouts/post.astro
title: "GitHub+Hexo搭建自己的私人博客（超详细版）"
pubDate: 2025-12-27
description: "This is the third post of my new Astro blog."
author: "Xueyufei Zhang"
isPinned: true
excerpt: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
image:
  src:
  alt:
tags: ["Blog", "Hexo"]
---

最近的学习生活繁忙，让我萌生了想要搭建一个博客记录自己学习和生活的念头，因此我马上在互联网上寻找解决方案，发现如果自己租用服务器进行搭建，不仅费用不小，学习成本也比较高。所以我认为对于大部分不想太折腾的小白来说，Github+Hexo的解决方案是更加实用的。

因此，如果你也想拥有一个属于自己的博客，那么就快看下去吧！

<!-- more -->

操作系统：Windows 10

- ##### 第一步：安装软件并配置环境

###### 1、安装[Node.js(LTS)](https://nodejs.org/zh-cn/)

<img src="https://pic.imgdb.cn/item/609e406cd1a9ae528f991df2.png">

###### 2、安装[Git](https://git-scm.com/)

<img src="https://pic.imgdb.cn/item/609e406cd1a9ae528f991e58.png">

Git的安装过程可能有些复杂，因此在安装的过程中可以参考[Git安装教程](https://www.cnblogs.com/hdlan/p/14395189.html)(作者：hdlan)。

注：根据我自己的安装经验，在安装完Git之后需要手动将`\Git\bin`和`\Git\mingw64\libexec\git-core`添加至系统环境变量

<img src="https://pic.imgdb.cn/item/609e406cd1a9ae528f991eb7.png">

红色方框内的路径由你自己的安装位置决定。

在完成1、2步之后，打开Git Bash

<img src="https://pic.imgdb.cn/item/609e406dd1a9ae528f991f3e.png">

分别执行`git --version`和`NPM -v`命令，如安装无误，将出现版本号，如下图所示：

<img src="https://pic.imgdb.cn/item/609e406dd1a9ae528f991fa5.png">

- ##### 第二步：安装Hexo

###### 1、选择一个你电脑除C盘外的其他盘，并创建blog文件夹。

###### 2、打开电脑的命令提示符，进入刚才创建的blog文件夹。

以我的路径为例：`D:\blog`，因此我们需要在命令提示符中分别输入`D:`和`cd blog`，如下图所示：

<img src="https://pic.imgdb.cn/item/609e4073d1a9ae528f995762.png">

`D:`的意思是进入D盘，`cd xxx`的意思是进入xxx这个文件夹。

###### 3、接下来分别输入下面三条命令（每条输入后需按回车键执行）：

```
npm install hexo-cli -g
hexo init
npm install
```

在命令运行的过程中不出现`ERR!`的错误提示即可，`WARN` 的警告提示可以忽略，不影响正常安装。

###### 4、在本地预览网站

在命令提示符中输入`hexo s --debug`（注意，此时所有的命令行操作都是在blog文件夹下进行的）

<img src="https://pic.imgdb.cn/item/609e4073d1a9ae528f9957af.png">

打开自己的浏览器，然后在地址栏输入上图中显示的地址：`http://localhost:4000`

注意，如果这一步没有成功，很有可能是默认的4000端口已经被占用，可以使用`hexo server -p 5000`命令更改默认端口后再重新执行。

<img src="https://pic.imgdb.cn/item/609e4073d1a9ae528f99581b.png">

如果网页出现了上图的博客页面，则说明我们的博客已经搭建成功了

每次编辑完新的博客后，都可以先在本地预览，确认无误后再发布（如何发布我们将在后面介绍）

但是此时，我们只能在本地访问，因此接下来我们要做的，就是将其推送至网站。

- ##### 第三步：推送至网站

###### 1、创建Github仓库（Github不幸被墙，这里可能需要一些上网方法来解决）

首先，创建一个Github账户（username要认真填写，会与之后你博客的网址有关）

注册完成后点击New repository创建新的仓库，如下图所示：

<img src="https://pic.imgdb.cn/item/609e4073d1a9ae528f995885.png">

Repository name一栏为仓库名称，填写`username.github.io`，username就是你的账户名称

<img src="https://pic.imgdb.cn/item/609e4073d1a9ae528f9958e3.png">

然后按照上图指示勾选对应选项后，点击Create repository键完成创建。

###### 2、修改_config.yml文件

进入blog文件夹，找到_config.yml文件并打开（使用Sublime Text或Notepad++等文本编辑软件）

<img src="https://pic.imgdb.cn/item/609e407ad1a9ae528f99943c.png">

打开后将文件拖至最下方，找到deploy项，将其内容修改为：

```
deploy:
	type: git
	repo: 你的仓库地址（如下图所示）
	branch: master(若在安装Git的第六步时选择了第一个默认选项，则此处为master，否则就填写你自己修改的名称)
```

<img src="https://pic.imgdb.cn/item/609e407ad1a9ae528f99948b.png">

修改完成后记得按CTRL+S保存文件。

###### 3、链接Github远程仓库

在blog文件夹内右键，点击Git Bash Here，进入Git Bash

<img src="https://pic.imgdb.cn/item/609e407ad1a9ae528f9994e9.png">

分别输入以下命令（每条输入后需按回车键执行）：

```
git config --global user.name "username" （引号内填写Github用户名）
git config --global user.email "your email address"（引号内填写Github注册时使用的邮箱）
ssh-keygen -t rsa -c "your email address"（引号内同上）
```

完成以上步骤后会生成密钥（生成的目录会在命令行内显示，应该是`C:\Users\username\.ssh`）

打开id_rsa.pub文件（可以使用Sublime Text或Notepad++等），并复制里面的全部内容。

打开Github，进入Settings

<img src="https://pic.imgdb.cn/item/609e407ad1a9ae528f999541.png">

选择SSH and GPG keys，并点击New SSH key，如下图所示：

<img src="https://pic.imgdb.cn/item/609e407ad1a9ae528f9995a0.png">

将之前从id_rsa.pub文件内复制的内容全部粘贴到Key栏内，Title可以任意写

<img src="https://pic.imgdb.cn/item/609e4080d1a9ae528f99c30f.png">

再次打开Git Bash，输入`ssh -T git@github.com`，如果出现`Hi, xxx!`则说明链接成功。

###### 4、安装Git部署插件

打开命令提示符，进入blog文件（步骤同上），输入以下命令：

```
npm install hexo-deployer-git --save
```

- ##### 第四步：部署并发布

在部署发布你的博客之前，我先为大家介绍一些基本的Hexo命令：

```
npm install hexo -g # 安装Hexo
npm update hexo -g # 升级Hexo

hexo n "title" == hexo new "title" # 创建一篇新博客，title处填写博客题目
hexo clean # 清除生成的博客静态文件
hexo g # 生成博客静态文件(hexo generate)
hexo d # 部署博客(hexo deploy)
hexo s --debug # 本地预览博客
```

那么接下来我们开始正式部署网站

打开命令提示符，并进入blog文件夹（步骤同上），分别输入以下命令：

```
hexo clean
hexo g
hexo d
```

完成后打开浏览器，在地址栏输入你的仓库地址，即`username.github.io`

如果出现博客页面，那么恭喜你，你的博客已经可以在互联网上被访问了。

- ##### 第五步：绑定域名

实际上，上一步结束之后，你的博客已经算是搭建完成了，但是网址是Github提供的：`username.github.io`，许多小伙伴希望能够使用自己的个性化域名，这就需要进行域名绑定，因此__没有这方面需求的小伙伴可以跳过这一步__。

###### 1、域名部分的设置

选择一个域名代理厂商，本文以[阿里云](https://wanwang.aliyun.com/)为例（[腾讯云](https://dnspod.cloud.tencent.com/)、[百度云](https://cloud.baidu.com/product/bcd.html?track=navigation20200904)、[华为云](https://www.huaweicloud.com/product/domain.html?utm_source=baidu&utm_medium=brand&utm_campaign=10033&utm_content=&utm_term=&utm_adplace=AdPlace024724)等均可）

具体的注册申请过程，这里将不再呈现，点击进入对应厂商的网页，查询你喜欢的个性化域名，进行注册购买即可，如果你本来就有空闲的域名，那么直接进入下一步。

域名准备好之后，进入对应厂商的域名控制台的域名列表，进入`解析`页面

<img src="https://pic.imgdb.cn/item/609e4080d1a9ae528f99c37c.png">

创建两条记录，每一项填写的内容如下表，未说明的项默认就好：

| 主机记录 | 记录类型 | 解析路线(isp) |        记录值        |
| :------: | :------: | :-----------: | :------------------: |
|   www    |  CNAME   |     默认      |  username.github.io  |
|    @     |    A     |     默认      | 185.199.108.153[^注] |

注：这里是Github的IP地址，你也可以ping以下自己的博客网址得到IP地址，方法如下：

打开命令提示符，执行`ping username.github.io`(username是你自己的Github账户名)

<img src="https://pic.imgdb.cn/item/609e4080d1a9ae528f99c3e2.png">

如果是刚刚注册的域名，建议修改一遍DNS服务器，进入`管理`页面

<img src="https://pic.imgdb.cn/item/609e4080d1a9ae528f99c43e.png">

进入`DNS修改`，并点击页面右方的`修改DNS服务器`

<img src="https://pic.imgdb.cn/item/609e4080d1a9ae528f99c4b3.png">

将`当前DNS服务器`下的两个DNS分别填入下方，并点击确认即可。

<img src="https://pic.imgdb.cn/item/609e4097d1a9ae528f9a8aec.png">

###### 2、Github部分的设置

打开Github，进入之前创建的仓库页面，进入`Settings`

<img src="https://pic.imgdb.cn/item/609e4097d1a9ae528f9a8b52.png">

进入`Pages`页面，将`Source`项下的的`Branch: main`改为`Branch: master`
（若在安装Git的第六步时选择了第一个默认选项，则此处为master，否则就选择你自己修改的名称）

接下来在`Custom domain`项内填入你的域名，并点击`Save`保存，最后选中下面的`Enforce HTTPS`

<img src="https://pic.imgdb.cn/item/609e4097d1a9ae528f9a8bda.png">

###### 3、本地部分的设置

进入本地的blog文件夹，进入`blog\source`目录下，创建一个记事本文件，输入你的域名

<img src="https://pic.imgdb.cn/item/609e4097d1a9ae528f9a8c40.png">

注意，建议这里输入的域名不要带www，如上图所示

保存并命名为`CNAME`，注意保存成__所有文件__而不是__txt文件__。


完成以上步骤后，打开命令提示符，进入blog文件夹并分别执行下面的代码：

```
hexo clean
hexo g
hexo d
```

执行完成后打开浏览器，在地址栏输入你自己的域名，就会直接进入你的博客了。

至此，本篇教程也就到此结束了，有任何问题都可以E-mail联系我！！感谢支持哟~~