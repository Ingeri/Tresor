export default async function handleImage(prompt) {
  const API_KEY = "sk-qArlvfVDBH0arW9Fkpp4pLitJxbdxcAvTGgw77Q6kPPWFtpi"; // Replace with your real key
  const url =
    "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 512,
        width: 512,
        steps: 30,
        samples: 1,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("API Error:", err);
      return `<p style="color:red;">❌ ${
        err.message || response.statusText
      }</p>`;
    }

    const data = await response.json();
    const base64Image = data.artifacts?.[0]?.base64;

    if (!base64Image) {
      return `<p>No image generated.</p>`;
    }

    return `<img src="data:image/png;base64,${base64Image}" alt="${prompt}" style="max-width:100%; border-radius:10px;" />`;
  } catch (error) {
    console.error("Network/Error:", error);
    return `<p style="color:red;">❌ Failed to generate image</p>`;
  }
}
