const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");

const homeBox1 = document.querySelector(".home-box-1")
const homeBox2 = document.querySelector(".home-box-2");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

const Review = document.querySelector(".review-container")

const quizTiming = 1;   //----------------------------------------------------------------------------------------------

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];  // array to store all questions and its options from 'quiz' object
let availableOptions = [];   // array to store all options for the particular question

let optionsEnteredByUser = [];  // to store the option number entered by user

let correctAnswers = 0;
let attempt = 0;

let userName = "";         

var mins;
var secs;
var globalTimeoutEnd;

var minsRemaining,minsTaken;
var secsRemaining,secsTaken;

var flag=1;                  // to indicate the time taken(if takes more than given time then flag it to 0)


        // ------------------- T I M E R     S T A R T ----------------------------

//time up alert div
 function hideAlertDiv()
 {
    document.querySelector(".alert-box").classList.add('hide');
 }

 function Decrement() 
 { 
    //  mins,secs declared globally

     if (document.getElementById) 
     { 
         minutes = document.getElementById("minutes");      // all divs and <input> are created in getnextQuestion()
         seconds = document.getElementById("seconds"); 

         //if less than a minute remaining 
         //Display only seconds value. 
         if (seconds < 59) 
         { 
             seconds.value = secs; 
         } 

         //Display both minutes and seconds 
         //getminutes and getseconds is used to 
         //get minutes and seconds 
         else 
         { 
             minutes.value = getminutes();  
             seconds.value = getseconds(); 
         } 

         //when less than a minute remaining 
         //colour of the minutes and seconds 
         //changes to red 

         if (minutes.value <= 0 && seconds.value <= 10) 
         { 
             minutes.style.color = "red"; 
             seconds.style.color = "red"; 
         } 

         //if seconds becomes zero, 
         //then page alerts time up 
         if (mins < 0 ) 
         { 
             minutes.value = 0; 
             seconds.value = 0; 

             document.querySelector(".alert-box").classList.remove('hide');
             setTimeout(hideAlertDiv,1500);
                        
             flag = 0;
             minsTaken = quizTiming;
             secsTaken = 0 ;

             clearInterval(globalTimeoutEnd);

             quizBox.classList.add("hide");
             resultBox.classList.remove("hide"); 

             quizResult();
         } 

         //if seconds > 0 then seconds is decremented 
         else { 
             secs--;            
         } 
     } 

     function getminutes() 
     { 
        //minutes is seconds divided by 60, rounded down 
        mins = Math.floor(secs / 60); 
        return mins; 
     } 

    function getseconds() 
     { 
        //take minutes remaining (as seconds) away  
        //from total seconds remaining 
        return secs - Math.round(mins * 60); 
     } 
 } 


// ------------------------------------------------------------------------------------

function timer()
{
    mins = quizTiming;   // quizTiming is declared  in question.js file
    secs = mins * 60;     
    globalTimeoutEnd = setInterval(Decrement,1000);
}

// --------------------------------T I M E R  E N D -----------------------------------------------------------------


// Function to push all questions+options(a object)  into an array

function setAvailableQuestions() 
{
    const totalQuestion = quiz.length;

    for(let i = 0;i<totalQuestion;++i)
    {
        availableQuestions.push(quiz[i]);
    } 

}


// For displaying the question number,actual question and options

