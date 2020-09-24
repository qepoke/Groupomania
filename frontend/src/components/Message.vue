<template>
  <div>
    <v-container v-bind:key="index" v-for="(message, index) in allMessages">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12" color="#26c6da">
            <v-card-title>
              <v-list-item >
                <router-link :to="`/profil/${message.User.userId}`">
                  <v-list-item-avatar outlined color="grey darken-3">
                      <v-img
                          :src="message.User.avatar"
                      ></v-img>
                  </v-list-item-avatar>
                </router-link>
                <v-list-item-content>
                    <v-list-item-title>{{ message.User.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card-title>

      <v-card-text class="headline text-center font-weight-bold">
        {{ message.content }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-list-item class="grow">
          <v-row :class="`d-flex justify-end mb-6`">
            <v-btn icon color="red">
            <v-icon class="mr-1">mdi-thumb-up</v-icon>
            </v-btn>
            <span class="subheading mr-2">{{ message.like }}</span>
            <span class="mr-3">·</span>
            <v-btn icon color="grey">
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            </v-btn>
            <span class="subheading">{{ message.comment }}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
          </v-col>
      </v-row>

    </v-container>
  </div>
</template>


<script>

//import AuthenticationService from '@/services/AuthenticationService'
import axios from 'axios'
import store from '../store/index.js'

  export default {
    name: 'Message',
    data () {
      return {
          allMessages: [],

      }
    },
    methods: {
        profil() {
            this.$router.push('/profil/:userId')
        }
    },   
    mounted() {
      axios.get('http://localhost:3000/message', {
          headers: {
              Authorization: `Bearer ${store.state.token}`
          }
      })
          .then(response => {
              console.log(response)
              for(const message of response.data.messages){
                  this.allMessages.push(message)
              }
          })
            // Handle success.
              
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
          })
    }
}
</script>
