const UPI_ID = "8116603529@mbk";
const PAYEE_NAME = "My Savings";
const status = document.getElementById("status");

function pay(amount) {
  amount = Number(amount);
  if (!Number.isFinite(amount) || amount <= 0) return;

  const upi =
    "upi://pay?pa=" + encodeURIComponent(UPI_ID) +
    "&pn=" + encodeURIComponent(PAYEE_NAME) +
    "&am=" + encodeURIComponent(amount.toFixed(2)) +
    "&cu=INR";

  status.textContent = "Opening UPI app…";
  window.location.href = upi;

  setTimeout(() => {
    status.textContent = "If the UPI app doesn't open, tap an amount again.";
  }, 1800);
}

document.querySelectorAll("[data-amount]").forEach(btn => {
  btn.addEventListener("click", () => pay(btn.dataset.amount));
});

document.getElementById("custom").addEventListener("click", () => {
  const value = prompt("Enter amount (₹)");
  if (value === null) return;

  const cleaned = value.trim().replace(/,/g, "");
  const amount = Number(cleaned);

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
