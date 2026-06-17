const rolls = [
  {
    id: "new-mexico",
    title: "New Mexico",
    frames: [
      "gallery/new-mexico/featured.jpg",
      "gallery/new-mexico/nm0.JPG",
      "gallery/new-mexico/nm1.JPG",
      "gallery/new-mexico/nm3.JPG",
      "gallery/new-mexico/nm4.JPG",
    ],
  },
  {
    id: "alaska",
    title: "Alaska",
    frames: [
      "gallery/alaska/09B37259-5F14-45D5-ABB9-CEACA2B272BB.jpeg",
      "gallery/alaska/4870dd6ee7d23826ff47c26b04ce1a23.jpeg",
      "gallery/alaska/L1003594 (1).jpeg",
      "gallery/alaska/L1003594.jpeg",
      "gallery/alaska/L1003754.jpeg",
      "gallery/alaska/L1040421.jpeg",
      "gallery/alaska/L1040451.jpeg",
      "gallery/alaska/L1040733-2.jpeg",
      "gallery/alaska/L1040840-2.jpeg",
      "gallery/alaska/L1050025.jpeg",
    ],
  },
  {
    id: "huangshan",
    title: "Huangshan",
    frames: [
      "gallery/huangshan/L1080492.jpeg",
      "gallery/huangshan/L1080531.jpeg",
      "gallery/huangshan/L1080570.jpeg",
      "gallery/huangshan/L1080620.jpeg",
      "gallery/huangshan/L1080649.jpeg",
      "gallery/huangshan/L1080875.jpeg",
      "gallery/huangshan/L1080888.jpeg",
      "gallery/huangshan/L1090206.jpeg",
      "gallery/huangshan/L1090218.jpeg",
      "gallery/huangshan/L1090418.jpeg",
    ],
  },
  {
    id: "montauk",
    title: "Montauk",
    frames: [
      "gallery/montauk/L1110680.jpeg",
      "gallery/montauk/L1110710-2.jpeg",
      "gallery/montauk/L1110757.jpeg",
      "gallery/montauk/L1110798-2.jpeg",
      "gallery/montauk/L1110803.jpeg",
      "gallery/montauk/L1110876.jpeg",
    ],
  },
  {
    id: "nyc",
    title: "NYC",
    frames: [
      "gallery/nyc/0604300_0080.jpeg",
      "gallery/nyc/IMG_1647.jpeg",
      "gallery/nyc/IMG_1659.jpeg",
      "gallery/nyc/L1110007-2.jpg",
      "gallery/nyc/L1140197.jpg",
      "gallery/nyc/L1150290.jpg",
      "gallery/nyc/L1150312-2.jpg",
      "gallery/nyc/R0011589.jpg",
      "gallery/nyc/R0011590.jpg",
      "gallery/nyc/R0011602.jpg",
      "gallery/nyc/R0011681.jpg",
    ],
  },
  {
    id: "shanghai",
    title: "Shanghai",
    frames: ["gallery/shanghai/R0007704.jpg"],
  },
  {
    id: "tokyo",
    title: "Tokyo",
    frames: ["gallery/tokyo/L1160201.jpg", "gallery/tokyo/L1160324.jpg"],
  },
  {
    id: "washington",
    title: "Washington",
    frames: [
      "gallery/washington/02-DO1010161.jpg",
      "gallery/washington/03-L1000633.jpg",
      "gallery/washington/04-L1010509.jpg",
      "gallery/washington/05-图书馆阅览室-Leica.jpg",
      "gallery/washington/06-IMG_4385.jpg",
      "gallery/washington/06-图书馆壁画-Leica.jpg",
      "gallery/washington/07-Ebbitt酒吧-Leica.jpg",
      "gallery/washington/08-图书馆楼梯-Leica.jpg",
      "gallery/washington/12-Mall鸟瞰-Leica.jpg",
      "gallery/washington/DO1010300.jpg",
      "gallery/washington/L1000624.jpg",
      "gallery/washington/L1000670.jpg",
      "gallery/washington/L1010539.jpg",
    ],
  },
];

