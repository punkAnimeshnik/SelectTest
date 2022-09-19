import { createStore } from 'vuex'


export default  createStore({

    actions:{
       async fetchComments(ctx){
           const res = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=50");
           const comm = await res.json();
            ctx.commit('updateComments', comm)
       }
    },
    mutations:{
        updateComments(state, comm){
            state.comments = comm;
        }
    },
    state:{
        comments: []
    },
    getters:{
        allComments(state){
            return state.comments
        }
    }
})