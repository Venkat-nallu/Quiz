// const QuestionSchema = require('../models/question');

const QuestionSchema = require('../config/mongoose1');

var finalQuizGlobal = [];

module.exports.qns = function(req, res){
      
    QuestionSchema.insertMany(req.body.arr, function (err, temp) {

        if (err) {
            //console.log(err);
            // terminate request/response cycle
            return res.send('Error saving');
        }
   
        else 
        {
              console.log('\n\nSuccessfully added the arr of obj into db\n\n');
        }
    });
};

module.exports.returningQuizFromDb = (req,res)=> {

    //req.body.quizName has name of quiz clicked by user from list of quiz in available_quiz.ejs file

    // const quizNameClickedByUser = req.body.nameOfQuiz;

    // console.log('\nQuiz name clicked by user = ',quizNameClickedByUser);


    QuestionSchema.find({qzName:req.body.nameOfQuiz},function(err,allDetailsOfQuiz)
    {
        if(err)
        {
            //console.log(err);
        } 
        else
        {
            finalQuizGlobal = allDetailsOfQuiz;
            //console.log('\n\n\nAll retrivedquiz quiz details suggested by user is ',allDetailsOfQuiz);
        }

        var revert = {redirect:'/quiz',FinalQuizArray:allDetailsOfQuiz};

        return res.json(revert);
    });
};

module.exports.deletingQuizFromDb = (req,res)=> {

    // const quizNameClickedByUser = req.body.nameOfQuiz;

    // console.log('\nQuiz name clicked by user = ',quizNameClickedByUser);

    QuestionSchema.remove({qzName:req.body.nameOfQuiz},function(err,deletedQuiz)
    {
        if(err)
        {
            //console.log(err);
        } 
        else
        {
            //console.log('\n\nSuccessfully deleted quiz -- ',deletedQuiz);
        }

        var revert = {redirect:'/admin'};

        return res.json(revert);

    });
};


module.exports.quizPage = (req,res)=>{

    // console.log('\n\n\nQuiz details -- checking inside quiz router  is ',finalQuizGlobal);

        if ( req.isAuthenticated() )
        {
            return res.render('quiz', {
                title: "E-Quiz",
                quiz: finalQuizGlobal
            });     

        }

        return res.redirect('/');
}
