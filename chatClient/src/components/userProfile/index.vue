<template>
  <div class="user-profile all0">
    <div class="wrapper">
      <div class="bg" ></div>
      <span class="p-r-t el-icon-close" @click="close"></span>
      <div class="top">
        <img :src="IMG_URL + profile.photo " alt="" srcset="">
        <div class="nameWrapper">
          <span class="name">账号：{{profile.name}}</span>
          <span class="name">昵称：{{profile.nickname}}</span>
        </div>
      </div>
      <div class="bottom">
        <span class="info">性别：{{(profile.sex == 1 ? '男' : '女')}}</span>
        <span class="info">年龄：{{profile.age}}</span>
        <span class="info">居住地址：{{ profile.province.name}} - {{ profile.city.name}} - {{ profile.town.name}}</span>
        <span class="info">个性签名：{{ profile.signature == '' ? '暂时还没有发布签名哦~' : profile.signature}}</span>
        <span class="info">上一次登陆时间：{{ profile.lastLoginTime | formatDate}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils'
export default{
  props: ['currentConversation'],
  data(){
    return{
        IMG_URL: process.env.IMG_URL,
        profile:this.currentConversation.data.data
    }
  },
  filters: {
    formatDate (val) {
      return formatDate(new Date(val))
    }
  },
  methods:{
    close(){
      this.$emit('hidden-profile')
    }
  },
  mounted(){
    console.log(this.profile)
  }
}
</script>


<style lang="scss">
.user-profile {
  position: fixed;
  background-color: rgba(0, 0, 0, .6);
  z-index: 1007;
  text-align: center;
  .wrapper{
    width:40%;
    height: 400px;
    z-index: 2000;
    position: absolute;
    top: 20%;
    left: 50%;
    margin-left: -15%;
    border-radius: 5px;
    display: flex;
    box-sizing: border-box;
    padding: 20px;
    flex-direction: column;
    background: #fff;
    .bg{
      position: absolute;
      right: 0px;
      top: 10px;
      width: 180px;
      height: 320px;
      background-size: cover;
      background-image: url('../../../static/image/005.jpg');
    }
    .top{
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      img{
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }
      .nameWrapper{
        flex: 1;
        height: 100px;
        display: flex;
        flex-direction: column;
        .name{
          width: 100%;
          height: 33%;
          font-size: 18px;
          text-align: left;
          color: rgb(65, 64, 64);
        }
      }
    }
    .bottom{
      flex: 1;
      width:100%;
      display: flex;
      flex-direction: column;
      text-align: left;
      .info{
          width: 100%;
          height: 33%;
          font-size: 18px;
          color: rgb(65, 64, 64);
      }
    }
  }
}
</style>

