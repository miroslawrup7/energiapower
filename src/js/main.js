// contact form validation

const formLoc = document.querySelector("#contact-form");

const nameLoc = document.querySelector("#name");
const mailLoc = document.querySelector("#mail");
const subjectLoc = document.querySelector("#subject");
const messageLoc = document.querySelector("#message");

const buttonLoc = document.querySelector("button");

const validateEmpty = (input, turnOnErrorShow) => {
    if (!input.value.length) {
        if (turnOnErrorShow) {
            input.nextElementSibling.innerText = "To pole jest wymagane.";
            input.classList.add("error");
            validationPass = false;
        }
    } else if (input.nextElementSibling.innerText === "To pole jest wymagane.") {
        input.nextElementSibling.innerText = "";
        input.classList.remove("error");
    }
}

const validateEmail = (input, turnOnErrorShow) => {
    if (input.value.length) {
        if (!String(input.value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            if (turnOnErrorShow) {
                input.nextElementSibling.innerText = "Nieprawidłowy adres e-mail.";
                input.classList.add("error");
                validationPass = false;
            }
        } else if (input.nextElementSibling.innerText === "Nieprawidłowy adres e-mail.") {
            input.nextElementSibling.innerText = "";
            input.classList.remove("error");
        }
    } else if (input.nextElementSibling.innerText === "Nieprawidłowy adres e-mail.") {
        input.nextElementSibling.innerText = "";
        input.classList.remove("error");
    }
}

nameLoc.addEventListener("keyup", (e) => {
    validateEmpty(e.target, false); 
});

mailLoc.addEventListener("keyup", (e) => {
    validateEmpty(e.target, false); 
    validateEmail(e.target, false); 
});
mailLoc.addEventListener("blur", (e) => {
    validateEmail(e.target, true); 
});

subjectLoc.addEventListener("keyup", (e) => {
    validateEmpty(e.target, false); 
});

messageLoc.addEventListener("keyup", (e) => {
    validateEmpty(e.target, false); 
});

buttonLoc.addEventListener("click", (e) => {
    e.preventDefault();
    let validationPass = true;
    validateEmpty(nameLoc, true); 
    validateEmpty(mailLoc, true); 
    validateEmail(mailLoc, true); 
    validateEmpty(subjectLoc, true); 
    validateEmpty(messageLoc, true); 

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
});

const markActivedInput = (input) => {
    input.classList.add("active");
}

const unmarkActivedInput = (input) => {
    input.classList.remove("active");
}

nameLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
nameLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});

mailLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
mailLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});

subjectLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
subjectLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});

messageLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
messageLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});

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