function getNewQuestion() 
{

    //  displaying the "question number"

    document.querySelector(".question-number").innerHTML=" ";

    const opt = document.createElement("div");      
    opt.innerHTML = "Question " + (questionCounter+1) + " of " + quiz.length;
    questionNumber.append(opt);

                //--------------- creating 3 input elements for mins,:,secs inside div


    const opt1 = document.createElement("div");
    opt1.id = "timer-div";

    const opt2 = document.createElement("input");
    opt2.id = "minutes";
    opt2.type = Text;
    opt2.setAttribute("disabled","true");
    opt1.append(opt2);

    const opt3 = document.createElement("input");
    opt3.id = "colon";
    opt3.value = ":"
    opt3.type=Text;
    opt3.setAttribute("disabled","true");
    opt1.append(opt3);

    const opt4 = document.createElement("input");
    opt4.id = "seconds";
    opt4.setAttribute("disabled","true");
    opt4.type = Text;
    opt1.append(opt4);

    questionNumber.append(opt1);            // appending the created div for displaying timer
    

    // displaying the "actual question" using rand() function

    const questionIndex = availableQuestions[Math.floor(Math.random()*availableQuestions.length)];

    currentQuestion = questionIndex;

    questionText.innerHTML = currentQuestion.q;

        // get the index of 'currentQuestion' from the availabeQuestions Array and removing it from Array to avoid repetition

    const index1  = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1); // removing from array

    // -----------------------------------------for review page -----------------------------------------------------------
    const ref  = quiz.indexOf(questionIndex);


    optionsEnteredByUser.push({"qn-no":ref,"opt":undefined});  

    // ------------------------------------------for review page -----------------------------------------------------------

    // displaying the options 

    document.querySelector(".option-container").innerHTML=" ";   // to avoid repetiton of options

    let animationDelay = 0.15;                                 
    const optionLen = currentQuestion.options.length;

    for(let i=0;i<optionLen;++i)
    {
        availableOptions.push(i);  // filling 'availableOptions' Array till number of options for a particualr qn to generate id's
    }

    for(let i=0;i<optionLen;++i)
    {
        const optionIndex = availableOptions[Math.floor(Math.random()*availableOptions.length)];
        index2 =  availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];        
        option.id = optionIndex;
        option.className = "option";

        option.style.animationDelay = animationDelay + 's';
        animationDelay += 0.10;                                              

        optionContainer.appendChild(option);      

        option.setAttribute("onclick","checkResult(this)");
    }

    ++questionCounter;
}

function checkResult(element)
{
    const id = parseInt(element.id);       // bcz id is string, here it is converted to number
    element.classList.add("clicked-answer");  

    // adding user clicked option's qn and it's id to optionsEnteredByUser[]; ------------------------------------

    optionsEnteredByUser[questionCounter-1].opt = id;

    if(id == currentQuestion.answer)
    {
        ++correctAnswers;
    }
    // else
    // {
    //     console.log("Wrong answer");
    // }

    ++attempt;

    restrictOptions();
}

function restrictOptions()
{
    const optionLen = optionContainer.children.length;

    for(var i=0;i<optionLen;++i)
    {
        optionContainer.children[i].classList.add("already-answered");
    }
}

// function to display next question and its options when 'next' button is clicked

function next()
{
    if(questionCounter === quiz.length) // base case for count of qns
    {
        minsRemaining = minutes.value;
        secsRemaining = seconds.value;

        console.log("quiz over");
        quizOver(); 
    }
    else
    {
        getNewQuestion();
    }
}

function quizOver()
{

    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");

    minsTaken = (quizTiming - 1) - minsRemaining;
    secsTaken = 60 - secsRemaining;

    quizResult();
}

                            // Updating all value to the report card

function quizResult()
{
    clearInterval(globalTimeoutEnd);      
    
    document.querySelector(".name-of-user").innerHTML = userName;  // updating username in the table
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;

    const percentage = (correctAnswers/quiz.length)*100;
    
    resultBox.querySelector(".total-timegiven").innerHTML = quizTiming + " minute";

    if(flag ==1 )   //indicates that timetaken is less than quiz timing
        resultBox.querySelector(".total-timetaken").innerHTML = minsTaken +" minute and "+secsTaken + " seconds";
    else
        resultBox.querySelector(".total-timetaken").innerHTML = "more than " + quizTiming +" minute";

    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / "+ quiz.length;
    
}


