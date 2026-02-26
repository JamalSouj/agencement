// ============================================
// Portfolio — Static projects data, masonry grid, filters
// ============================================

import { fetchAPI } from './api.js';

const filtersContainer = document.getElementById('portfolioFilters');
const gridContainer = document.getElementById('portfolioGrid');

let activeFilter = 'all';
let allProjects = []; // Will be populated from API
let categories = []; // Will be populated from API

// Color palette for project card placeholders
const cardColors = [
    'linear-gradient(135deg, #1a1510, #2a2015)',
    'linear-gradient(135deg, #151a18, #152a22)',
    'linear-gradient(135deg, #1a1518, #2a1520)',
    'linear-gradient(135deg, #15171a, #15202a)',
    'linear-gradient(135deg, #1a1a15, #2a2a15)',
    'linear-gradient(135deg, #181518, #28152a)',
    'linear-gradient(135deg, #151a1a, #152a2a)',
    'linear-gradient(135deg, #1a1815, #2a2215)',
];

async function init() {
    try {
        // Fetch categories and projects in parallel
        const [catsData, projsData] = await Promise.all([
            fetchAPI('/categories'),
            fetchAPI('/projects')
        ]);

        categories = catsData;
        allProjects = projsData;

        renderFilters();
        renderProjects(allProjects);
    } catch (err) {
        console.error("Error initializing portfolio:", err);
        gridContainer.innerHTML = `<p class="portfolio-empty" style="color: var(--error);">Impossible de charger les projets. Veuillez réessayer plus tard.</p>`;
    } finally {
        if (typeof window.updateContent === 'function') {
            window.updateContent();
        }
    }
}

function renderFilters() {
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Tous';
    allBtn.dataset.slug = 'all';
    allBtn.setAttribute('data-i18n', 'portfolio.filter.all');
    allBtn.addEventListener('click', () => handleFilter('all'));
    filtersContainer.appendChild(allBtn);

    categories.forEach((cat) => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = cat.name;
        btn.dataset.slug = cat.slug;
        btn.addEventListener('click', () => handleFilter(cat.slug));
        filtersContainer.appendChild(btn);
    });
}

function handleFilter(slug) {
    activeFilter = slug;

    // Update active button
    filtersContainer.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.slug === slug);
    });

    // Filter projects
    const filtered =
        slug === 'all'
            ? allProjects
            : allProjects.filter((p) => p.category_slug === slug);

    renderProjects(filtered);
}

function renderProjects(projects) {
    if (projects.length === 0) {
        gridContainer.innerHTML = `<p class="portfolio-empty">Aucun projet dans cette catégorie.</p>`;
        return;
    }

    gridContainer.innerHTML = projects
        .map(
            (project, i) => `
      <div class="project-card" data-id="${project.id}">
        <div class="project-card-image" style="background: ${cardColors[i % cardColors.length]}; ${project.image_url ? `background-image: url(http://localhost:3000${project.image_url}); background-size: cover; background-position: center;` : ''}">
          <div class="project-card-overlay">
            <div>
              <span style="color: var(--accent); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">${project.category_name || ''}</span>
            </div>
          </div>
        </div>
        <div class="project-card-info">
          <span class="project-card-category">${project.category_name || 'Non classé'}</span>
          <h3 class="project-card-title">${project.title}</h3>
          <span class="project-card-client">${project.client || ''}</span>
          ${project.description ? `<p class="project-card-desc">${project.description}</p>` : ''}
        </div>
      </div>
    `
        )
        .join('');

    // Attach click listeners for Lightbox
    const cards = gridContainer.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.dataset.id, 10);
            const project = allProjects.find(p => p.id === projectId);
            if (project) {
                openLightbox(project);
            }
        });
    });
}

// ============================================
// Lightbox Logic
// ============================================
const lightbox = document.getElementById('portfolioLightbox');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClient = document.getElementById('lightboxClient');
const lightboxDesc = document.getElementById('lightboxDesc');

function openLightbox(project) {
    if (!lightbox) return;

    // Set content
    // Use placehold.co or Unsplash if there is no image_url explicitly defined
    lightboxImg.src = project.image_url ? `http://localhost:3000${project.image_url}` : `https://images.unsplash.com/photo-1622372737637-25e1742deee9?auto=format&fit=crop&q=80&w=1200&sig=${project.id}`;
    lightboxCategory.textContent = project.category_name;
    lightboxTitle.textContent = project.title;
    lightboxClient.textContent = project.client ? `Client: ${project.client}` : '';
    lightboxDesc.textContent = project.description;

    // Open modal
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // disable page scroll
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

if (lightboxClose && lightboxOverlay) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
}

init();
