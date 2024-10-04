import { works } from "../js/helpers.js";

const pageId = document.body.getAttribute("data-page-id");

if (pageId === "home") {
  const videos = document.querySelectorAll(".home-video");

  const setVideo = (video, time) => {
    video.currentTime = time;
    video.addEventListener("mouseenter", function () {
      video.currentTime = 0;
      video.play();
    });
    video.addEventListener("mouseleave", function () {
      video.currentTime = time;
      video.pause();
    });
  };

  videos.forEach((video) => {
    const name = video.getAttribute("name");
    if (name == "hqses") {
      setVideo(video, 1);
    } else if (name == "beast-mode") {
      setVideo(video, 4);
    } else if (name == "matame") {
      setVideo(video, 0);
    } else if (name == "lqtd") {
      setVideo(video, 8);
    } else if (name == "jfk") {
      setVideo(video, 0);
    } else if (name == "ismael") {
      setVideo(video, 0);
    } else if (name == "afro-groove") {
      setVideo(video, 1.35);
    } else if (name == "verdad") {
      setVideo(video, 1);
    } else if (name == "samhain") {
      setVideo(video, 3.99);
    }
  });
}

const initializeGalleryArray = (images, path, alt) => {
  const galleryArray = [];
  images.forEach((image, i) => {
    if (i < 10) {
      i = `0${i}`;
    }
    galleryArray.push({
      src: `${path}${image}`,
      alt: `${alt} ${i + 1}`,
    });
  });
  return galleryArray;
};

document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.querySelector(".anita-grid-gallery");

  const galleries = {
    matameLaDuda: initializeGalleryArray(
      works.matameLaDuda,
      "artists/johan-sanabria/matame-la-duda/",
      "Matame La Duda by Johan Sanabria- Photo"
    ),
    ismael: initializeGalleryArray(
      works.ismael,
      "artists/mateo/ismael/",
      "Ismael by Mateo - Photo"
    ),
    hqses: initializeGalleryArray(
      works.hqses,
      "artists/vers-h-man/hqses/",
      "Hasta Que Salga El Sol by Vers-H-Man - Photo"
    ),
    beastMode: initializeGalleryArray(
      works.beastMode,
      "artists/da-ink/beast-mode/",
      "Beast Mode by Da Ink - Photo"
    ),
    samhain: initializeGalleryArray(
      works.samhain,
      "artists/samhain/samhain-1/",
      "Samhain - Photo"
    ),
    lqtd: initializeGalleryArray(
      works.lqtd,
      "artists/mariana/lqtd/",
      "Las Que Te Dediqué by Mariana Gueza - Photo"
    ),
    jfk: [],
    afroGroove: [],
    laVerdad: initializeGalleryArray(
      works.laVerdad,
      "artists/jean-salcedo/la-verdad/",
      "La Verdad by Jean Salcedo - Photo"
    ),
    about: [
      initializeGalleryArray(
        works.samhain,
        "artists/samhain/samhain-1/",
        "Tropos Team - Photo"
      ),
    ],
  };

  const gallery = galleries[pageId] || [];

  // Create an array to store promises for each image load
  const imageLoadPromises = [];

  gallery.forEach((image, index) => {
    const img = new Image();
    img.src = `../img/${image.src}`;
    img.alt = `${image.alt}${index + 1}`;

    const imgLoadPromise = new Promise((resolve, reject) => {
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (err) => reject(err);
    });

    imageLoadPromises.push(imgLoadPromise);
  });

  // Wait for all image promises to resolve
  Promise.all(imageLoadPromises)
    .then((images) => {
      images.forEach((img) => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("anita-grid-gallery-item");

        const gridItemInner = document.createElement("div");
        gridItemInner.classList.add("anita-grid-item__inner");

        const gridItemImage = document.createElement("div");
        gridItemImage.classList.add("anita-grid-item__image");

        img.classList.add("anita-lazy");
        img.dataset.src = img.src;

        gridItemImage.appendChild(img);
        gridItemInner.appendChild(gridItemImage);

        const link = document.createElement("a");
        link.classList.add("anita-lightbox-link");
        link.href = img.src;
        link.dataset.size = `${img.width}x${img.height}`;

        gridItemInner.appendChild(link);
        galleryItem.appendChild(gridItemInner);
        galleryContainer.appendChild(galleryItem);
      });

      // Dispatch custom event after gallery is created
      const galleryCreatedEvent = new Event("galleryCreated");
      document.dispatchEvent(galleryCreatedEvent);
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });
});
