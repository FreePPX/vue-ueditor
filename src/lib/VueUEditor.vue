<template>
    <div>
        <script :id="id" type="text/plain"></script>
    </div>
</template>
<script>
  import '../../public/ueditor/ueditor.config.js'
  import '../../public/ueditor/ueditor.all.js'
  import '../../public/ueditor/lang/zh-cn/zh-cn.js'
  import '../../public/ueditor/ueditor.parse.js'

  export default {
    name: 'vue-u-editor',
    data () {
      return {
        editor: null,
      }
    },
    props: {
      config: {
        type: Object,
        default: function (val) {
          return {
            initialFrameWidth: null,
            initialFrameHeight: 350,
            UEDITOR_HOME_URL: '/UEditor/',
            ...val
          }
        }
      },
      value: {
        type: String,
        default: ''
      },
      id:{
        type: String,
        default: 'editor'
      }
    },
    watch: {
      value: function () {
        let self = this
        self.editor.ready(function () {
          if (!self.editor.isFocus()) {
            self.editor.setContent(self.value)
          }
        })
      }
    },
    mounted () {
      this.$emit('before-init', this.id, this.config);
      // console.log('get-config')
      this.editor = window.UE.getEditor(this.id, this.config) // 初始化UE
      // console.log('before-ready')
      this.editor.addListener('ready', () => {
        this.editor.setContent(this.value) // 确保UE加载完成后，放入内容。
        this.$emit('ready', this.editor);
      })
      this.editor.addListener('contentChange', (() => {
        this.content = this.editor.getContent()
        this.$emit('input', this.editor.getContent())
      }))
    },
    methods: {
      getUEContent () { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed () {
      this.editor.destroy()
    }
  }
</script>