var dog, happyDog, database, foodS, lastFeds;
var game_state = null, currentTime;

function preload() {
  dogImg = loadImage("images/dogImg.png");
  HappyDogImg = loadImage("images/dogImg1.png");
  milkBottleImg = loadImage("images/Milk.png");
  bedroomImg = loadImage("pet_images/BedRoom.png");
  washroomImg = loadImage("pet_images/WashRoom.png");
  gardenImg = loadImage("pet_images/Garden.png");
  livingroomImg = loadImage("pet_images/LivingRoom.png");
  lazyImg = loadImage("pet_images/Lazy.png");
}

function setup() {
  createCanvas(600, 600);

  dog = createSprite(450, 450);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  database = firebase.database();

  foodObj = new Food();
  foodObj.getFoodStock();
  foodObj.getFeedTime();

  gamestate1 = new Game();
  gamestate1.getState();

  feed = createButton("Feed the dog")
  feed.position(400, 30)
  feed.mousePressed(ClickFeed);

  addfood = createButton("Add Food")
  addfood.position(500, 30)
  addfood.mousePressed(ClickAddFood);

  mILKBOTTLE = createSprite(320, 450, 80, 80)
  mILKBOTTLE.addImage(milkBottleImg);
  mILKBOTTLE.scale = 0.15
  mILKBOTTLE.visible = false
}

function draw() {
  background(46, 139, 87);
  drawSprites();
  currentTime = hour();

  if (currentTime === (lastFeds + 1)) {
    foodObj.changeSetUp(3);
    gamestate1.updateState("playing");
  } else if (currentTime === (lastFeds + 2)) {
    gamestate1.updateState("sleeping");
    foodObj.changeSetUp(1);
  } else if (currentTime === (lastFeds + 3)) {
    gamestate1.updateState("bathing");
    foodObj.changeSetUp(2);
  } else if (currentTime === (lastFeds + 4)) {
    gamestate1.updateState("enjoying");
    foodObj.changeSetUp(4);
  }
  else {
    gamestate1.updateState("hungry");
    foodObj.display();
  }

  if (game_state === "hungry") {
    feed.show();
    addfood.show();
   // dog.addImage(dogImg);
  }
  else {
    feed.hide();
    addfood.hide();
    //dog.remove();
  }
}

function ClickFeed() {
  foodObj.foodStock -= 1;
  foodObj.updateFoodStock(foodObj.foodStock);

  dog.addImage(HappyDogImg);

  foodObj.updateFeedTime(hour())
  mILKBOTTLE.visible = true
}

function ClickAddFood() {
  foodObj.foodStock += 1;
  foodObj.updateFoodStock(foodObj.foodStock);
}




