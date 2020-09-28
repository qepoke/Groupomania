<template>
  <div id="pad">
    <v-container>
       
        <v-row align="center" justify="center" class="mb-5">      
        <v-col cols="12" sm="12" md="8">
            <router-link :to="`/message/`">
            <v-btn
            outlined
            absolute
            left
            text
            
            >
                <v-icon class="mr-2">mdi-undo</v-icon>
            Retour aux messages
            </v-btn>
            </router-link>
        </v-col>
        </v-row>
        <v-row align="center" justify="center"> 
        <v-col cols="12" sm="12" md="8">
            <v-speed-dial
            v-model="fab"
            absolute
            right
            direction="left"
            transition= 'slide-x-reverse-transition'
            v-if="isAdmin"
            >
              <template v-slot:activator>
                <v-btn
                  v-model="fab"
                  color="blue darken-2"
                  dark
                  fab
                  small
                >
                  <v-icon v-if="fab">
                    mdi-close
                  </v-icon>
                  <v-icon v-else>
                    mdi-format-list-bulleted-square
                  </v-icon>
                </v-btn>
              </template>
              <v-btn
                fab
                dark
                small
                color="green"
                @click="dialog = true"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="red"
                @click="deleteMessage()"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            
          </v-speed-dial>
          <v-speed-dial
            v-model="fab"
            absolute
            right
            direction="left"
            transition= 'slide-x-reverse-transition'
            v-else-if="id == userId"
            >
              <template v-slot:activator>
                <v-btn
                  v-model="fab"
                  color="blue darken-2"
                  dark
                  fab
                  small
                >
                  <v-icon v-if="fab">
                    mdi-close
                  </v-icon>
                  <v-icon v-else>
                    mdi-format-list-bulleted-square
                  </v-icon>
                </v-btn>
              </template>
              <v-btn
                fab
                dark
                small
                color="green"
                @click="dialog = true"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="red"
                @click="deleteMessage()"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            
          </v-speed-dial>
          <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>Nouveau message</v-card-title>
                    <v-card-text>
                    <v-textarea auto-grow counter clearable v-model="message.content"></v-textarea>

                    <small class="grey--text">* Veuillez entrer un message compris entre 12 et 500 caractères</small>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text color="primary" @click="dialog = false, updateMessage()">Modifier</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            
          <v-card class="elevation-12" color="#26c6da">
              
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

      <v-card-text class="h4 text-center font-weight-bold">
        {{ message.content }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-list-item class="justify-end">
          
            <v-btn icon color="red" v-if="userLikeSearch" @click="disliked()">
            <v-icon class="mr-1">mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn icon color="grey" v-else-if="!userLikeSearch" @click="liked()">
            <v-icon class="mr-1">mdi-thumb-up</v-icon>
            </v-btn>
            <span class="subheading mr-2 mt-1">{{ likeCount.count }}</span>
            <span class="mr-3">·</span>
            <v-btn icon color="black">
            <v-icon class="mr-1">mdi-chat-plus</v-icon>
            </v-btn>
            <span class="subheading">{{ message.comment }}</span>
         
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
import { mapState } from 'vuex'
import Swal from 'sweetalert2'


  export default {
    name: 'OneMessage',
    data () {
      return {
        message: [],
        dialog: false,
        id: this.$route.params.id,
        likeCount: [],
        usersLiked: [],
        userLikeSearch: false,
      }
    },
    methods: {
        liked() {
          axios.post(`http://localhost:3000/message/${this.id}/like`, {
            
            userId: store.state.userId,
            msgId: this.id },
           { 
            headers: {
                Authorization: `Bearer ${store.state.token}`
            },
          })
          .then(()=>{
             axios.get(`http://localhost:3000/message/${this.id}`, {
                headers: {
              Authorization: `Bearer ${store.state.token}`
            }
            })
            .then(message => {
                this.message = message.data.message
                this.likeCount = message.data.likeCount
                this.usersLiked.push(this.$store.state.userId)
                
                if(this.usersLiked.indexOf(this.$store.state.userId) === -1) {
                    this.userLikeSearch = false
                } else {
                    this.userLikeSearch = true
                }
            })
          })       
            .catch(error => {
                console.log('An error occurred:', error.response);
            })

        },
        disliked() {
          axios.delete(`http://localhost:3000/message/${this.id}/like`, {
            headers: {
                Authorization: `Bearer ${store.state.token}`
            },
          })
            .then(()=>{
                axios.get(`http://localhost:3000/message/${this.id}`, {
                headers: {
                Authorization: `Bearer ${store.state.token}`
                }
                })
                .then(message => {
                    this.message = message.data.message
                    this.likeCount = message.data.likeCount
                    this.usersLiked.pop()
                   
                    
                    if(this.usersLiked.indexOf(this.$store.state.userId) === -1) {
                        this.userLikeSearch = false
                    } else {
                        this.userLikeSearch = true
                    }
                })
          })       
            .catch(error => {
                console.log('An error occurred:', error.response);
            })

        },
        allMessages(){
            this.$route.push('/message/')
        },
        deleteMessage() {
          Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous me pourrez pas revenir en arrière !",
            icon: 'warning',
            confirmButtonText: 'Oui, supprimer le message!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
            
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Message supprimé!',
                icon: 'success'
              })
            axios.delete(`http://localhost:3000/message/${this.id}`, {
                  headers: {
                    Authorization: `Bearer ${store.state.token}`
                  }
            })
            this.$router.push('/message')
            }
          }).catch(error => {
              // Handle error.
              Swal.fire({
                icon: 'error',
                title: 'Le message n\'a pas pu être supprimé, veuillez réessayer plus tard !',
                showConfirmButton: false,
                timer: 2500
              })
              console.log('An error occurred:', error.response);
          })
      },
        updateMessage() {
                axios.put(`http://localhost:3000/message/${this.id}`, {
                content: this.message.content},
           { 
            headers: {
                Authorization: `Bearer ${store.state.token}`
            },
          })
          .then((message) => {
              console.log(message)
              Swal.fire({
                icon: 'success',
                title: 'Message modifié',
                showConfirmButton: false,
                timer: 1000
              })
          }) 
          .catch(error => {
              // Handle error.
              Swal.fire({
                icon: 'error',
                title: 'Le messagen\'a pas pu être modifié, veuillez réessayer plus tard !',
                showConfirmButton: false,
                timer: 1000
              })
              console.log('An error occurred:', error.response);
          })
        }
    },
    computed: {
        ...mapState(['isAdmin', 'userId']),
    },
      
    mounted() {
         axios.get(`http://localhost:3000/message/${this.id}`, {
            headers: {
              Authorization: `Bearer ${store.state.token}`
            }
        })
          .then(message => {
              console.log(message.data)
              this.message = message.data.message
              this.likeCount = message.data.likeCount
              message.data.likeCount.rows.forEach(rows => {
                this.usersLiked.push(rows.userId);
            })
              
              if(this.usersLiked.indexOf(this.$store.state.userId) === -1) {
                this.userLikeSearch = false
            } else {
                this.userLikeSearch = true
            }
        })       
          .catch(error => {
            console.log('An error occurred:', error.response);
          })
    }
}
</script>

<style scoped>
 
#pad{
  margin-top: 80px;
}
#created{
  font-size: 12px;
}
.v-divider{
    margin:0;
}
</style>
