const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'production') {
        webpackConfig.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
                unsafe: true,
                unsafe_comps: true,
                unsafe_math: true,
                unsafe_proto: true,
                unsafe_regexp: true,
                conditionals: true,
                unused: true,
                sequences: true,
                dead_code: true,
              },
              mangle: {
                safari10: true,
                toplevel: true,
                reserved: [],
                properties: {
                  regex: /^_/
                },
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            extractComments: false,
            parallel: true,
          }),
        ];

        webpackConfig.plugins.push(
          new JavaScriptObfuscator({
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: true,
            debugProtectionInterval: 1000,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            rotateStringArray: true,
            selfDefending: true,
            shuffleStringArray: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 0.75,
            transformObjectKeys: true,
            unicodeEscapeSequence: false,
            exclude: [
              'node_modules/**',
              'webpack-dev-server/**',
              'webpack/**',
              '**/*.css',
              '**/*.scss',
              '**/*.sass',
              '**/*.less',
              '**/*.html',
              '**/*.json',
              '**/*.svg',
              '**/*.png',
              '**/*.jpg',
              '**/*.gif',
              '**/*.webp',
              '**/*.ico',
              '**/*.woff',
              '**/*.woff2',
              '**/*.eot',
              '**/*.ttf',
              '**/*.otf',
            ]
          })
        );
      }

      return webpackConfig;
    },
  },
}; 