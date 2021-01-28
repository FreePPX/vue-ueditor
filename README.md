# vue-ueditor-simple

## Install
```
npm i vue-ueditor-simple
```

### 注意
```
1.需要下载一份完整的 UEditor 代码包放在项目根目录下的public文件夹下
2.如需传入配置，UEDITOR_HOME_URL 不能缺少
```

### Import
main.js
```
import VueUEeditorSimple from 'vue-ueditor-simple'

Vue.use(VueUEditor)
```

### Use
$global.API为配置地址

简单使用
```
<template>
    <div>
        <vue-u-editor :value="value"/>
    </div>
</template>

<script>
export default {
  name: 'CommonEditor',
  data() {
    return {
      value: '',
    }
  }
}
</script>
```

完整版
```
<template>
    <div style="overflow: hidden;line-height: initial;" :style="{maxWidth: width+'px'}">
        <vue-u-editor :id="editorId" :value="value" :config="ueConfig" @before-init="addCustomButtom" @input="handleInput" @ready="handleReady"/>
    </div>
</template>

<script>
  export default {
    name: 'CommonEditor',
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      width: {
        type: Number,
        default: 1200
      },
      height: {
        type: Number,
        default: 560
      },
      disabled: Boolean,
    },
    data () {
      function generateUUID () {
        var d = new Date().getTime()
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        return uuid
      }
      return {
        editorId: generateUUID(),
        ueConfig: {
          toolbars: [
            [
              'anchor', //锚点
              'undo', //撤销
              'redo', //重做
              'bold', //加粗
              'indent', //首行缩进
              'snapscreen', //截图
              'italic', //斜体
              'underline', //下划线
              'strikethrough', //删除线
              'subscript', //下标
              'fontborder', //字符边框
              'superscript', //上标
              'formatmatch', //格式刷
              'source', //源代码
              'blockquote', //引用
              'pasteplain', //纯文本粘贴模式
              'selectall', //全选
              'print', //打印
              'preview', //预览
              'horizontal', //分隔线
              'removeformat', //清除格式
              'time', //时间
              'date', //日期
              'unlink', //取消链接
              'insertrow', //前插入行
              'insertcol', //前插入列
              'mergeright', //右合并单元格
              'mergedown', //下合并单元格
              'deleterow', //删除行
              'deletecol', //删除列
              'splittorows', //拆分成行
              'splittocols', //拆分成列
              'splittocells', //完全拆分单元格
              'deletecaption', //删除表格标题
              'inserttitle', //插入标题
              'mergecells', //合并多个单元格
              'deletetable', //删除表格
              'cleardoc', //清空文档
              'insertparagraphbeforetable', //"表格前插入行"
              // 'insertcode', //代码语言
              'fontfamily', //字体
              'fontsize', //字号
              'paragraph', //段落格式
              'simpleupload', //单图上传
              // 'insertimage', //多图上传
              'edittable', //表格属性
              'edittd', //单元格属性
              'link', //超链接
              'emotion', //表情
              'spechars', //特殊字符
              'searchreplace', //查询替换
              'map', //Baidu地图
              // 'gmap', //Google地图
              'insertvideo', //视频
              'help', //帮助
              'justifyleft', //居左对齐
              'justifyright', //居右对齐
              'justifycenter', //居中对齐
              'justifyjustify', //两端对齐
              'forecolor', //字体颜色
              'backcolor', //背景色
              'insertorderedlist', //有序列表
              'insertunorderedlist', //无序列表
              'fullscreen', //全屏
              'directionalityltr', //从左向右输入
              'directionalityrtl', //从右向左输入
              'rowspacingtop', //段前距
              'rowspacingbottom', //段后距
              // 'pagebreak', //分页
              // 'insertframe', //插入Iframe
              'imagenone', //默认
              'imageleft', //左浮动
              'imageright', //右浮动
              // 'attachment', //附件
              'imagecenter', //居中
              // 'wordimage', //图片转存
              'lineheight', //行间距
              'edittip ', //编辑提示
              'customstyle', //自定义标题
              'autotypeset', //自动排版
              // 'webapp', //百度应用
              'touppercase', //字母大写
              'tolowercase', //字母小写
              'background', //背景
              // 'template', //模板
              // 'scrawl', //涂鸦
              // 'music', //音乐
              'inserttable', //插入表格
              'drafts', // 从草稿箱加载
              'charts', // 图表
            ]
          ],
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: this.height,
          // 初始容器宽度
          initialFrameWidth: '100%',
          // 上传文件接口
          serverUrl: `${this.$global.API}ueditor/config`,
          // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
          UEDITOR_HOME_URL: '/UEditor/',
        },
        loading: null
      }
    },
    methods: {
      handleReady(editor) {
        let self = this;
        editor._bkGetActionUrl = editor.getActionUrl;
        editor.getActionUrl = function(action) {
          // 这里很重要，很重要，很重要，要和配置中的imageActionName值同样
          if(action === 'uploadimage'){
            // 这里调用后端写的图片上传接口
            return self.$global.API+'ueditor/uploadImage';
          } else if(action === 'uploadfile'){
            // 这里调用后端写的文件上传接口
            return self.$global.API+'ueditor/uploadFile';
          } else if(action === 'catchimage'){
            // 这里调用后端写的替换图片地址的接口
            return self.$global.API+'ueditor/catchimage';
          } else {
            return this._bkGetActionUrl.call(this, action);
          }
        }
        if(this.disabled) {
          editor.setDisabled();
        }
      },
      handleInput(contents) {
        this.$emit('input', contents)
      },
      addCustomButtom (editorId) {
        window.UE.registerUI('oss-src', function (editor, uiName) {
          // 创建一个 button
          var btn = new window.UE.ui.Button({
            // 按钮的名字
            name: uiName,
            // 提示
            title: '这是hover提示',
            // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
            cssRules: "",
            // 点击时执行的命令
            onclick: async function () {
              // 这里可以不用执行命令，做你自己的操作也可
              // editor.execCommand(uiName)
              let srcArr = [];
              let contents = editor.getContent()
                ...
              editor.setContent(contents);
              alert('上传oss成功！')
            }
          })
          // 当点到编辑内容上时，按钮要做的状态反射
          editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState(uiName)
            if (state === -1) {
              btn.setDisabled(true)
              btn.setChecked(false)
            } else {
              btn.setDisabled(false)
              btn.setChecked(state)
            }
          })
          // 因为你是添加 button，所以需要返回这个 button
          return btn
        }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
      },
    }
  }
</script>
```

### Props

 属性名  | 类型  | 说明
 ---- | ----- | ------ 
 value  | String | 富文本内容
 config  | Object | 编辑器配置参数（ueditor配置） 
 editorId  | String | 唯一id，默认'editor'
 
### Events

 方法名  | 说明 | 回调参数
 ---- | ----- | ------ 
 input  | String | 富文本(content)
 before-init  | 初始化之前 | id及配置(editorId, config)
 ready  | 初始化UE加载完成 | editor实例(editor)
 
[ueditor github 地址](https://github.com/fex-team/ueditor).
