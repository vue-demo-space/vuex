# vuex

注意，如果子模块没有指定 `namespaced: true`，mutations、actions 以及 getters 都会注册在全局，只有 state 需要用模块名去访问

## state

如果需要在组件内访问 state（由于 vuex 中的 state 随时可能变化，所以需要用 computed）

简单的方式：(state, mutations, actions, getters 在组件内都可以用 this.$store.xx 去访问，下面自动过滤这种方式)

```js
export default {
  computed: {
    // 全局 state
    appName () {
      return this.$store.state.appName
    },
    // module user 下
    userName () {
      return this.$store.state.user.userName
    },
    // 额外操作
    userFullName () {
      return this.$store.state.user.userName + ' yu'
    }
  }
}
```

优雅的方式：

```js
import { mapState } from 'vuex'

export default {
  computed: {
    // 全局的
    ...mapState(['appName']),
    ...mapState({
      // 模块下的
      userName: state => state.user.userName,
      // 额外操作
      userFullName: state => state.user.userName + ' yu'
    })
  }
}
```

对于子模块，可以指定 `namespaced: true`，还可以这样使用：

```js
export default {
  computed: {
    ...mapState('user', {
      // 模块下的
      userName: state => state.userName,
      // 额外操作
      userFullName: state => state.userName + ' yu'
    })
  }
}
```

## getter

getter 相当于 vuex 中的计算属性

```js
computed: {
  // appNameWithVersion 全局 getters
  // userFullName 子模块 user 下的 getters
  ...mapGetters(['appNameWithVersion', 'userFullName'])
}
```

如果子模块设定了 `namespaced: true`

```js
computed: {
  // userFullName 子模块 user 下的 getters
  ...mapGetters('user', ['userFullName'])
}
```

## mutations

```js
methods: {
  ...mapMutations(['SET_APP_NAME']),
  changeAppName () {
    this.SET_APP_NAME('new app name')
  }
}
```

如果是子模块下，并且设置了 `namespaced: true`：

```js
methods: {
  ...mapMutations('user', ['SET_USER_NAME']),
  changeAppName () {
    this.SET_USER_NAME('new name')
  }
}
```

## actions

actions 用来处理异步操作

```js
methods: {
  // ...mapMutations('user', ['SET_USER_NAME']),
  ...mapActions(['updateAppName']),
  changeAppName () {
    this.updateAppName('new app name 222')
  }
}
```

actions 里这样定义（actions 里异步请求完后，还是调用 mutations）：

```js
const actions = {
  updateAppName ({ commit }, newAppName) {
    // 模拟接口调用
    setTimeout(() => {
      commit('SET_APP_NAME', newAppName)
    }, 2000)
  }
}

export default actions
```

如果是子模块，默认子模块 actions 也会注册在全局，但是也可以开启 `namespaced: true`

```js
methods: {
  ...mapActions('user', ['updateUserName']),
  changeAppName () {
    this.updateUserName('my name is xxx')
  }
}
```
