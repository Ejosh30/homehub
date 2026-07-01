<!DOCTYPE html>
<html>
<head>
<title>HomeHub</title>

<style>

body{
font-family: Arial, sans-serif;
margin:0;
background:#f5f5f5;
}

header{
background:#ffffff;
padding:20px;
text-align:center;
box-shadow:0 2px 8px #ddd;
}

h1{
color:#222;
}

.container{
width:90%;
max-width:900px;
margin:30px auto;
}

.card{
background:white;
padding:25px;
margin-bottom:25px;
border-radius:15px;
box-shadow:0 5px 15px #ddd;
}


input, select, textarea, button{

width:100%;
padding:12px;
margin:10px 0;
border-radius:8px;
border:1px solid #ccc;

}


button{

background:#222;
color:white;
cursor:pointer;

}


button:hover{

background:#444;

}


.property{

background:#fff;
padding:15px;
margin-top:15px;
border-radius:10px;

}


img{

width:100%;
border-radius:10px;

}


</style>

</head>


<body>


<header>

<h1>🏠 HomeHub</h1>

<p>Buy • Sell • Rent Properties</p>

</header>



<div class="container">



<div class="card">

<h2>List Your Property</h2>


<input id="title" placeholder="Property name">


<select id="type">

<option>House for Sale</option>
<option>Land for Sale</option>
<option>Short-let Apartment</option>

</select>



<select id="state">

<option>Enugu</option>
<option>Lagos</option>
<option>Abuja</option>
<option>Rivers</option>
<option>Delta</option>
<option>Other</option>

</select>



<input id="location" placeholder="Location">


<input id="price" placeholder="Price">


<textarea id="description" placeholder="Description"></textarea>


<input id="image" placeholder="Image URL">


<button onclick="addProperty()">

Publish Property

</button>


</div>





<div class="card">

<h2>Available Properties</h2>

<div id="listings">

Loading...

</div>


</div>



</div>





<script>


async function addProperty(){


let data={

title:title.value,

type:type.value,

state:state.value,

location:location.value,

price:price.value,

description:description.value,

image:image.value

};



let res = await fetch("/api/properties",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)


});


let result=await res.json();


alert("Property added");


loadProperties();


}




async function loadProperties(){


let res=await fetch("/api/properties");


let properties=await res.json();



listings.innerHTML="";



properties.forEach(p=>{


listings.innerHTML += `

<div class="property">


<img src="${p.image}">


<h3>${p.title}</h3>

<p>${p.type}</p>

<p>📍 ${p.state}, ${p.location}</p>

<p>💰 ${p.price}</p>

<p>${p.description}</p>


</div>

`;


});


}


loadProperties();


</script>


</body>

</html>