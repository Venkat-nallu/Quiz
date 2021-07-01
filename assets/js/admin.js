

//  axios.post("url", {name: "data"}).then(function (response) {
//     console.log(response)
// })


axios.post('/request', {
    name:"vks"
})
.then((response) => {
    console.log(response);
}, (error) => {
    console.log(error);
});

// let Questions = [];  // array to store all questions and its no.of options  ex. [ ["how r u "][2],["what's ur name"][2].... ]

// let Options = [];  // array to store all options ex. [ ["red","blue"],["green","white"].... ]

// let correctAnswers =[]; // array to store all Correct-option-number ex. [ "2","1","3",.... ]

// let finalQuiz = [];   //final array of object to store all qn,options and correct option

// let qns;    // number of quiz questions

// function validate()
// {
//     qns = document.forms["validation"]["no-of-qns"].value;
//     console.log('You have entered ' + qns +' as the count of qns');

//     document.querySelector(".div1").classList.add("hide");
//     document.querySelector(".div2").classList.remove("hide");

//     qnValidation();
// }


// function qnValidation()
// {
//     for(let i=1;i<=qns;++i)
//     {
       
//         const A = document.createElement('input');
//         A.setAttribute('type','text');
//         A.setAttribute('id',i);
//         A.classList.add('form-control','mb-2','mt-2', 'mr-sm-2');
//         A.setAttribute('name','qn'+i);
//         A.setAttribute('placeholder','Enter the qn '+i);
//         A.setAttribute('required','true');

//         document.querySelector(".qn-container").append(A);  // till now added input element to enter qn

//         const B = document.createElement('input');
//         B.setAttribute('type','number');
//         B.setAttribute('min','2');
//         B.setAttribute('max','5');

//         B.setAttribute('id','opt-qn-'+i);
//         B.classList.add('form-control','mb-2','mt-2', 'mr-sm-2');

//         B.setAttribute('name','opt-for-qn'+i);
//         B.setAttribute('placeholder','Enter the no. of option for qn '+i);
//         B.setAttribute('required','true');

//         document.querySelector(".qn-container").append(B);  // till now added input element to enter qn and no.of option  

//     }    

//     const C = document.createElement('input');
//     C.setAttribute('type','submit');
//     C.setAttribute('value','Submit');
//     C.classList.add('btn','btn-success');

//     document.querySelector(".qn-container").append(C);  
// }


// function storeQn()
// {
//     console.log('Inside store qn function.............');

//     for(let i=1;i<=qns;++i)
//     {
//         let qn = document.forms["qnValidation"]["qn"+i].value;
//         let opt = document.forms["qnValidation"]["opt-for-qn"+i].value;

//         Questions.push([qn,opt]);                
//     }

//     console.log('Question Array is ',Questions);

//     optionValidation();
// }

// function optionValidation()
// {
//     console.log('Inside store option validation function.............');

//     for(let i=1; i<=qns; ++i)
//     {
//         for(let j=1; j<=Questions[i-1][1]; ++j)
//         {
//             const A = document.createElement('input');
//             A.setAttribute('type','text');
//             A.setAttribute('id',i);
//             A.classList.add('form-control','mb-2','mt-2', 'mr-sm-2');
//             A.setAttribute('name',i);
//             A.setAttribute('placeholder','Enter option '+j+' of qn '+i);
//             A.setAttribute('required','true');

//             document.querySelector(".option-container").append(A);  // till now added input element to enter all options

//         }

//         const B = document.createElement('input');
//         B.setAttribute('type','number');
//         B.setAttribute('id','CorrectOpt');
//         B.classList.add('form-control','mb-2','mt-2', 'mr-sm-2');
//         B.setAttribute('name',i);
//         B.setAttribute('min',1);
//         B.setAttribute('max',Questions[i-1][1]);
//         B.setAttribute('placeholder','Enter correct option number of qn '+i);
//         B.setAttribute('required','true');

//         document.querySelector(".option-container").append(B);
//     }

//     const C = document.createElement('input');
//     C.setAttribute('type','submit');
//     C.setAttribute('value','Submit');
//     C.classList.add('btn','btn-success');

//     document.querySelector(".option-container").append(C);


// }

// function storeOption()
// {
//     console.log('Inside store option function.............');

//     let formElements = document.forms["Options"].getElementsByTagName("input").length;

//     console.log('formelements value is ',formElements);

//     for(let i=0;i<qns;++i)
//     {
//         Options.push([]);
//     }

//     for(let i=0;i<formElements-1;++i)
//     {
//         let temp = document.forms["Options"][i].id;

//         if(temp == "CorrectOpt") correctAnswers.push(document.forms["Options"][i].value);   //pushing correctoption into correctAnswers array

//         else Options[temp-1].push(document.forms["Options"][i].value); //pushing Options into Options array

//     }

//    console.log('Options Array is ',Options); 
   
//    console.log('correctAnswers Array is ',correctAnswers); 

//    finalArrObj();
// }

// function finalArrObj()
// {
//    console.log('Inside final obj array function..'); 

//     for(let i=0;i<qns;++i)
//     {      
//         var object1 =   {};

//         object1["q"] = Questions[i][0];
//         object1["options"] = Options[i];
//         object1["answer"] = correctAnswers[i];

//         finalQuiz.push(object1);

//     }        

//    console.log('finalQuiz Array of obj is ',finalQuiz); 

//    requestToServer();
// }

// function requestToServer(){

//     axios.post('/request', {

//         firstName: 'Finn',
//         lastName: 'Williams'

//     })
//     .then((response) => {
//         console.log(response);
//     }, (error) => {
//         console.log(error);
//     });
// }