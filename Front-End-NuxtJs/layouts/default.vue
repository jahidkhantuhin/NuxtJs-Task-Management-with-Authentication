<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAuth" @click="onLogout">
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn v-for="(item, i) in items" :key="i" :to="item.to" router exact>
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn v-if="isAuth" @click="onLogout"
            ><v-icon left dark>mdi-lock</v-icon>logout</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "TASK-MANAGEMENT",
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated;
    },
    items() {
      return this.isAuth
        ? [
            {
              icon: "mdi-apps",
              title: "Welcome",
              to: "/",
            },
            {
              icon: "mdi-chart-bubble",
              title: "Create Task",
              to: "/create-task",
            },
            {
              icon: "mdi-dialpad",
              title: "All Tasks",
              to: "/tasks",
            },
          ]
        : [
            { icon: "mdi-face", title: "Sign up", to: "/signup" },
            { icon: "mdi-lock-open", title: "Sign in", to: "/signin" },
          ];
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logOut");
    },
  },
  mounted() {
    this.$store.dispatch("autoLogin");
  },
};
</script>
