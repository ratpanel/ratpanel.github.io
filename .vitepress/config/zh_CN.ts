import { type DefaultTheme, defineConfig } from 'vitepress';
const locale = "zh_CN";
const resp = await (await fetch('https://panel.haozi.net/api/versions')).json();
const versions = resp.data.slice(0, 10).map((item: any) => {
  return item.version;
});
export const config = defineConfig({
  lang: "zh-CN",
  title: "耗子面板",
  description: "简单轻量 • 高效运维",
  themeConfig: {
    nav: nav(),
    sidebar: [{
      text: "快速开始",
      base: locale == 'en' ? '/quickstart' : `/${locale}/quickstart`,
      items: sidebarQuickstart()
    }, {
      text: "进阶指南",
      base: locale == 'en' ? '/advanced' : `/${locale}/advanced`,
      items: sidebarAdvanced()
    }, {
      text: "版本历史",
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
      text: "在 GitHub 上编辑此页面"
    },
    footer: {
      message: "<b style=\"font-size: larger\">严禁使用耗子面板从事违法活动，我司不对违规用户提供任何服务</b>",
      copyright: `© 2022-${new Date().getFullYear()} 天津耗子科技有限公司 版权所有丨<a target="_blank" href="https://beian.miit.gov.cn/" rel="noreferrer">津ICP备2022009678号-1</a>丨<a target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch?code=12011502000848" rel="noreferrer">津公网安备12011502000848号</a>`
    },
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    outline: {
      label: "页面导航"
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    langMenuLabel: "切换语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色主题",
    darkModeSwitchTitle: "切换到深色主题",
    skipToContentLabel: "跳转到内容"
  }
});
function nav(): DefaultTheme.NavItem[] {
  return [{
    text: "首页",
    link: locale == 'en' ? '/' : `/${locale}/`
  }, {
    text: "文档",
    link: locale == 'en' ? '/quickstart/install' : `/${locale}/quickstart/install`
  }, {
    text: "支持",
    link: locale == 'en' ? '/support' : `/${locale}/support`
  }, {
    text: "🔥证书",
    link: locale == 'en' ? '/cert' : `/${locale}/cert`
  }, {
    text: "关于",
    link: locale == 'en' ? '/about' : `/${locale}/about`
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: "安装面板",
    link: '/install'
  }, {
    text: "挂载分区",
    link: '/disk'
  }, {
    text: "管理面板",
    link: '/panel'
  }, {
    text: "管理容器",
    link: '/container'
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: "面板 API",
    link: '/api'
  }, {
    text: "安全性建议",
    link: '/safe'
  }, {
    text: "常见问题",
    link: '/faq'
  }];
}