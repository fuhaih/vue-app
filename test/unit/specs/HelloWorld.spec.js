import Vue from 'vue';
import { shallowMount , createLocalVue} from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld';
import store from '@/store';

const localVue = createLocalVue()

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    // const Constructor = Vue.extend(HelloWorld,{
    //   $store: store
    // });
    // const vm = new Constructor().$mount();
    // expect(vm.$el.querySelector('.hello h1').textContent)
    // .toEqual('Welcome to Your Vue.js App');    
   
    const wrapper = shallowMount(HelloWorld, {
      store,
      localVue
    });
    expect(wrapper.vm.$el.querySelector('.hello h1').textContent)
    .toEqual('Welcome to Your Vue.js App');
  });
});
