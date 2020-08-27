const path = require('path');
const myWebpackConfig = require("../webpack.config");

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-knobs/register',
    'storybook-addon-react-docgen',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.tsx?$/,
      include: path.resolve(__dirname, '../src'),
      use: [
        require.resolve('babel-loader'),
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            // Provide the path to your tsconfig.json so that your stories can
            // display types from outside each individual story.
            tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
          },
        },
      ],
    });

    return {
      ...config,
      resolve:  myWebpackConfig.resolve,
      module: {
        ...config.module,
        rules: [...config.module.rules, ...myWebpackConfig.module.rules],
      },
    }
  },
};
