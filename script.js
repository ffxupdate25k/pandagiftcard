//============================
// BIRTHDAY WEBSITE
//============================

const CLAIM_KEY = "PANDA_ADMIN";

// Load Admin Settings
let settings = JSON.parse(localStorage.getItem(CLAIM_KEY)) || {};

// Set girl's name
document.querySelectorAll(".girlName").forEach(e=>{
e.innerHTML=settings.girlName || "Muinat aka Panda Sha";
});

// Music
const music=document.getElementById("bgMusic");
if(music && settings.music){
music.src=settings.music;
}

// Screens
function openLetter(){
document.getElementById("home").style.display="none";
document.getElementById("letter").style.display="block";
}

//============================
// GIFT 1
// Airtime
//============================

async function claimAirtime(){

const btn=document.getElementById("claimAirBtn");

btn.disabled=true;
btn.innerHTML="Sending...";

const body={
network:Number(settings.networkId),
amount:Number(settings.airtimeAmount),
mobile_number:settings.airtimePhone,
Ported_number:true,
airtime_type:"VTU"
};

try{

const res=await fetch(settings.geoEndpoint,{
method:"POST",
headers:{
"Authorization":"Token "+settings.geoToken,
"Content-Type":"application/json"
},
body:JSON.stringify(body)
});

const data=await res.json();

if(res.ok){

document.getElementById("airHidden").style.display="none";

document.getElementById("airSuccess").style.display="block";

document.getElementById("airAmount").innerHTML=
"₦"+settings.airtimeAmount;

document.getElementById("airNumber").innerHTML=
settings.airtimePhone;

settings.airClaimed=true;

localStorage.setItem(CLAIM_KEY,
JSON.stringify(settings));

}else{

alert(data.message || "Airtime Failed");

btn.disabled=false;
btn.innerHTML="Claim Gift";

}

}catch(e){

alert("Network Error");

btn.disabled=false;
btn.innerHTML="Claim Gift";

}

}

//============================
// NEXT GIFT
//============================

function nextGift(){

document.getElementById("gift1").style.display="none";

document.getElementById("gift2").style.display="block";

}

//============================
// CASH
// Flutterwave Later
//============================

function claimCash(){

document.getElementById("cashHidden").style.display="none";

document.getElementById("cashSuccess").style.display="block";

document.getElementById("cashAmount").innerHTML=
"₦"+settings.cashAmount;

document.getElementById("cashBank").innerHTML=
settings.bankName;

document.getElementById("cashName").innerHTML=
settings.accountName;

settings.cashClaimed=true;
settings.claimed=true;

localStorage.setItem(CLAIM_KEY,
JSON.stringify(settings));

}

//============================
// CHECK CLAIM
//============================

window.onload=()=>{

if(settings.claimed){

document.body.innerHTML=
`
<div class="claimed">
<h1>🎀 Birthday Present Claims Are Over</h1>
<p>All birthday presents have already been claimed.</p>
</div>
`;

}

};
