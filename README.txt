PANDA BIRTHDAY WEBSITE

Front-end birthday surprise for Muinat aka Panda Sha.

Edit config.js for destination numbers, bank details and amounts.

IMPORTANT: Do not put Geodnatech or Flutterwave secret API keys in browser files. Use a secure server-side backend. The frontend expects:
POST /api/airtime -> {"success":true,"amount":3000}
POST /api/transfer -> {"success":true,"amount":10000,"accountName":"...","bankName":"..."}

The included one-person lock is localStorage for the demo. For a real one-person global claim, enforce uniqueness in your backend/database.

Add your own birthday-chime.mp3 to assets/.
