
/** 2D map of the field;
 * 0 = BARRIER
 * 1 = empty
 * 3 = +15FOOD
 * 4 = GHOST
 * 5 = PAC-MAN
 * 6 = +25FOOD
 * 7 = +5_FOOD
 * 8 = CHERRY
 */
var FIELD = [
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0",
    "0,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,1,0,1,0,0,1,0,1,0,1,0,0,0",
    "0,1,0,1,0,0,1,0,1,0,1,0,1,0",
    "0,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,1,0,1,0,1,1,0,1,0,0,0,0",
    "0,0,1,0,1,0,1,0,0,1,0,0,0,0",
    "0,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,1,1,0,0,1,1,0,0,1,0,0,0",
    "0,1,1,1,1,1,1,1,0,1,1,0,0,0",
    "0,1,1,1,1,1,1,1,0,1,1,1,1,0",
    "0,0,0,1,0,0,1,1,0,1,0,0,0,0",
    "0,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0",
];
var button;
var canvas;

var shuffledField = [];
var shuffledField2 = [];
var field = [];
var fie = [];
var ghosts = [];
var cherrys = [];

var pacman;
var cherry;
var score=0;
var endScore=0;
var lastKeyPressed=3;
var ghostsNum=1;
var pacman_lives=3;
var lives=pacman_lives;
var special_food_num=67;
var Ghost_speed=1;
var pacman_remain=1;
var cherry_remain=1;
var timer;
var counter = 76;
var seconds, minutes;
var interval;

var cherryImg;
var ghostImg1;
var ghostImg2;
var ghostImg3;
var pacman_Lives_img;
var won_game_img;
var end_game_img;

var n1=0;
var n2=0;
var n3=0;
var foodNum1=0;
var foodNum2=0;
var foodNum3=0;
var settings=null;
var controls = {
    upkey : 38,
    downkey: 40,
    leftkey: 37,
    rightkey: 39
};


function setSettings(newSettings){
    settings = newSettings;
    special_food_num = settings['amountOfBalls'];
    counter = settings['time'];
    Ghost_speed = settings['ghostSpeed'];
    controls = settings['controls'];
    ghostsNum = settings['amountOfGhosts'];
}

function preload(){
    ghostImg1 = loadImage('pics/ghost1.png'); // Load the image
    ghostImg2 = loadImage('pics/ghost2.png'); // Load the image
    ghostImg3 = loadImage('pics/ghost3.png'); // Load the image
    pacman_Lives_img = loadImage('pics/pacman_lives.png'); // Load the image
    cherryImg= loadImage('pics/cherry.png'); // Load the image
    end_game_img = loadImage('pics/endGame.png'); // Load the image
    won_game_img = loadImage('pics/pacman_won.jpg'); // Load the image
}
function resetSketchSameGame() {
    //console.log('pacman (x,y): '+"("+pacman.x+", "+pacman.y);
    fie;
    ghosts;
    ghosts.x=1;
    ghosts.y=12;
    cherrys;
    cherrys.x=1;
    cherrys.y=1;
    pacman;
    pacman.x=12;
    pacman.y=6;
    fie=shufflePacman(fie);
    //special_food_num;

    lastKeyPressed=3;
    ghostsNum=settings!=null ? settings['amountOfGhosts'] : 1;
    Ghost_speed=settings!=null ? settings['ghostSpeed'] : 1;
    //pacman_remain=1;
    endScore;
    score;
    counter = settings != null ? settings['time'] : 76;
    seconds;
    minutes;
}
function resetSketchNewGame() {
    FIELD = [
        "0,0,0,0,0,0,0,0,0,0,0,0,0,0",
        "0,1,1,1,1,1,1,1,1,1,1,1,1,0",
        "0,1,0,1,0,0,1,0,1,0,1,0,0,0",
        "0,1,0,1,0,0,1,0,1,0,1,0,1,0",
        "0,1,1,1,1,1,1,1,1,1,1,1,1,0",
        "0,0,1,0,1,0,1,1,0,1,0,0,0,0",
        "0,0,1,0,1,0,1,0,0,1,0,0,0,0",
        "0,1,1,1,1,1,1,1,1,1,1,1,1,0",
        "0,0,1,1,0,0,1,1,0,0,1,0,0,0",
        "0,1,1,1,1,1,1,1,0,1,1,0,0,0",
        "0,1,1,1,1,1,1,1,0,1,1,1,1,0",
        "0,0,0,1,0,0,1,1,0,1,0,0,0,0",
        "0,1,1,1,1,1,1,1,1,1,1,1,1,0",
        "0,0,0,0,0,0,0,0,0,0,0,0,0,0",
    ];
    shuffledField = [];
    shuffledField2 = [];
    field = [];
    fie = [];
    ghosts = [];
    cherrys = [];
    pacman;
    cherry;
    score=0;
    endScore=0;
    lastKeyPressed=3;
    ghostsNum=1;

    pacman_lives=3;
    lives=pacman_lives;

    special_food_num=50;
    Ghost_speed=1;
    pacman_remain=1;
    cherry_remain=1;
    timer;
    counter = 76;
    seconds, minutes;
    interval;
    if(settings!=null)
        setSettings(settings);
    fie = generate2();
}
function setup() {
    if(canvas!=null)
        canvas.remove();
    canvas=createCanvas(700,600);
    canvas.style('display', 'block');
    var z = (windowWidth - width) / 2;
    var w = (windowHeight - height) / 2;
    canvas.position(z, w);

    newGame();

    if(timer!=null)
        timer.remove();
    timer=createElement('timer', 'timer');
    timer.position(890, 83.5);
    interval=setInterval(timeIt, 1000);

    if(button!=null)
        button.remove();
    button = createButton("New Game");
    button.position(830, 40);
    button.mousePressed(newGame);

    var div = document.getElementById("game");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    div.appendChild(canvas.elt);
    div.appendChild(button.elt);
    div.appendChild(timer.elt);
}

