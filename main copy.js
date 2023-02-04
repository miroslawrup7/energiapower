// contact form validation

const nameLoc = document.querySelector("#name");
const mailLoc = document.querySelector("#mail");
const subjectLoc = document.querySelector("#subject");
const messageLoc = document.querySelector("#message");

const nameErrLoc = document.querySelector("#name_error");
const mailErrLoc = document.querySelector("#mail_error");
const mailErrLoc2 = document.querySelector("#mail_error2");
const subjectErrLoc = document.querySelector("#subject_error");
const messageErrLoc = document.querySelector("#message_error");

const buttonLoc = document.querySelector("button");

const formLoc = document.querySelector("#contact-form");

let validationPass = true;
let validateFromSendBtn = false;

const validateEmpty = (e) => {
    input = e.target;
    validateEmptyAll(input);
};

const validateEmptyAll = (input) => {
    if (input.value.length === 0) {
        if (validateFromSendBtn) {
            input.nextElementSibling.classList.add("active");
            validationPass = false;
            if (input.id === "mail") {
                mailErrLoc2.classList.remove("active");
            }
            input.classList.add("error");
        }
        
    } else {
        input.nextElementSibling.classList.remove("active");
        input.classList.remove("error");
    }
};

const validateAll = (e) => {
    validateFromSendBtn = true;
    validationPass = true;
    e.preventDefault();

    validateEmptyAll(nameLoc);
    validateEmptyAll(mailLoc);
    validateEmptyAll(subjectLoc);
    validateEmptyAll(messageLoc);

    validateEmailAll(mailLoc);

    validateFromSendBtn = false;

    if (validationPass) {
        console.log("Walidacja prawidłowa! :)");
        
        const formData = new FormData(formLoc);

        console.log(formData)
        
        const url = formLoc.getAttribute("action");
        const method = formLoc.getAttribute("method");

        console.log(url)
        console.log(method)
        
        fetch(url, {
            method: method.toUpperCase(),
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.errors) { //błędne pola
                // const selectors = res.errors.map(el => `[name="${el}"]`);
                // const fieldsWithErrors = form.querySelectorAll(selectors.join(","));
                // for (const el of fieldsWithErrors) {
                //     markFieldAsError(el, true);
                //     toggleErrorField(el, true);
                // }
                console.log("errors")
            } else { //pola są ok - sprawdzamy status wysyłki
                if (res.status === "ok") {
                    //wyświetlamy komunikat powodzenia, cieszymy sie
                    console.log("status OK")
                }
                if (res.status === "error") {
                    //komunikat błędu, niepowodzenia
                    console.log("status ERROR")
                }
            }
        })
        .catch((err) => {
            // buttonLoc.disabled = false;
            // submit.classList.remove("loading");
            console.log(err)
        })
        


    } else {
        console.log("Walidacja nieprawidłowa! :(");
    }
};

const validateEmail = (e) => {
    input = e.target;
    validateEmpty(e);
    validateEmailAll(input);
};

const validateEmailAll = (emailLoc) => {
    if (
        !String(emailLoc.value)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    ) {
        if (emailLoc.value !== "") {
            mailErrLoc2.classList.add("active");
            validationPass = false;
            mailLoc.classList.add("error");
        } else {
            mailErrLoc2.classList.remove("active");
            validationPass = false;
            mailLoc.classList.add("error");
        }
    } else {
        if (emailLoc.value !== "") {
            mailErrLoc2.classList.remove("active");
            mailLoc.classList.remove("error");
        } else {
            mailErrLoc2.classList.remove("active");
            validationPass = false;
            mailLoc.classList.add("error");
        }
    }
};

    nameLoc.addEventListener("blur", validateEmpty);
    nameLoc.addEventListener("keyup", validateEmpty);
    
    mailLoc.addEventListener("blur", validateEmail);
    mailLoc.addEventListener("keyup", validateEmpty);

    subjectLoc.addEventListener("blur", validateEmpty);
    subjectLoc.addEventListener("keyup", validateEmpty);
    
    messageLoc.addEventListener("blur", validateEmpty);
    messageLoc.addEventListener("keyup", validateEmpty);

    buttonLoc.addEventListener("click", validateAll);

    // slider
    const slidesLoc = document.querySelector(".slides");
    const slideLoc = document.querySelectorAll(".slides .slide");
    const barLoc = document.querySelectorAll(".bar");

    const slidesNumber = slideLoc.length

    if (slideLoc) {

        const moveSlider = (barID) => {
            barLoc.forEach((elem) => {
                elem.classList.remove("active");
            })

            barLoc[barID].classList.add("active");

            slidesLoc.style.left = `-${100 * barID}%`
        }

        let i = 1;
        window.setInterval(() => {
        
            moveSlider(i);
            i++
            if (i === slidesNumber) { i = 0; } 

        }, 5000);
    }