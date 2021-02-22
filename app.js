new Vue ({
    el: "#app",
    data : {
        godzilla_health : 100,
        muto_health : 100,
        //attacks
        godzilla_AP_MAX: 10,
        godzilla_SAP_MAX: 20,
        godzilla_HP_MAX: 15,
        muto_AP_MAX: 13,

        //log texts
        log_texts : {
            g_attack_text : "Godzilla hits : ",
            g_special_attack_text : "Godzilla use his special attack : ",
            g_healing_text : "Godzilla heal self for : ",
            muto_attack_text : "Muto hits : ",
        },

        //Disable buttons
        special_count : 2,
        healing_count : 3,
        special_disable : false,
        healing_disable : false,

        logs : [],
        is_game_started : false,
    },
    methods : {
        startGame(){
            this.is_game_started = true;
        },

        attack(){
            const hit_point = Math.floor(Math.random()*Math.floor(this.godzilla_AP_MAX));
            this.muto_health -= hit_point;
            
            this.add_to_log({
                player : "godzilla",
                log_text : this.log_texts.g_attack_text + hit_point,
            });

            this.monster_attack();
                 
        },

        special_attack(){
            this.special_count--;
            if(this.special_count <= 0){
                this.special_disable = true;
            }
            const hit_point = Math.floor(Math.random()*(this.godzilla_SAP_MAX - this.godzilla_AP_MAX) + this.godzilla_AP_MAX);
            this.muto_health -= hit_point;

            this.add_to_log({
                player : "special",
                log_text : this.log_texts.g_special_attack_text + hit_point,
            });
            this.monster_attack();
            
       
        },

        healing(){
            this.healing_count--;
            if(this.healing_count <= 0){
                this.healing_disable = true;
            }
            const heal_point = Math.floor(Math.random()*Math.floor(this.godzilla_HP_MAX));
            this.godzilla_health += heal_point;
            this.add_to_log({
                player : "healing",
                log_text : this.log_texts.g_healing_text + heal_point,
            });
            this.monster_attack();
            
        },

        end_game(){
            this.is_game_started = false;
            this.muto_health = 100;
            this.godzilla_health = 100;
            this.logs = [];
            this.special_count = 2;
            this.healing_count = 3;
            this.special_disable = false;
            this.healing_disable = false;
        },

        monster_attack(){
            const hit_point = Math.floor(Math.random()*Math.floor(this.muto_AP_MAX));
            this.godzilla_health -= hit_point;

            this.add_to_log({
                player : "muto",
                log_text : this.log_texts.muto_attack_text + hit_point,
            });
        },

        add_to_log(log){
            this.logs.push(log);
        },

    },
    computed : {

    },
    watch : {
        godzilla_health : function(value){
            if(value < 0){
                this.godzilla_health = 0;
                if(confirm("Godzilla Down!! Wanna Play Again?")){
                    this.muto_health = 100;
                    this.godzilla_health = 100;
                    this.logs = [];
                    this.special_count = 2;
                    this.healing_count = 3;
                    this.special_disable = false;
                    this.healing_disable = false;
                }
            }
            else if( value > 100){
                this.godzilla_health = 100;
            }
        },

        muto_health : function(value){
            if(value < 0){
                this.muto_health = 0;
                if(confirm("Muto Down!! Wanna Play Again?")){
                    this.muto_health = 100;
                    this.godzilla_health = 100;
                    this.logs = [];
                    this.special_count = 2;
                    this.healing_count = 3;
                    this.special_disable = false;
                    this.healing_disable = false;
                }
            }
        }
    }
})