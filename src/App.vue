<script>
export default {
  name:'app',
  data(){
    return{
      buttons:[
        [{num:'clear',value:'AC',bg:'grey',type:'clear',double:true,},{num:'del',value:'Del',bg:'grey',type:'delete'},{num:'/',value:'/',bg:'orange',type:'operation'}],
        [{num:7,value:7,type:'number'},{num:8,value:8,type:'number'},{num:9,value:9,type:'number'},{num:'*',value:'*',bg:'orange',type:'operation'}],
        [{num:4,value:4,type:'number'},{num:5,value:5,type:'number'},{num:6,value:6,type:'number'},{num:'-',value:'-',bg:'orange',type:'operation'}],
        [{num:1,value:1,type:'number'},{num:2,value:2,type:'number'},{num:3,value:3,type:'number'},{num:'+',value:'+',bg:'orange',type:'operation'}],
        [{num:0,value:0,double:true,type:'number'},{num:'.',value:'.',type:'number'},{num:'=',value:'=',bg:'orange',type:'equal'}],
      ],
      output:'',
      currentOperand:'',
      previousOperand:'',
      operation:null,
    }
  },
  async mounted(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    const posts = await res.json();
    this.posts = posts
  },
  methods:{
     push:function(btn){
          console.log(btn.type)
       if(btn.type === 'number'){
         this.appendNumber(btn.value);
       }
       if(btn.type === 'delete'){
         this.delete();
       }
       if(btn.type === 'clear'){
         this.clear();
       }
       if(btn.type === 'delete'){
         this.delete();
       }
       if(btn.type === 'equal'){
         this.compute();
       }
     },
     clear:function(){},
     delete:function(){
       this.currentOperand = this.currentOperand.toString().slice(0, -1)
     },
     appendNumber:function(number){
       console.log('number =',number)
       if (number === '.' && this.currentOperand.includes('.')) return

       this.currentOperand = this.currentOperand.toString() + number.toString()

     },
    chooseOperation:function(operation){
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    },
    compute:function(){
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    },
    updateDisplay:function(){
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  }
}

</script>

<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 bg-cyan-400 flex items-center justify-center">
       <div class="max-w-md bg-black mx-auto 5 rounded-md ">
         <div class="mx-3 my-3">
           <input type="text" v-model="currentOperand" class="w-full border-none outline-0 text-light text-slate-400 p-3"  readonly />
         </div>

         <div class="px-2 py-3 ">
           <div class="flex" v-for="row in buttons">
             <div v-on:click="push(btn)" v-for="btn in row" class=" m-1 cursor-pointer text-white font-medium rounded-md  flex items-center justify-center h-12" :class="[btn.double ? 'w-26' : 'w-12' ,btn.bg === 'grey' ? 'bg-slate-300 text-black' : '',btn.bg === 'orange' ? 'bg-orange-600' : '',!btn.bg? 'bg-gray-600' : '']" >
               {{btn.value}}
             </div>

           </div>
         </div>


       </div>
  </div>

</template>

