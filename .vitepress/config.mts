import {defineConfig} from 'vitepress'

const resp = await (await fetch('https://panel.haozi.net/api/versions')).json()
const versions = resp.data.map((item: any) => {
    return item.version
})

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "耗子面板",
    description: "简单轻量 • 高效运维",
    lang: "zh",
    locales: {
        root: {
            label: '简体中文',
            lang: 'zh-Hans',
        },
        /*en: {
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
                },
                editLink: {
                    pattern: "https://github.com/ratpanel/ratpanel.github.io/edit/main/:path",
                    text: "Edit this page on GitHub"
                },
            },
        },*/
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/.github/assets/logo.png',
        nav: [
            {text: '首页', link: '/'},
            {text: '文档', link: '/quickstart/install'},
            {text: '支持', link: '/support'},
            {text: '🔥证书', link: '/cert'},
            {text: '关于', link: '/about'},
        ],
        sidebar: [
            {
                text: '快速上手',
                collapsed: true,
                items: [
                    {
                        text: '安装',
                        link: '/quickstart/install'
                    },
                ],
            },
            {
                text: '深入了解',
                collapsed: true,
                items: [],
            },
            {
                text: '版本日志',
                collapsed: true,
                items: [
                    ...versions.map(version => {
                        return {
                            text: version,
                            link: `/version-${version}`
                        }
                    })
                ]
            }
        ],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/TheTNB/panel'},
            {icon: 'tencentqq', link: 'https://jq.qq.com/?_wv=1027&k=I1oJKSTH'},
            {icon: 'wechat', link: 'https://work.weixin.qq.com/gm/d8ebf618553398d454e3378695c858b6'},
        ],
        footer: {
            message: '<b style="font-size: larger; padding-bottom: 20px">严禁使用耗子面板从事违法活动，我司不对违规用户提供任何服务</b>',
            copyright: '© 2022-2024 天津耗子科技有限公司 版权所有丨<a target="_blank" href="https://beian.miit.gov.cn/" rel="noreferrer">津ICP备2022009678号-1</a>丨<a target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch?code=12011502000848" rel="noreferrer">津公网安备12011502000848号</a>'
        },
        editLink: {
            pattern: "https://github.com/ratpanel/ratpanel.github.io/edit/main/:path",
            text: "在 GitHub 上编辑此页面"
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
    },
})
