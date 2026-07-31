# About

> Personal website built by Nuxt 3

English | [简体中文](README.zh-CN.md)

## effect

### Home page

![Home page](https://s2.loli.net/2024/10/14/zgehSPt527RxmKM.png)

### Article details

![Article details](https://s2.loli.net/2024/10/14/wohXZJK9BL4c7Hj.png)

## Local Development

### Requirements

- Node.js `18.20.x`; the project `.nvmrc` pins `18.20.3`
- pnpm `9.x`; this project pins `9.12.3`
- Use pnpm only. Do not mix npm, yarn, or bun, and do not generate `package-lock.json` or `yarn.lock`

### First-time Setup

```bash
# Use the Node.js version specified by the project
nvm install
nvm use

# Enable Corepack and activate the pinned pnpm version
corepack enable
corepack prepare pnpm@9.12.3 --activate

# Install exactly what is recorded in pnpm-lock.yaml
pnpm install --frozen-lockfile
```

If nvm is unavailable, install Node.js `18.20.3` first and continue from `corepack enable`.

### Start the Development Server

```bash
pnpm dev
```

Open `http://localhost:3000`.

### Lint

```bash
pnpm lint
```

### Production Build

```bash
pnpm build
```

### Preview the Production Build

```bash
pnpm preview
```

### Reinstall After Dependency Problems

Verify the runtime versions and reinstall from the lockfile:

```bash
node --version
pnpm --version
pnpm install --frozen-lockfile
```

Do not delete or bypass `pnpm-lock.yaml`. If the lockfile must be updated, run `pnpm install` with Node.js `18.20.3` and pnpm `9.12.3`, then commit the lockfile changes together with `package.json`.

## docker Deployment

```bash
# Build an image
docker build -t my-nuxt-app .
# Run container
docker run -d -p 3000:3000 --name my-running-nuxt-app my-nuxt-app
# View the running container
docker ps
# View all containers
docker ps -a
```

## License

[MIT](./LICENSE) © haohaitao
