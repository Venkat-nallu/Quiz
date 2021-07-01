// Adding questions and options for the quiz

// Array of object

const quiz = [
    {
        q: 'What is the range of character data type in C language ?',
        options: ['-128 to 255', '-127 to 128', '-128 to 127', '0 to 128'],
        answer: 2
    },

    {
        q: 'What is the range of int data type in C language ?',
        options: ['-32768 to 32767', '-32767 to 32769', '-32780 to 32790', '0 to 65438'],
        answer: 0
    },

    {
        q: 'What is the memory bytes of double data type in C language ?',
        options: ['4', '2', '10', '8'],
        answer: 3
    },

    {
        q: 'What is the memory bytes of float data type in C language ?',
        options: ['8', '4', '2', '16'],
        answer: 1
    },  

    {
        q: 'What is the format specifier of long double data type in C language ?',
        options: ['%Lf', '%f', '%llu', '%lu'],
        answer: 0
    },
]


const quizTiming = 1;  // 1 minute
