# vscode自定义代码片段

## Snippet语法
### 制表位 Tabstops
使用制表位(Tabstops)可以在代码片段中移动光标位置，使用$1,$2来指定光标的位置,数字代表光标的移动的顺序，$0代表光标的最后位置。如果有多个相同的制表位(Tabstops)会在编译器里同时出现多个光标（类似编译器的块编辑模式）。

### 占位符 Placeholders
占位符(Placeholders) 是带默认值的制表位(Tabstops),占位符(Placeholders)的文本会被插入到制表位(Tabstops)所在位置并且全选以方便修改,占位符(Placeholders)可以嵌套使用，比如${1:another ${2:placeholder}}。

### 选择项
占位符(Placeholders)可以有多选值，每个选项的值用 , 分隔，选项的开始和结束用管道符号(|)将选项包含，例如: ${1|one,two,three|}，当插入代码片段，选择制制表位(Tabstops)的时候，会列出选项供用户选择。

### 变量
使用 $name 或者 ${name|default} 可以插入变量的值，如果变量未被赋值则插入 default 的值或者空值 。当变量未被定义，则将变量名插入，变量(Variables)将被转换为占位符(Placeholders)
#### 系统变量如下:
* TM_SELECTED_TEXT 当前选定的文本或空字符串
* TM_CURRENT_WORD 光标下的单词的内容或空字符串
* TM_LINE_INDEX 基于零索引的行号
* TM_CURRENT_LINE 当前行的内容
* TM_LINE_NUMBER 基于一索引的行号
* TM_FILENAME 当前文档的文件名
* TM_FILENAME_BASE 当前文档的文件名（不含后缀名)
* TM_DIRECTORY 当前文档的目录
* TM_FILEPATH 当前文档的完整文件路径
* CLIPBOARD 剪切板里的内容
#### 插入当前日期或时间
* CURRENT_YEAR 当前年(四位数)
* CURRENT_YEAR_SHORT 当前年(两位数)
* CURRENT_MONTH 当前月
* CURRENT_MONTH_NAME 本月的全名（’七月’）
* CURRENT_MONTH_NAME_SHORT 月份的简称（’Jul’）
* CURRENT_DATE 当前日
* CURRENT_DAY_NAME 当天的名称（’星期一’）
* CURRENT_DAY_NAME_SHORT 当天的短名称（’Mon’）
* CURRENT_HOUR 当前小时
* CURRENT_MINUTE 当前分钟
* CURRENT_SECOND 当前秒
#### 当前语言的行注释或块注释
* BLOCK_COMMENT_START 块注释开始标识,如 PHP /* 或 HTML <!--
* BLOCK_COMMENT_END 块注释结束标识,如 PHP */ 或 HTML -->
* LINE_COMMENT 行注释，如： PHP // 或 HTML <!-- -->
### 常用snippet收集

```json
{
  "Print to console": {
    "prefix": "clg",
    "body": [
      "console.log(${1});",
			"$2"
    ],
    "description": "Log output to console"
  },
  "Print to trycatch": {
    "prefix": "try",
    "body": [
      "try {",
      "",
      "} catch(e) {",
      "  console.error(e)",
      "}"
    ],
    "description": "trycatch"
  },
  "print to async await": {
    "prefix": "async",
    "body": [
      "async $functionName (params) {",
      "  try {\n",
      "  } catch(e) {",
      "    console.error(e)",
      "  }",
      "},"
    ],
    "description": "log output to async function"
  }
}
```
## 参考链接
* [vscode 自定义代码片段 - SegmentFault 思否](https://segmentfault.com/a/1190000018457312)