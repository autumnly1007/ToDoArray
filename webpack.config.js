// import
const path = require('path'); // node.js 전역 모듈
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// export
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js', // parcel main.js 와 비슷함

  // 결과물(번들)을 반환하는 설정
  output: {
    path: path.resolve(__dirname, 'dist'), // 기본값, 생략 가능
    filename: 'main.js', // 기본값, 생략 가능
    clean: true, // 기존 내용 삭제
  },

  module: {
    rules: [
      {
        test: /\.s?css$/, // css/scss 확장자로 끝나는 파일
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], // 해당 패키지에서 사용할 것 (순서가 중요함)
        // 1. sass-loader : scss 를 해석
        // 2. postcss-loader : 해석된 내용에 플러그인 적용 (autoprefixer)
        // 3. css-loader : 적용된 내용을 읽어들임
        // 4. style-loader : index.html 에 스타일 태그로 삽입해줌
      },
      {
        test: /\.js$/, // js 확장자로 끝나는 파일
        use: ['babel-loader'], // 파일을 babel-loader 로 읽어들여서 babel 이 적용될 수 있게 만들어줌
      },
    ],
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }], // 폴더명
    }),
  ],

  devServer: {
    host: 'localhost',
  },
};
