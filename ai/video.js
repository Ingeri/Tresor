export default async function handleVideo(prompt) {
  try {
    const query = encodeURIComponent(prompt);
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=AIzaSyBFkqZRYwOzYFcGUeNLJs2gc7X3v2k02Qs`
    );
    const data = await res.json();
    const videoId = data.items?.[0]?.id?.videoId;
    if (!videoId) return `<p>No videos found.</p>`;

    return `
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/${videoId}"
          title="YouTube video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;
  } catch (err) {
    console.error(err);
    return `<p style="color:red;">Error fetching video</p>`;
  }
}
