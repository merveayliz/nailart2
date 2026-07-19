const nailDesigns = [
  ['img/1.jpg','Lavender Outline','art'],
  ['img/2.jpg','Violet Waves','dark'],
  ['img/3.jpg','Cosmic Flame','dark'],
  ['img/4.jpg','Cherry Web','dark'],
  ['img/5.jpg','Burgundy Marble','dark'],
  ['img/6.jpg','Wine Petals','dark'],
  ['img/7.jpg','Midnight Gold','dark'],
  ['img/8.jpg','Ruby Web','dark'],
  ['img/11.jpg','Golden Glow','soft'],
  ['img/22.jpg','Summer Charm','season'],
  ['img/33.jpg','Daisy Picnic','season'],
  ['img/44.jpg','Ladybug Garden','season'],
  ['img/55.jpg','Sunflower Mood','season'],
  ['img/66.jpg','Sea Whisper','soft'],
  ['img/77.jpg','Pastel Stardust','soft'],
  ['img/88.jpg','Wildflower Day','art']
];

const browDesigns = [
  ['img/k1.jpg', 'Lash Lifting Classic', 'lash'],
  ['img/k2.jpg', 'Brow Laminations', 'brow'],
  ['img/k3.jpg', 'HD Brow Styling', 'brow'],
  ['img/k4.jpg', 'Volume Lashes', 'lash'],
  ['img/k5.jpg', 'Natural Brow Look', 'brow'],
  ['img/k6.jpg', 'Lash & Brow Combo', 'combo']
];

let currentGalleryType = 'nail-art';

const gallery = document.querySelector('#galleryGrid');
const dialog = document.querySelector('#lightbox');
const lightboxImg = dialog.querySelector('img');
const caption = dialog.querySelector('figcaption');
let shown = [], current = 0;

function updateFilters() {
  const filterContainer = document.querySelector('#galleryFilters');
  if (currentGalleryType === 'nail-art') {
    filterContainer.innerHTML = `
      <button class="active" data-filter="all">Tümü</button>
      <button data-filter="soft">Soft & Sweet</button>
      <button data-filter="dark">Dark & Bold</button>
      <button data-filter="season">Seasonal</button>
      <button data-filter="art">Artistic</button>
    `;
  } else {
    filterContainer.innerHTML = `
      <button class="active" data-filter="all">Tümü</button>
      <button data-filter="brow">Kaş Tasarım</button>
      <button data-filter="lash">Kirpik Lifting</button>
      <button data-filter="combo">Paketler</button>
    `;
  }

  filterContainer.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
    filterContainer.querySelector('.active').classList.remove('active');
    btn.classList.add('active');
    render(btn.dataset.filter);
  }));
}

function render(filter='all') {
  const activeData = currentGalleryType === 'nail-art' ? nailDesigns : browDesigns;
  shown = filter === 'all' ? activeData : activeData.filter(x => x[2] === filter);
  gallery.innerHTML = shown.map((d, i) => `
    <button class="gallery-item animate-fade" data-index="${i}">
      <img src="${d[0]}" alt="${d[1]} tasarımı" loading="lazy">
      <span>${d[1]}</span>
    </button>
  `).join('');
}

function selectCategory(type) {
  currentGalleryType = type;
  updateFilters();
  render('all');

  const switcher = document.querySelector('#gallerySwitcher');
  const eyebrow = document.querySelector('#galleryEyebrow');
  const title = document.querySelector('#galleryTitle');

  if (type === 'nail-art') {
    eyebrow.textContent = 'STÜDYO GÜNLÜĞÜ';
    title.textContent = 'Nail Art Tasarımlarımız';
    switcher.textContent = 'Kaş & Kirpiğe Geç 👁️ ↗';
  } else {
    eyebrow.textContent = 'BAKIŞLARIN SIRRI';
    title.textContent = 'Kaş & Kirpik Portfolyomuz';
    switcher.textContent = 'Nail Art Galerisine Geç 💅 ↗';
  }

  document.querySelector('#galeri').scrollIntoView({ behavior: 'smooth' });
}

function toggleGalleryType() {
  const nextType = currentGalleryType === 'nail-art' ? 'lash-brow' : 'nail-art';
  selectCategory(nextType);
}

function openLightbox(index){
  current = index; 
  const d = shown[current];
  lightboxImg.src = d[0];
  lightboxImg.alt = d[1];
  caption.textContent = d[1];
  dialog.showModal();
}

gallery.addEventListener('click', e => {
  const item = e.target.closest('.gallery-item');
  if (item) openLightbox(+item.dataset.index);
});

function step(delta){
  current = (current + delta + shown.length) % shown.length;
  const d = shown[current];
  lightboxImg.src = d[0];
  lightboxImg.alt = d[1];
  caption.textContent = d[1];
}

dialog.querySelector('.close').onclick = () => dialog.close();
dialog.querySelector('.prev').onclick = () => step(-1);
dialog.querySelector('.next').onclick = () => step(1);
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
document.addEventListener('keydown', e => {
  if (!dialog.open) return;
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});

document.querySelector('.menu-toggle').addEventListener('click', function(){
  const nav = document.querySelector('.site-header nav');
  nav.classList.toggle('open');
  this.setAttribute('aria-expanded', nav.classList.contains('open'));
});
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => document.querySelector('nav').classList.remove('open')));

document.querySelector('#bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const message = `Merhaba Luna Studio!%0A%0ARandevu talebi bırakmak istiyorum.%0A%0A*Ad Soyad:* ${encodeURIComponent(data.get('name'))}%0A*İşlem:* ${encodeURIComponent(data.get('service'))}%0A*Tercih edilen gün:* ${encodeURIComponent(data.get('date'))}%0A*Not:* ${encodeURIComponent(data.get('note') || '-')}`;
  window.open(`https://wa.me/905555555555?text=${message}`, '_blank', 'noopener');
});

updateFilters();
render();
