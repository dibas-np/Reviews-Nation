"use strict"
var subscribeDateArr = [];
let subscribe = document.querySelector('.subscribe');
class Subscribe{
    constructor(email){
        this.email = email;
    }

    //method to format the data for it to store in json server
    createData(){
        let data = {
            email: this.email
        };
        return data;
    }

    //method to store the data in the json server
    subscription(){
        const data = this.createData();
        axios.post('http://localhost:3000/subscribe',data).then(()=>{
            console.log("Subscribe data has been successfully submitted!!");
    
        }).catch((e)=>{
            console.log("There is an error:"+e);
        });
    }
    
    //method to check the length of given arguments
    checkEmail(args){
        if(args.length > 0){
            return true;
        }else{
            return false;
        }
    }

    // method to check if the email is already subscribed or not and to store the data in the json server if 
    // it is not already subscribed
    check(){
        axios.get('http://localhost:3000/subscribe')
        .then(result => {
            let currentEmail = result.data.filter(item=>{
                return(item.email == this.email);
            });
            return this.checkEmail(currentEmail);
        })
        .then(r=>{
            if(r==false){
                this.subscription();
                alert("Thank you for subscribing to our newsletter!! Get ready for amazing movie reviews directly to your email.");
            }else{
                console.log("Entered email is already subscribed!!")
                alert("This email has been already subscribed!! Please try again with another email.")
            }
        })
    } 
}

if (subscribe != null) {
    subscribe.addEventListener('submit', (e) => {
        e.preventDefault();

        let email = document.querySelector('#subscribe-email').value;
        var today = new Date();
        var dateSubscribe = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var timeSubscribe = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let subscribeData = {
            subscribeDate: dateSubscribe,
            subscribeTime: timeSubscribe
        }
        //using local storage to store data and time contact form is submitted
        subscribeDateArr.push(subscribeData);
        localStorage.setItem("subscribe date", JSON.stringify(subscribeDateArr));

        //making object of class Subscribe
        let subscribe = new Subscribe(email);
        //calling method from Subscribe class to check and store the data 
        subscribe.check();

        e.target.reset();
    });
}
