# koishi-plugin-jrrp

[![npm](https://img.shields.io/npm/v/koishi-plugin-jrrp?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-jrrp)
[![npm-download](https://img.shields.io/npm/dw/koishi-plugin-jrrp?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-jrrp)

一个用于 **[Koishi v4](https://github.com/koishijs/koishi)** 的查看今日人品的插件。

## 安装方法

```shell
npm i koishi-plugin-jrrp
```

然后在配置文件或入口文件中将插件添加至你的机器人中。

## 使用方法

```
jrrp
```

## 插件配置项

这个插件无需任何配置项即可使用，同时也提供了一些可能会用到的配置项。一些不太可能会用到的配置项就摸了。

| 配置项 | 默认值 | 说明 |
| - | - | - |
| `useDatabase` | `true` | 是否使用数据库。**\*1** |
| `result` | **\*2** | 自定义结果文字。 |
| `levels` | `true` | 是否启用对人品值的附加评价。 |
| `levelDescriptions` | **\*3** | 自定义对人品值的附加评价。 |

**\*1** 数据库的用途仅在于获取数据库内的用户昵称。手动将其设置为 `false` 可在安装了数据库的情况下不使用数据库。在未安装数据库的情况下即使手动指定为 `true` 也不会启用数据库。

**\*2** 在不启用评价（即 `levels` 为 `false`）的情况下，这个值为
```
{0} 的今日人品是：{1}
```
而启用的情况下则是
```
{0} 的今日人品是：{1}。{2}
```
其中 `{0}` 为用户名称，`{1}` 为人品值，`{2}` 为附加评价。你也可以通过复写 [Template](https://koishi.js.org/api/global.html#template-path-params) 来修改此行为，对应的模板路径为 `jrrp.result` 。

**\*3** 评价的默认内容为
```js
{
  '100': '买彩票可能会中大奖哦！',
  '80': '出门可能捡到 1 块钱。',
  '60': '太阳当头照，花儿对你笑。',
  '40': '还行，还行。',
  '20': '多扶一扶老奶奶吧。',
  '0': '推荐闷头睡大觉。'
}
```
给这个配置项填入类似的格式可以自定义评价内容。键是数字还是字符串对此配置项没有影响。对于一个人品值，附加评价将取最高但不超出人品值的那一条。

## Q&A

- 为什么叫 jrrp 而不是 luck 之类的？

因为就是 jrrp 的劣质仿造。

- 我想要更多功能！

推荐使用 `Ctrl + C` 然后 `Ctrl + V`。

## 更新记录

### v1.0.0

- 对 v4 做了一个很简陋的适配。

### v0.1.3

- 修复了一些关于配置项 Typings 的问题。