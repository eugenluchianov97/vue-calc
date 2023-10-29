<script>
export default {
  name:'app',
  data(){
    return{
      posts:[],
      buttons:[
        [{num:'clear',value:'AC',bg:'grey'},{num:'plus_min',value:'+/-',bg:'grey'},{num:'percent',value:'%',bg:'grey'},{num:'/',value:'/',bg:'orange'}],
        [{num:7,value:7},{num:8,value:8},{num:9,value:9},{num:'*',value:'*',bg:'orange'}],
        [{num:4,value:4},{num:5,value:5},{num:6,value:6},{num:'-',value:'-',bg:'orange'}],
        [{num:1,value:1},{num:2,value:2},{num:3,value:3},{num:'+',value:'+',bg:'orange'}],
        [{num:0,value:0,double:true},{num:'coma',value:','},{num:'=',value:'=',bg:'orange'}],
      ]
    }
  },
  async mounted(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    const posts = await res.json();
    this.posts = posts
  }
}

</script>

<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 bg-cyan-400 flex items-center justify-center">
       <div class="max-w-md bg-black mx-auto 5 rounded-md ">
         <div class="mx-3 my-3">
           <input type="text" class="w-full"  readonly />
         </div>

         <div class="px-2 py-3 ">
           <div class="flex" v-for="row in buttons">
             <div v-for="btn in row" class=" m-1 cursor-pointer text-white font-medium rounded-md  flex items-center justify-center h-12" :class="[btn.double ? 'w-26' : 'w-12' ,btn.bg === 'grey' ? 'bg-slate-300 text-black' : '',btn.bg === 'orange' ? 'bg-orange-600' : '',!btn.bg? 'bg-gray-600' : '']" >
               {{btn.value}}
             </div>

           </div>
         </div>


       </div>
  </div>

</template>