function newGame(){
    loop();
    if(pacman_lives===3) {
        resetSketchNewGame();
       // pacman_lives--;
    }
    if(pacman_lives===2 || pacman_lives===1){
        resetSketchSameGame();
        ghosts.x=1;
        ghosts.y=12;
        cherrys;
        cherrys.x=1;
        cherrys.y=1;
        pacman;
        pacman.x=12;
        pacman.y=6;
        fie=shufflePacman(fie);
        draw();

    }
    if(pacman_lives===0){
        endGame(false);
        resetSketchNewGame();
    }
    // if (score == endScore) { // check if Pac-man has won
    //     endGame(true);
    // }
}

function endGame(won) {
    if (won) {
        drawWon();
    }
    else {
        drawEnd();

    }
    noLoop();
}
function draw() {
    //loop();
    background('#1c1c00');   //'#1c1c00'
    drawScale();
    if(pacman_lives===3) {
        image(pacman_Lives_img, 600, 90, pacman_Lives_img.height / 18, pacman_Lives_img.width / 18);
        image(pacman_Lives_img, 560, 90, pacman_Lives_img.height / 18, pacman_Lives_img.width / 18);
        image(pacman_Lives_img, 520, 90, pacman_Lives_img.height / 18, pacman_Lives_img.width / 18);
    }

    else if(pacman_lives===2) {
        image(pacman_Lives_img, 600, 90, pacman_Lives_img.height / 18, pacman_Lives_img.width / 18);
        image(pacman_Lives_img, 560, 90, pacman_Lives_img.height / 18, pacman_Lives_img.width / 18);
    }
    else if(pacman_lives===1) {
        image(pacman_Lives_img, 560, 90, pacman_Lives_img.height / 18, pacman_Lives_img.width / 18);
    }
    for (var j = 0; j < ghosts.length; j++) {
        ghosts[j].update();
        ghosts[j].draw();
    }

    if (cherry!=null && cherry.intact && (pacman_lives === 3 || pacman_lives === 2 || pacman_lives === 1)) {
        cherry.update();
        cherry.draw();
    }
    pacman.update();
    pacman.draw();

    handleInput(); // keyboard input
}


function drawWon() {
    textSize(70);
    textAlign(LEFT);
    fill("#070700");
    stroke("#070700");
    strokeWeight(9);
    background(won_game_img);
    //image(won_game_img, this.x * SIZE, this.y * SIZE, won_game_img.height / 15, won_game_img.width / 15);
    text("YOU", width/2-300, height/2+120 );
    text("WIN", width/2-300 , height/2+220 );
}

function drawEnd() {
    timer.remove();
    // noLoop();
    textSize(100);
    textAlign(CENTER);
    fill("#070700");
    stroke("#070700");
    strokeWeight(9);
    background(end_game_img);
    //image(end_game_img,  SIZE,  SIZE, end_game_img.height , end_game_img.width);
    text("YOU LOSE", width / 2, height / 2);
}

