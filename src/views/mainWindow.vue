<template>
  <div id="mainWindow">
    <div id="header">
        <a @click="add('')">Add Window</a>
        <a @click="save">Save</a>
        <a @click="reload">Reload</a>
        <h1 class="banner">Share Memo</h1>
        
        <div id="_state" v-if="state">
            <img :src="stateIcon" width="15" height="15">
            {{stateContents}}
        </div>
    </div>
    <template v-for="child in children" >
        <component :is="child[0]" v-bind="child[1]" :key="child.name"></component>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import editor from '../components/editorWindow.vue'
// eslint-disable-next-line

// save & reload function (send and receive the data to the backend)
export default {
    name: 'mainWindow',
    components: {
        // eslint-disable-next-line
        "editor": editor
    },
    data () {
        return {
            children: [],
            state: false,
            stateContents: "",
            stateIcon: require("../assets/dealing.gif")
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
            add('')
        },
        add (memo) {
            this.counter++
            var str = String(this.counter)
            if(memo === undefined){
                memo = ''
            }
            this.children.push( ["editor" , {pre_memo: memo,pre_window: "window "+str,init_x: this.x,init_y: this.y,init_z: this.children.length,ref:"ref"+str+"s"}] )
            this.y += 5
            this.x += 5
        },
        save () {
            var that = this
            var separator = "__separator__"
            var str = ""
            for(var key in this.$refs){
                if(!this.$refs[key].remove){
                    str += this.$refs[key].readMemo() + separator
                }
            }
            const querystring = require('querystring');
            
            this.stateIcon = require("../assets/dealing.gif")
            this.stateContents = "Saving..."
            this.state = true;
            axios.post('/file', querystring.stringify({ text: str }))
                .then(response => {
                    that.stateIcon = require("../assets/check.png")
                    that.stateContents = "Saved!!!"
                    setTimeout(function(){
                        that.state = false;
                    }, 5*1000);
                }).catch(error => {
                    that.stateIcon = require("../assets/close.png")
                    that.stateContents = "Happen Error!!!"
                    setTimeout(function(){
                        that.state = false;
                    }, 5*1000);
                });
        },
        reload () {
            var that = this
            var separator = "__separator__"
            
            this.stateIcon = require("../assets/dealing.gif")
            this.stateContents = "Loading..."
            this.state = true;
            axios.get('/file')
            .then(res => {
                that.stateIcon = require("../assets/check.png")
                that.stateContents = "Done!!!"
                var res_text = res.data.text.split(separator)
                for(var i in res_text){
                    if(res_text[i])
                        this.add(res_text[i])
                }
                setTimeout(function(){
                    that.state = false;
                }, 5*1000);
            })
            .catch(err => {
                that.stateIcon = require("../assets/close.png")
                that.stateContents = "Happen Error!!!"
                setTimeout(function(){
                    that.state = false;
                }, 5*1000);
                // eslint-disable-next-line
                console.error(err)
            })
        },
        up2forward (window){
            var index = 0
            for(var key in this.$refs){
                if(this.$refs[key].window === window){
                    index = this.$refs[key].z
                    this.$refs[key].z = this.children.length
                }
            }
            for(var key in this.$refs){
                if(this.$refs[key].z > index){
                    this.$refs[key].z -= 1
                }
            }
        }
        /* eslint-disable */
    }
}
</script>

<style>
#mainWindow {
    height: 100%;
    width: 100%;
    text-align: left;
    color: #2c3e50;
    background-color: #17181c;
}
#header {
    width: 100%;
    vertical-align: middle;
    text-align: left;
    color: #2c3e50;
    background-color: #111;
    top: 0;
    left: 0;
}
#_state {
	right: 0;
    display: inline-block;
    font-family: Helvetica;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
}
a {
    font-family: Helvetica;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #333;
    color: #fff;
    border: 2px solid #fff;
    margin: 0px 5px;
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