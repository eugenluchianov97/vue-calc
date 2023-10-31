<script>
export default {
  name:'app',
  data(){
    return{
      player:true,
      field:[
        {value:'',id:0},{value:'',id:1},{value:'',id:2},
        {value:'',id:3},{value:'',id:4},{value:'',id:5},
        {value:'',id:6},{value:'',id:7},{value:'',id:8}

      ],
      x:[],
      o:[],
      winCombinations: [
          [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
      ],
      message:"Ход синих",
      endGame:false

    }
  },
  async mounted(){

  },
  methods:{
    click:function(field){
      let index = this.field.findIndex((val) => {return val.id === field.id })


      if(this.field[index].value === '' && !this.endGame){
          this.field[index].value = this.player ? 'x' : 'o';
          if(this.player){
            this.x.push(index)
          }else{
            this.o.push(index)
          }

          this.player = !this.player;
          this.message = this.player ? 'Ход синих' : 'Ход красных'

      }
      this.calcWinner()
    },
    calcWinner: function(){
      this.winCombinations.map(arr => {
        const xWin = arr.sort().every(element => {
            return this.x.sort().includes(element);
        });
        const oWin = arr.sort().every(element => {
          return this.o.sort().includes(element);
        });

        let count = 9;

        this.field.map(el => {
           if(el.value !== ''){
             count--
           }
        })

        if(xWin){
           this.endGame =  true;
           this.message = 'Синие выиграли!'
        }
        if(oWin){
           this.endGame =  true;
           this.message = 'Красные выиграли!'
        }

        if(count === 0){
          this.endGame =  true;
          this.message = 'Ничья!'
        }
      })
    },
    newGame:function(){
      this.x = [];
      this.o = [];
      this.player = true;
      this.message = 'Ход синих!'
      this.field.map(el => {
         el.value = '';
      })

      console.log(this.field)

      this.endGame = false
    }
  }
}

</script>

<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 bg-cyan-400 flex items-center justify-center">
       <div class="max-w-md bg-white mx-auto p-2">

           <p class="p-2 my-2">{{message}}</p>
           <div class="flex flex-wrap w-50" >
             <div v-for="cell in field" v-on:click="click(cell)" class="m-1 w-16 h-16 border border-slate-400 flex items-center justify-center">
                <div v-if="cell.value === 'x'" :class="cell.value === 'x' ? 'bg-blue-500 ' : '' " class="w-full h-full" ></div>
                <div v-if="cell.value === 'o'" :class="cell.value === 'o' ? 'bg-red-500 ' : '' " class="w-full h-full" ></div>
             </div>
             <div v-on:click="newGame" class="w-full md:w-80 opacity-1 bg-white my-2 px-3 py-2  text-center border-2 border-slate-700 text-slate-700 font-bold rounded-md ">Новая игра</div>
           </div>


       </div>
  </div>

</template>

