"use strict"
let btn = document.querySelector('#btn-submit');
let form = document.querySelector('.contact-form');
var contactDateArr = [];

class Contact{
    constructor(name,email,subject,message){
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }
    //method to format the data to store in json server
    createData(){
        let data= {
            name: this.name,
            email: this.email,
            subject: this.subject,
            message: this.message,
        };
        return data;
    }
    //method to store the data in the json server
    contactUs(){
        const data = this.createData();
        axios.post('http://localhost:3000/contact',data).then(()=>{
            console.log("Contact data has been successfully submitted!!");
        }).catch((e)=>{
            console.log("There is an error:"+e);
        });
    }
}

if (form != null) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        Swal.fire(
            'Success!',
            'You message has been successfully submitted!',
            'success'
        )

        let name = document.querySelector('#name').value;
        let email = document.querySelector('#contact-email').value;
        let sub = document.getElementById("subject");
        let subject = sub.options[sub.selectedIndex].value;
        let message = document.querySelector("#contact-message").value;

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let contactData = {
            contactDate: date,
            contactTime: time
        }
        //using local storage to store data and time contact form is submitted
        contactDateArr.push(contactData);
        localStorage.setItem("contact date", JSON.stringify(contactDateArr));

        //creating object of type Contact class
        let contact = new Contact(name, email, subject, message);
        //calling method from Contact class to store the contact data
        contact.contactUs();

        e.target.reset();
    });
}

