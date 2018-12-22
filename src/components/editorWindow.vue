<template>
  <div id="editorWindow" class='container' v-bind:style="{ top: y + 'px', left: x + 'px'}" v-if="!remove">
    <div class='area-g0'>
      <a @mousedown="mousedown($event)" >{{ window }}</a>
    </div>
    <div class='area-g1'>
      <a @click="close" >x</a>
    </div>
    <div class='area-g2'>
      <textarea v-model="memo" rows="6" cols="40" ></textarea>
    </div>
</div>
</template>

<script>
export default {
    name: 'editorWindow',
    props: ['pre_memo','pre_window','init_x','init_y'],
    data () {
        return {
            x: 0,
            y: 0,
            window: "",
            memo: "",
            remove: false
        }
    },
    created: function () {
        this.memo += this.pre_memo
        this.window = this.pre_window
        this.x = this.init_x;
        this.y = this.init_y;
        this._x = 0;
        this._y = 0;
        this._x2 = 0;
        this._y2 = 0;
    },
    methods: {
        childMethod () {
            // eslint-disable-next-line
            return this.memo
        },
        close () {
            this.remove = true
            //this.$parent.close(this.window);
        },
        /* eslint-disable */
        mousedown: function(e) {
            //カーソルの初期位置を控えておく
            this._x = e.pageX;
            this._y = e.pageY;
            this._x2 = e.pageX;
            this._y2 = e.pageY;
            document.addEventListener("mousemove", this.mousemove)
            document.addEventListener("mouseup", this.mouseup)
        },
        mousemove: function(e) {
            this.x = this._x2 + (e.pageX - this._x);
            this.y = this._y2 + (e.pageY - this._y);
            //ウインドウを移動
        },
        mouseup: function(e) {
            document.removeEventListener("mousemove", this.mousemove)
            document.removeEventListener("mouseup", this.mouseup)
        },
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
    font-size: 24px;
    cursor: default;
}
textarea {
    width: 97%;
    height: 96%;
    margin: 1% 1% 1% 1%;
    resize: none;
}
</style>