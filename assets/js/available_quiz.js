
 // console.log('quizarray checking ',allQuiz);

 var quizArr = <%- JSON.stringify(allQuiz) %>;

 function redir(ele)
 {
     // console.log('checking div...',quizArr[ ele.id ]);

     // window.location.reload();


     axios.post('/quiz-action', {

         nameOfQuiz:quizArr[ ele.id ]

         })
         .then((response) => 
         {

             console.log(response.data.FinalQuizArray);

         }, 
         (error) => 
         {
             console.log(error);
         });
     
 }
