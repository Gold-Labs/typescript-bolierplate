# typescript-bolierplate


clone을 하고나서 yarn과 npm 둘중 선호하는 것을 이용해서 install을 해줍니다.

```bash
npm install   // npm 일 경우
yarn install  // yarn 일 경우
```

## Recommendations
- IDE - vscode
- node -v 18.17.0
- src/main.ts  -> default configuration
- fnm - node version manager
- yarn

## Explanation

### 1. Prettier
.prettierrc을 이용해서 prettier의 설정을 바꿀 수 있습니다.<br>
기본적으로 많이 사용하는 것을 이용했습니다.<br>

https://prettier.io/docs/en/index.html<br>


### 2. Eslint
.eslintrc.js을 이용해서 eslint의 설정을 바꿀 수 있습니다.<br>
airbnb를 사용했습니다. 기본적으로 리액트가 아닌 node에 초점을 두었습니다.

https://github.com/eslint/eslint


## Usage

컴파일과 함께 실행
```
yarn start    //yarn 일 경우
npm run start // npm 일 경우
```

파일감지(nodemon)실행
```
yarn dev     // yarn 일 경우
npm run dev  // npm 일 경우
```

업그레이드
```
yarn upgrade-interactive [--latest]
```
