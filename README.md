# create-typescript-boilerplate
create-typescript-boilerplate is a simple CLI tool to create a typescript project. we inspired by <a href="https://github.com/infinitered/ignite">ignite-cli</a>. 

## Quick Start
Run the CLI:
```bash
npx create-typescript-boilerplate new myApp
```

## Recommendations
- IDE - vscode
- node -v 18.17.1
- src/main.ts  -> default configuration
- fnm - node version manager
- yarn

## Tech Stack
|Library|Category|Version|Description|
|------|---|---|---|
|tsx|Compiler|v4|Blazing fast on-demand compilation|
|lefthook|Git hooks manager|v1|Fast and powerful Git hooks manager|
|jest|Test Runner|v29|Standard test runner for JS apps|
|prettier|code formatter|v3|Standard code formatter for JS apps|
|eslint|analyze tools|v8|analyzes code to quickly find problems|
|typescript|Language|v5|strongly typed programming language|




## Usage

Run after compilation
```
yarn start    //yarn 일 경우
npm run start // npm 일 경우
```

Run file detection (TSX)
```
yarn dev     // yarn 일 경우
npm run dev  // npm 일 경우
```

upgrade
```
yarn upgrade-interactive [--latest]
```
