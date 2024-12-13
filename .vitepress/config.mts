import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "耗子面板",
    description: "简单轻量，高效运维",
    lang: "zh",
    lastUpdated: true,
    locales: {
        root: {
            label: '简体中文',
            lang: 'zh-Hans',
        },
        en: {
            label: 'English',
            lang: 'en',
            title: 'Rat Panel',
            themeConfig: {
                nav: [
                    {text: 'Home', link: '/en/'},
                    {text: 'Examples', link: '/en/markdown-examples'}
                ],
                footer: {
                    message: 'This website is powered by Rat Panel',
                    copyright: '© 2022-2024 Tianjin Rat Technology Co., Ltd All Rights Reserved'
                }
            },
        },
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            {text: 'Examples', link: '/markdown-examples'}
        ],
        sidebar: [
            {
                text: 'Examples',
                items: [
                    {text: 'Markdown Examples', link: '/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/api-examples'}
                ]
            }
        ],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ],
        footer: {
            message: '<b style="font-size: larger; padding-bottom: 20px">严禁使用耗子面板从事违法活动，我司拒绝对违规使用的用户提供任何服务</b>',
            copyright: '© 2022-2024 天津耗子科技有限公司 版权所有丨<a target="_blank" href="https://beian.miit.gov.cn/" rel="noreferrer">津ICP备2022009678号-1</a>丨<a target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch?code=12011502000848" rel="noreferrer">津公网安备12011502000848号</a>'
        },
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})