function review()
{
    resultBox.classList.add("hide");
    document.getElementById("review").classList.remove("hide");

    document.querySelector(".review-container").innerHTML=" ";
    
    for(let i =0;i<quiz.length;++i)
    {
        const headDiv = document.createElement('div');

        const li1 = document.createElement('li');
        li1.classList.add("list-group-item");


        const span1 = document.createElement('span');
        span1.classList.add("badge","badge-primary");
        span1.innerHTML = "Question - "+(i+1);

        span1.classList.add("spn-space");

        let qn = optionsEnteredByUser[i]["qn-no"]; //qn is the position of question that present in the quiz-site.js file
        let op = optionsEnteredByUser[i]["opt"];    //op is the option clicked by user

        const span2 = document.createElement('span');
        span2.innerText = quiz[qn].q;

        li1.appendChild(span1);
        li1.appendChild(span2);

        headDiv.appendChild(li1);       //till now added list1 of Qn1 into div


        const li2 = document.createElement('li');
        li2.classList.add("list-group-item");

        const span3 = document.createElement('span');
        span3.classList.add("badge","badge-primary");  
        span3.innerHTML = "Your answer";
        span3.classList.add("spn-space");

        const span4 = document.createElement('span');

        const span5 = document.createElement('span');

        // ------------testing

        // console.log("testing optionsEnteredByUser[] ==> ",optionsEnteredByUser);

        if(op == undefined)
        {
            span4.classList.add("badge","badge-danger","badge-pill");
            span4.innerHTML = "Not answered";
            span4.classList.add("spn-space");
        }

        else if (quiz[qn]["answer"] == op)
        {
            span4.innerText = quiz[qn].options[op];

            span5.classList.add("badge","badge-success","badge-pill");        
            span5.innerHTML = "Correct";
            span5.classList.add("spn-space");

        }

        else
        {
            span4.innerText = quiz[qn].options[op];
            
            span5.classList.add("badge","badge-danger","badge-pill");        
            span5.innerHTML = "Wrong";
            span5.classList.add("spn-space");
        }

        li2.appendChild(span3);
        li2.appendChild(span4);
        li2.appendChild(span5);

        headDiv.appendChild(li2);   // till now added 2nd list item


        const li3 = document.createElement('li');
        li3.classList.add("list-group-item");

        const span6 = document.createElement('span');
        span6.classList.add("badge","badge-primary");      
        span6.innerHTML = "Correct answer";
        span6.classList.add("spn-space");

        const span7 = document.createElement('span');
        let temp = quiz[qn].answer;
        span7.innerText =  quiz[qn].options[temp];

        li3.appendChild(span6);
        li3.appendChild(span7);

        headDiv.appendChild(li3);  // added all 3 list items

        
        Review.appendChild(headDiv);

        Review.appendChild(document.createElement('br'));       

    }
 
}

function previousPage()
{
    document.getElementById("review").classList.add("hide");
    resultBox.classList.remove("hide");
}

function resetQuiz()
{    
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0; 
    flag = 1;  
    qnNo = -1;
    optionsEnteredByUser = [] 
}



function tryAgainQuiz()
{
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");

    resetQuiz();    
    startQuiz();   
}

function hideHomeAlertDiv()
{
    document.querySelector(".alert-Homebox").classList.add('hide');
}

function validation()
{
    var name = document.forms["name-validation"]["user-name"].value;

    if(name == "")
    {  
        document.querySelector(".alert-homeBox").classList.remove('hide');  
        setTimeout(hideHomeAlertDiv,1000);     
    }
    else
    {          
        userName = name;
        goToInstructionPage();
    }
}


function goToInstructionPage()
{
    homeBox1.classList.add("hide");
    homeBox2.classList.remove("hide");
}


function goToHome()
{  
    resetQuiz();    
    resultBox.classList.add("hide");

    document.forms["name-validation"]["user-name"].value = "";

    homeBox1.classList.remove("hide");
} 

                                //  STARTING POINT.......................    

function startQuiz()
{
    timer();

    homeBox2.classList.add("hide");
    quizBox.classList.remove("hide");

    setAvailableQuestions();
    getNewQuestion();
}


// ------------------For hiding 3 buttons when report card downloading---------------------

function DisplayThisDiv()
{
    document.getElementById("result-page-buttons").classList.remove("hide");
    // goToHome();
}

function hideThisDiv()
{
    document.getElementById("result-page-buttons").classList.add("hide");
    setTimeout(DisplayThisDiv,500);
}


// ---------------------- For downloading report card -------------------

window.onload = function () 
{
    homeBox2.querySelector(".total-question").innerHTML = quiz.length;
    homeBox2.querySelector(".quiz-timing").innerHTML = quizTiming;


    document.getElementById("download").addEventListener("click", () => {

            const reportCard = this.document.getElementById("result-box-id");
            console.log(reportCard);
            console.log(window);

            var opt = 
            {
                margin: 1,
                filename: 'MyReportCard.pdf',
                image: { type: 'jpeg', quality: 0.99},
                html2canvas: { scale: 10},
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            html2pdf().from(reportCard).set(opt).save();
        })
} 