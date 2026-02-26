import { fetchAPI, API_BASE_URL } from './api.js';

// DOM Elements
const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.dashboard-section');

// Projects
const projectsTableBody = document.getElementById('projectsTableBody');
const addProjectBtn = document.getElementById('addProjectBtn');
const projectModal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const modalTitle = document.getElementById('modalTitle');
const projectCategorySelect = document.getElementById('projectCategory');

// Messages
const messagesGrid = document.getElementById('messagesGrid');

let allCategories = [];
let allProjects = [];

// ============================================
// Auth & Initialization
// ============================================

async function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;

    try {
        await fetchAPI('/auth/verify');
        return true;
    } catch (err) {
        localStorage.removeItem('adminToken');
        return false;
    }
}

async function initAdmin() {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    loginView.classList.add('active');
    dashboardView.classList.remove('active');
}

async function showDashboard() {
    loginView.classList.remove('active');
    dashboardView.classList.add('active');

    // Load initial data
    await loadCategories();
    await loadProjects();
    await loadMessages();
}

// ============================================
// Login Logic
// ============================================
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        const res = await fetchAPI('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        localStorage.setItem('adminToken', res.token);
        loginForm.reset();
        showDashboard();
    } catch (err) {
        loginError.textContent = 'Identifiants incorrects.';
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    showLogin();
});

// ============================================
// Navigation Logic
// ============================================
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Update active nav
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Update active section
        const targetId = `section-${item.dataset.target}`;
        sections.forEach(sec => {
            if (sec.id === targetId) sec.classList.add('active');
            else sec.classList.remove('active');
        });
    });
});

// ============================================
// Data Loading
// ============================================
async function loadCategories() {
    try {
        allCategories = await fetchAPI('/categories');

        // Populate Select
        projectCategorySelect.innerHTML = '<option value="">Sélectionnez une catégorie...</option>';
        allCategories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.textContent = cat.name;
            projectCategorySelect.appendChild(opt);
        });
    } catch (err) {
        console.error('Error loading categories:', err);
    }
}

async function loadProjects() {
    try {
        allProjects = await fetchAPI('/projects');
        renderProjectsTable();
    } catch (err) {
        console.error('Error loading projects:', err);
    }
}

async function loadMessages() {
    try {
        const messages = await fetchAPI('/contact');
        renderMessages(messages);
    } catch (err) {
        console.error('Error loading messages:', err);
    }
}

// ============================================
// Rendering
// ============================================
function renderProjectsTable() {
    projectsTableBody.innerHTML = allProjects.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td>
                ${p.image_url ? `<img src="http://localhost:3000${p.image_url}" alt="${p.title}">` : '<div style="width: 60px; height: 40px; background: var(--bg-secondary); border-radius: 4px;"></div>'}
            </td>
            <td><strong>${p.title}</strong></td>
            <td><span class="section-tag" style="margin: 0;">${p.category_name}</span></td>
            <td>${p.client || '-'}</td>
            <td>
                <div class="action-btns">
                    <button class="btn-small btn-edit" onclick="window.editProject(${p.id})">Éditer</button>
                    <button class="btn-small btn-delete" onclick="window.deleteProject(${p.id})">Supprimer</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderMessages(messages) {
    if (messages.length === 0) {
        messagesGrid.innerHTML = '<p>Aucun message reçu pour le moment.</p>';
        return;
    }

    messagesGrid.innerHTML = messages.map(m => `
        <div class="message-card">
            <div class="msg-header">
                <span class="msg-name">${m.name}</span>
                <span class="msg-date">${new Date(m.created_at).toLocaleDateString()}</span>
            </div>
            <div class="msg-info">
                <span>📧 ${m.email}</span>
                ${m.phone ? `<span>📞 ${m.phone}</span>` : ''}
            </div>
            <div class="msg-body">
                ${m.message.replace(/\n/g, '<br>')}
            </div>
            <button class="btn-small btn-delete" onclick="window.deleteMessage(${m.id})">Supprimer</button>
        </div>
    `).join('');
}

// ============================================
// Modal & Form Logic
// ============================================
addProjectBtn.addEventListener('click', () => {
    projectForm.reset();
    document.getElementById('projectId').value = '';
    modalTitle.textContent = 'Nouveau Projet';
    projectModal.classList.add('open');
});

function closeModal() {
    projectModal.classList.remove('open');
}

modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);

projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Create FormData because we might have a file upload
    const formData = new FormData();
    formData.append('title', document.getElementById('projectTitle').value);
    formData.append('category_id', projectCategorySelect.value);
    formData.append('client', document.getElementById('projectClient').value);
    formData.append('description', document.getElementById('projectDesc').value);

    const imageFile = document.getElementById('projectImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    const projectId = document.getElementById('projectId').value;
    const isEditing = !!projectId;
    const url = isEditing ? `/projects/${projectId}` : '/projects';
    const method = isEditing ? 'PUT' : 'POST';

    try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${API_BASE_URL}${url}`, {
            method: method,
            headers: {
                // Must NOT set Content-Type header manually when using FormData
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error);
        }

        closeModal();
        await loadProjects(); // Refresh table
    } catch (err) {
        alert('Erreur lors de l\'enregistrement : ' + err.message);
    }
});

// ============================================
// Global functions for inline HTML onclick handlers
// ============================================
window.editProject = (id) => {
    const p = allProjects.find(x => x.id === id);
    if (!p) return;

    projectForm.reset();
    document.getElementById('projectId').value = p.id;
    document.getElementById('projectTitle').value = p.title;
    document.getElementById('projectCategory').value = p.category_id;
    document.getElementById('projectClient').value = p.client || '';
    document.getElementById('projectDesc').value = p.description || '';

    modalTitle.textContent = 'Modifier le Projet';
    projectModal.classList.add('open');
};

window.deleteProject = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    try {
        await fetchAPI(`/projects/${id}`, { method: 'DELETE' });
        await loadProjects(); // Refresh
    } catch (err) {
        alert('Erreur lors de la suppression : ' + err.message);
    }
};

window.deleteMessage = async (id) => {
    if (!confirm('Voulez-vous vraiment supprimer ce message ?')) return;
    try {
        await fetchAPI(`/contact/${id}`, { method: 'DELETE' });
        await loadMessages(); // Refresh

        // If a user clicks delete from the contact form, need to clear dummy contacts on screen
        let msgCards = document.querySelectorAll('.message-card');
        // This is a UI update
    } catch (err) {
        alert('Erreur lors de la suppression : ' + err.message);
    }
}

// Start app
initAdmin();
