import {groupIconMdPlugin, groupIconVitePlugin} from 'vitepress-plugin-group-icons'
import {createFileSystemTypesCache} from '@shikijs/vitepress-twoslash/cache-fs'
import {transformerTwoslash} from '@shikijs/vitepress-twoslash'
import timeline from "vitepress-markdown-timeline";
import {defineConfig} from "vitepress";

import {enSearch, zh_CNSearch, zh_TWSearch} from './search'

export const shared = defineConfig({
    title: 'RatPanel',

    rewrites: {
        'en/:rest*': ':rest*'
    },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    markdown: {
        codeTransformers: [
            transformerTwoslash({
                typesCache: createFileSystemTypesCache()
            })
        ],
        config(md) {
            md.use(groupIconMdPlugin);
            md.use(timeline);
        },
        languages: ['go', 'bash', 'shell']
    },

    themeConfig: {
        logo: '/logo.png',
        socialLinks: [
            {icon: 'github', link: 'https://github.com/tnb-labs/panel'},
            {icon: 'tencentqq', link: 'https://jq.qq.com/?_wv=1027&k=I1oJKSTH'},
            {icon: 'wechat', link: 'https://work.weixin.qq.com/gm/d8ebf618553398d454e3378695c858b6'},
        ],
        search: {
            provider: 'local',
            options: {
                locales: {
                    ...enSearch,
                    ...zh_CNSearch,
                    ...zh_TWSearch
                }
            }
        }
    },

    transformPageData: (pageData) => {
        // 为版本页单独设置标题
        // https://github.com/vuejs/vitepress/discussions/2516
        if (pageData.params?.version) {
            pageData.title = `v${pageData.params.version}`
        }
    },

    vite: {
        plugins: [
            groupIconVitePlugin()
        ],
    },
})