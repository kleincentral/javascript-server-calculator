function onReady() {
    console.log('Javascript works!');
}

let num1 = ''
let num2 = ''
let operation = ''
let firstHalf = true

function operator(event, type, trueFalse){
    event.preventDefault();
    operation = type
    firstHalf = false
    if (trueFalse) {
        document.getElementById('userScreen').value += operation
    }
    console.log(`${type} clicked`)
}

function clearEntries(event){
    event.preventDefault()
    console.log('Clearing all Entries!')
    document.getElementById('userScreen').value = ''
    num1 = ''
    num2 = ''
    operation = ''
    firstHalf = true
}

function number(event, number, trueFalse){
    event.preventDefault()
    if (firstHalf){
        num1+=number
    }
    else {
        num2+=number
    }
    if (trueFalse) {
        document.getElementById('userScreen').value += number
    }
    console.log(number, 'pressed.', num1, 'total')
}

function runCalculation(event){
    event.preventDefault();
    // num1 = document.getElementById('userScreen').value 
    // num2 = document.getElementById('number2').value 
    if (num1 === '' || num2 === '' || operation === ''){
        return
    }
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

    renderContent()
}


function renderContent(){
    let object = []
    axios({
        method: 'GET',
        url: '/math',
      }).then(function(response) {
          console.log(response.data);
          object = response.data
          document.getElementById('content').innerHTML = ''
          document.getElementById('answer').innerHTML = ''
          if (object.length > 0){
            for(let i=0; i<object.length;i++) {
                document.getElementById('answer').innerHTML = object[i].answer
                let format = `<li onclick="clearEntries(event), number(event, '${object[i].num1}', false), operator(event, '${object[i].operation}', false), number(event, '${object[i].num2}', false), setTimeout(runCalculation(event), 1000), clearEntries(event)">${object[i].num1} ${object[i].operation} ${object[i].num2}</li>`
                document.getElementById('content').innerHTML += format
            }
        }
    })
    console.log(object.length)
}

function callDeletion(){
    axios({
        method: 'DELETE',
        url: '/math',
      }).then(function(response) {
          console.log(response.data)
    })
    renderContent()
}

onReady();
renderContent();