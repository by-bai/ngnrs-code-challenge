const form = document.getElementById('form'); 
const address = document.getElementById('input-address');
const bitcoin = document.getElementById('input-amount');
const otp = document.getElementById('input-otp');

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    inputValidation(); // call function for input validation 

    submitSuccess(); 
}); 

function inputValidation(){
    const addressValue = address.value.trim();
    const bitcoinValue = bitcoin.value.trim(); 
    const otpValue = otp.value.trim();

    // addressValue
    if(addressValue === ''){
        setErrorFor(address, 'Address cannot be blank');
        
    } else if (!isAddress(addressValue)){
        setErrorFor(address, 'Address is invalid');
    
    } else if (!isAlphanumeric(addressValue)){
        setErrorFor(address, 'Address is invalid'); 

    } else if(addressValue.length < 26){
        setErrorFor(address, 'Address is invalid'); 

    } else {
        setSuccessFor(address);

    }

    // bitcoinValue
    if(bitcoinValue === ''){
        setErrorFor(bitcoin, 'Amount cannot be blank');
    } else if (!isBitcoin(bitcoinValue)) {
        setErrorFor(bitcoin, 'Amount must contain numbers only'); 
    } else if ((Math.sign(bitcoinValue) == '-1') || (Math.sign(bitcoinValue == '0'))){
        setErrorFor(bitcoin, 'Amount must be positive'); 

    } else {
        setSuccessFor(bitcoin);
  
    }

    // otpValue
    if(otpValue === ''){
        setErrorFor(otp, 'OTP cannot be blank');

    } else if (!isNumber(otpValue)) {
        setErrorFor(otp, 'OTP must contain numbers only');
        
    } else if(otpValue.length !== 6){
        setErrorFor(otp, 'OTP must be 6 digits');
    } else {
        setSuccessFor(otp);
     
    }
    
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // add error message 
    small.innerText = message;

    // add error class
    formControl.className = 'form-control error'; 
}

function setSuccessFor(input){
    const formControl = input.parentElement;

    // add success class
    formControl.className = 'form-control success'; 
}

// checking OTP: digits only
function isNumber(input) { 
	return /^\d+$/.test(input);
}

// checking Address: starts with 1, 3 or bc1 
function isAddress(input){
    if ((input.charAt(0) == '1') || (input.charAt(0) == '3') || (input.substring(0,3) == 'bc1')){
        return true; 
    }
}

// checking Address: alphanumeric 
function isAlphanumeric(input){
    return /^[a-z0-9]+$/i.test(input); 
}

// checking Bitcoin: digits including float
function isBitcoin(input){
    return /[0-9]*\.?[0-9]+/.test(input); 
}

function submitSuccess(){
    var arr = document.getElementsByClassName('form-control success');
    if(arr.length == 3){
        Swal.fire(
            'Success!', 
            'Your transaction is complete!',
            'success'); 
    }
} 