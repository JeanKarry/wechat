<template>
  <div class="message-type__file">
    <!-- <i class="iconfont icon-shipin"> -->
    <img src="../../../static/image/文件.png" width="20px" height="20px" />
    <a target="_blank" :href="message.message">{{filename}}</a>
    <!-- <a>{{this.message.message}}</a> -->
    <!-- </i> -->
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
export default {
      props: ['message'],
      data(){
        return{
          filename:''
        }
      },
      mounted(){
        this.filename = this.message.message.split('/')[6].split('-')[3]
      }
}
</script>

