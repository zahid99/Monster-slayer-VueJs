new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        isGameRunning: false,
        logs:[]
    },
    methods:{
        startGame: function() {
            this.isGameRunning=true;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.logs=[] 

        },
        attack:function(){
            var damage=this.calculateDamage(10,3);
           this.monsterHealth -=damage;
           this.logs.unshift({
               isPlayer:true,
            text:'player hits monster for '+damage
            })
           if(this.checkWin()){
               return;
           }

           this.monsterAttacks();

        }
        ,
        spacialAttack: function(){

            var damage=this.calculateDamage(20,10);
            this.monsterHealth -=damage;
            this.logs.unshift({
                isPlayer:true,
             text:'player hits monster for '+damage
             })
            
            if(this.checkWin()){
                return;
            }

            this.monsterAttacks();
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;

            }
            else{
                this.playerHealth=100;
            }
            this.logs.unshift({
                isPlayer:false,
             text:'player heal for 10'
             })
         
            this.monsterAttacks();

        },
        monsterAttacks:function(){
            var damage=this.calculateDamage(12,5)
            this.playerHealth -=damage
            this.logs.unshift({
                isPlayer:false,
             text:'monster hits player for '+damage
             })
            this.checkWin();
        }
        ,
        giveUp: function(){
            this.isGameRunning=false;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.logs=[] 
        },
        calculateDamage:function(max,min){
            return Math.max(Math.floor(Math.random()*max)+1,min);
        },
        checkWin:function(){
            if(this.monsterHealth<=0){
               if(confirm('You won ! New Game?')){
                   this.startGame();
               }
               else{
                this.giveUp();
               }
               return
            }
            else if(this.playerHealth<=0){
                if(confirm('You lost! New Game?')){
                    this.startGame();
                }
                else{
                    this.giveUp();
                }
            }
        }

    }
}) 