// const qns = [
//     {
//         q: 'What is the range of character data type in C language ?',
//         options: ['-128 to 255', '-127 to 128', '-128 to 127', '0 to 128'],
//         answer: 2
//     },

//     {
//         q: 'What is the range of int data type in C language ?',
//         options: ['-32768 to 32767', '-32767 to 32769', '-32780 to 32790', '0 to 65438'],
//         answer: 0
//     },

//     {
//         q: 'What is the memory bytes of double data type in C language ?',
//         options: ['4', '2', '10', '8'],
//         answer: 3
//     },

//     {
//         q: 'What is the memory bytes of float data type in C language ?',
//         options: ['8', '4', '2', '16'],
//         answer: 1
//     },  

//     {
//         q: 'What is the format specifier of long double data type in C language ?',
//         options: ['%Lf', '%f', '%llu', '%lu'],
//         answer: 0
//     },
// ]


//  axios.post('/request', {

    // arr:qns

//  })
//  .then((response) => {
//      console.log(response);
//  }, (error) => {
//      console.log(error);
//  });

let quizName;
let quizDuration;


let Questions = [];  // array to store all questions and its no.of options  ex. [ ["how r u "][2],["what's ur name"][2].... ]

let Options = [];  // array to store all options ex. [ ["red","blue"],["green","white"].... ]

let correctAnswers =[]; // array to store all Correct-option-number ex. [ "2","1","3",.... ]

let finalQuiz = [];   //final array of object to store all qn,options and correct option

let qns;    // number of quiz questions


function enableDivOne()
{
    document.querySelector(".div0").classList.add("hide");

    document.querySelector(".div1").classList.remove("hide");
    document.querySelector(".create-qn-btns").classList.remove("hide");
}

function validate()
{
    qns = document.forms["validation"]["no-of-qns"].value;

    quizName = document.forms["validation"]["quiz-name"].value;
    quizDuration = document.forms["validation"]["quiz-time"].value;

    // console.log('You have entered ' + qns +' as the count of qns');

    document.querySelector(".div1").classList.add("hide");
    document.querySelector(".div2").classList.remove("hide");

    qnValidation();
}


function qnValidation()
{
    for(let i=1;i<=qns;++i)
    {
       
        // const A = document.createElement('input');   //--
        // A.setAttribute('type','text');   //--

        const A = document.createElement('textarea');   // ++

        A.setAttribute('id',i);

        // A.setAttribute('rows',10);   // ++
        // A.setAttribute('cols',30);   // ++


        A.classList.add('form-control','mb-2','mt-2', 'mr-sm-2');
        A.setAttribute('name','qn'+i);
        A.setAttribute('placeholder','Enter the qn '+i);
        A.setAttribute('required','true');

        document.querySelector(".qn-container").append(A);  // till now added input element to enter qn

        const B = document.createElement('input');
        B.setAttribute('type','number');
        B.setAttribute('min','2');
        B.setAttribute('max','5');

        B.setAttribute('id','opt-qn-'+i);
        B.classList.add('form-control','mb-2','mt-2', 'mr-sm-2');

        B.setAttribute('name','opt-for-qn'+i);
        B.setAttribute('placeholder','Enter the no. of option for qn '+i);
        B.setAttribute('required','true');

        document.querySelector(".qn-container").append(B);  // till now added input element to enter qn and no.of option  


        var temp = document.createElement("br");
        document.getElementById ("qn-con").appendChild(temp);

    }    


    const C = document.createElement('input');
    C.setAttribute('type','submit');
    C.setAttribute('value','Submit');
    C.classList.add('btn','btn-success');

    document.querySelector(".qn-container").append(C);  
}


function storeQn()
{
    // console.log('Inside store qn function.............');

    for(let i=1;i<=qns;++i)
    {
        let qn = document.forms["qnValidation"]["qn"+i].value;
        let opt = document.forms["qnValidation"]["opt-for-qn"+i].value;

        Questions.push([qn,opt]);                
    }

    // console.log('Question Array is ',Questions);

    optionValidation();
}

function optionValidation()
{
    // console.log('Inside store option validation function.............');

    for(let i=1; i<=qns; ++i)
    {
        for(let j=1; j<=Questions[i-1][1]; ++j)
        {
            const A = document.createElement('input');
            A.setAttribute('type','text');
            A.setAttribute('id',i);
            A.classList.add('form-control','mb-2','mt-2', 'mr-sm-2');
            A.setAttribute('name',i);
            A.setAttribute('placeholder','Enter option '+j+' of qn '+i);
            A.setAttribute('required','true');

            document.querySelector(".option-container").append(A);  // till now added input element to enter all options

        }

        const B = document.createElement('input');
        B.setAttribute('type','number');
        B.setAttribute('id','CorrectOpt');
        B.classList.add('form-control','mb-2','mt-2', 'mr-sm-2');
        B.setAttribute('name',i);
        B.setAttribute('min',0);    //---------------------
        B.setAttribute('max',Questions[i-1][1]-1);  //-----------------
        B.setAttribute('placeholder','Enter correct option number of qn '+i);
        B.setAttribute('required','true');

        document.querySelector(".option-container").append(B);

        var temp = document.createElement("br");
        document.querySelector(".option-container").appendChild(temp);
    }

    const C = document.createElement('input');
    C.setAttribute('type','submit');
    C.setAttribute('value','Submit');
    C.classList.add('btn','btn-success');
    C.classList.add('mb-2','mt-2','mr-2'); //----------------------------------------------------

    document.querySelector(".option-container").append(C);


}

function storeOption()
{
    // console.log('Inside store option function.............');

    let formElements = document.forms["Options"].getElementsByTagName("input").length;

    // console.log('formelements value is ',formElements);

    for(let i=0;i<qns;++i)
    {
        Options.push([]);
    }

    for(let i=0;i<formElements-1;++i)
    {
        let temp = document.forms["Options"][i].id;

        if(temp == "CorrectOpt") correctAnswers.push(document.forms["Options"][i].value);   //pushing correctoption into correctAnswers array

        else Options[temp-1].push(document.forms["Options"][i].value); //pushing Options into Options array

    }

//    console.log('Options Array is ',Options); 
   
//    console.log('correctAnswers Array is ',correctAnswers); 

   finalArrObj();
}

function finalArrObj()
{
//    console.log('Inside final obj array function..'); 

    for(let i=0;i<qns;++i)
    {      
        var object1 =   {};

        object1["q"] = Questions[i][0];
        object1["options"] = Options[i];
        object1["answer"] = correctAnswers[i];
        object1["qzName"] = quizName;
        object1["quizTiming"] = quizDuration;

        finalQuiz.push(object1);

    }        

//    console.log('finalQuiz Array of obj is inside admin.js file ',finalQuiz); 

   requestToServer();
}

function requestToServer(){

    axios.post('/request', {

       arr:finalQuiz,
       quizname : quizName

    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });

    window.location = '/admin';
}