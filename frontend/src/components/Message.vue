<template>
  <div class="pad">
    <v-btn  v-if="$store.state.isUserLoggedIn"
        absolute
        dark
        fab
        class="mt-3 pad"
        left
        color="red"
        @click="dialog = !dialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      <v-dialog v-if="$store.state.isUserLoggedIn" v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Nouveau message</v-card-title>
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
      
    <v-container v-bind:key="index" v-for="(message, index) in allMessages">
      
      <v-row align="center" justify="center" >
        <v-col cols="12" md="8" lg="8">
          <v-card class="elevation-12" color="#26c6da">
            <router-link :to="`/message/${message.msgId}`">
            <v-btn
            fab
            x-small
            top
            right
            absolute
            class="mt-3"
            >
              <v-icon>
                    mdi-magnify
              </v-icon>
            </v-btn>
            </router-link>
            <v-card-title>
              <v-list-item>
                <router-link :to="`/profil/${message.User.userId}`">
                  <v-list-item-avatar outlined color="grey darken-3">
                      <v-img
                          :src="message.User.avatar"
                      ></v-img>
                  </v-list-item-avatar>
                </router-link>
                <v-list-item-content>
                    <v-list-item-title>{{ message.User.name }}</v-list-item-title>
                    <p id="created">{{ message.createdAt }}</p>
                </v-list-item-content>
              </v-list-item>
            </v-card-title>

      <v-card-text class="h5 text-center font-weight-bold">
        {{ message.content }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-list-item class="justify-end">
          <router-link :to="`/message/${message.msgId}`">
            <v-btn icon color="red">
            <v-icon class="mr-1">mdi-thumb-up</v-icon>
            </v-btn>
          </router-link>
            <span class="subheading mr-2 mt-1">{{ totalLikes[index] }}</span>
            <span class="mr-3">·</span>
          <router-link :to="`/message/${message.msgId}`">
            <v-btn icon color="black">
            <v-icon class="mr-1">mdi-chat-plus</v-icon>
            </v-btn>
          </router-link>
            <span class="subheading">{{ totalComments[index] }}</span>
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
import Swal from 'sweetalert2'


  export default {
    name: 'Message',
    data () {
      return {
        allMessages: [],
        content: '',
        dialog: false,
        fab: false,
        usersLiked: [],
        totalLikes: [],
        totalComments: [],
        messagesId: []
      }
    },
    methods: {
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
              Swal.fire({
                icon: 'success',
                title: 'Message posté',
                showConfirmButton: false,
                timer: 1500
              })
              window.location.reload()
              // axios.get('http://localhost:3000/message', {
              //   headers: {
              //       Authorization: `Bearer ${store.state.token}`
              //   }
              // })
              // .then(response => {
              //     console.log(response)
              //     for(const message of response.data.messages){
              //       this.allMessages.push(message)
              //     }
              //     this.allMessages.forEach(message => {
                    
              //       this.messagesId.push(message.msgId)
              //     })
              //     for(let i=0;i<this.messagesId.length;i++){
                    
              //       axios.get(`http://localhost:3000/message/${this.messagesId[i]}/like`, {
              //         headers: {
              //           Authorization: `Bearer ${store.state.token}`
              //         }
              //         })
              //         .then(response => {
              //             console.log(response)
                          
              //             this.totalLikes.push(response.data.likes.count)
              //           // response.data.likes.rows.forEach(rows => {
              //             this.usersLiked = []
              //             this.usersLiked.push(response.data.likes.rows);
              //             // })
              //             // if(this.usersLiked.indexOf(this.$store.state.userId) === -1) {
              //             //   this.userLikeSearch = false
              //             // } else {
              //             //   this.userLikeSearch = true
              //             // }
              //         })
              //         .then(() => {
              //               axios.get(`http://localhost:3000/message/${this.messagesId[i]}/comment`, {
              //                 headers: {
              //                   Authorization: `Bearer ${store.state.token}`
              //                 }
              //               })
              //               .then(response => {
              //                 console.log(response)
                              
              //                 this.totalComments.push(response.data.comments.length)
              //               })      
              //               .catch(error => {
              //                 console.log('An error occurred:', error.response);
              //               })
              //         })     
              //         .catch(error => {
              //           console.log('An error occurred:', error.response);
              //         })
              //     }    
          })   
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response)
          })
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
              this.allMessages.forEach(message => {
                this.messagesId.push(message.msgId)
              })
              for(let i=0;i<this.messagesId.length;i++){
                
                axios.get(`http://localhost:3000/message/${this.messagesId[i]}/like`, {
                  headers: {
                    Authorization: `Bearer ${store.state.token}`
                  }
                  })
                  .then(response => {
                      console.log(response)
                      this.totalLikes.push(response.data.likes.count)
                    // response.data.likes.rows.forEach(rows => {
                      this.usersLiked.push(response.data.likes.rows);
                      // })
                      // if(this.usersLiked.indexOf(this.$store.state.userId) === -1) {
                      //   this.userLikeSearch = false
                      // } else {
                      //   this.userLikeSearch = true
                      // }
                  })
                  .then(() => {
                        axios.get(`http://localhost:3000/message/${this.messagesId[i]}/comment`, {
                          headers: {
                            Authorization: `Bearer ${store.state.token}`
                          }
                        })
                        .then(response => {
                          console.log(response)
                          this.totalComments.push(response.data.comments.length)
                        })      
                        .catch(error => {
                          console.log('An error occurred:', error.response);
                        })
                  })     
                  .catch(error => {
                    console.log('An error occurred:', error.response);
                  })
              }    
          })   
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
          })
    },

}
</script>

<style scoped>
 
.pad{
  margin-top: 80px;
  margin-bottom: 30px;
}
#created{
  font-size: 12px;
}
.v-divider{
    margin:0;
}
.v-card__actions{
  padding: 0 !important;
}
.v-list-item{
  padding: 0 5px !important;
}
.v-list-item__content{
  padding: 5px 0px !important;
}
.container{
  padding-bottom: 0 !important;
}
</style>
