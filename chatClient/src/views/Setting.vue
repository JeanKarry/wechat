<template>
  <div class="setting-page" :style="device === 'Mobile' ? {width: '95%'} : {}">
    <div class="header">
      <div class="avatar">
        <img :src="IMG_URL + userInfo.photo" alt="" srcset="">
      </div>
      <div class="info-list">
        <!-- <div class="info-item">MessagerId：{{userInfo.code}}</div> -->
        <div class="info-item">账号：{{userInfo.name}}</div>
        <div class="info-item">注册时间：{{userInfo.signUpTime | formatDate}}</div>
        <div class="info-item">登录时间：{{userInfo.lastLoginTime | formatDate}}</div>
      </div>
    </div>
    <div class="body">
      <div class="nav-list">
        <span :class="currentTab === 'setting' ? 'operation-text isactive' : 'operation-text'"
          @click="setCurrentTab('setting')">个人资料</span>
        <span :class="currentTab === 'password' ? 'operation-text isactive' : 'operation-text'"
          @click="setCurrentTab('password')">
          密码设置
        </span>
      </div>
      <div class="content" v-loading="fetching">
        <ul v-show="currentTab === 'setting'" class="user-setting-list">
          <li class="setting-item" v-for="item in settingList" :key="item">
            <span class="title">{{listZHMap[item]}}</span>
            <div class="inp-box">
              <!-- 如果是选择男女的话 -->
              <template v-if="item === 'sex'">
                <!-- <el-radio-group v-model="userSetting[item]" :disabled="!isModifying[item]" size="mini">
                  <el-radio-button label="0">男</el-radio-button>
                  <el-radio-button label="1">女</el-radio-button>
                  <el-radio-button label="3">保密</el-radio-button>
                </el-radio-group> -->
                <el-radio-group v-model="userSetting[item]" size="mini">
                  <el-radio-button label="0">男</el-radio-button>
                  <el-radio-button label="1">女</el-radio-button>
                  <el-radio-button label="3">保密</el-radio-button>
                </el-radio-group>
              </template>
              <template v-else>
                <input type="text" style="color:#000" :ref="item" v-model="userSetting[item]">
              </template>
            </div>
            <!-- <div class="action">
              <span v-show="!isModifying[item]" class="operation-text" @click="setModily(item, true)">
                修改
              </span>
              <div class="oper" v-show="isModifying[item]">
                <el-button type="primary" size="small" @click="saveModify(item)">保存</el-button>
                <el-button type="error" size="small" @click="setModily(item, false)">取消</el-button>
              </div>
            </div> -->
          </li>
          <div class="action">
            <div class="oper">
              <el-button type="primary" size="small" @click="saveModify()">确认</el-button>
            </div>
          </div>
        </ul>
        <ul v-show="currentTab === 'password'" class="user-password">
          <li class="pwd-item" v-for="(value, key) in pwdMap" :key="key">
            <span class="title">{{value}}</span>
            <div class="inp-box">
              <input :placeholder="pwdPlaceholder[key]" autocomplete=false v-model="pwdSetting[key]" />
            </div>
          </li>
          <div class="action">
            <el-button type="primary" size="small" @click="updateUserPwd">确认</el-button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils'
