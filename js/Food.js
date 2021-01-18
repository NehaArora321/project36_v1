class Food{
    constructor(){
        this.foodStock=0;
        this.lastFeed=0;
        this.image=loadImage("images/Milk.png");
    }

 getFoodStock(){
        var foodStockRef=database.ref("Food");
        foodStockRef.on("value",(data)=>{
            this.foodStock=data.val();
        });  
    }

    updateFoodStock(fooddata){
        database.ref("/").update({
            Food: fooddata
        })
    }

   getFeedTime(){
        var foodTimeRef=database.ref("FeedTime");
        console.log(foodTimeRef);
        foodTimeRef.on("value",(data)=>{
            console.log(data.val())
            lastFeds=data.val();
        });
    }

    updateFeedTime(feeddata){
        database.ref("/").update({
            FeedTime: feeddata
        })
    }

    display(){
       
  fill(255)
  textSize(15);
  if(lastFeds>=12){
    lastFeds=lastFeds-12 + " PM"
  }
  else if(lastFeds==0){
    lastFeds="12 AM"
  }
  else if(lastFeds>0 && lastFeds<12){
    lastFeds=lastFeds + " AM"
  }
  text("Last Feed : "+lastFeds,250,45)
  
        var x=80,y=70;
        imageMode(CENTER)

        if(this.foodStock!==null){
            for(var i=0;i<this.foodStock;i++){
                if(i%15===0){
                    x=80
                    y += 50
                }
                image(this.image,x,y,50,50)
                x += 30
            }
        }
    }

    changeSetUp(bg){
        if(bg===1)
        background(bedroomImg)
        else if(bg===2)
        background(washroomImg)
        else if(bg===3)
        background(gardenImg)
        else if(bg===4)
        background(livingroomImg)
    }
}