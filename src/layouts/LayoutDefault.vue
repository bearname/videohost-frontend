<template>
  <v-app>
    <v-card
        class="mx-auto overflow-hidden"
        width="100%"
        height="100%"
    >
      <v-app-bar
          color="deep-purple"
          dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title class="mr-16">
          <router-link :to="{ name: 'home'}">
            Каталог
          </router-link>
        </v-toolbar-title>
        <v-toolbar-title>
          <router-link :to="{ name: 'uploadVideo'}">Загрузить видео</router-link>
        </v-toolbar-title>
        <v-toolbar-title class="float-right">
          <router-link :to="{ name: 'user'}">User {{ currentUsername }}</router-link>
        </v-toolbar-title>
        <v-toolbar-title class="float-right">
          <div v-if="isLoggedUser === false">
            <router-link :to="{ name: 'login'}">login</router-link>
          </div>
          <div v-else>
            <span v-on:click="logoutUser()">logout</span>
          </div>
        </v-toolbar-title>
        <v-toolbar-title class="float-right">
          <div v-if="isLoggedUser === true">
            <router-link :to="{ name: 'playlist', query: {PL: 'LL'}}" class="subtitle-2"> <span
                class="subtitle-2">Liked video</span>
            </router-link>
          </div>
        </v-toolbar-title>


      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
      >
        <v-list
            nav
            dense
        >
          <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
          >
            <router-link :to="{ name: 'home'}">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="lighten-1">Catalog</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="isLoggedUser === true" :to="{ name: 'playlist', query: {PL: 'LL'}}" class="subtitle-2">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-like-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="subtitle-2">Liked video</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="isLoggedUser === true" :to="{ name: 'playlist', query: {PL: 'LL'}}" class="subtitle-2">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-like-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="subtitle-2">Liked video</v-list-item-title>
              </v-list-item>
            </router-link>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
            <div v-if="isLoggedUser === true && playlists !== null">
              <v-toolbar-title v-for="playlist in playlists"
                               v-bind:key="playlist.id">
                <router-link :to="{ name: 'playlist', query: {PL: playlist.id}}" class="subtitle-2"> <span
                    class="subtitle-2">{{ playlist.name }}</span>
                </router-link>
              </v-toolbar-title>
            </div>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <Alert/>
        <Search style="margin-top: 60px"/>
        <router-view></router-view>
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
import Search from '../components/Search.vue'
import Alert from "../components/Alert";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LayoutDefault",
  components: {
    Alert,
    Search,
  },
  async created() {
    await this.fetchUserPlaylists();
    this.userPlaylists = this.getUserPlaylists();
  },
  data() {
    return {
      drawer: false,
      userid: {type: String, default: ""},
      playlists: null,
    }
  },
  methods: {
    ...mapActions({
      fetchUserPlaylists: "playlistMod/getUserPlaylists",
      logout: "authMod/logout",
    }),
    ...mapGetters({
      isLogged: "authMod/isLoggedIn",
      getUser: "authMod/getCurrentUser",
      getCurrentUser: "authMod/getCurrentUser",
      getUserPlaylists: "playlistMod/getPlaylists",
    }),
    async fetchUserPlaylists() {
      await this.getPlaylists();
      this.playlists = this.getPlaylistsRequestResult();
    },
    logoutUser() {
      this.logout()
      this.isLoggedUser()
    },
  },
  computed: {
    user() {
      return this.getUser(this.userid);
    },
    currentUsername: function () {
      const currentUser = this.getCurrentUser();
      return currentUser.username;
    },
    isLoggedUser() {
      return this.isLogged()
    }
  },
}
</script>

<style scoped>
a:link {
  color: #ffffff;
  background-color: transparent;
  text-decoration: none;
}

a:visited {
  /*color: #ffffff;*/
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  /*color: #ffffff;*/
  background-color: transparent;
  text-decoration: underline;
}

a:active {
  /*color: #ffffff;*/
  background-color: transparent;
  text-decoration: underline;
}
</style>