import {defineConfig, type DefaultTheme} from 'vitepress'

const resp = await (await fetch('https://panel.haozi.net/api/versions')).json()
const versions = resp.data.slice(0, 10).map((item: any) => {
    return item.version
})

export const config = defineConfig({
    lang: 'en-US',
    description: "Goravel is a web application framework with complete functions and excellent scalability. As a starting scaffolding to help Gopher quickly build their own applications.",

    themeConfig: {
        nav: nav(),

        sidebar: [
            {
                text: "Quickstart",
                base: '/quickstart/',
                items: sidebarQuickstart()
            },
            {
                text: "Advanced",
                base: '/advanced/',
                items: sidebarAdvanced()
            },
            {
                text: "Versions",
                collapsed: true,
                items: [
                    ...versions.map((version: string) => {
                        return {
                            text: version,
                            link: `/version-${version}`
                        }
                    })
                ]
            },
        ],

        editLink: {
            pattern: 'https://github.com/ratpanel/ratpanel.github.io/edit/main/:path',
            text: 'Edit this page on GitHub'
        },
        footer: {
            message: 'Released under the MIT License',
            copyright: `Copyright © 2022-${new Date().getFullYear()} Tianjin Rat Technology Co., Ltd All Rights Reserved`
        },
        docFooter: {
            prev: 'Previous page',
            next: 'Next page'
        },
        outline: {
            label: 'On this page'
        },
        lastUpdated: {
            text: 'Last updated',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },
        langMenuLabel: 'Change language',
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        skipToContentLabel: 'Skip to content'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {text: '首页', link: '/'},
        {text: '文档', link: '/quickstart/install'},
        {text: '支持', link: '/support'},
        {text: '🔥证书', link: '/cert'},
        {text: '关于', link: '/about'},
    ]
}

function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '安装面板',
            link: '/install'
        },
        {
            text: '挂载分区',
            link: '/disk'
        },
        {
            text: '管理面板',
            link: '/panel'
        },
        {
            text: '管理容器',
            link: '/container'
        },
    ]
}

function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '面板 API',
            link: '/api'
        },
        {
            text: '配置容器镜像加速',
            link: '/hub-mirror'
        },
        {
            text: '配置反向代理',
            link: '/proxy'
        },
        {
            text: '配置进程守护',
            link: '/supervisor'
        },
        {
            text: '配置 QUIC（HTTP3）',
            link: '/quic'
        },
        {
            text: '配置 TLSv1.1 TLSv1',
            link: '/tls'
        },
        {
            text: '安全性建议',
            link: '/safe'
        },
    ]
}
