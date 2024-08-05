const btn = document.getElementById("btn");
const displays = document.getElementById("display");

document.getElementById("input").addEventListener("keypress", event => {
  if (event.key === "Enter") {
    event.preventDefault();

    btn.click();
  }
});

btn.addEventListener("click", () => {
  const input = document.getElementById("input").value.trim();
  if (input === "") {
    console.log("empty");
  } else {
    const url = `https://api.jikan.moe/v4/anime?q=${input}&sfw`;
    displays.innerHTML = "";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.data.forEach(item => {
          const anime = item;
          const imageUrl =
            anime.images.jpg.image_url || anime.images.jpg.large_image_url;
          const animeUrl = document.createElement("a");
          animeUrl.href = anime.url;
          animeUrl.innerHTML = `
          <div>
            <img src="${imageUrl}" alt="${anime.title}">
            <p>${anime.title}</p>
          </div>
          `;
          displays.appendChild(animeUrl);
        });
      })
      .catch(error => console.error("Error fetching data:", error));
  }
});
