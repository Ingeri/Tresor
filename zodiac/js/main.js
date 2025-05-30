let zodiacSigns = [];

async function loadZodiacSigns() {
  try {
    const response = await fetch("../data/zodiac.json");
    if (!response.ok) throw new Error("Zodiac data failed to load");
    zodiacSigns = await response.json();
  } catch (error) {
    document.getElementById(
      "zodiacCard"
    ).innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function getZodiacSign(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const pad = (num) => num.toString().padStart(2, "0");
  const formattedDate = `${pad(month)}-${pad(day)}`;

  return zodiacSigns.find((sign) => {
    const start = sign.start;
    const end = sign.end;
    return (
      (formattedDate >= start && formattedDate <= end) ||
      (start > end && (formattedDate >= start || formattedDate <= end))
    );
  });
}

function displayCard(date) {
  const sign = getZodiacSign(date);
  const container = document.getElementById("zodiacCard");

  if (!sign) {
    container.innerHTML = "<p>No zodiac sign found for this date.</p>";
    return;
  }

  container.innerHTML = `
    <h2>${sign.symbol} ${sign.name}</h2>
    <p><strong>Element:</strong> ${sign.element}</p>
    <p><strong>Ruling Planet:</strong> ${sign.rulingPlanet}</p>
    <p><strong>Details:</strong> ${sign.details}</p>
    <p><strong>Characteristics:</strong> ${sign.characteristics}</p>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadZodiacSigns();
  displayCard(new Date());
});
