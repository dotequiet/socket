<template>
  <div class="app-wrapper">
    <header v-if="!hiddeHeaderPage.includes($route.name)" class="title">
      <div class="title-system"></div>
      <div class="user">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <section class="log-section">
      <router-view/>
    </section>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { commonMixin } from '@/mixins/message.js'
import { getUserApi, logoutApi } from '@/api/config'
import { hiddeHeaderPage } from './config'

export default {
  mixins: [commonMixin],
  data() {
    return {
      hiddeHeaderPage,
      activeTopIndex: this.$route.name,
      userInfo: {}
    }
  },
  computed: {},
  created() {},
  methods: {
    handleSelect(index, indexPath) {
      this.$router.push({
        name: index
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    .content {
      flex: 1;
      display: flex;
    }
    .title {
      display: flex;
      line-height: 60px;
      border-bottom: 1px solid #e6e6e6;
    }
    .title-system {
      color: #fff;
      text-align: center;
      display: flex;
      align-items: center;
      padding-left: 20px;
      img {
        width: 100%;
      }
    }
    .user {
      display: flex;
      flex-grow: 1;
    }
    .user {
      padding: 0 10px;
      flex-flow: row-reverse;
      cursor: pointer;
    }
    .el-menu-vertical {
      height: 100%;
      border: none;
    }
    .title-system {
      flex: 0 0 150px;
      height: 100%;
      overflow-y: scroll;
    }
    .menu-left {
      padding: 10px;
      flex: 0 0 200px;
      height: 100%;
      overflow-y: scroll;
      border-right: 1px solid #e6e6e6;
    }
    .log-section {
      height: 90%;
      overflow: scroll;
      padding-top: 10px;
    }
  }
</style>