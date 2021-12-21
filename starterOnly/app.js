const reserveForm = document.querySelector("#reserve");
const inputs = document.querySelectorAll("#reserve input");


let formData = {};
let errors = {}

const handleChange = (e) => {

    console.log({[e.target.name]: e.target.value});
    formData = {...formData, [e.target.name]: e.target.value};
    if (e.terget.type === "checkbox") {
        formData[e.target.name] = e.target.checked;
    } else {
        formData[e.target.name] = e.target.value;
    }

}


const handleSubmit = (e) => {
    e.preventDefault();

    validate();

    if(Object.keys(errors).length > 0) return;

    
    
    reserveForm.parentElement.innerHTML = `
        <div class="success">
            <h2>Thank you! Your reservation was received.</h2>
        </div>
    `
    

}

inputs.forEach(input => {
    input.addEventListener('change', handleChange)
    input.addEventListener('keyup', handleChange)
})


const validate = () => {

    document.querySelectorAll('input.has-error').forEach(input => {
        if(Object.keys(errors).includes(input.name)) {
            if(input.name === 'location' || input.name === 'toc') {
                document.querySelector(`input[name="${input.name}"]`).classList.remove('has-error');
                document.querySelector(`input[name="${input.name}"] + label + p`).innerText = ''
            }else{
                document.querySelector(`#${input.name}`).classList.remove('has-error');
                document.querySelector(`#${input.name} + p`).innerText = ''
            }

        }

        delete errors[input.name];

    })

    if(formData.first?.length < 2)  errors.first = "First name must have more than 2 characters."
    if(!formData.first) errors.first = "First name field cannot be blank."
    if(formData.last?.length < 2)  errors.last = "Last name must have more than 2 characters."
    if(!formData.last) errors.last = "Last name field cannot be blank."
    if(!ValidateEmail(formData.email))  errors.email = "You have to enter a valid email"
    if(!formData.email) errors.email = "Email field cannot be blank."
    if(!formData.birthdate) errors.birthdate = "You must enter your date of birth."
    if(isNaN(formData.quantity)) errors.quantity = "You must enter a valid number."
    if(!formData.location) errors.location = "You must choose a location."
    if(!formData.toc) errors.toc = "You must accept our terms."



    Object.keys(errors).forEach(error => {

        if(error === 'location' || error === 'toc') {
            document.querySelector(`input[name="${error}"]`).classList.add('has-error');
            document.querySelector(`input[name="${error}"] + label + p`).innerText = errors[error] 
        }else{
            document.querySelector(`#${error}`).classList.add('has-error');
            document.querySelector(`#${error} + p`).innerText = errors[error]
        }

    })


    console.log({errors})


};



function ValidateEmail(mail) {
    
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
}

reserveForm.addEventListener("submit", handleSubmit);