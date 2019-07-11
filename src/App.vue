<template>
  <div id="app">
    {{ userName }}
    <!-- {{ appName }} -->
    <!-- {{ appNameWithVersion }} -->
    <button @click="changeAppName">change name</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'app',
  computed: {
    // ...mapState('user', ['userName']),
    ...mapState(['appName']),
    userName () {
      return this.$store.state.user.userName
    },
    // ...mapState[]
    // computed: {
    //   // 全局
    //   appName () {
    //     return this.$store.state.appName
    //   },
    //   // module user 下
    //   userName () {
    //     return this.$store.state.user.userName
    //   },
    //   // 额外操作下
    //   userFullName () {
    //     return this.$store.state.user.userName + ' yu'
    //   }
    // }
    // appNameWithVersion 全局 getters
    ...mapGetters(['appNameWithVersion'])
  },
  methods: {
    ...mapActions('user', ['updateUserName']),
    changeAppName () {
      this.updateUserName('my name is xxx')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
