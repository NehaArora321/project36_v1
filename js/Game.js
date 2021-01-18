class Game{
    constructor(){
        
    }

    getState(){
        database.ref("gameState").on("value",function(data){
            game_state=data.val();
        })
    }

    updateState(state){
        database.ref("/").update({
            gameState:state
        })
    }
}