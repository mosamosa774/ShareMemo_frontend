<template>
  <div @click="up2forward" id="editorWindow" class='container' v-bind:style="{ top: y + 'px', left: x + 'px', zIndex: z}" v-if="!remove">
    <div @mousedown="mousedown($event)" class='area-g0'>
      <a >{{ window }}</a>
    </div>
    <div @mousedown="mousedown($event)" class='area-g1'>
        <img @click="record" :src="record_src" width="25" height="25">
        <img @click="close" src="../assets/close.png" width="25" height="25">
    </div>
    <div class='area-g2'>
      <textarea v-model="memo" rows="6" cols="40" ></textarea>
    </div>
</div>
</template>

<script>
// eslint-disable-next-line
const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';

export default {
    name: 'editorWindow',
    props: ['pre_memo','pre_window','init_x','init_y','init_z'],
    data () {
        return {
            x: 0,
            y: 0,
            z: 0,
            window: "",
            memo: "",
            remove: false,
            record_src: require("../assets/voice_record.png")
        }
    },
    created: function () {
        this.memo += this.pre_memo
        this.window = this.pre_window
        this.x = this.init_x;
        this.y = this.init_y;
        this.z = this.init_z;
        this.record_run = false;
        this._xy = {};
        this.diff = {};
    },
    methods: {
        readMemo () {
            return this.memo
        },
        close () {
            this.remove = true
            //this.$parent.close(this.window);
        },
        /* eslint-disable */
        mousedown: function(e) {
            //カーソルの初期位置を控えておく
            this._xy = {x: e.pageX,y: e.pageY}
            this.diff = {x: e.pageX - this.x,y: e.pageY - this.y};
            document.addEventListener("mousemove", this.mousemove)
            document.addEventListener("mouseup", this.mouseup)
        },
        mousemove: function(e) {
            this.x = this._xy.x + (e.pageX - this._xy.x) - this.diff.x;
            this.y = this._xy.y + (e.pageY - this._xy.y) - this.diff.y;
            //ウインドウを移動
        },
        mouseup: function(e) {
            document.removeEventListener("mousemove", this.mousemove)
            document.removeEventListener("mouseup", this.mouseup)
        },
        up2forward (){
            this.$parent.up2forward(this.window);
        },
        record (){
            if(!this.record_run){
                this.record_src = require("../assets/_voice_record.png")
                var that = this
                var reach2res = false
                this.record_run = true;

                speech.onresult = function(e) {
                    const text = e.results[0][0].transcript;
                    that.memo += text + '\n';
                };
                speech.onend = function() {
                    if(that.record_run){
                        speech.start();
                    }
                };
                speech.start();
            } else {
                this.record_src = require("../assets/voice_record.png")
                this.record_run = false;
            }
        }
        /* eslint-disable */
    }
}
</script>

<style>
#editorWindow {
    text-align: left;
    color: #2c3e50;
    position:absolute;
    border: 2px solid #333;
}
.container {
    width: 40%;
    height: 40%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 0fr 1fr;
    grid-template-areas: 'g0 g0 g1 g1' 'g2 g2 g2 g2';
}

.area-g0 {
    grid-area: g0;
    text-align: left;
}

.area-g1 {
    grid-area: g1;
    text-align: right;
}

.area-g2 {
    grid-area: g2;
}
a {
    font-family: Helvetica;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #333;
    color: #fff;
    border: 2px solid #333;
    cursor: default;
}
textarea {
    width: 97%;
    height: 96%;
    margin: 1% 1% 1% 1%;
    resize: none;
}
</style>