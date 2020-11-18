import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import path from "path";
// import builtins from 'builtin-modules';

let index = process.argv.indexOf("--item");
let itemFile = process.argv[index + 1];

export default {
    input: itemFile,
    output: {
        name: path.basename(itemFile, '.js'),
        file: `./html/js/${path.basename(itemFile)}`,
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        resolve({
            browser: true,
            preferBuiltins: true,
            only: [ /^.\/*$/, /^@babel\/runtime\/*$/, /^regenerator-runtime\/*$/]
        }),
        nodePolyfills(),
        commonjs(),
        babel({
            include: ['./**'],
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
    // external: ['jszip'],
};