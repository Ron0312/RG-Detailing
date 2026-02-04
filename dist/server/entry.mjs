import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D7BbVc3W.mjs';
import { manifest } from './manifest_qz2oHMFw.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/agb.astro.mjs');
const _page3 = () => import('./pages/api/log-404.astro.mjs');
const _page4 = () => import('./pages/api/log-404.perf.test.astro.mjs');
const _page5 = () => import('./pages/api/submit-quote.astro.mjs');
const _page6 = () => import('./pages/api/submit-quote.test.astro.mjs');
const _page7 = () => import('./pages/dampfreinigung.astro.mjs');
const _page8 = () => import('./pages/datenschutz.astro.mjs');
const _page9 = () => import('./pages/glossar/_slug_.astro.mjs');
const _page10 = () => import('./pages/glossar.astro.mjs');
const _page11 = () => import('./pages/impressum.astro.mjs');
const _page12 = () => import('./pages/keramikversiegelung.astro.mjs');
const _page13 = () => import('./pages/leasing.astro.mjs');
const _page14 = () => import('./pages/robots.txt.astro.mjs');
const _page15 = () => import('./pages/sitemap.astro.mjs');
const _page16 = () => import('./pages/sitemap.xml.astro.mjs');
const _page17 = () => import('./pages/werterhalt-garantie.astro.mjs');
const _page18 = () => import('./pages/wohnmobil.astro.mjs');
const _page19 = () => import('./pages/_city_.astro.mjs');
const _page20 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/agb.astro", _page2],
    ["src/pages/api/log-404.ts", _page3],
    ["src/pages/api/log-404.perf.test.ts", _page4],
    ["src/pages/api/submit-quote.ts", _page5],
    ["src/pages/api/submit-quote.test.ts", _page6],
    ["src/pages/dampfreinigung.astro", _page7],
    ["src/pages/datenschutz.astro", _page8],
    ["src/pages/glossar/[slug].astro", _page9],
    ["src/pages/glossar/index.astro", _page10],
    ["src/pages/impressum.astro", _page11],
    ["src/pages/keramikversiegelung.astro", _page12],
    ["src/pages/leasing.astro", _page13],
    ["src/pages/robots.txt.ts", _page14],
    ["src/pages/sitemap.astro", _page15],
    ["src/pages/sitemap.xml.ts", _page16],
    ["src/pages/werterhalt-garantie.astro", _page17],
    ["src/pages/wohnmobil.astro", _page18],
    ["src/pages/[city].astro", _page19],
    ["src/pages/index.astro", _page20]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///app/dist/client/",
    "server": "file:///app/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
