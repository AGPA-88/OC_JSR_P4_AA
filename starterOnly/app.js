const reserveForm = document.querySelector("#reserve");
const inputs = document.querySelectorAll("#reserve input");


let formData = {};

const handleChange = (e) => {

    console.log({[e.target.name]: e.target.value});
    formData = {...formData, [e.target.name]: e.target.value};

}

inputs.forEach(input => input.addEventListener('change', handleChange))


const validate = (e)=> {

    const errors = {}

    if(formData.first?.length < 2)  errors.first = "First name must have more than 2 characters."
    if(!formData.first) errors.first = "First name field cannot be blank."
    if(formData.last?.length < 2)  errors.last = "Last name must have more than 2 characters."
    if(!formData.last) errors.last = "Last name field cannot be blank."
    // if(formData.email?.length < 2)  errors.email = "You have to enter a valid email"
    if(!formData.email) errors.email = "Email field cannot be blank."


    if(Object.keys(errors).length > 0) e.preventDefault();

    Object.keys(errors).forEach(error => {
        document.querySelector(`#${error} + p`).innerText = errors[error]
    })


    console.log({errors})


};

reserveForm.addEventListener("submit", validate);