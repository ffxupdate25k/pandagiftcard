//=========================
// ADMIN PANEL
//=========================

const ADMIN_PASSWORD = "wolf123";
const KEY = "PANDA_ADMIN";

// Default Settings
let data = JSON.parse(localStorage.getItem(KEY)) || {

  girlName: "Muinat aka Panda Sha",
  music: "",

  geoToken: "",
  geoEndpoint: "https://geodnatech.com/api/topup/",
  networkId: "1",

  airtimePhone: "",
  airtimeAmount: 200,

  flutterKey: "",

  bankName: "",
  accountNumber: "",
  accountName: "",
  cashAmount: 10000,

  claimed: false
};

//=========================
// LOGIN
//=========================

function login(){

  if(password.value !== ADMIN_PASSWORD){
    alert("Wrong Password");
    return;
  }

  loginPage.style.display="none";
  adminPage.style.display="block";

  loadSettings();

}

function logout(){
  location.reload();
}

//=========================
// LOAD
//=========================

function loadSettings(){

girlName.value=data.girlName;
music.value=data.music;

geoToken.value=data.geoToken;
geoEndpoint.value=data.geoEndpoint;
networkId.value=data.networkId;

airtimePhone.value=data.airtimePhone;
airtimeAmount.value=data.airtimeAmount;

flutterKey.value=data.flutterKey;

bankName.value=data.bankName;
accountNumber.value=data.accountNumber;
cashAmount.value=data.cashAmount;

accountName.innerHTML=data.accountName || "Not Verified";

status.innerHTML=data.claimed ?
"✅ Gifts Already Claimed":
"🎁 Waiting For Claim";

}

//=========================
// SAVE
//=========================

function saveSettings(){

data.girlName=girlName.value;
data.music=music.value;

data.geoToken=geoToken.value;
data.geoEndpoint=geoEndpoint.value;
data.networkId=networkId.value;

data.airtimePhone=airtimePhone.value;
data.airtimeAmount=Number(airtimeAmount.value);

data.flutterKey=flutterKey.value;

data.bankName=bankName.value;
data.accountNumber=accountNumber.value;
data.cashAmount=Number(cashAmount.value);

localStorage.setItem(KEY,JSON.stringify(data));

alert("Saved Successfully 💗");

}

//=========================
// VERIFY ACCOUNT
// Flutterwave later
//=========================

async function verifyAccount(){

if(accountNumber.value.length!=10){
alert("Invalid Account Number");
return;
}

// Temporary
data.accountName="ACCOUNT VERIFIED";
accountName.innerHTML="✅ "+data.accountName;

localStorage.setItem(KEY,JSON.stringify(data));

}

//=========================
// RESET CLAIMS
//=========================

function resetClaims(){

data.claimed=false;

localStorage.setItem(KEY,JSON.stringify(data));

status.innerHTML="🎁 Waiting For Claim";

alert("Claims Reset");

}
  data.bankName = bankName.value;
  data.accountNumber = accountNumber.value;
  data.cashAmount = Number(cashAmount.value);

  localStorage.setItem(KEY, JSON.stringify(data));

  alert("Settings Saved Successfully 💗");
}

// ---------- VERIFY ACCOUNT ----------
// Replace with Flutterwave API later
function verifyAccount() {

  if (accountNumber.value.length != 10) {
    alert("Invalid Account Number");
    return;
  }

  // Demo verification
  data.accountName = "MUINAT PANDA SHA";
  accountName.innerHTML = "✅ " + data.accountName;
}

// ---------- RESET CLAIMS ----------
function resetClaims() {

  data.claimed = false;

  localStorage.setItem(KEY, JSON.stringify(data));

  status.innerHTML = "🎁 Waiting For Claim";

  alert("Claims Reset Successfully");
    }
