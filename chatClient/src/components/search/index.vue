<template>
  <div class="search-cmp">
    <!-- input输入区域 -->
    <div class="header" :style="{'height': height + 'px'}">
      <input :placeholder="placeholder" type="text" class="normal-inp" @keydown.enter="search" v-model="keyword"
        @focus="setShowContent(true)">
      <router-link to="/chat/add" tag="span" title="加好友">
        <span class="nav-item iconfont icon-icon-"></span>
      </router-link>
    </div>
    <!-- 搜索结果区域 -->
    <transition name="slide-down">
      <div class="content" :style="{top: height + 'px'}" v-if="showContent">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { findParentNode } from '@/utils'
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入要查询的内容'
    },
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
@import './../../../static/css/animation.scss';
.search-cmp {
  position: relative;
  .header{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    .normal-inp{
      width: 86%;
    }
    .nav-item{
      flex: 1;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .content {
    position: absolute;
    z-index: 1010;
    background-color: #fff;
    width: 86%;
    margin-left: 5px;
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
