<template>
  <div class="about">
     <div >
      <el-tabs
        v-model="activeIndex"
        type="border-card"
        closable
        v-if="openTab.length"
          @tab-click='tabClick'
          @tab-remove='tabRemove'
        >
        <el-tab-pane
          :key="index"
          v-for="(item, index) in openTab"
          :label="item.name"
          :name="item.path"
          >
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-wrap">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    tabClick (tab) {
      console.log('tab', tab)
      this.$router.push({path: this.activeIndex})
    },
    tabRemove (targetName) {
      console.log('targetName',targetName)
      if (targetName === '/about/page1') {
        return
      }
      console.log('openTab', this.openTab)
      this.$store.commit('delete_tabs',targetName)
      if (this.activeIndex === targetName) {
        if (this.openTab && this.openTab.length >= 1) {
          this.$store.commit('set_active_index', this.openTab[this.openTab.length - 1].path)
          this.$router.push({path: this.activeIndex})
        } else {
          this.$router.push({ path: '/about/page1'})
        }
      }
    }
  },
  computed: {
    openTab () {
      return this.$store.state.openTab;
    },
    activeIndex:{
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  mounted () {
    if (this.$route.path === '/about/page1') {
      console.log('mounted',this.$route)
      this.$store.commit('add_tabs', {path: '/about/page1',name:'page1'}),
      this.$store.commit('set_active_index', '/about/page1')
    }
  },
    watch: {
      '$route' (to, from) {
        console.log('from',from)
        let flag = false;
        for(let item of this.openTab){
          console.log("item.name",item.name)
          console.log("t0.name",to.name)
          console.log('openTab', this.openTab)
          if(item.path === to.path){
            console.log('to.path',to.path);
            this.$store.commit('set_active_index',to.path)
            flag = true;
            break;
          }
        }

        if(!flag){
          console.log('to.path',to.path);
          this.$store.commit('add_tabs', {path: to.path, name: to.name});
          this.$store.commit('set_active_index', to.path);
        }
      }
    },
}
</script>

<style lang="scss" >
  .content-wrap {
    border: 1px solid #DCDFF7;
    border-top: none;
  }
  .el-tabs.el-tabs--border-card {
      box-shadow: none;
      border-bottom: none;
  }
</style>
