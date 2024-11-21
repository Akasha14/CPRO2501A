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

      // Calculate the conversion rate from base to target
      const conversionRate = targetRate / baseRate;

      // Display the result
      document.getElementById("result").textContent = `${amount} ${base} = ${(
        amount * conversionRate
      ).toFixed(2)} ${target}`;
    }
  } catch (error) {
    document.getElementById("result").textContent = "An error occurred!";
  }
}
