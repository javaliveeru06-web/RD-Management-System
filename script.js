window.onload=function(){

loadCustomers();

updateDashboard();

loadNotifications();

loadPaidTable();

loadPendingTable();

};



// =================== LOAD CUSTOMERS ===================

function loadCustomers(){

let customers=

JSON.parse(
localStorage.getItem("customers")
)||[];


let table=

document.getElementById(
"customerTable"
);


if(!table)
return;


table.innerHTML=`

<tr>

<th>Name</th>
<th>Age</th>
<th>Account</th>
<th>Phone</th>
<th>Amount</th>
<th>Due Date</th>
<th>Status</th>
<th>Action</th>

</tr>

`;


customers.forEach((customer,index)=>{

table.innerHTML+=`

<tr>

<td>${customer.name}</td>

<td>${customer.age}</td>

<td>${customer.account}</td>

<td>${customer.phone}</td>

<td>₹${customer.amount}</td>

<td>${customer.dueDate}</td>

<td>${customer.status}</td>

<td>

<button onclick="markPaid(${index})">

Paid

</button>


<button onclick="editCustomer(${index})">

Edit

</button>


<button onclick="deleteCustomer(${index})">

Delete

</button>

</td>

</tr>

`;

});

}



// =================== ADD CUSTOMER ===================

function addCustomer(){

let customer={

name:
document.getElementById(
"name"
).value,

age:
document.getElementById(
"age"
).value,

account:
document.getElementById(
"account"
).value,

phone:
document.getElementById(
"phone"
).value,

amount:
document.getElementById(
"amount"
).value,

dueDate:
document.getElementById(
"dueDate"
).value,

status:"Pending"

};


let customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];


customers.push(customer);


localStorage.setItem(

"customers",

JSON.stringify(
customers
)

);


clearInputs();

loadCustomers();

updateDashboard();

}




// =================== MARK PAID ===================

function markPaid(index){

let customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];


customers[index].status=
"Paid";


localStorage.setItem(

"customers",

JSON.stringify(
customers
)

);


loadCustomers();

updateDashboard();

loadPaidTable();

loadPendingTable();

}




// =================== DELETE ===================

function deleteCustomer(index){

let customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];


customers.splice(index,1);


localStorage.setItem(

"customers",

JSON.stringify(
customers
)

);


loadCustomers();

updateDashboard();

}




// =================== EDIT ===================

function editCustomer(index){

let customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];



customers[index].name=

prompt(
"Name",
customers[index].name
);


customers[index].age=

prompt(
"Age",
customers[index].age
);


customers[index].account=

prompt(
"Account",
customers[index].account
);


customers[index].phone=

prompt(
"Phone",
customers[index].phone
);


customers[index].amount=

prompt(
"Amount",
customers[index].amount
);


customers[index].dueDate=

prompt(
"Due Date",
customers[index].dueDate
);


localStorage.setItem(

"customers",

JSON.stringify(
customers
)

);


loadCustomers();

updateDashboard();

}



// =================== DASHBOARD ===================

function updateDashboard(){

let customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];



let total=customers.length;

let paid=0;

let pending=0;

let collection=0;

let remaining=0;



customers.forEach(customer=>{


if(customer.status=="Paid")
{

paid++;

collection+=

parseInt(
customer.amount
)||0;

}
else
{

pending++;

remaining+=

parseInt(
customer.amount
)||0;

}

});



if(document.getElementById("total"))

document.getElementById(
"total"
).innerHTML=
total;



if(document.getElementById("paid"))

document.getElementById(
"paid"
).innerHTML=
paid;



if(document.getElementById("pending"))

document.getElementById(
"pending"
).innerHTML=
pending;



if(document.getElementById("collection"))

document.getElementById(
"collection"
).innerHTML=

"₹"+collection;



if(document.getElementById("remaining"))

document.getElementById(
"remaining"
).innerHTML=

"₹"+remaining;

}



// =================== PAID PAGE ===================

function loadPaidTable(){

let table=

document.getElementById(
"paidTable"
);

if(!table)
return;


table.innerHTML=`

<tr>

<th>Name</th>
<th>Account</th>
<th>Phone</th>
<th>Amount</th>

</tr>

`;


let customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];



customers.forEach(customer=>{


if(
customer.status=="Paid"
)
{

table.innerHTML+=`

<tr>

<td>${customer.name}</td>

<td>${customer.account}</td>

<td>${customer.phone}</td>

<td>₹${customer.amount}</td>

</tr>

`;

}

});

}




// =================== PENDING PAGE ===================

function loadPendingTable(){

let table=

document.getElementById(
"pendingTable"
);

if(!table)
return;


table.innerHTML=`

<tr>

<th>Name</th>
<th>Account</th>
<th>Phone</th>
<th>Amount</th>

</tr>

`;


let customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];



customers.forEach(customer=>{


if(
customer.status!="Paid"
)
{

table.innerHTML+=`

<tr>

<td>${customer.name}</td>

<td>${customer.account}</td>

<td>${customer.phone}</td>

<td>₹${customer.amount}</td>

</tr>

`;

}

});

}



// =================== NOTIFICATIONS ===================

function loadNotifications(){

let customers=

JSON.parse(
localStorage.getItem(
"customers"
)
)||[];


let list=

document.getElementById(
"notificationList"
);

if(!list)
return;


list.innerHTML="";


let today=
new Date();


customers.forEach(customer=>{


let due=

new Date(
customer.dueDate
);


if(

customer.status!="Paid"
&&
due<=today

)

{

list.innerHTML+=

`<li>

🔔 ${customer.name}

<button onclick='sendReminder(${JSON.stringify(customer)})'>

Send

</button>

</li>`;

}

});

}




// =================== WHATSAPP ===================

function sendReminder(customer){

let message=

"Hello "+

customer.name+

", Your RD payment ₹"+

customer.amount+

" is pending.";



window.open(

"https://wa.me/91"+

customer.phone+

"?text="+

encodeURIComponent(
message
)

);

}



// =================== CLEAR ===================

function clearInputs(){

document.getElementById(
"name"
).value="";

document.getElementById(
"age"
).value="";

document.getElementById(
"account"
).value="";

document.getElementById(
"phone"
).value="";

document.getElementById(
"amount"
).value="";

document.getElementById(
"dueDate"
).value="";

}