/**
 * draws all tiles except types GHOST and PACMAN
 * draws score
 */
function drawScale() {
    /* walls */
    for (var i = 0; i < fie.length; i++) {
        if (fie[i].intact) {
            if (fie[i].type != "GHOST1" && fie[i].type != "GHOST2" && fie[i].type != "GHOST3" && fie[i].type != "CHERRY" && fie[i].type != "PACMAN")
                fie[i].draw();
        }
    }
    /* score */
    noStroke();
    fill("#fffdfc");
    textSize(20);
    textAlign(LEFT);
    text(score, 580,156 );
    var s = 'Score:';
    text(s, 500, 140, 70, 80);

    /* timer */
    //timer.style('color', '#fffdfc');
    var t = 'Time:';
    text(t, 500, 10, 70, 80);

    var l = 'Lives:';
    text(l, 500, 60, 70, 80);
}

function handleInput() {
    if (keyIsDown(controls['upkey'])) {
        lastKeyPressed=1;
        pacman.move(0, -1, true);
    } else if (keyIsDown(controls['downkey'])) {
        lastKeyPressed=2;
        pacman.move(0, 1, true);
    } else if (keyIsDown(controls['leftkey'])) {
        lastKeyPressed=3;
        pacman.move(-1, 0, true);
    } else if (keyIsDown(controls['rightkey'])) {
        lastKeyPressed=4;
        pacman.move(1, 0, true);
    }
}

function timeIt() {
    // 1 counter = 1 second
    if (counter > 0) {
        counter--;
    }
    minutes = floor(counter/60);
    seconds = counter % 60;
    // if (counter < 60)
    timer.html(minutes + ":" + seconds);
}

function shuffleBalls() {
    var j, x, i,r,z,q,w;
    for (i = 0; i < field.length; i++){
        if(field[i].type =="+5_FOOD" || field[i].type =="+15_FOOD" || field[i].type =="+25_FOOD"){
            x = field[i];
            z=field[i].x;
            r=field[i].y;
            for (var k = 0; k < field.length; k++) {
                j = Math.floor(Math.random() *196 );
                if(field[j].type =="empty" || field[j].type =="+15_FOOD" || field[j].type =="+25_FOOD"  || field[j].type =="+5_FOOD") {
                    q=field[j].x;
                    w=field[j].y;
                    field[i] = field[j];
                    field[i].x=z;
                    field[i].y=r;
                    field[j] = x;
                    field[j].x=q;
                    field[j].y=w;
                    break;
                }
            }
        }
    }
    return field;
}

function shufflePacman() {
    var j, x, i,r,z,q,w;
    for (i = 0; i < field.length; i++){
        if(field[i].type =="PACMAN"){
            x = field[i];
            z=field[i].x;
            r=field[i].y;
            for (var k = 0; k < field.length; k++) {
                j = Math.floor(Math.random() *196 );
                if(field[j].type =="empty" || field[j].type =="+15_FOOD" || field[j].type =="+25_FOOD"  || field[j].type =="+5_FOOD") {
                    q=field[j].x;
                    w=field[j].y;
                    field[i] = field[j];
                    field[i].x=z;
                    field[i].y=r;
                    field[j] = x;
                    field[j].x=q;
                    field[j].y=w;
                    break;
                }
            }
            break;
        }
    }
    return field;
}

