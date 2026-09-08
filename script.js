// =============================
// PANDA BIRTHDAY SCRIPT
// =============================

const KEY = "PANDA_ADMIN";
let settings = JSON.parse(localStorage.getItem(KEY)) || {};

// Page Elements
const home = document.getElementById("home");
const letter = document.getElementById("letter");
const gift1 = document.getElementById("gift1");
const gift2 = document.getElementById("gift2");
const finalPage = document.getElementById("final");

// Name
document.querySelectorAll(".girlName").forEach(el => {
  el.innerHTML = settings.girlName || "Muinat aka Panda Sha";
});

// Music
const music = document.getElementById("bgMusic");
if (music && settings.music) {
  music.src = settings.music;
  music.play().catch(() => {});
}

// Show Letter
function openLetter() {
  home.hidden = true;
  letter.hidden = false;
}

// Show Gift 1
function showGift1() {
  letter.hidden = true;
  gift1.hidden = false;
}

// Airtime Claim
async function claimAirtime() {

  const btn = document.getElementById("claimAirBtn");

  btn.disabled = true;
  btn.innerHTML = "Sending...";

  try {

    const res = await fetch("api/mtn.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: settings.geoToken,
        endpoint: settings.geoEndpoint,
        network: settings.networkId,
        amount: settings.airtimeAmount,
        phone: settings.airtimePhone
      })
    });

    const result = await res.json();

    if (res.ok) {

      document.getElementById("airHidden").hidden = true;
      document.getElementById("airSuccess").hidden = false;

      document.getElementById("airAmount").innerHTML =
        "₦" + settings.airtimeAmount;

      document.getElementById("airNumber").innerHTML =
        settings.airtimePhone;

    } else {

      alert(result.message || "Airtime Failed");

      btn.disabled = false;
      btn.innerHTML = "Claim Gift 💗";

    }

  } catch (e) {

    alert("Network Error");

    btn.disabled = false;
    btn.innerHTML = "Claim Gift 💗";

  }

}

// Next Gift
function nextGift() {

  gift1.hidden = true;
  gift2.hidden = false;

}

// Cash Claim (Flutterwave later)
function claimCash() {

  document.getElementById("cashHidden").hidden = true;
  document.getElementById("cashSuccess").hidden = false;

  document.getElementById("cashAmount").innerHTML =
    "₦" + settings.cashAmount;

  document.getElementById("cashName").innerHTML =
    settings.accountName;

  document.getElementById("cashBank").innerHTML =
    settings.bankName;

  settings.claimed = true;

  localStorage.setItem(KEY, JSON.stringify(settings));

}

// Finish
function finishBirthday() {

  gift2.hidden = true;
  finalPage.hidden = false;

}

// Already Claimed
window.onload = () => {

  if (settings.claimed) {

    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#ff69b4;color:#fff;text-align:center;padding:20px;">
        <div>
          <h1>🎀 Birthday Present Claims Are Over</h1>
          <p>All birthday presents have already been claimed.</p>
        </div>
      </div>
    `;

  }

};function nextGift(){
  gift1.style.display="none";
  gift2.style.display="flex";
}

// Cash claim
function claimCash(){
  document.getElementById("cashHidden").style.display="none";
  document.getElementById("cashSuccess").style.display="block";
  document.getElementById("cashAmount").innerHTML="₦"+settings.cashAmount;
  document.getElementById("cashName").innerHTML=settings.accountName;
  document.getElementById("cashBank").innerHTML=settings.bankName;
  settings.claimed=true;
  localStorage.setItem(KEY,JSON.stringify(settings));
}

// Finish
function finishBirthday(){
  gift2.style.display="none";
  finalPage.style.display="flex";
      }      airNumber.innerHTML=settings.airtimePhone;

      settings.airClaimed=true;

      localStorage.setItem(KEY,JSON.stringify(settings));

    }else{

      alert(data.message || "Airtime Failed");

      btn.disabled=false;
      btn.innerHTML="Claim Gift 💗";

    }

  }catch(e){

    alert("Network Error");

    btn.disabled=false;
    btn.innerHTML="Claim Gift 💗";

  }

}

//=============================
// NEXT GIFT
//=============================

function nextGift(){

  gift1.style.display="none";
  gift2.style.display="flex";

}

//=============================
// CLAIM CASH
//=============================

async function claimCash(){

  const btn = event.target;

  btn.disabled=true;
  btn.innerHTML="Sending...";

  try{

    const res = await fetch("api/transfer.php",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        secret:settings.flutterKey,
        bank:settings.bankCode,
        bankName:settings.bankName,
        account:settings.accountNumber,
        name:settings.accountName,
        amount:settings.cashAmount
      })
    });

    const data = await res.json();

    if(res.ok){

      cashHidden.style.display="none";
      cashSuccess.style.display="block";

      cashAmount.innerHTML="₦"+settings.cashAmount;
      cashName.innerHTML=settings.accountName;
      cashBank.innerHTML=settings.bankName;

      settings.cashClaimed=true;
      settings.claimed=true;

      localStorage.setItem(KEY,JSON.stringify(settings));

    }else{

      alert(data.message || "Transfer Failed");

      btn.disabled=false;
      btn.innerHTML="Claim Gift ❤️";

    }

  }catch(e){

    alert("Network Error");

    btn.disabled=false;
    btn.innerHTML="Claim Gift ❤️";

  }

}

//=============================
// FINISH
//=============================

function finishBirthday(){

  gift2.style.display="none";
  final.style.display="flex";

}

//=============================
// CLAIM LOCK
//=============================

window.onload=()=>{

  if(settings.claimed){

    document.body.innerHTML=`
    <div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#ffb6d9;color:#fff;text-align:center;padding:20px;">
      <div>
        <h1>🎀 Birthday Present Claims Are Over</h1>
        <p>All birthday presents have already been claimed.</p>
      </div>
    </div>`;
  }

};"₦"+settings.airtimeAmount;

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
