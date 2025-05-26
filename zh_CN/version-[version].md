# v{{ $params.version }}

- 版本类型：{{ $params.type == 'stable' ? '稳定版' : '测试版' }}
- 发布时间：{{ $params.time }}

## 更新内容

<!-- @content -->