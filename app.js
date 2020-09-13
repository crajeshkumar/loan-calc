//Event
document.querySelector('#loan-calculator').addEventListener('submit',(e)=>{
    document.querySelector('#loading').style.display = 'block';
    setTimeout(calculateResult,2000);
    e.preventDefault();
});

//Function for calculting Loan Amount
function calculateResult(e){
    //Values from form
    const amount=document.querySelector('#loan-amount').value;
    const interest=document.querySelector('#interest').value;
    const year=document.querySelector('#years').value;

    //Display part
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    //Converting into float for avoiding type errors
    const principle=parseFloat(amount);
    const calculatedInterest = parseFloat(interest) / 100 / 12;
    const calculatedPayment = parseFloat(year)*12;

    //Calculation process
    const x = Math.pow(1 + calculatedInterest , calculatedPayment);
    const monthlyCalculated = (principle * x * calculatedInterest) / ( x - 1 );

    document.querySelector('#loading').style.display = 'none';
    if(isFinite(monthlyCalculated)){
        monthlyPayment.value = monthlyCalculated.toFixed(2);
        totalPayment.value = (monthlyCalculated * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthlyCalculated * calculatedPayment) - principle).toFixed(2);

        document.querySelector('#results').style.display = 'block';
    }
    else{
        showError();
    }
    e.preventDefault();
}

//Error message PopUp
function showError(){
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    const newElement = document.createElement('div');
    newElement.className = 'alert alert-danger';
    newElement.appendChild(document.createTextNode('Please fill the form properly'));
    card.insertBefore(newElement , heading);
    const send = document.querySelector('.alert');
    //Set timer
    setTimeout((send)=>{document.querySelector('.alert').remove();},3000);
}