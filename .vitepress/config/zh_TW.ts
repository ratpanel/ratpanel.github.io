import { type DefaultTheme, defineConfig } from 'vitepress';
const locale = "zh_TW";
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
      base: locale == 'en' ? '/quickstart' : `/${locale}/quickstart`,
      items: sidebarQuickstart()
    }, {
      text: "Advanced",
      base: locale == 'en' ? '/advanced' : `/${locale}/advanced`,
      items: sidebarAdvanced()
    }, {
      text: "Versions",
      collapsed: true,
      items: [...versions.map((version: string) => {
        return {
          text: version,
          link: locale == 'en' ? `/version-${version}` : `/${locale}/version-${version}`
        };
      })]
    }],
    editLink: {
      pattern: 'https://github.com/ratpanel/ratpanel.github.io/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: '<b style="font-size: larger">It is strictly forbidden to use Rat Panel for illegal activities, and our company does not provide any services to violators</b>',
      copyright: `Copyright © 2022-${new Date().getFullYear()} Tianjin Rat Technology Co., Ltd All Rights Reserved.丨<a target="_blank" href="https://beian.miit.gov.cn/" rel="noreferrer">津ICP备2022009678号-1</a>丨<a target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch?code=12011502000848" rel="noreferrer">津公网安备12011502000848号</a>`
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
    link: locale == 'en' ? '/' : `/${locale}/`
  }, {
    text: 'Document',
    link: locale == 'en' ? '/quickstart/install' : `/${locale}/quickstart/install`
  }, {
    text: 'Support',
    link: locale == 'en' ? '/support' : `/${locale}/support`
  }, {
    text: "🔥證書",
    link: locale == 'en' ? '/cert' : `/${locale}/cert`
  }, {
    text: 'About',
    link: locale == 'en' ? '/about' : `/${locale}/about`
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
    text: 'Security recommendations',
    link: "/安全"
  }, {
    text: 'FAQ',
    link: '/faq'
  }];
}