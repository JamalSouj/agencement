// ============================================
// Portfolio — Static projects data, masonry grid, filters
// ============================================

const filtersContainer = document.getElementById('portfolioFilters');
const gridContainer = document.getElementById('portfolioGrid');

let activeFilter = 'all';

// Static categories data
const categories = [
    { id: 1, name: 'Bancaire', slug: 'bancaire' },
    { id: 2, name: 'Commercial', slug: 'commercial' },
    { id: 3, name: 'Hôtellerie', slug: 'hotellerie' },
    { id: 4, name: 'Industriel', slug: 'industriel' },
];

// Static projects data — edit this array to add/remove projects
const allProjects = [
    {
        id: 1,
        title: 'Agence Bancaire — Casablanca',
        client: 'Banque Populaire',
        category_name: 'Bancaire',
        category_slug: 'bancaire',
        description: 'Aménagement complet d\'une agence bancaire avec mobilier sur-mesure et habillage bois.',
        image_url: '',
    },
    {
        id: 2,
        title: 'Boutique Luxe — Marrakech',
        client: 'Client Privé',
        category_name: 'Commercial',
        category_slug: 'commercial',
        description: 'Conception et réalisation d\'un espace commercial haut de gamme.',
        image_url: '',
    },
    {
        id: 3,
        title: 'Hôtel 5 Étoiles — Rabat',
        client: 'Groupe Hôtelier',
        category_name: 'Hôtellerie',
        category_slug: 'hotellerie',
        description: 'Agencement des suites et espaces communs d\'un hôtel de prestige.',
        image_url: '',
    },
    {
        id: 4,
        title: 'Siège Social — Casablanca',
        client: 'Entreprise Industrielle',
        category_name: 'Industriel',
        category_slug: 'industriel',
        description: 'Rénovation et aménagement d\'un siège social avec cloisons et mobilier technique.',
        image_url: '',
    },
    {
        id: 5,
        title: 'Centre d\'Affaires — Tanger',
        client: 'CIH Bank',
        category_name: 'Bancaire',
        category_slug: 'bancaire',
        description: 'Agencement d\'un centre d\'affaires bancaire moderne.',
        image_url: '',
    },
    {
        id: 6,
        title: 'Restaurant Gastronomique — Fès',
        client: 'Chef Étoilé',
        category_name: 'Hôtellerie',
        category_slug: 'hotellerie',
        description: 'Création d\'un intérieur chaleureux mêlant bois noble et modernité.',
        image_url: '',
    },
];

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

function init() {
    renderFilters();
    renderProjects(allProjects);
}

function renderFilters() {
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Tous';
    allBtn.dataset.slug = 'all';
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
        <div class="project-card-image" style="background: ${cardColors[i % cardColors.length]}; ${project.image_url ? `background-image: url(${project.image_url}); background-size: cover; background-position: center;` : ''}">
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
    lightboxImg.src = project.image_url || `https://images.unsplash.com/photo-1622372737637-25e1742deee9?auto=format&fit=crop&q=80&w=1200&sig=${project.id}`;
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
