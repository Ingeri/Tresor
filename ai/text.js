export default async function handleText(prompt) {
  try {
    const res = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: "Bearer MSbIXaWRNjxAacvbeEGl49MOL1VVEXpXmDTnQZuT",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt,
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    const data = await res.json();
    let text = data.generations?.[0]?.text?.trim() || "No result.";

    // Split the text by lines
    const lines = text.split(/\r?\n/).map((line) => line.trim());

    let html = "";
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (!line) {
        // Empty line closes any open list
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        continue;
      }

      // Detect headers: all uppercase or ending with colon (whole line)
      if (
        /^[A-Z\s]+$/.test(line) ||
        line.toUpperCase() === line ||
        line.endsWith(":")
      ) {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<h3 style="color:#2a5d84; margin-bottom: 8px;">${line}</h3>`;
        continue;
      }

      // Detect bullet list items
      if (/^[-*]\s+/.test(line)) {
        if (!inList) {
          html += "<ul style='margin-left:20px; margin-bottom: 15px;'>";
          inList = true;
        }
        let item = line.replace(/^[-*]\s+/, "");

        // Highlight bold topic if present: starts with word(s) + colon
        item = item.replace(
          /^([^:]+):\s*/,
          (_, label) => `<strong>${label}:</strong> `
        );

        html += `<li style="margin-bottom: 6px;">${item}</li>`;
        continue;
      }

      // Normal paragraph line
      if (inList) {
        html += "</ul>";
        inList = false;
      }

      // Highlight bold topic if present at start of paragraph
      const formattedLine = line.replace(
        /^([^:]+):\s*/,
        (_, label) => `<strong>${label}:</strong> `
      );

      html += `<p style="margin-bottom: 12px;">${formattedLine}</p>`;
    }

    // Close list if text ends with list items
    if (inList) {
      html += "</ul>";
      inList = false;
    }

    return html;
  } catch (err) {
    console.error(err);
    return `<p style="color:red;">Error fetching text result</p>`;
  }
}
