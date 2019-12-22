import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		prices: 0,
		selected: [],
		in_theaters: [],
		in_theaters_more_s: []
	},
	getters:{
		money(state){
			return state.selected.reduce((num,item)=>{
				 return num+item.price
			},0)
		}
	},
	actions: {
		change_in_theatersdata(context, playload) {
			context.commit('addin_theaters', playload)
		},
		change_in_theaters_more_sdata(context, playload) {
			context.commit('addin_theaters_more_s', playload)
		}
	},
	mutations: {
		deleteall(state){
			state.selected.forEach(item=>{
				item.iswanted=!item.iswanted;
			});
			state.selected.splice(0);
		},
		havedelete(state,playload){
		state.selected=state.selected.filter(item=>{
				return item.id!=playload
			});	
		   	
		},
		addin_theaters_more_s(state, playload) {
			state.in_theaters_more_s = playload;
		},
		addin_theaters(state, playload) {
			state.in_theaters = playload;
		},
		changeSelected(state, palyload) {
			state.selected = palyload
		},
		changeiswanted(state, indexlist) {
			state.in_theaters_more_s[indexlist].iswanted = !state.in_theaters_more_s[indexlist].iswanted;
		},
		changewant(state, playload) {
			state.selected[playload].iswanted = !state.selected[playload].iswanted
		},
		changeiswanteda(state,playload){
			for (let i = 0; i < state.selected.length; i++) {
				if(state.selected[i].id==playload.id){
					state.selected[i].iswanted=!state.selected[i].iswanted;
					state.selected.splice(i,1)
				}
			}
		}
	}
})
Vue.prototype.$store = store;
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