const list = ['nickname', 'age', 'email', 'sex', 'signature']
const listZHMap = {
  nickname: '昵称',
  age: '年龄',
  email: 'Email',
  sex: '性别',
  signature: '个性签名'
}
const tabMap = {
  setting: 'setting',
  password: 'password'
}
const pwdMap = {
  oldPwd: '旧密码',
  newPwd: '新密码',
  reNewPwd: '确认新密码'
}
const pwdPlaceholder = {
  oldPwd: '请输入原始密码',
  newPwd: '请输入新密码',
  reNewPwd: '请确认新密码'
}
export default {
  name: 'Setting',
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      currentTab: tabMap.setting,
      settingList: list,
      listZHMap: listZHMap,
      userSetting: {}, // 用户修改的信息
      isModifying: {}, // 标识哪一项正在修改
      pwdMap,
      pwdPlaceholder,
      pwdSetting: {
        oldPwd: '',
        newPwd: '',
        reNewPwd: ''
      },
      fetching: false // 正在网络请求中
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    device() {
      return this.$store.state.device.deviceType
    }
  },
  methods: {
    setCurrentTab(tab) {
      this.currentTab = tab
    },
    setUserSetting(userInfo) {
      for (const item of list) {
        this.$set(this.userSetting, item, userInfo[item])
        this.$set(this.isModifying, item, false)
      }
    },
    setModily(key, flag) {
      for (const key in this.isModifying) {
        if (this.isModifying.hasOwnProperty(key)) {
          this.isModifying[key] = false
        }
      }
      if (!key) return
      this.isModifying[key] = flag
      if (flag) {
        this.$nextTick(() => {
          this.$refs[key] && this.$refs[key][0].focus()
          this.$refs[key] && this.$refs[key][0].select()
        })
      } else {
        const userInfo = this.userInfo
        this.setUserSetting(userInfo)
      }
    },
    // /**更新用户信息 */
    // async saveModify(key) {
    //   if (this.userSetting[key] === this.userInfo[key]) {
    //     this.setModily(undefined, false)
    //     return
    //   }
    //   const params = {
    //     field: key,
    //     value: this.userSetting[key],
    //     userId: this.userInfo._id
    //   }
    //   this.fetching = true
    //   const {data} = await this.$http.updateUserInfo(params)
    //   if (data.status === 2000) {
    //     const userInfo = await this.$http.getUserInfo(this.userInfo._id)
    //     this.$store.dispatch('user/LOGIN', userInfo.data.data)
    //     this.fetching = false
    //     this.$message({type: 'success', message: '修改成功！'})
    //   } else {
    //     this.fetching = false
    //     this.setUserSetting(this.userInfo)
    //     this.$message({type: 'error', message: '修改失败！'})
    //   }
    //   this.setModily(undefined, false)
    // },
    // 修改用户信息，传递一个数组对象，修改成功后，再获取用户详情，并保存到store状态中
     async saveModify() {
      const params = {
        // field: key,
        // value: this.userSetting[key],
        nickname:this.userSetting.nickname,
        age: this.userSetting.age,
        sex:this.userSetting.sex,
        email: this.userSetting.email,
        signature: this.userSetting.signature,
        userId: this.userInfo._id
      }
      this.fetching = true
      const {data} = await this.$http.updateUserInfo(params)
      if (data.status === 2000) {
        const userInfo = await this.$http.getUserInfo(this.userInfo._id)
        console.log(userInfo)
        this.$store.dispatch('user/LOGIN', userInfo.data.data)
        this.fetching = false
        this.$message({type: 'success', message: '修改成功！'})
      } else {
        this.fetching = false
        this.setUserSetting(this.userInfo)
        this.$message({type: 'error', message: '修改失败！'})
      }
      this.setModily(undefined, false)
    },
    // 更新用户密码
    async updateUserPwd() {
      const params = Object.assign({}, this.pwdSetting, {userId: this.userInfo._id})
      const { data } = await this.$http.updateUserPwd(params)
      if (data.status === 2000) {
        this.$message({type: 'success', message: data.msg})
        this.pwdSetting={}
      } else {
        this.$message({type: 'warning', message: data.msg})
      }
    }
  },
  filters: {
    formatDate(val) {
      return formatDate(new Date(val))
    }
  },
  created() {
    const userInfo = this.$store.state.user.userInfo
    this.setUserSetting(userInfo)
    this.$eventBus.$emit('dispeare', false)
  },
}
</script>

<style lang="scss">
@import './../../static/css/var.scss';
.setting-page {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 20px;
  box-shadow: 0 1px 2px 0 #ffffff;
  background-color: #dddd;
  .out{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .header {
    display: flex;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info-list {
      margin-left: 20px;
      .info-item {
        margin-top: 10px;
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
  .body {
    .nav-list {
      margin: 10px 0;
      display: flex;
      flex-direction: row;
      .isactive {
        background-color: var(--primary-bgcolor-7);
        color: #fff;
      }
      .operation-text{
        display: block;
        width: 120px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 0;
        margin-right: 20px;
        
      }
    }
    .content {
      .user-setting-list {
        .action {
            width: auto;
            height: 50px;
            margin-left: 5px;
            text-align: right;
          }
        .setting-item {
          display: flex;
          align-items: center;
          padding: 1.5rem 0;
          border-top: 1px solid #cccccc;
          &:last-child {
            border-bottom: 1px solid #cccccc;
          }
          .title {
            width: 80px;
          }
          .inp-box {
            // width: 60%;
            flex: 1;
            input {
              width: 100%;
              border: none;
              outline: none;
              background-color: transparent;
            }
            input::-webkit-input-placeholder {
                color: rgb(114, 114, 114);
            }
            input:-moz-placeholder {
                color: rgb(114, 114, 114);
            }
            input::-moz-placeholder {
                color: rgb(114, 114, 114);
            }
            input:-ms-input-placeholder {
                color: rgb(114, 114, 114);
            }
          }
        }
      }
      .user-password {
        .pwd-item {
          display: flex;
          align-items: center;
          padding: 1.5rem 0;
          border-bottom: 1px solid #cccccc;
          &:first-child {
            border-top: 1px solid #cccccc;
          }
          .title {
            width: 100px;
          }
          .inp-box {
            // width: 60%;
            flex: 1;
            input {
              width: 100%;
              border: none;
              outline: none;
              background-color: transparent;
            }
             input::-webkit-input-placeholder {
                color: rgb(114, 114, 114);
            }
            input:-moz-placeholder {
                color: rgb(114, 114, 114);
            }
            input::-moz-placeholder {
                color: rgb(114, 114, 114);
            }
            input:-ms-input-placeholder {
                color: rgb(114, 114, 114);
            }
          }
        }
        .action {
          margin-top: 20px;
          text-align: right;
        }
      }
    }
  }
}
</style>
