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
| `useLevel` | `true` | 是否对人品值进行附加评价。**\*3** |
| `levels` | **\*4** | 自定义评价语句。 |
| `useJackpot` | `true` | 是否对特定分值进行特殊评价。**\*3** |
| `jackpots` | **\*4** | 自定义对特定分值的评价语句。 |

**\*1** 数据库的用途仅在于获取数据库内的 [用户昵称](https://koishi.js.org/plugins/accessibility/callme.html)。手动将其设置为 `false` 可在安装了数据库的情况下不使用数据库。在未安装数据库的情况下即使手动指定为 `true` 也不会启用数据库。

**\*2** 这个值为
```
{0} 的今日人品是：{1}。{2}
```
其中 `{0}` 为用户名称，`{1}` 为人品值，`{2}` 为附加评价。在不启用附加评价的时候，`{2}` 将为空白。

你也可以通过 [复写翻译文件](https://koishi.js.org/guide/i18n/translation.html) 来修改此行为，对应的模板路径为 `jrrp.result` 。

**\*3** `useLevel` 和 `useJackpot` 互相独立，在同时打开的情况下 `useJackpot` 优先于 `useLevel`。如果不想要评价，请把这两个配置项一同设置为 `false`。

**\*4** 插件中已为这两个配置项设置了默认值。如果你想自定义这两个配置项，那么它们都遵循
```js
{
  '分值': '评价语句'
}
```
的规则。例如：
```js
{
  '0'：'好像有点低啊！'
  '50': '看起来还不错！'
}
```
键是数字还是字符串对此配置项没有影响。

对于 `levels` 而言，附加评价将取不超出人品值的最高的那一条。记得给 `0` 值做兜底评价，否则会不可避免地打破这个规矩。

对于 `jackpots` 而言，人品值与键相等才会使用特殊评价。

## Q&A

- 为什么叫 jrrp 而不是 luck 之类的？

因为就是 jrrp 的劣质仿造。

- 我想要更多功能！

推荐使用 `Ctrl + C` 然后 `Ctrl + V`。

## 更新记录

<details>
<summary><b>v1.0</b> （用于 Koishi v4）</summary>

### v1.0.0

- 对 v4 做了一个很简陋的适配。

### v1.1.0

- **[Breaking]** 重命名配置项 `levels` 为 `useLevel`， `levelDescriptions` 为 `levels`。因为大概没有人用配置项，所以就不升大版本号了。
- 新增配置项 `useJackpot` 和 `jackpots`，设置对特定人品值的评价变得更方便了。

之前可以用这样的方式设置对特定人品值的评价：
```js
// levels:
{
  '40': '又是平凡的一天。'
  '42': '感觉可以参透宇宙的真理。'
  '43': '又是平凡的一天。'
}
```
但是这么做比较废话，也不怎么好看。现在可以直接指定 `jackpots`：
```js
// levels:
{
  '40': '又是平凡的一天。'
}

// jackpots
{
  '42': '感觉可以参透宇宙的真理。'
}
```

- **[Breaking]** 相应地，关闭评价需要同时关闭 `useLevel` 和 `useJackpot` 两个项了。

</details>

<details>
<summary><b>v0.1</b> （用于 Koishi v3）</summary>

### v0.1.3

- 修复了一些关于配置项 Typings 的问题。

</details>