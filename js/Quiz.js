class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("yellow");
    textSize(30);
    text("Result of the Quiz!!", height/2, width/2);
    Contestant.getPlayerInfo();


    if (allContestants != undefined) {
      var y_pos = 230;
       text("*Note: Contestant who answered correct are highlighted in green color!", 600, width/2);

    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";
      if (correctAns === allContestants[plr].answer)
      fill("green")
      else
      fill("red");
      y_pos+=30;
      text(allContestants[plr].name + " : " + allContestants[plr].answer, 250, y_pos);
    }
    }
  }

}
