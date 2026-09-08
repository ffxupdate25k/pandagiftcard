// ===== ADMIN PASSWORD =====
const ADMIN_PASSWORD = "wolf123"; // Change this

// ===== STORAGE KEY =====
const KEY = "PANDA_BIRTHDAY_ADMIN";

// Default settings
const defaults = {
  girlName: "Muinat aka Panda Sha",
  music: "",
  airtimeAmount: 3000,
  airtimePhone: "",
  bankName: "",
  accountNumber: "",
  accountName: "",
  cashAmount: 10000,
  claimed: false
};

// Load saved data
let data = JSON.parse(localStorage.getItem(KEY)) || defaults;

// ---------- LOGIN ----------
function login() {
  const pass = document.getElementById("password").value;

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("adminPage").style.display = "block";
    loadSettings();
  } else {
    alert("Wrong Password!");
  }
}

function logout() {
  location.reload();
}

// ---------- LOAD ----------
function loadSettings() {
  girlName.value = data.girlName;
  music.value = data.music;

  airtimeAmount.value = data.airtimeAmount;
  airtimePhone.value = data.airtimePhone;

  bankName.value = data.bankName;
  accountNumber.value = data.accountNumber;
  cashAmount.value = data.cashAmount;

  accountName.innerHTML =
    data.accountName || "Not Verified";

  status.innerHTML = data.claimed
    ? "✅ Gifts Already Claimed"
    : "🎁 Waiting For Claim";
}

// ---------- SAVE ----------
function saveSettings() {
  data.girlName = girlName.value;
  data.music = music.value;

  data.airtimeAmount = Number(airtimeAmount.value);
  data.airtimePhone = airtimePhone.value;

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