function generate() {
    var count1=0;
    var count2=0;
    var count3=0;
    n1 = round(special_food_num * 0.3);
    n2 = round(special_food_num * 0.1);
    n3 = round(special_food_num * 0.6);
    for (var k = 1; k < FIELD.length; k++) { // loop through each string
        var row = FIELD[k].split(",");
        for (var r = 0; r < row.length; r++) { // loop through numbers in string
            if (pacman_remain === 1) {
                row[2] = "5";
                FIELD.splice(1, 1, row.toString());
                pacman_remain--;
            }
            if(k != 1 || r != 1){
                if((k != 12 || r != 1)){
                    if((k != 1 || r != 12)){
                        if((k != 12 || r != 12)){


                            if (row[r] == 1 && n1 > 0) {
                                if (row[r] !== 3 && row[r] !== 6 && row[r] !== 7 && row[r] !== 5 && row[r] !== 0) {
                                    row[r] = "3";
                                    FIELD.splice(k, 1, row.toString());
                                    n1--;
                                    special_food_num--;
                                    count1++;
                                }
                            }
                            if ( row[r] == 1 && n2 > 0) {
                                if(row[r]!==3&&row[r]!==6&&row[r]!==7&&row[r]!==5&&row[r]!==0) {
                                    row[r] = "7";
                                    FIELD.splice(k, 1, row.toString());
                                    n2--;
                                    special_food_num--;
                                    count2++;
                                }
                            }
                            if ( row[r] == 1 && n3 > 0) {
                                if(row[r]!==3&&row[r]!==6&&row[r]!==7&&row[r]!==5&&row[r]!==0) {
                                    row[r] = "6";
                                    FIELD.splice(k, 1, row.toString());
                                    n3--;
                                    special_food_num--;
                                    count3++;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    for (var z = 0; z < FIELD.length; z++) { // loop through each string
        var row = FIELD[z].split(",");
        for (var q = 0; q < row.length; q++) { // loop through numbers in string
            for (var s = 0; s < ghostsNum; s++) {
                if ((s == 0) && (z == 12) && (q == 1)) {
                    row[1] = "4";
                    FIELD.splice(12, 1, row.toString());
                }
                if ((s == 1) && (z == 1) && (q == 12)) {
                    row[12] = "9";
                    FIELD.splice(1, 1, row.toString());
                }
                if ((s == 2) && (z == 12) && (q == 12)) {
                    row[12] = "10";
                    FIELD.splice(12, 1, row.toString());
                }
                if(cherry_remain === 1){
                    if ((z == 1) && (q == 1)) {
                        row[1] = "8";
                        FIELD.splice(1, 1, row.toString());
                        cherry_remain--;
                    }
                }
            }
        }
    }
    var f = []; // returning array
    f.length = 0;
    //var ghostId = 0; // handling behavior of ghost
    //var cherrId=0;
    for (var i = 0; i < FIELD.length; i++) { // loop through each string

        row = FIELD[i].split(",");
        for (var j = 0; j < row.length; j++) { // loop through numbers in string

            var type = TYPES[row[j]];
            var tile = new Tile(j, i, type, -1, -1);

            switch (type) {
                case "empty":
                    f.push(tile);
                    break;

                case "PACMAN":
                    pacman = tile;
                    f.push(tile);
                    break;

                case "GHOST1":
                    var behavior = 1; // every other ghost will be agressive
                    ghosts.push(new Tile(j, i, type, behavior));
                    f.push(new Tile(j, i, "OPEN"));
                    //ghostId++;
                    break;

                case "GHOST2":
                    var behavior = 1; // every other ghost will be agressive
                    ghosts.push(new Tile(j, i, type, behavior));
                    f.push(new Tile(j, i, "OPEN"));
                    //ghostId++;
                    break;

                case "GHOST3":
                    var behavior = 0; // every other ghost will be agressive
                    ghosts.push(new Tile(j, i, type, behavior));
                    f.push(new Tile(j, i, "OPEN"));
                    //ghostId++;
                    break;

                case "BARRIER":
                    f.push(tile);
                    break;

                case "CHERRY":
                    cherry=tile;
                    endScore += 50; // worth 25 points
                    var behavior = 0; // every other ghost will be agressive
                    cherrys.push(new Tile(j, i, type, behavior));
                    f.push(new Tile(j, i, "OPEN"));
                    break;


                case "+25_FOOD":
                    endScore += 25; // worth 25 points
                    foodNum1++;
                    f.push(tile);
                    break;

                case "+15_FOOD":
                    endScore += 15; // worth 15 points
                    foodNum2++;
                    f.push(tile);
                    break;

                case "+5_FOOD":
                    endScore += 5; // worth 5 point
                    foodNum3++;
                    f.push(tile);
                    break;
            }
        }
    }
    return f;
}

function generate2() {
    field = generate();
    shuffledField = shuffleBalls(field);
    shuffledField2 = shufflePacman(shuffledField);

    for (var i = 0; i < shuffledField2.length; i++) {
        if (shuffledField2[i].type == "OPEN") {
            shuffledField2[i].type = "CHERRY";
            break;
        }
    }

    for (var j = 0; j < shuffledField2.length; j++) {
        if (shuffledField2[j].type == "OPEN") {
            if (ghostsNum==1) {
                shuffledField2[j].type = "GHOST1";
                ghostsNum--;
            }
            if (ghostsNum==2) {
                shuffledField2[j].type = "GHOST2";
                ghostsNum--;
            }
            if (ghostsNum==3) {
                shuffledField2[j].type = "GHOST3";
                ghostsNum--;
            }
        }
    }
    return shuffledField2;
}

//setInterval(draw,25);