const root = document.getElementById("roll-detail-root");
const galleryTitle = document.getElementById("gallery-title");
const galleryNote = document.getElementById("gallery-note");
const galleryCount = document.getElementById("gallery-count");
let activeRoll = rolls[0];
let activeFrames = [];

function frameNumber(index) {
  return String(index + 1).padStart(2, "0");
}

function getRoll(id) {
  return rolls.find((roll) => roll.id === id) || rolls[0];
}

function setActiveCard(rollId) {
  document.querySelectorAll(".series-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.roll === rollId);
  });
}

function renderGallery(rollId, shouldScroll = false) {
  activeRoll = getRoll(rollId);
  activeFrames = activeRoll.frames.map((src, index) => ({
    src,
    roll: activeRoll,
    index,
  }));

  galleryTitle.textContent = activeRoll.title;
  galleryNote.textContent = "";
  galleryCount.textContent = `${String(activeRoll.frames.length).padStart(2, "0")} frames`;
  setActiveCard(activeRoll.id);

  root.replaceChildren();

  const section = document.createElement("section");
  section.className = "roll-panel is-active";
  section.id = `roll-${activeRoll.id}`;

  const grid = document.createElement("div");
  grid.className = "roll-frame-grid";

  activeRoll.frames.forEach((src, index) => {
    const button = document.createElement("button");
    button.className = "roll-frame";
    button.type = "button";
    button.dataset.src = src;
    button.setAttribute("aria-label", `Open ${activeRoll.title} frame ${frameNumber(index)}`);

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = encodeURI(src);
    img.alt = `${activeRoll.title} frame ${frameNumber(index)}`;

    const meta = document.createElement("span");
    meta.textContent = frameNumber(index);

    button.append(img, meta);
    grid.append(button);
  });

  section.append(grid);
  root.append(section);

  if (shouldScroll) {
    document.getElementById("gallery").scrollIntoView({ block: "start" });
  }
}

function createLightbox() {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close image">Close</button>
    <button class="lightbox-nav prev" type="button" aria-label="Previous image">Prev</button>
    <figure>
      <img alt="">
      <figcaption></figcaption>
    </figure>
    <button class="lightbox-nav next" type="button" aria-label="Next image">Next</button>
  `;
  document.body.append(lightbox);
  return lightbox;
}

const lightbox = createLightbox();
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
let activeFrameIndex = 0;

function showFrame(index) {
  activeFrameIndex = (index + activeFrames.length) % activeFrames.length;
  const frame = activeFrames[activeFrameIndex];
  lightboxImage.src = encodeURI(frame.src);
  lightboxImage.alt = `${frame.roll.title} frame ${frameNumber(frame.index)}`;
  lightboxCaption.textContent = `${frame.roll.title} / ${frameNumber(frame.index)}`;
}

function openLightbox(src) {
  const index = activeFrames.findIndex((frame) => frame.src === src);
  showFrame(index >= 0 ? index : 0);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

renderGallery("new-mexico");

document.addEventListener("click", (event) => {
  const seriesCard = event.target.closest(".series-card");
  if (seriesCard?.dataset.roll) {
    event.preventDefault();
    renderGallery(seriesCard.dataset.roll, true);
    history.replaceState(null, "", `#gallery/${seriesCard.dataset.roll}`);
    return;
  }

  const frameButton = event.target.closest(".roll-frame");
  if (frameButton) {
    openLightbox(frameButton.dataset.src);
    return;
  }

  if (event.target.closest(".lightbox-close")) {
    closeLightbox();
    return;
  }

  if (event.target.closest(".lightbox-nav.prev")) {
    showFrame(activeFrameIndex - 1);
    return;
  }

  if (event.target.closest(".lightbox-nav.next")) {
    showFrame(activeFrameIndex + 1);
    return;
  }

  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showFrame(activeFrameIndex - 1);
  if (event.key === "ArrowRight") showFrame(activeFrameIndex + 1);
});
