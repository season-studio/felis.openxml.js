import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
// import nodePolyfills from 'rollup-plugin-node-polyfills';
// import builtins from 'builtin-modules';

export default {
    input: './src/index.js',
    output: {
        name: 'test',
        file: '.dist/index.js',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        resolve({
            browser: true,
            preferBuiltins: true,
            only: [ /^.\/src\/*$/, /^@babel\/runtime\/*$/]
        }),
        // nodePolyfills(),
        commonjs(),
        babel({
            include: 'src/**',
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            babelrc: false,
            presets: [
                "@babel/env"
            ],
            plugins: [
                ['@babel/plugin-proposal-class-properties'],
                ['@babel/plugin-transform-classes'],
                [
                    '@babel/plugin-transform-runtime',
                    {
                        corejs: false,
                        helpers: true,
                        useESModules: true,
                        regenerator: true
                    }
                ]
            ]
        }),
        json(),
        //terser()
    ],
    //external: builtins,
};