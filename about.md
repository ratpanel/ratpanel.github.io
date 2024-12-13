---
sidebar: false
prev: false
next: false
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://weavatar.com/avatar/18e77debb1bc0000c0b50757b8f1bebb2c3e4df3d494124f776c15dbc1ebe8a5',
    name: '耗子',
    desc: '创始人 & CEO',
    links: [
      { icon: 'github', link: 'https://github.com/devhaozi' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/8067' }
    ]
  },
  {
    avatar: 'https://weavatar.com/avatar/f6b23deadaa481f0b3ea75ad94f246881ed2326117efebad6f2799ea165779b9',
    name: '靓仔',
    desc: '技术负责人',
    links: [
      { icon: 'github', link: 'https://github.com/205125' }
    ]
  },
  {
    avatar: 'https://weavatar.com/avatar/c74008bc2b2e853db10fcc58359ad8a38886d5e6b4d502f408aec91e5dc609e7',
    name: '冭',
    desc: '证书销售',
    links: [
      { icon: 'tencentqq', link: 'https://wpa.qq.com/msgrd?v=3&uin=1429182374&site=qq&menu=yes' },
    ]
  },
]
</script>

# 关于

## 关于耗子面板

耗子面板是一款专业的服务器运维管理面板，致力于为用户提供简单、高效、安全的服务器管理解决方案。

| 愿景                | 使命            | 价值观            |
|-------------------|---------------|----------------|
| 成为领先的服务器管理解决方案提供商 | 让服务器管理变得简单而高效 | 用户至上、创新驱动、专业专注 |

## 团队介绍

<VPTeamMembers size="small" :members="members" />

## 发展历程

<style>
  .about-timeline {
    max-width: 800px;
    margin: 0 auto 60px;
    position: relative;
  }
  .about-timeline::before {
    content: '';
    position: absolute;
    width: 2px;
    background: #e7f1ff;
    top: 0;
    bottom: 0;
    left: 50%;
  }
  .about-timeline-item {
    margin-bottom: 30px;
    position: relative;
  }
  .about-timeline-content {
    padding: 20px;
    border-radius: 8px;
    width: 45%;
    position: relative;
  }
  .about-timeline-dot {
    width: 12px;
    height: 12px;
    background: #4a90e2;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .about-year {
    color: #4a90e2;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .about-h3 {
    margin: 0!important;
  }
</style>

<div class="about-timeline">
  <div class="about-timeline-item">
    <div class="about-timeline-content" style="margin-left: auto;">
      <div class="about-year">2024</div>
      <h3 class="about-h3">全新起航</h3>
      <p>面板得到了众多赞助商的支持，2024 年下半年发布了全新的 2.3 版本</p>
    </div>
    <div class="about-timeline-dot"></div>
  </div>

  <div class="about-timeline-item">
    <div class="about-timeline-content">
      <div class="about-year">2023</div>
      <h3 class="about-h3">技术积累</h3>
      <p>使用 Go 对面板进行重写，发布 2.0 2.1 系列版本，积累了大量开发经验</p>
    </div>
    <div class="about-timeline-dot"></div>
  </div>

  <div class="about-timeline-item">
    <div class="about-timeline-content" style="margin-left: auto;">
      <div class="about-year">2022</div>
      <h3 class="about-h3">项目立项</h3>
      <p>2022 年中项目立项，年末发布 1.0 版本</p>
    </div>
    <div class="about-timeline-dot"></div>
  </div>
</div>

## 联系我们

| 名称   | 联系方式                                                                     |
|------|--------------------------------------------------------------------------|
| 企业微信 | [点击联系](https://work.weixin.qq.com/kfid/kfc20ea8e38b5a4e73a)              |
| QQ   | [826896000](https://wpa.qq.com/msgrd?v=3&uin=826896000&site=qq&menu=yes) |
| 电子邮件 | [admin@haozi.net](mailto:admin@haozi.net)                                |
| 公司地址 | 天津市武清区黄庄街道泉里路1号智库大厦206室                                                  |
