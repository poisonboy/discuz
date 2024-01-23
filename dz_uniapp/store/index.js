import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: [],
	},
	mutations: {
		userLogin(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({
				key: "userInfo",
				data: provider
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = [];
			uni.removeStorage({
				key: 'userInfo'
			})
			uni.removeStorage({
				key: 'userData'
			})
		}
	}
})

export default store
