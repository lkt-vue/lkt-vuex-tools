import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'build');
const test = resolve(__dirname, 'test');
const snapshots = resolve(__dirname, 'snapshots');

export default {
    plugins: [ vue() ],
    resolve: {
        alias: { '@': src, '@test': test }
    },
    build: {
        lib: {
            entry: `${ src }/index.ts`,
            name: 'LktTablePage',
            fileName: 'build',
            formats: ['es']
        },
        outDir,
        minify: true,
        rollupOptions: {
            external: [
                'vue',
                'lkt-tools',
                'lkt-events',
                'lkt-button',
                'lkt-http-client',
                'lkt-string-tools',
                'axios',
                'lkt-data-state',
                'lkt-loader',
                'lkt-table',
                'lkt-paginator'
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    axios: 'axios',
                    "lkt-tools": 'LktTools',
                    "lkt-events": 'LktEvents',
                    "lkt-button": 'LktButton',
                    "lkt-http-client": 'LktHttpClient',
                    "lkt-string-tools": 'LktStringTools'
                },
                sourcemapExcludeSources: true
            }
        }
    },
    test: {
        coverage: {
            reporter: [ 'text', 'lcov' ]
        },
        resolveSnapshotPath: (testPath, snapExtension) => {
            const path = testPath.split('/').splice(-2);
            return `${ snapshots }/${ path[0] }/${ path[1] }${ snapExtension }`;
        }
    }
};