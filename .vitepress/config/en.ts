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
        {text: 'Home', link: '/'},
        {text: 'Document', link: '/quickstart/install'},
        {text: 'Support', link: '/support'},
        {text: '🔥Certificate', link: '/cert'},
        {text: 'About', link: '/about'},
    ]
}

function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Installing panel',
            link: '/install'
        },
        {
            text: 'Mounting partition',
            link: '/disk'
        },
        {
            text: 'Managing panel',
            link: '/panel'
        },
        {
            text: 'Managing container',
            link: '/container'
        },
    ]
}

function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Panel API',
            link: '/api'
        },
        {
            text: 'Configure container image acceleration',
            link: '/hub-mirror'
        },
        {
            text: 'Configure reverse proxy',
            link: '/proxy'
        },
        {
            text: 'Configure process daemon',
            link: '/supervisor'
        },
        {
            text: 'Configure QUIC (HTTP3)',
            link: '/quic'
        },
        {
            text: 'Configure TLSv1.1 TLSv1',
            link: '/tls'
        },
        {
            text: 'Security recommendations',
            link: '/safe'
        },
    ]
}
