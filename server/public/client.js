function onReady() {
    console.log('Javascript works!');
}

let num1 = 0
let num2 = 0
let operation = ''
let count = 0

function operator(event, type){
    event.preventDefault();
    operation = type
    console.log(`${type} clicked`)
}

function clearEntries(event){
    event.preventDefault()
    console.log('Clearing all Entries!')
    document.getElementById('number1').value = ''
    document.getElementById('number2').value = ''
    operation=''
}

function runCalculation(event){
    event.preventDefault()
    num1 = document.getElementById('number1').value 
    num2 = document.getElementById('number2').value 
    axios({
        method: 'POST',
        url: '/math',
        data: {
            "number1": num1,
            "number2": num2,
            "operation": operation
        }
      }).then(function(response) {
          console.log("SUCCESS!!!");
    })

    axios({
        method: 'GET',
        url: '/math',
      }).then(function(response) {
          console.log(response.data);
          renderContent(response.data)
    })
}


function renderContent(object){
    document.getElementById('answer').innerHTML = object[count].answer

    let format = `<li>${object[count].text} = ${object[count].answer}</li>`
    document.getElementById('content').innerHTML += format
    
    count++
}

onReady();