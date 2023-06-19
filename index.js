// index.js

const unsplashAccessKey = "v5Bx5AuGAZwCzNuSo_NH5chn1znvkFvQSX_Kc_6URRk";
const specialtySandwichesContainer = document.getElementById("specialty-sandwiches-container");

fetch(`https://api.unsplash.com/photos/random?query=sandwich&count=10&client_id=${unsplashAccessKey}`)
  .then(response => response.json())
  .then(data => {
    data.forEach(photo => {
      const img = document.createElement("img");
      img.src = photo.urls.regular;
      img.alt = photo.alt_description;
      specialtySandwichesContainer.appendChild(img);
    });
  })
  .catch(error => {
    console.log("Error fetching images:", error);
  });
