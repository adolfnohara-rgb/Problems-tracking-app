// ===============================
// API CONFIG
// ===============================
const API_BASE_URL = 'http://localhost:3000/api';


// ===============================
// DOM ELEMENTS (SAFE)
// ===============================
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const contactForm = document.getElementById('contactForm');
const issuesList = document.getElementById('issuesList');
const statusFilter = document.getElementById('statusFilter');
const searchInput = document.getElementById('searchInput');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadingOverlay = document.getElementById('loadingOverlay');


// ===============================
// GLOBAL STATE
// ===============================
let allIssues = [];
let filteredIssues = [];
let displayedIssues = [];
let currentPage = 1;
const issuesPerPage = 6;


// ===============================
// INIT
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadPublicIssues();
    checkAuthStatus();
    initializeAnimations();
});


// ===============================
// EVENT LISTENERS
// ===============================
function setupEventListeners() {

    // Login buttons
    ['loginBtn', 'heroLoginBtn', 'ctaLoginBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => openModal(loginModal));
    });

    // Signup buttons
    ['signupBtn', 'heroSignupBtn', 'ctaSignupBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => openModal(signupModal));
    });

    // Close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Switch login/signup
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');

    if (switchToSignup) {
        switchToSignup.addEventListener('click', e => {
            e.preventDefault();
            closeModals();
            setTimeout(() => openModal(signupModal), 100);
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', e => {
            e.preventDefault();
            closeModals();
            setTimeout(() => openModal(loginModal), 100);
        });
    }

    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
    if (contactForm) contactForm.addEventListener('submit', handleContactForm);

    if (statusFilter) statusFilter.addEventListener('change', filterIssues);
    if (searchInput) searchInput.addEventListener('input', debounce(filterIssues, 300));

    if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMoreIssues);

    window.addEventListener('click', e => {
        if (e.target === loginModal || e.target === signupModal) {
            closeModals();
        }
    });

    window.addEventListener('scroll', handleNavbarScroll);
}


// ===============================
// MODALS
// ===============================
function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModals() {
    if (loginModal) loginModal.style.display = 'none';
    if (signupModal) signupModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}


// ===============================
// AUTH (DEMO SAFE)
// ===============================
async function handleLogin(e) {
    e.preventDefault();
    showLoadingOverlay(true);

    try {
        await simulateApiCall();

        const user = { role: 'citizen' };
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify(user));

        showMessage('Login successful!', 'success');
        closeModals();

        setTimeout(() => {
            window.location.href = 'citizen.html';
        }, 1000);

    } catch {
        showMessage('Login failed', 'error');
    } finally {
        showLoadingOverlay(false);
    }
}

async function handleSignup(e) {
    e.preventDefault();
    showLoadingOverlay(true);

    try {
        await simulateApiCall();
        showMessage('Signup successful! Please login.', 'success');
        closeModals();
    } catch {
        showMessage('Signup failed', 'error');
    } finally {
        showLoadingOverlay(false);
    }
}

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');

    if (loginBtn) loginBtn.innerText = 'Dashboard';
    if (signupBtn) signupBtn.style.display = 'none';
}


// ===============================
// ISSUES
// ===============================
async function loadPublicIssues() {
    if (!issuesList) return;

    showLoadingInIssuesList(true);
    await simulateApiCall();

    allIssues = generateSampleIssues();
    filteredIssues = [...allIssues];
    displayIssues();
}

function displayIssues() {
    if (!issuesList) return;

    displayedIssues = filteredIssues.slice(0, issuesPerPage);
    issuesList.innerHTML = displayedIssues.map(createIssueCard).join('');

    if (loadMoreBtn) {
        loadMoreBtn.style.display =
            filteredIssues.length > displayedIssues.length ? 'block' : 'none';
    }

    currentPage = 1;
}

function loadMoreIssues() {
    const start = currentPage * issuesPerPage;
    const more = filteredIssues.slice(start, start + issuesPerPage);

    if (!issuesList || !more.length) return;

    issuesList.innerHTML += more.map(createIssueCard).join('');
    displayedIssues.push(...more);
    currentPage++;

    if (loadMoreBtn && displayedIssues.length >= filteredIssues.length) {
        loadMoreBtn.style.display = 'none';
    }
}

function filterIssues() {
    if (!statusFilter || !searchInput) return;

    const status = statusFilter.value;
    const text = searchInput.value.toLowerCase();

    filteredIssues = allIssues.filter(i =>
        (status === 'all' || i.status === status) &&
        (i.title.toLowerCase().includes(text) || i.description.toLowerCase().includes(text))
    );

    displayIssues();
}

function createIssueCard(issue) {
    return `
        <div class="issue-card">
            <h3>${issue.title}</h3>
            <p>${issue.description}</p>
            <small>Status: ${issue.status}</small>
        </div>
    `;
}


// ===============================
// UI HELPERS
// ===============================
function showLoadingInIssuesList(show) {
    if (!issuesList || !show) return;
    issuesList.innerHTML = `<div class="loading">Loading issues...</div>`;
}

function showMessage(msg, type) {
    alert(msg); // simple & safe
}

function showLoadingOverlay(show) {
    if (loadingOverlay) {
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }
}


// ===============================
// UTILITIES
// ===============================
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    navbar.style.boxShadow =
        window.scrollY > 50 ? '0 2px 15px rgba(0,0,0,0.2)' : 'none';
}

function initializeAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const items = document.querySelectorAll('.feature-card, .issue-card');
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = 1;
                e.target.style.transform = 'translateY(0)';
            }
        });
    });

    items.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

function simulateApiCall(time = 800) {
    return new Promise(res => setTimeout(res, time));
}

function generateSampleIssues() {
    return [
        { title: 'Broken Street Light', description: 'Light not working', status: 'pending' },
        { title: 'Pothole', description: 'Big pothole on road', status: 'in-progress' },
        { title: 'Garbage Overflow', description: 'Garbage bin full', status: 'resolved' }
    ];
}
