<template>
    <v-app footer>
        <v-toolbar class="primary" light dense>
            <v-toolbar-title class="white--text"> Fale conosco! </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <main>
            <v-container fluid>
                <v-layout row>
                    <v-flex xs12>
                        <v-text-field v-show="!identified" label="Qual o seu nome?" @keyup="setUsername($event)"></v-text-field>
                    </v-flex>
                </v-layout>   
            </v-container>
        </main>

        <v-footer fixed dark>
            <v-text-field :disabled="!identified" label="Digite sua menssagem aqui!" @keyup="sendMessage($event)"></v-text-field>
        </v-footer>
    </v-app>
</template>

<script>
    import md5 from 'md5'

    export default {
      name: 'chat',
      data () {
        return {
          username: this.getUserName() || null,
          userhash: this.getUserHash() || null
        }
      },
      computed: {
        identified () {
          return this.username
        },
        channel () {
          return this.userhash
        }
      },
      methods: {
        setUsername (e) {
          if (e.keyCode === 13) {
            const user = { name: e.target.value, date: new Date(), hash: md5(new Date()) }
            this.$storage.setItem('webchat_data', JSON.stringify(user))
            this.$socket.emit('client-connected', user)

            this.username = this.getUserName()
          }
        },
        sendMessage (e) {
          if (e.keyCode === 13) {
            this.$socket.emit('send-message-client', { channel: this.getUserHash(), massage: e.target.value })
          }
        },
        getUserName () {
          const user = this.getUserData()
          if (user) {
            return user.name
          }
        },
        getUserHash () {
          const user = this.getUserData()
          if (user) {
            return user.hash
          }
        },
        getUserData () {
          return JSON.parse(this.$storage.getItem('webchat_data'))
        }
      },
      sockets: {
        channel: function (message) {
          console.log(message)
        }
      }
    }
</script>

<style scoped>
    footer {
        height: 65px;
        padding-top: 15px;
    }
</style>

