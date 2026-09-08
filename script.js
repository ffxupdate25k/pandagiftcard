// =============================
// PANDA BIRTHDAY SCRIPT
// =============================

// Admin settings and visitor claim status
// MUST use different storage keys
const ADMIN_KEY = "PANDA_ADMIN";
const CLAIM_KEY = "PANDA_BIRTHDAY_CLAIM";

// Load admin settings
let settings = JSON.parse(
  localStorage.getItem(ADMIN_KEY) || "{}"
);

// Load THIS browser's claim status
let claim = JSON.parse(
  localStorage.getItem(CLAIM_KEY) || "{}"
);


// =============================
// PAGE ELEMENTS
// =============================

const home = document.getElementById("home");
const letter = document.getElementById("letter");
const gift1 = document.getElementById("gift1");
const gift2 = document.getElementById("gift2");
const finalPage = document.getElementById("final");


// =============================
// GIRL NAME
// =============================

document.querySelectorAll(".girlName").forEach(el => {
  el.textContent =
    settings.girlName || "Muinat aka Panda Sha";
});


// =============================
// MUSIC
// =============================

const music = document.getElementById("bgMusic");

if (music && settings.music) {
  music.src = settings.music;

  document.addEventListener("click", () => {
    music.play().catch(() => {});
  }, { once: true });
}


// =============================
// OPEN LETTER
// =============================

function openLetter() {

  home.hidden = true;
  letter.hidden = false;

}


// =============================
// SHOW FIRST GIFT
// =============================

function showGift1() {

  letter.hidden = true;
  gift1.hidden = false;

}


// =============================
// CLAIM AIRTIME
// =============================

async function claimAirtime() {

  const btn =
    document.getElementById("claimAirBtn");

  if (!settings.geoToken) {
    alert("Airtime service has not been configured yet.");
    return;
  }

  if (!settings.airtimePhone) {
    alert("Airtime phone number has not been configured.");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Sending... 💗";

  try {

    const response = await fetch("api/mtn.php", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        token: settings.geoToken,

        endpoint:
          settings.geoEndpoint ||
          "https://geodnatech.com/api/topup/",

        network:
          settings.networkId,

        amount:
          settings.airtimeAmount,

        phone:
          settings.airtimePhone

      })
    });


    const result = await response.json();


    if (!response.ok || result.success === false) {

      throw new Error(
        result.message ||
        "Airtime could not be sent."
      );

    }


    // Mark only airtime as claimed
    claim.airtimeClaimed = true;

    localStorage.setItem(
      CLAIM_KEY,
      JSON.stringify(claim)
    );


    // Reveal successful gift
    document.getElementById("airHidden").hidden = true;

    document.getElementById("airSuccess").hidden = false;


    document.getElementById("airAmount").textContent =
      "₦" +
      Number(
        settings.airtimeAmount || 0
      ).toLocaleString();


    document.getElementById("airNumber").textContent =
      settings.airtimePhone;


  } catch (error) {

    console.error(error);

    alert(
      error.message ||
      "The airtime could not be sent. Please try again."
    );

    btn.disabled = false;
    btn.textContent = "Claim Gift 💗";

  }

}


// =============================
// NEXT GIFT
// =============================

function nextGift() {

  gift1.hidden = true;
  gift2.hidden = false;

}


// =============================
// CLAIM CASH
// =============================

async function claimCash() {

  const btn =
    document.querySelector("#cashHidden button");

  btn.disabled = true;
  btn.textContent = "Sending... 💗";


  try {

    /*
      Flutterwave transfer will be connected
      here when your Flutterwave API details
      are available.

      DO NOT put the Flutterwave secret key
      directly in this browser JavaScript.
    */

    const response = await fetch(
      "api/transfer.php",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          amount: settings.cashAmount,
          bankCode: settings.bankCode,
          accountNumber: settings.accountNumber
        })
      }
    );


    const result = await response.json();


    if (!response.ok || result.success === false) {

      throw new Error(
        result.message ||
        "Transfer could not be completed."
      );

    }


    // Mark final gift as claimed
    claim.cashClaimed = true;
    claim.allClaimed = true;

    localStorage.setItem(
      CLAIM_KEY,
      JSON.stringify(claim)
    );


    document.getElementById(
      "cashHidden"
    ).hidden = true;


    document.getElementById(
      "cashSuccess"
    ).hidden = false;


    document.getElementById(
      "cashAmount"
    ).textContent =
      "₦" +
      Number(
        settings.cashAmount || 0
      ).toLocaleString();


    document.getElementById(
      "cashName"
    ).textContent =
      settings.accountName ||
      "Verified Account";


    document.getElementById(
      "cashBank"
    ).textContent =
      settings.bankName || "";


  } catch (error) {

    console.error(error);

    alert(
      error.message ||
      "The transfer could not be completed."
    );

    btn.disabled = false;
    btn.textContent = "Claim Gift ❤️";

  }

}


// =============================
// FINISH
// =============================

function finishBirthday() {

  gift2.hidden = true;
  finalPage.hidden = false;

}


// =============================
// CLAIM STATUS
// =============================

window.addEventListener("load", () => {

  // ONLY check the visitor claim key
  if (claim.allClaimed === true) {

    document.body.innerHTML = `
      <div style="
        min-height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        padding:25px;
        background:linear-gradient(
          180deg,
          #ff5ba7,
          #ff9fd0,
          #ffd7e9
        );
        color:white;
      ">

        <div>

          <div style="
            font-size:80px;
            margin-bottom:20px;
          ">
            🎀
          </div>

          <h1>
            Birthday Present Claims Are Over
          </h1>

          <p style="
            margin-top:15px;
            font-size:17px;
          ">
            All birthday presents have already
            been claimed.
          </p>

        </div>

      </div>
    `;

    return;
  }

});
