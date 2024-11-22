// Array of currency codes (top 35 from fixers list).
const currencies = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "AUD",
  "CAD",
  "JPY",
  "CNY",
  "CHF",
  "NZD",
  "SEK",
  "MXN",
  "SGD",
  "HKD",
  "NOK",
  "KRW",
  "TRY",
  "RUB",
  "BRL",
  "ZAR",
  "DKK",
  "PLN",
  "TWD",
  "THB",
  "MYR",
  "IDR",
  "CZK",
  "HUF",
  "ILS",
  "PHP",
  "CLP",
  "PKR",
  "NGN",
  "VND",
  "EGP",
];

// Map sumbols to currencies.
const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
  JPY: "¥",
  CNY: "¥",
  CHF: "CHF",
  NZD: "NZ$",
  SEK: "kr",
  MXN: "$",
  SGD: "S$",
  HKD: "HK$",
  NOK: "kr",
  KRW: "₩",
  TRY: "₺",
  RUB: "₽",
  BRL: "R$",
  ZAR: "R",
  DKK: "kr",
  PLN: "zł",
  TWD: "NT$",
  THB: "฿",
  MYR: "RM",
  IDR: "Rp",
  CZK: "Kč",
  HUF: "Ft",
  ILS: "₪",
  PHP: "₱",
  CLP: "$",
  PKR: "₨",
  NGN: "₦",
  VND: "₫",
  EGP: "E£",
};

function populateDropdowns() {
  const baseDropdown = document.getElementById("base");
  const targetDropdown = document.getElementById("target");

  currencies.forEach((currency) => {
    const symbol = currencySymbols[currency]; // Get the symbol.

    // Create dropdown options with currency code and symbol.
    const baseSelect = document.createElement("option");
    const targetSelect = document.createElement("option");

    baseSelect.value = currency;
    baseSelect.textContent = `${currency} (${symbol})`; // Display code and symbol.

    targetSelect.value = currency;
    targetSelect.textContent = `${currency} (${symbol})`;

    // Add to dropdown.
    baseDropdown.appendChild(baseSelect);
    targetDropdown.appendChild(targetSelect);
  });
}

async function convertCurrency() {
  // User entered base and target value, and amount.
  const base = document.getElementById("base").value.toUpperCase();
  const target = document.getElementById("target").value.toUpperCase();
  const amount = parseFloat(document.getElementById("amount").value);
  // API key from fixer.io, free account.
  const apiKey = "ea670d40071b4cb0dd8ef64e204cd278";
  // URL called to access currency rates.
  const url = `http://data.fixer.io/api/latest?access_key=${apiKey}&symbols=${base},${target}`;

  try {
    // Call URL that has user entered info
    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      // Get rates (always relative to EUR due to free account).
      const baseRate = data.rates[base];
      const targetRate = data.rates[target];

      // Calculate the conversion rate from base to target.
      const conversionRate = targetRate / baseRate;

      // Display the result.
      document.getElementById("result").textContent = `${amount} ${base} = ${(
        amount * conversionRate
      ).toFixed(2)} ${target}`;
    }
  } catch (error) {
    document.getElementById("result").textContent = "An error occurred!";
  }
}

// Call this function when the page loads.
populateDropdowns();
