const btn = document.getElementById("btn");
const displays = document.getElementById("display");

document.getElementById("input").addEventListener("keypress",(event)=>{
    if (event.key === "Enter"){
        event.preventDefault()

        btn.click()
    }
})

btn.addEventListener("click", () => {
  const input = document.getElementById("input").value; 
  const url = `https://api.jikan.moe/v4/anime?q=${input}&sfw`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
      data.data.forEach((item) => {
        const anime = item;
        const imageUrl = anime.images.jpg.image_url;
        const animeDataDiv = document.createElement("div");
        animeDataDiv.innerHTML = `
          <p><b>Title:</b> ${anime.title}</p>
          <img src="${imageUrl}" alt="${anime.title}">
          <p><b>Synopsis:</b> ${anime.synopsis}</p>
          <p><b>Type:</b> ${anime.type}</p>
          <p><b>Total Episodes:</b> ${anime.episodes}</p>
        `;
        displays.appendChild(animeDataDiv);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
