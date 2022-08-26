<template>
  <!-- 最近联系人 右键菜单栏   -->
  <div class="conversation-item-menu box-shadow1">
    <span class="menu-item operation-text" v-if="type === 'recent'" @click.stop="remove">关闭会话</span>
    <span class="menu-item operation-text" @click.stop="viewProfile" v-show="!group">查看资料</span>
    <span class="menu-item operation-text" @click.stop="modifyBeizhu" v-show="!group">修改备注</span>
    <span class="menu-item operation-text" @click.stop="switchFenzu" v-if="type === 'fenzu'" v-show="!group">切换分组</span>
    <el-popover placement="top" width="160" v-model="showDelPop">
      <p>删除好友后聊天记录等信息也会被删除，是否删除？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="deleteFriend">确定</el-button>
      </div>
      <span slot="reference" class="menu-item operation-text delete" @click.stop="()=>{}" v-show="!group">删除好友</span>
    </el-popover>
    <el-popover placement="top" width="160" v-model="showOutPop">
      <p>退出群聊后聊天记录等信息也会被删除，是否退出？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="deleteFriends">确定</el-button>
      </div>
      <span slot="reference" class="menu-item operation-text delete" @click.stop="()=>{}" v-show="group">退出群聊</span>
    </el-popover>
  </div>
</template>

<script>

export default {
  props: ['conversation', 'type','group'],
  data() {
    return {
      showDelPop: false,
      showOutPop:false
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  created(){
    console.log(this.userInfo)
  },
  methods: {
    remove() {
      this.$emit('hiddenMenu')
      this.$emit('remove')
    },
    viewProfile() {
      this.$http.getUserInfo(this.conversation._id).then(res => {
        this.$eventBus.$emit('showUserProfile', {
          show: true,
          data: {
            currentConversation: res
          }
        })
      })
      // this.$eventBus.$emit('showUserProfile')
    },
    cancel(){
      this.$emit('hiddenMenu')
    },
    switchFenzu() {
      this.$eventBus.$emit('toggleFenzuModal', {
        show: true,
        data: {
          currentConversation: this.conversation
        }
      })
      this.$emit('hiddenMenu')
    },
    modifyBeizhu() {
      this.$eventBus.$emit('toggleBeizhuModal', {
        show: true,
        data: {
          currentConversation: this.conversation
        }
      })
      this.$emit('hiddenMenu')
    },
    // 删除好友
    async deleteFriend() {
      const {data} = await this.$http.deleteFriend({
        userM: this.userInfo._id,
        userY: this.conversation._id
      })
      if (data.status === 2000) {
        this.remove()
        this.$store.dispatch('app/SET_ALL_FRIENDS', {
          resource: this.conversation._id,
          type: 'delete'
        })
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
      }else{
        this.$message({
          message: '删除失败！',
          type: 'error'
        })
      }
      this.$emit('hiddenMenu')
    },
    // 推出群聊
    async deleteFriends () {
      const { data } = await this.$http.deleteFriend({
        userM: this.conversation.groupId.code,
        userY: this.conversation._id
      })
      if (data.status === 2000) {
        this.remove()
        this.$store.dispatch('app/SET_ALL_FRIENDS', {
          resource: this.conversation._id,
          type: 'delete'
        })
        this.$message({
          message: '退群成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: '退群失败！',
          type: 'error'
        })
      }
      this.$emit('hiddenMenu')
    }
  }
}
</script>

<style lang="scss">
.conversation-item-menu {
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  font-size: 14px;
  .menu-item {
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #000;
    margin-top: 10px;
  }
  >.menu-item {
    &:first-child {
      margin-top: 0;
    }
    &:hover{
      background: #000;
      color: #fff;
      transition: none !important;
    }
  }
  .delete{
    &:hover{
        background: #000;
        color: #fff;
        transition: none !important;
    }
  }
}
</style>
