<template>
  <v-card
    class="mx-auto overflow-hidden"
  >
    <v-app-bar
      app
      dark
      color="#43a047"
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="500"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>

       <v-col cols="5" sm="3" md="2">
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        value
      ></v-text-field>
       </v-col>
      <v-btn v-if="$store.state.isUserLoggedIn"
        absolute
        dark
        fab
        bottom
        right
        class="mb-4"
        color="red"
        @click="dialog = !dialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-5"
      class="overflow-y-auto"
      max-height="128"
    >
      <v-container style="height: 1500px;"></v-container>
    </v-sheet>
    <v-dialog v-if="$store.state.isUserLoggedIn" v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Veuillez écrire votre message</v-card-title>
        <v-card-text>
          <v-textarea auto-grow counter clearable placeholder="Votre message" v-model="content"></v-textarea>

          <small class="grey--text">* Veuillez entrer un message compris entre 12 et 500 caractères</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="dialog = false, postMessage()">Envoyer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="home()">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Accueil</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="$store.state.isUserLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mon profil</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!$store.state.isUserLoggedIn" @click="login()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Se connecter</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!$store.state.isUserLoggedIn" @click="signup()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Créer un compte</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-if="$store.state.isUserLoggedIn" @click="message()">
            <v-list-item-icon>
              <v-icon>mdi-message</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Voir les messages</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="$store.state.isUserLoggedIn" @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Se déconnecter</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
    
  </v-card>
</template>

<script>

import axios from 'axios'
import store from '../store/index.js'

export default {
    name: 'Header',
    data: () => ({
      drawer: false,
      dialog: false,
      content:''
    }),
    methods: {
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push('/')
        },
        signup() {
            this.$router.push('/signup')
        },
        login() {
            this.$router.push('/login')
        },
        home() {
            this.$router.push('/')
        },
        message() {
            this.$router.push('/message')
        },
        postMessage() {
          axios.post('http://localhost:3000/message', {
            
            content: this.content,
            userId: store.state.userId },
           { 
            headers: {
                Authorization: `Bearer ${store.state.token}`
            },
          })
          .then(() => {
              axios.get('http://localhost:3000/message', {
              headers: {
                Authorization: `Bearer ${store.state.token}`
              }  
              })
              this.$router.push('/message')
          }) 
          .catch(error => {
              // Handle error.
              console.log('An error occurred:', error.response);
            })
        }
    }
}
</script>

<style lang=scss scoped>


</style>