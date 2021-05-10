const postApi = `http://localhost:4000/posts`;
const deletePostApi = `http://localhost:4000/posts/delete/${id}`;

export default {
    state: {
        post: {},
        posts: []
    },

    getters: {
        getVibe(state) {
            return state.vibe
        }
    },

    actions: {
       async fetchVibes({commit}) {
         let res = await this.axios.get(postApi);
         commit('SET_VIBES', res)
        },

         deleteVibe({commit}, id) {
            this.axios.delete(deleteVibeApi, id);
            commit('SET_VIBES')
        }
    },
    
    mutations: {
        SET_VIBE(state, res) {
            state.vibe = res.data
        },
        
        SET_VIBES(state, res) {
            state.posts = res.data
        }
    }
}