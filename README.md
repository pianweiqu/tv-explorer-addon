# TV Explorer Stremio Addon

这是一个 Stremio 插件，用于在 Stremio 中访问 TV Explorer 的电视直播频道。

## 部署方式

由于 GitHub Pages 无法提供动态 API 服务，我们需要使用两种部署方式：

### 方式一：本地运行服务器（开发/测试）

1. 安装 Node.js（如果还没有）
2. 打开命令行，进入项目目录
3. 启动服务器：
   ```bash
   node api_server.js
   ```
4. 在 Stremio 中添加插件：
   - 打开 Stremio
   - 点击右上角菜单 -> 设置 -> 插件
   - 点击"添加插件"
   - 输入插件 URL: `http://localhost:3000`
   - 等待插件加载完成

### 方式二：部署到云服务器（生产环境）

推荐将服务器部署到云服务器或使用免费的云服务。

#### 使用简单的本地网络服务器

如果您希望局域网内的其他设备也能访问：

1. 确保您的电脑有 IP 地址，例如 `192.168.1.100`
2. 启动服务器时修改端口绑定（稍后修改代码）
3. 在 Stremio 中输入插件 URL: `http://192.168.1.100:3000`

#### 使用免费云服务

由于本项目需要动态服务，推荐使用以下方案：

1. **Cloudflare Pages + Worker**
   - Cloudflare Pages 可以托管静态文件
   - Cloudflare Worker 可以提供动态 API
   - 免费层足够使用

2. **Vercel**
   - 免费托管 Node.js 应用
   - 自动 HTTPS
   - 全球 CDN

3. **Render**
   - 免费托管 Node.js 应用
   - 支持自动部署

## 插件配置

### Stremio 中添加插件

1. 打开 Stremio
2. 点击右上角菜单 (≡)
3. 选择"设置" (Settings)
4. 选择"插件" (Add-ons)
5. 点击"添加插件" (Add Addon)
6. 输入插件 URL:
   - 本地测试：`http://localhost:3000`
   - 服务器部署：`https://your-domain.com`

### 添加频道

在 Stremio 中：
1. 找到 TV Explorer 插件
2. 点击插件名称进入详情页
3. 在"热门"或"TV 热门"标签页浏览频道
4. 点击频道开始观看

## 项目结构

```
tv-explorer-addon/
├── api_server.js      # 服务器主文件
├── manifest.json      # 插件配置文件
├── package.json       # Node.js 项目配置
├── api/
│   ├── catalog.json   # 频道目录数据
│   └── stream.json    # 流媒体数据
├── index.html         # 静态页面
├── index_github.js    # GitHub Pages 版本（不推荐）
└── README.md          # 说明文档
```

## 技术支持

如有问题，请查看 TV Explorer 官方网站：https://tvexplorer.live/

## 许可证

MIT License
