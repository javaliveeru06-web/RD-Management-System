// Load customer data automatically

window.onload = function () {

    loadCustomers();

};


// Add Customer

function addCustomer() {

    let name = document.getElementById("name").value;

    let age = document.getElementById("age").value;

    let account = document.getElementById("account").value;

    let phone = document.getElementById("phone").value;

    let amount = document.getElementById("amount").value;

    let dueDate = document.getElementById("dueDate").value;


    if(name=="" || age=="" || account=="")
    {
        alert("Fill all required fields");
        return;
    }


    let customer = {

        name:name,
        age:age,
        account:account,
        phone:phone,
        amount:amount,
        dueDate:dueDate,
        status:"Pending"

    };


    let customers =

    JSON.parse(
    localStorage.getItem("customers")
    ) || [];


    customers.push(customer);


    localStorage.setItem(

    "customers",

    JSON.stringify(customers)

    );


    loadCustomers();

    clearInputs();

}



// Load Customers

function loadCustomers(){

    let customers=

    JSON.parse(
    localStorage.getItem("customers")
    ) || [];


    let table=

    document.getElementById(
    "customerTable"
    );


    table.innerHTML=`

<tr>

<th>Name</th>
<th>Age</th>
<th>Account No</th>
<th>Phone</th>
<th>Monthly Amount</th>
<th>Due Date</th>
<th>Status</th>
<th>Action</th>

</tr>

`;


customers.forEach((customer,index)=>{

let row=table.insertRow();


row.insertCell(0).innerHTML=
customer.name;

row.insertCell(1).innerHTML=
customer.age;

row.insertCell(2).innerHTML=
customer.account;

row.insertCell(3).innerHTML=
customer.phone;

row.insertCell(4).innerHTML=
"₹"+customer.amount;

row.insertCell(5).innerHTML=
customer.dueDate;



if(customer.status=="Paid")
{

row.insertCell(6).innerHTML=
'<span class="paid">Paid</span>';

}
else
{

row.insertCell(6).innerHTML=
'<span class="pending">Pending</span>';

}


row.insertCell(7).innerHTML=

'<button onclick="markPaid('+index+')">Paid</button>'+

'<button onclick="sendReminder('+index+')">Reminder</button>'+

'<button onclick="sendWhatsApp('+index+')">WhatsApp</button>'+

'<button onclick="editCustomer('+index+')">Edit</button>'+

'<button onclick="deleteCustomer('+index+')">Delete</button>';

});


updateDashboard();

loadNotifications();

}



// Mark Paid

function markPaid(index){

let customers=

JSON.parse(
localStorage.getItem("customers")
);


customers[index].status="Paid";


localStorage.setItem(

"customers",

JSON.stringify(customers)

);


loadCustomers();

}



// Reminder

function sendReminder(index){

let customers=

JSON.parse(
localStorage.getItem("customers")
);


alert(

"Reminder: Collect payment from "

+customers[index].name+

"\nAmount: ₹"+

customers[index].amount

);

}



// WhatsApp Reminder

function sendWhatsApp(index){

let customers=

JSON.parse(
localStorage.getItem("customers")
);

let customer=
customers[index];


let message=

"Hello "+customer.name+

", Your RD monthly amount ₹"+

customer.amount+

" is pending. Please make the payment.";


let url=

"https://wa.me/91"+

customer.phone+

"?text="+

encodeURIComponent(message);


window.open(url,"_blank");

}



// Edit Customer

function editCustomer(index){

let customers=

JSON.parse(
localStorage.getItem("customers")
);


let newName=
prompt(
"Enter Customer Name",
customers[index].name
);

let newAge=
prompt(
"Enter Age",
customers[index].age
);

let newAccount=
prompt(
"Enter Account Number",
customers[index].account
);

let newPhone=
prompt(
"Enter Phone Number",
customers[index].phone
);

let newAmount=
prompt(
"Enter Monthly Amount",
customers[index].amount
);

let newDueDate=
prompt(
"Enter Due Date",
customers[index].dueDate
);


customers[index].name=
newName;

customers[index].age=
newAge;

customers[index].account=
newAccount;

customers[index].phone=
newPhone;

customers[index].amount=
newAmount;

customers[index].dueDate=
newDueDate;


localStorage.setItem(

"customers",

JSON.stringify(customers)

);


loadCustomers();

}



// Delete Customer

function deleteCustomer(index){

let customers=

JSON.parse(
localStorage.getItem("customers")
);


customers.splice(index,1);


localStorage.setItem(

"customers",

JSON.stringify(customers)

);


loadCustomers();

}



// Notifications

function loadNotifications(){

let customers=

JSON.parse(
localStorage.getItem("customers")
) || [];


let list=

document.getElementById(
"notificationList"
);


if(!list) return;


list.innerHTML="";


let today=
new Date();


customers.forEach(customer=>{

if(customer.status=="Pending")
{

list.innerHTML +=

"<li>🔔 Pending Payment: "

+customer.name+

" ₹"+

customer.amount+

"</li>";

}

});

}



// Search

function searchCustomer(){

let input=

document.getElementById(
"search"
);

let filter=

input.value.toUpperCase();

let table=

document.getElementById(
"customerTable"
);

let tr=

table.getElementsByTagName(
"tr"
);


for(let i=1;i<tr.length;i++)
{

let td=

tr[i].getElementsByTagName("td")[2];


if(td)
{

let txt=

td.textContent;


if(txt.toUpperCase()
.indexOf(filter)>-1)

tr[i].style.display="";

else

tr[i].style.display="none";

}

}

}



// Dashboard Update

function updateDashboard(){

let customers=

JSON.parse(
localStorage.getItem("customers")
) || [];


let total=customers.length;

let paid=0;

let pending=0;

let totalAmount=0;

let pendingAmount=0;


customers.forEach(customer=>{

let amount=

parseInt(customer.amount)||0;


totalAmount+=amount;


if(customer.status=="Paid")
{

paid++;

}
else{

pending++;

pendingAmount+=amount;

}

});


localStorage.setItem(
"totalCustomers",
total
);

localStorage.setItem(
"paidCustomers",
paid
);

localStorage.setItem(
"pendingCustomers",
pending
);

localStorage.setItem(
"totalAmount",
totalAmount
);

localStorage.setItem(
"pendingAmount",
pendingAmount
);

}



// Clear Inputs

function clearInputs(){

document.getElementById("name").value="";

document.getElementById("age").value="";

document.getElementById("account").value="";

document.getElementById("phone").value="";

document.getElementById("amount").value="";

document.getElementById("dueDate").value="";

}