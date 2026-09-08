// =========================
// PANDA BIRTHDAY ADMIN
// =========================

const ADMIN_PASSWORD = "wolf123";
const STORAGE_KEY = "PANDA_ADMIN";

const DEFAULT = {
  girlName: "Panda ",
  music: "",

  geoToken: "",
  geoEndpoint: "https://geodnatech.com/api/topup/",
  networkId: "1",

  airtimePhone: "",
  airtimeAmount: 200,

  flutterKey: "",
  bankName: "",
  bankCode: "",
  accountNumber: "",
  accountName: "",
  cashAmount: 10000,

  claimed: false
};

let data =
  JSON.parse(localStorage.getItem(STORAGE_KEY)) ||
  DEFAULT;

// =========================
// LOGIN
// =========================
function login(){

  if(password.value !== ADMIN_PASSWORD){
    alert("Wrong Password");
    return;
  }

  loginPage.style.display = "none";
  adminPage.style.display = "block";

  loadSettings();
}

function logout(){
  location.reload();
}

// =========================
// LOAD SETTINGS
// =========================
function loadSettings(){

  girlName.value = data.girlName;
  music.value = data.music;

  geoToken.value = data.geoToken;
  geoEndpoint.value = data.geoEndpoint;
  networkId.value = data.networkId;

  airtimePhone.value = data.airtimePhone;
  airtimeAmount.value = data.airtimeAmount;

  flutterKey.value = data.flutterKey;

  bankName.value = data.bankName;
  bankCode.value = data.bankCode;
  accountNumber.value = data.accountNumber;
  cashAmount.value = data.cashAmount;

  accountName.innerHTML =
    data.accountName || "Not Verified";

  status.innerHTML = data.claimed
    ? "✅ Gifts Already Claimed"
    : "🎁 Waiting For Claim";
}

// =========================
// SAVE SETTINGS
// =========================
function saveSettings(){

  data.girlName = girlName.value;
  data.music = music.value;

  data.geoToken = geoToken.value;
  data.geoEndpoint = geoEndpoint.value;
  data.networkId = networkId.value;

  data.airtimePhone = airtimePhone.value;
  data.airtimeAmount = Number(airtimeAmount.value);

  data.flutterKey = flutterKey.value;

  data.bankName = bankName.value;
  data.bankCode = bankCode.value;
  data.accountNumber = accountNumber.value;
  data.cashAmount = Number(cashAmount.value);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );

  alert("Saved Successfully 💗");
}

// =========================
// VERIFY ACCOUNT
// =========================
async function verifyAccount(){

  if(accountNumber.value.length !== 10){
    alert("Enter a valid account number");
    return;
  }

  if(bankCode.value === ""){
    alert("Enter bank code");
    return;
  }

  const btn = event.target;

  btn.disabled = true;
  btn.innerHTML = "Verifying...";

  try{

    const res = await fetch("api/verify.php",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        secretKey:flutterKey.value,
        accountNumber:accountNumber.value,
        bankCode:bankCode.value
      })
    });

    const result = await res.json();

    if(result.status === "success"){

      data.accountName =
        result.data.account_name;

      accountName.innerHTML =
        "✅ " + result.data.account_name;

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

    }else{

      alert(result.message || "Verification Failed");

    }

  }catch(err){

    alert("Network Error");

  }

  btn.disabled = false;
  btn.innerHTML = "Verify Account";

}

// =========================
// RESET CLAIMS
// =========================
function resetClaims(){

  data.claimed = false;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );

  status.innerHTML = "🎁 Waiting For Claim";

  alert("Claims Reset Successfully");

}
