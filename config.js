// =========================
// CONFIG.JS
// Reads Admin Panel Settings
// =========================

const ADMIN_KEY = "PANDA_ADMIN";

const defaultConfig = {
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

// Load admin settings
const CONFIG = JSON.parse(
  localStorage.getItem(ADMIN_KEY)
) || defaultConfig;

// Easy access variables
const GIRL_NAME = CONFIG.girlName;
const MUSIC_URL = CONFIG.music;

const AIRTIME = {
  token: CONFIG.geoToken,
  endpoint: CONFIG.geoEndpoint,
  network: CONFIG.networkId,
  phone: CONFIG.airtimePhone,
  amount: CONFIG.airtimeAmount
};

const CASH = {
  secretKey: CONFIG.flutterKey,
  bank: CONFIG.bankName,
  accountNumber: CONFIG.accountNumber,
  accountName: CONFIG.accountName,
  amount: CONFIG.cashAmount
};
