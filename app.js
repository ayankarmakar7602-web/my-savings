const UPI_ID = "8116603529@mbk";
const PAYEE_NAME = "My Savings";
const status = document.getElementById("status");

function pay(amount) {
  amount = Number(amount);
  if (!Number.isFinite(amount) || amount <= 0) return;

  const tx = "SAVE" + Date.now();
  const params =
    "pa=" + encodeURIComponent(UPI_ID) +
    "&pn=" + encodeURIComponent(PAYEE_NAME) +
    "&am=" + encodeURIComponent(amount.toFixed(2)) +
    "&cu=INR" +
    "&tr=" + encodeURIComponent(tx) +
    "&tn=" + encodeURIComponent("My Savings");

  // Try PhonePe directly first.
  const phonePeUrl = "phonepe://pay?" + params;

  status.textContent = "Opening PhonePe…";
  window.location.href = phonePeUrl;

  setTimeout(() => {
    status.textContent = "If PhonePe did not open, tap the amount again.";
  }, 1800);
}

document.querySelectorAll("[data-amount]").forEach(btn => {
  btn.addEventListener("click", () => pay(btn.dataset.amount));
});

document.getElementById("custom").addEventListener("click", () => {
  const value = prompt("Enter amount (₹)");
  if (value === null) return;

  const amount = Number(value.trim().replace(/,/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) {
    status.textContent = "Enter a valid amount.";
    return;
  }
  pay(amount);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
