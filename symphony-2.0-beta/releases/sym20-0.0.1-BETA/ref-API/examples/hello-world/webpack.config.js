const path = require('path');
const ManaWebpackPlugin = require('@mana/extension-webpack-plugin');

module.exports = {
  mode: (process.env.NODE_ENV === 'development') ? 'development' : 'production',
  devtool: (process.env.NODE_ENV === 'development') ? 'inline-source-map' : 'source-map',

  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new ManaWebpackPlugin({
      name: 'Hello World @mana extension',
      cwd: './dist',
      files: [
        './extension.js'
      ]
    })
  ],

  // Used when running webpck-dev-server
  devServer: {
    https: {
      cert: require.resolve('@mana/extension-lib/dev-certs/local-dev.symphony.com.crt'),
      key: require.resolve('@mana/extension-lib/dev-certs/local-dev.symphony.com.key')
    },
    port: 9030,
    host: 'local-dev.symphony.com',
    contentBase: './dist',
    publicPath: '/',
    inline: true,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
