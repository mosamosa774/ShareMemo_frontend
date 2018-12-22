<template>
  <div id="mainWindow">
    <div id="header">
        <a @click="add('')">Add Window</a>
        <a @click="save">Save</a>
        <a @click="reload">Reload</a>
        <h1 class="banner">Share Memo</h1>
    </div>
    <template v-for="child in children">
        <component :is="child[0]" v-bind="child[1]" :key="child.name"></component>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import editor from '../components/editorWindow.vue'

// save & reload function (send and receive the data to the backend)
export default {
    name: 'mainWindow',
    components: {
        // eslint-disable-next-line
        "editor": editor
    },
    data () {
        return {
            children: []
        }
    },
    created: function () {
        this.counter = 0;
        this.x = 30;
        this.y = 100;
        this.reload ();
    },
        /* eslint-disable */
    methods: {
        /*
            axios.get('/api') pre_memo="ksks" ref="test"
            .then(res => {
            this.value = res.data
            })
            .catch(err => {
            // eslint-disable-next-line
            console.error(err)
            })
        }*/
        add () {
            add(" ")
        },
        add (memo) {
            this.counter++
            var str = String(this.counter)
            this.children.push( ["editor" , {pre_memo: memo,pre_window: "window "+str,init_x: this.x,init_y: this.y,ref:"ref"+str+"s"}] )
            this.y += 5
            this.x += 5
        },
        save () {
            var separator = "__separator__"
            var str = ""
            for(var key in this.$refs){
                if(!this.$refs[key].remove){
                    str += this.$refs[key].childMethod() + separator
                }
            }
            const querystring = require('querystring');
            axios.post('/file', querystring.stringify({ text: str }));
        },
        reload () {
            var separator = "__separator__"
            axios.get('/file')
            .then(res => {
                var res_text = res.data.text.split(separator)
                for(var i in res_text){
                    if(res_text[i])
                        this.add(res_text[i])
                }
            })
            .catch(err => {
                // eslint-disable-next-line
                console.error(err)
            })
        }
        /* eslint-disable */
    }
}
</script>

<style>
#mainWindow {
    width: 100vh;
    height: 100vh;
    text-align: left;
    color: #2c3e50;
    background-color: #17181c;
}
#header {
    width: 100vh;
    text-align: left;
    color: #2c3e50;
    background-color: #111;
    top: 0px;
    left: 0px;
}
a {
    font-family: Helvetica;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #333;
    color: #fff;
    border: 2px solid #fff;
    margin: 0px 20px;
    cursor: default;
}
a:hover {
    background-color: #fff;
    border-color: #59b1eb;
    color: #59b1eb;
}
.banner {
    display:inline;
    margin: 0px 100px;
    padding: .0em .75em;
    text-align: center;
    background-color: #333;
    color: #fff;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
}
</style>