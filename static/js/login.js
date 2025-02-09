'use strict';

import { loginuser } from "./apiFunctios.js";

const loginForm=document.getElementById('login-form')
const emailInput=document.getElementById('email')
const passwordInput=document.getElementById('password')
const emailerror=document.getElementById('email-err')
const passwordError=document.getElementById('pass-err')

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
loginForm.addEventListener('submit',async(e) => {
    e.preventDefault();
    let formIsValid = true;
    if(!emailInput.value){
        emailerror.classList.remove('hidden')
        formIsValid=false;
        return;
    }else if(emailInput.value||!emailPattern.test(emailInput.value)){
        emailerror.classList.add('hidden')
        formIsValid=true;
    }
    if(!passwordInput.value){
        passwordError.classList.remove('hidden')
        formIsValid=false;
        return;
    }else if(passwordInput.value){
        passwordError.classList.add('hidden')
        formIsValid=true;
    }
    if(formIsValid){
        const loginValues={
            email: emailInput.value,
            password: passwordInput.value
        }

            
        const result=await loginuser(loginValues)
        console.log(result)
    }
});