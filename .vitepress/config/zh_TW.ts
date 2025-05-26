import { type DefaultTheme, defineConfig } from 'vitepress';
const resp = await (await fetch('https://panel.haozi.net/api/versions')).json();
const versions = resp.data.slice(0, 10).map((item: any) => {
  return item.version;
});
export const config = defineConfig({
  lang: 'en-US',
  title: 'RatPanel',
  description: "Simple · lightweight · efficient",
  themeConfig: {
    nav: nav(),
    sidebar: [{
      text: "Quickstart",
      base: '/quickstart',
      items: sidebarQuickstart()
    }, {
      text: "Advanced",
      base: '/advanced',
      items: sidebarAdvanced()
    }, {
      text: "Versions",
      collapsed: true,
      items: [...versions.map((version: string) => {
        return {
          text: version,
          link: `/version-${version}`
        };
      })]
    }],
    editLink: {
      pattern: 'https://github.com/ratpanel/ratpanel.github.io/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: '<b style="font-size: larger">It is strictly forbidden to use Rat Panel for illegal activities, and our company does not provide any services to violators</b>',
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
});
function nav(): DefaultTheme.NavItem[] {
  return [{
    text: 'Home',
    link: '/'
  }, {
    text: 'Document',
    link: '/quickstart/install'
  }, {
    text: 'Support',
    link: '/support'
  }, {
    text: "🔥證書",
    link: '/cert'
  }, {
    text: 'About',
    link: '/about'
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Installing panel',
    link: "/安裝"
  }, {
    text: 'Mounting partition',
    link: "/磁碟"
  }, {
    text: 'Managing panel',
    link: '/panel'
  }, {
    text: 'Managing container',
    link: "/容器"
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Panel API',
    link: '/api'
  }, {
    text: 'Configure container image acceleration',
    link: '/hub-mirror'
  }, {
    text: 'Configure reverse proxy',
    link: '/proxy'
  }, {
    text: 'Configure process daemon',
    link: '/supervisor'
  }, {
    text: 'Configure QUIC (HTTP3)',
    link: '/quic'
  }, {
    text: 'Configure TLSv1.1 TLSv1',
    link: '/tls'
  }, {
    text: 'Security recommendations',
    link: "/安全"
  }];
}