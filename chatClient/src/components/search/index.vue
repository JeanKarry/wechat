<template>
  <div class="search-cmp">
    <!-- input输入区域 -->
    <div class="header" :style="{'height': height + 'px'}">
      <input placeholder="搜索点这里..." type="text" class="normal-inp" @keydown.enter="search" v-model="keyword"
        @focus="setShowContent(true)">
      <el-tooltip class="item" effect="dark" content="加好友" placement="top-start">
        <router-link to="/chat/add" tag="span" class="bg" >
          <span class="nav-item iconfont icon-icon-"></span>
        </router-link>
      </el-tooltip>
    </div>
    <!-- 搜索结果区域 -->
    <transition name="slide-down">
      <div class="content" :style="{top: height + 'px'}" v-if="showContent">
        <!-- <slot /> -->

      </div>
    </transition>
  </div>
</template>

<script>
import { findParentNode } from '@/utils'
export default {
  props: {
    height: {
      type: Number,
      default: 40
    },
    tabs: {
      type: Array,
      default() {
        return [{
          name: 'tab1',
          active: true,
          data: [1,2,3]
        }]
      }
    }
  },
  data() {
    return {
      keyword: '',
      showContent: false
    }
  },
  methods: {
    search() {
      this.$emit('search', this.keyword)
    },
    setShowContent(flag) {
      this.showContent = flag
    }
  },
  mounted() {
    window.addEventListener('click', (e) => {
      const searchCmp = findParentNode(e.target, 'search-cmp')
      if (!!!searchCmp) {
        this.setShowContent(false)
      }
    })
  },
}
</script>

<style lang="scss">
// @import './../../../static/css/animation.scss';
.search-cmp {
  position: relative;
  color: #000 !important;
  .header{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    input::-webkit-input-placeholder {
        color: rgb(114, 114, 114);
      }
    input:-moz-placeholder{
        color: rgb(114, 114, 114);
    }
    input::-moz-placeholder {
        color: rgb(114, 114, 114);
      }
    input:-ms-input-placeholder {
        color: rgb(114, 114, 114);
    }
    .normal-inp{
      width: 82%;
     
    }
    .bg {
      position: relative;
      flex: 1;
      height: 98%;
      border-radius: 3px;
      margin-left: 10px;
      background: rgb(26, 175, 255);
      .nav-item {
          position: absolute;
          z-index: 111;
          font-size: 20px;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          color: #fff;
          cursor: pointer;
        }
    }
   
  }
  .content {
    position: absolute;
    z-index: 1010;
    background-color: #fff;
    width: 82%;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    transition: all .5s;
    &::before {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-bottom: 7px solid #fff;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
    }
  }
}
</style>
