<template>
   <div class="container"  v-on:keyup.down="pageDown" v-on:keyup.up="pageUp" v-on:keyup.enter="keyEnter">
       <h2>EMail</h2>
       <div class="select-box">
           <div class="options-container" v-bind:class="active ? 'active':''" >
               <div class="option" v-bind:class="this.id===comment.id ? 'hover':''" v-for="comment in allComments" :key="comment.id" >
                   <input type="radio" class="radio"  v-bind:id="'option'+comment.id" name="category" v-on:click="title=comment.email , active=!active">
                   <label v-bind:for="'option'+comment.id">{{comment.email}}</label>
               </div>
           </div>
           <div class="selected" v-on:click="active=!active, title='Select Email', num=id=0" >
              {{title}}
           </div>
           <div class="search-box">
               <input type="text" placeholder="Search Option..." v-model="search"  >
           </div>
       </div>
   </div>
</template>

<script>
    export default {
        name: 'SelectTest',
        data(){
            return{
                active: false,
                title: "Select Email",
                search: "",
                num:0,
                id:0,
                len:0
            }
        },
        computed: {
            allComments(){
                return this.$store.getters.allComments.filter(elem=>{
                    return elem.email.toLowerCase().includes(this.search.toLowerCase())
                })
            },

        },
        methods:{
            pageDown(){
                let comm = this.$store.getters.allComments.filter(elem=>{
                    return elem.email.toLowerCase().includes(this.search.toLowerCase())
                })
                if (comm[this.num]){
                    this.id=comm[this.num].id
                    this.num++
                }

            },
            pageUp(){
                let comm = this.$store.getters.allComments.filter(elem=>{
                    return elem.email.toLowerCase().includes(this.search.toLowerCase())
                })
                if (this.num>0){
                    this.id=comm[this.num-1].id
                    this.num--
                }

            },
            keyEnter(){
                let comm = this.$store.getters.allComments.filter(elem=>{
                    return elem.email.toLowerCase().includes(this.search.toLowerCase())
                })
                this.title=comm[this.num-1].email
                this.active=!this.active
            }
        },
        async mounted(){
            this.$store.dispatch("fetchComments");
        }

    }
</script>

<style lang="less">
*{
    margin: 0;
    box-sizing: border-box;
}
    body{
        font-family: "Roboto", sans-serif;
        background: #f7f6ff;
    }

    h2{
        margin: 16px;
    }
    .container{
        margin-top: 100px;
        padding: 32px;
    }
    .select-box{
        position: relative;
        display: flex;
        width: 400px;
        flex-direction: column;
        .options-container{
            background: #2f3640;
            color: #f5f6fa;
            max-height: 0;
            width: 100%;
            opacity: 0;
            transition: all 0.4s;
            border-radius: 8px;
            overflow: hidden;
            order: 1;
        }
        .options-container.active{
            max-height: 240px;
            opacity: 1;
            overflow-y: scroll;
            margin-top: 54px;
        }
        .options-container::-webkit-scrollbar{
            width: 8px;
            background: #0d141f;
            border-radius: 0 8px 8px 0;
        }
        .options-container::-webkit-scrollbar-thumb{
            background: #525861;
            border-radius: 0 8px 8px 0;
        }
        .option,.selected{
            padding: 12px 24px;
            cursor: pointer;
            .radio{
                display: none;
            }
        }
        .option:hover, .hover{
            background: #414b57;
        }
        .selected{
            background: #2f3640;
            border-radius: 8px;
            margin-bottom: 8px;
            color: #f5f6fa;
            position: relative;
            order: 0;
        }
        .selected::after{
            content: "";
            background: url("../assets/arrow-down.svg");
            background-size: contain;
            background-repeat: no-repeat;
            position: absolute;
            height: 100%;
            width: 32px;
            right: 10px;
            top: 5px;
            transition: all 0.4s;
        }
        .options-container.active+ .selected::after{
            transform: rotateX(180deg);
            top: -6px;
        }
        .search-box{
            input{
                width: 100%;
                padding: 12px 16px;
                font-family: "Roboto", sans-serif;
                font-size: 16px;
                position: absolute;
                border-radius: 8px 8px 0 0;
                z-index: 100;
                border: 8px solid #2f3640;
                opacity: 0;
                pointer-events: none;
                transition: all 0.4s;
            }
            input:focus{
                outline: none;
            }
        }
        .options-container.active ~ .search-box{
            input{
                opacity: 1;
                pointer-events: auto;
            }

        }
        label{
            cursor: pointer;
        }
    }
</style>