# 关于

> Nuxt 3 构建的个人网站

## 效果

### 首页

![首页](https://s2.loli.net/2024/10/14/zgehSPt527RxmKM.png)

### 详情

![文章详情](https://s2.loli.net/2024/10/14/wohXZJK9BL4c7Hj.png)

## 本地运行

### 环境要求

- Node.js `18.20.x`，推荐使用项目 `.nvmrc` 中指定的 `18.20.3`
- pnpm `9.x`，项目固定使用 `9.12.3`
- 本项目仅使用 pnpm，请勿混用 npm、yarn 或 bun，也不要生成 `package-lock.json`、`yarn.lock`

### 首次安装

```bash
# 使用项目指定的 Node.js 版本
nvm install
nvm use

# 启用 Corepack 并激活项目指定的 pnpm
corepack enable
corepack prepare pnpm@9.12.3 --activate

# 严格按照 pnpm-lock.yaml 安装依赖
pnpm install --frozen-lockfile
```

如果本地没有安装 nvm，请先安装 Node.js `18.20.3`，然后从 `corepack enable` 开始执行。

### 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:3000`。

### 代码检查

```bash
pnpm lint
```

### 生产构建

```bash
pnpm build
```

### 本地预览生产构建

```bash
pnpm preview
```

### 依赖异常时重装

确认 Node.js 和 pnpm 版本正确后，重新执行：

```bash
node --version
pnpm --version
pnpm install --frozen-lockfile
```

不要删除或绕过 `pnpm-lock.yaml`。如果锁文件确实需要更新，应在 Node.js `18.20.3`、pnpm `9.12.3` 环境中执行 `pnpm install`，并一并提交锁文件变更。

## docker 部署

```bash
# 构建镜像
docker build -t my-nuxt-app .
# 运行容器
docker run -d -p 3000:3000 --name my-running-nuxt-app my-nuxt-app
# 查看在运行的容器
docker ps
# 查看所有容器
docker ps -a
```

## License

[MIT](./LICENSE) © haohaitao
