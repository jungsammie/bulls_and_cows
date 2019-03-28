$( document ).ready(function() {

    $(function () {
        $('[data-toggle="popover"]').popover();
    });

    $("#resetBtn").click(function() {
        location.reload();
    });
});

function startGame() {
    $("#startBtn").prop("disabled", true);
    var count = 0;

    resetDigits();
    var generatedRand = gameStart();
    timer = self.setInterval(function countUp() {
        count++;
        var min = Math.floor(count / 60);
        $("#min").html (twoDigits(min));
        $("#sec").html(twoDigits(count - (60 * min)));
    }, 1000);    

    $( "#setNum" ).click(function() {
        userInput = getUserInput();
        if(userInput == -1) {
            alert("Cannot input same digit! Please input new digits.");
        }
        else {
            var result = compareDigits(generatedRand, userInput);
            if(result == 1) {
                if (confirm('You Win!!! ')) {
                    location.reload();
                }
            }
        }
    });
}

function twoDigits(number) {
    return (number < 10 ? '0' : '') + number;
}

function gameStart() {
    var generatedRand = 0, userInput = 0;
    generatedRand = getRandNum();
    //console.log(generatedRand);
    return generatedRand;
}

function getRandNum() {
    var min = 112; 
    var max= 9999;  
    var randNum = 0;

    while(true) {
        randNum = Math.floor(Math.random() * (max - min)) + min; 
        
        var randNumStr = randNum.toString();
        if(randNumStr.length == 3) {
            randNumStr = "0" + randNumStr;
        }
        var randNumArr = randNumStr.split("");
        //console.log(randNumArr[0]+randNumArr[1]+randNumArr[2]+randNumArr[3]);

        if(!(randNumArr[0] === randNumArr[1] || randNumArr[0]===randNumStr[2] || randNumArr[0]===randNumArr[3] 
        || randNumArr[1]===randNumArr[2] || randNumArr[1]===randNumArr[3] || randNumArr[2]===randNumArr[3])) {
            break;
        }
    }
    return randNumStr;
}

function getUserInput() {
    var userInput = $('#firstDigit').val() + $('#secondDigit').val() + $('#thirdDigit').val() + $('#fourthDigit').val();
    userInput = userInput.split("");
    if(checkValidation(userInput)) {
        return userInput;
    } 
    else {
        return -1;
    }
}

function checkValidation(userInput) {
    if((userInput[0] === userInput[1] || userInput[0]===userInput[2] || userInput[0]===userInput[3] 
        || userInput[1]===userInput[2] || userInput[1]===userInput[3] || userInput[2]===userInput[3])) {
            return false;
    }
    else
        return true;
}

function compareDigits(randNum, userInput) {
    var bulls = 0;
    var cows = 0;
    for(var i = 0 ; i < randNum.length ; i++) {
        for(var j = 0; j < userInput.length ; j++) {
            if(randNum[i] === userInput[j]) {
                console.log(i+":"+j);
                if(i == j) {
                    bulls++;
                }
                else {
                    cows++;
                }
            } 
        }
    }

    if(bulls == 4) {

        return 1;
    }
    else {
        $('#userNum').append('<li>'+userInput[0]+userInput[1]+userInput[2]+userInput[3]+'</li>');
        $('#userResult').append('<li>'+bulls+"B "+cows+"C"+'</li>');

        //Keep the scroll bar at the bottom of the page
        var messageBody = document.querySelector('#historyBoard');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

        return -1;
    }
}

function resetDigits() {
    $('#firstDigit').val(0);
    $('#secondDigit').val(0);
    $('#thirdDigit').val(0);
    $('#fourthDigit').val(0);
    $('#userNum').empty();
    $('#userResult').empty();
    $('#result').empty();
}