const express = require('express');

let PORT = 8001

const app = express();

app.use(express.json());

app.use(express.static(`server/public`));

let answerArray = []

function calculation(array){
    let num1 = Number(array.number1)
    let num2 = Number(array.number2)
    let operation = array.operation
    let answer =''
    if (operation === `+`){
        answer = num1+num2
    }
    else if (operation === `-`){
        answer = num1-num2
    }
    else if (operation === `*`){
        answer = num1*num2
    }
    else if (operation === `/`){
        answer = num1/num2
    }
    answerArray.push({
        num1: num1,
        num2: num2,
        operation: operation,
        answer: answer
    })
    console.log(answerArray)
}


app.get('/math', (req,res) => {
    console.log('Request for info made.')
    res.send(answerArray)
})


app.delete('/math', (req,res) => {
    console.log('Request for info made.')
    answerArray=[]
    res.send("Deletion made!")
})


app.post('/math', (req, res) => {
    console.log(req.body)
    calculation(req.body)
    res.sendStatus(201)
});



app.listen(PORT, function(){
    console.log(`Server is running at http://localhost:${PORT}`)
})