const STORAGE_KEY = "service-roster-prototype-v4";
const HISTORY_KEY = "service-roster-history-v2";
const AUTH_KEY = "jccm-site-auth-v1";
const PHOTOS_KEY = "jccm-sunday-photos-v1";
const FIXED_PHOTO_KEY = "jccm-fixed-home-photo-v1";
const SESSION_KEY = "jccm-site-session-v1";
const ANNOUNCEMENTS_KEY = "jccm-announcements-v1";

const registryMeta = {
  worshipLeaders: "Worship Leaders",
  backups: "Backups",
  musicians: "Musicians"
};

const roleLabels = {
  headAdmin: "Head Admin",
  admin: "Admin",
  pwHead: "Praise and Worship Head",
  pwAssistant: "Assistant Head",
  tech: "Tech Team",
  member: "Member"
};

const defaultState = {
  registries: {
    worshipLeaders: [],
    backups: [],
    musicians: []
  },
  daList: [],
  services: {
    saturday: { id: "saturday", label: "Adonai", title: "Adonai Only", date: "", worshipLeader: "", backup: [], musicians: [] },
    sunday: { id: "sunday", label: "Sunday Service", title: "Sunday Service Only", date: "", worshipLeader: "", backup: [], musicians: [] }
  }
};

const defaultAuth = {
  users: [{ id: "admin-seed", name: "Main Admin", username: "admin", password: "admin123", role: "headAdmin", isCreator: true }],
  pending: []
};

const samplePhotos = [
  {
    id: "sample-2",
    date: "2026-03-15",
    caption: "Praise and Worship Moments",
    imagePath: "sample-photos/502941961_1009231264747364_7926852184943090571_n.jpg",
    uploadedBy: "JCCM Sample"
  },
  {
    id: "sample-3",
    date: "2026-03-15",
    caption: "Sunday Fellowship",
    imagePath: "sample-photos/503266131_1009231031414054_1071944700553460347_n.jpg",
    uploadedBy: "JCCM Sample"
  },
  {
    id: "sample-4",
    date: "2026-03-15",
    caption: "Worship Team",
    imagePath: "sample-photos/504277569_1012165871120570_7521764333023615902_n.jpg",
    uploadedBy: "JCCM Sample"
  },
  {
    id: "sample-5",
    date: "2026-03-15",
    caption: "Church Snapshot",
    imagePath: "sample-photos/ASDASD.jpg",
    uploadedBy: "JCCM Sample"
  },
  {
    id: "sample-1",
    date: "2026-03-15",
    caption: "JCCM Sunday Service",
    imagePath: "sample-photos/502940991_1009229358080888_1129196559297250763_n.jpg",
    uploadedBy: "JCCM Sample"
  }
];

const fixedHomePhoto = {
  id: "fixed-home-photo",
  date: "2026-03-15",
  caption: "JCCM Sunday Service",
  imagePath: "sample-photos/fixed-photo.jpg",
  uploadedBy: "JCCM"
};

const sectionIds = ["home", "photos", "adonai", "hamakom", "agape", "about", "organizer", "admin"];

const loginGate = document.querySelector("#login-gate");
const introGate = document.querySelector("#intro-gate");
const enterSiteButton = document.querySelector("#enter-site-btn");
const appShell = document.querySelector("#app-shell");
const showLoginButton = document.querySelector("#show-login");
const showRegisterButton = document.querySelector("#show-register");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const registerName = document.querySelector("#register-name");
const registerUsername = document.querySelector("#register-username");
const registerPassword = document.querySelector("#register-password");
const registerRole = document.querySelector("#register-role");
const authMessage = document.querySelector("#auth-message");
const currentUserName = document.querySelector("#current-user-name");
const currentUserRole = document.querySelector("#current-user-role");
const adminModeButton = document.querySelector("#admin-mode-btn");
const logoutButton = document.querySelector("#logout-btn");
const siteLogo = document.querySelector("#site-logo");
const siteLogoFallback = document.querySelector("#site-logo-fallback");
const navButtons = [...document.querySelectorAll(".nav-btn")];
const adminNavButton = document.querySelector("#admin-nav-btn");
const homeCarouselSlide = document.querySelector("#home-carousel-slide");
const homeCarouselDots = document.querySelector("#home-carousel-dots");
const homeCarouselPrev = document.querySelector("#home-carousel-prev");
const homeCarouselNext = document.querySelector("#home-carousel-next");
const homeModeBadge = document.querySelector("#home-mode-badge");
const announcementsInput = document.querySelector("#announcements-input");
const photoGallery = document.querySelector("#photo-gallery");
const photoUploadForm = document.querySelector("#photo-upload-form");
const photoDate = document.querySelector("#photo-date");
const photoCaption = document.querySelector("#photo-caption");
const photoFile = document.querySelector("#photo-file");
const photoUploadButton = document.querySelector("#photo-upload-button");
const photoUploadMessage = document.querySelector("#photo-upload-message");
const fixedPhotoForm = document.querySelector("#fixed-photo-form");
const fixedPhotoDate = document.querySelector("#fixed-photo-date");
const fixedPhotoCaption = document.querySelector("#fixed-photo-caption");
const fixedPhotoFile = document.querySelector("#fixed-photo-file");
const fixedPhotoButton = document.querySelector("#fixed-photo-button");
const fixedPhotoMessage = document.querySelector("#fixed-photo-message");
const pendingApprovals = document.querySelector("#pending-approvals");
const approvedAccounts = document.querySelector("#approved-accounts");
const serviceSections = document.querySelector("#service-sections");
const sectionTemplate = document.querySelector("#service-section-template");
const registryForm = document.querySelector("#registry-form");
const registryType = document.querySelector("#registry-type");
const registryName = document.querySelector("#registry-name");
const registryGroups = document.querySelector("#registry-groups");
const registryCard = document.querySelector("#registry-card");
const pastorRequestForm = document.querySelector("#pastor-request-form");
const pastorRequestName = document.querySelector("#pastor-request-name");
const pastorRequestList = document.querySelector("#pastor-request-list");
const daListCard = document.querySelector("#da-list-card");
const organizerModeNote = document.querySelector("#organizer-mode-note");
const pdfStartDateInput = document.querySelector("#pdf-start-date");
const pdfRangeMonthsSelect = document.querySelector("#pdf-range-months");
const saveRangeButton = document.querySelector("#save-range-pdf");
const saveAdonaiButton = document.querySelector("#save-adonai-pdf");
const saveSundayButton = document.querySelector("#save-sunday-pdf");
const saveAllButton = document.querySelector("#save-all-pdf");
const resetDemoButton = document.querySelector("#reset-demo");
const personScheduleForm = document.querySelector("#person-schedule-form");
const personScheduleName = document.querySelector("#person-schedule-name");
const personScheduleStart = document.querySelector("#person-schedule-start");
const personScheduleMonths = document.querySelector("#person-schedule-months");
const personScheduleResults = document.querySelector("#person-schedule-results");

let state = loadState();
let history = loadHistory();
let authState = loadAuthState();
let photos = loadPhotos();
let fixedPhoto = loadFixedPhoto();
let currentUser = restoreSession();
let activeSection = "home";
let adminMode = false;
let homeCarouselIndex = 0;
let announcements = loadAnnouncements();
let homeCarouselTimer = null;
let homeCarouselResolved = false;

initializeApp();

function initializeApp() {
  enterSiteButton.addEventListener("click", closeIntroGate);
  showLoginButton.addEventListener("click", () => setAuthMode("login"));
  showRegisterButton.addEventListener("click", () => setAuthMode("register"));
  loginForm.addEventListener("submit", handleLogin);
  registerForm.addEventListener("submit", handleRegister);
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeSection = button.dataset.section;
      renderSections();
    });
  });
  registryForm.addEventListener("submit", handleRegistrySubmit);
  pastorRequestForm.addEventListener("submit", handlePastorRequestSubmit);
  personScheduleForm.addEventListener("submit", handlePersonScheduleSubmit);
  saveAdonaiButton.addEventListener("click", () => exportRangePdf(pdfStartDateInput.value, pdfRangeMonthsSelect.value, "saturday"));
  saveSundayButton.addEventListener("click", () => exportRangePdf(pdfStartDateInput.value, pdfRangeMonthsSelect.value, "sunday"));
  saveAllButton.addEventListener("click", () => exportRangePdf(pdfStartDateInput.value, pdfRangeMonthsSelect.value));
  resetDemoButton.addEventListener("click", resetOrganizer);
  photoUploadForm.addEventListener("submit", handlePhotoUpload);
  fixedPhotoForm.addEventListener("submit", handleFixedPhotoUpload);
  homeCarouselPrev.addEventListener("click", () => moveCarousel(-1));
  homeCarouselNext.addEventListener("click", () => moveCarousel(1));
  announcementsInput.addEventListener("input", handleAnnouncementsInput);
  adminModeButton.addEventListener("click", toggleAdminMode);
  logoutButton.addEventListener("click", handleLogout);
  siteLogo.addEventListener("load", handleLogoLoad);
  siteLogo.addEventListener("error", handleLogoError);
  if (siteLogo.complete) {
    if (siteLogo.naturalWidth > 0) {
      handleLogoLoad();
    } else {
      handleLogoError();
    }
  }
  renderApp();
}

function closeIntroGate() {
  introGate.classList.add("app-hidden");
}

function setAuthMode(mode) {
  const loginActive = mode === "login";
  showLoginButton.classList.toggle("auth-tab-active", loginActive);
  showRegisterButton.classList.toggle("auth-tab-active", !loginActive);
  loginForm.classList.toggle("auth-hidden", !loginActive);
  registerForm.classList.toggle("auth-hidden", loginActive);
  authMessage.textContent = "";
}

function handleLogin(event) {
  event.preventDefault();
  const username = loginUsername.value.trim().toLowerCase();
  const password = loginPassword.value.trim();
  const matchedUser = authState.users.find((user) => user.username.toLowerCase() === username && user.password === password);

  if (!matchedUser) {
    authMessage.textContent = "Login failed. Make sure the account is approved by admin first.";
    return;
  }

  currentUser = matchedUser;
  window.localStorage.setItem(SESSION_KEY, matchedUser.id);
  authMessage.textContent = "";
  loginForm.reset();
  renderApp();
}

function handleRegister(event) {
  event.preventDefault();
  const name = registerName.value.trim();
  const username = registerUsername.value.trim();
  const password = registerPassword.value.trim();
  const role = registerRole.value;

  if (!name || !username || !password) {
    authMessage.textContent = "Please complete all registration fields.";
    return;
  }

  const normalizedUsername = username.toLowerCase();
  const alreadyExists = authState.users.some((user) => user.username.toLowerCase() === normalizedUsername)
    || authState.pending.some((user) => user.username.toLowerCase() === normalizedUsername);

  if (alreadyExists) {
    authMessage.textContent = "That username is already in use or waiting for approval.";
    return;
  }

  authState.pending.unshift({
    id: `pending-${Date.now()}`,
    name,
    username,
    password,
    role,
    requestedAt: new Date().toISOString()
  });
  persistAuth();
  registerForm.reset();
  setAuthMode("login");
  authMessage.textContent = "Request sent. An admin needs to approve this account first.";
}

function handleRegistrySubmit(event) {
  event.preventDefault();
  if (!canEditOrganizer()) {
    return;
  }
  addRegistryItem(registryType.value, registryName.value);
  registryName.value = "";
}

function handlePastorRequestSubmit(event) {
  event.preventDefault();
  if (!canEditOrganizer()) {
    return;
  }
  addDaPerson(pastorRequestName.value);
  pastorRequestName.value = "";
}

function handlePersonScheduleSubmit(event) {
  event.preventDefault();
  renderPersonScheduleResults();
}

function resetOrganizer() {
  if (!canEditOrganizer()) {
    return;
  }
  state = structuredClone(defaultState);
  history = [];
  persistOrganizer();
  renderOrganizer();
}

function handleLogout() {
  currentUser = null;
  adminMode = false;
  stopCarouselAutoplay();
  homeCarouselResolved = false;
  window.localStorage.removeItem(SESSION_KEY);
  activeSection = "home";
  photoUploadMessage.textContent = "";
  renderApp();
}

function handleAnnouncementsInput() {
  if (!canEditHomeContent()) {
    return;
  }

  announcements = announcementsInput.value;
  persistAnnouncements();
}

function toggleAdminMode() {
  if (!canEnterAdminMode()) {
    return;
  }

  adminMode = !adminMode;

  if (!adminMode && activeSection === "admin") {
    activeSection = "home";
  }

  renderApp();
}

function handleLogoLoad() {
  siteLogo.classList.remove("app-hidden");
  siteLogoFallback.classList.add("app-hidden");
}

function handleLogoError() {
  siteLogo.classList.add("app-hidden");
  siteLogoFallback.classList.remove("app-hidden");
}

async function handlePhotoUpload(event) {
  event.preventDefault();

  if (!canUploadPhotos()) {
    photoUploadMessage.textContent = "Turn on Admin Mode with a tech team or admin account to upload Sunday photos.";
    return;
  }

  const files = [...(photoFile.files ?? [])];
  const date = photoDate.value;
  const caption = photoCaption.value.trim();

  if (files.length === 0 || !date) {
    photoUploadMessage.textContent = "Please choose a Sunday date and at least one image.";
    return;
  }

  try {
    const uploadedPhotos = await Promise.all(files.map(async (file, index) => ({
      id: `photo-${Date.now()}-${index}`,
      date,
      caption: files.length > 1
        ? `${caption || "Sunday service highlight"} ${index + 1}`
        : (caption || "Sunday service highlight"),
      imageData: await readFileAsDataUrl(file),
      uploadedBy: currentUser?.name || currentUser?.username || "Unknown"
    })));
    photos = sortPhotos([...uploadedPhotos, ...photos]).slice(0, 120);
    homeCarouselResolved = false;
    persistPhotos();
    photoUploadForm.reset();
    photoUploadMessage.textContent = `${uploadedPhotos.length} Sunday photo${uploadedPhotos.length > 1 ? "s" : ""} uploaded.`;
    renderPhotos();
  } catch (error) {
    console.error(error);
    photoUploadMessage.textContent = "One or more photos could not be saved. Try smaller images.";
  }
}

async function handleFixedPhotoUpload(event) {
  event.preventDefault();

  if (!canManageFixedPhoto()) {
    fixedPhotoMessage.textContent = "Only Admin and Head Admin can change the fixed photo.";
    return;
  }

  const file = fixedPhotoFile.files?.[0];
  if (!file) {
    fixedPhotoMessage.textContent = "Please choose an image for the fixed photo.";
    return;
  }

  try {
    const imageData = await readFileAsDataUrl(file);
    fixedPhoto = {
      id: "fixed-home-photo",
      date: fixedPhotoDate.value || fixedPhoto.date || normalizeDate(new Date().toISOString().slice(0, 10)),
      caption: fixedPhotoCaption.value.trim() || fixedPhoto.caption || "JCCM Sunday Service",
      imageData,
      uploadedBy: currentUser?.name || currentUser?.username || "Unknown"
    };
    homeCarouselResolved = false;
    persistFixedPhoto();
    fixedPhotoForm.reset();
    fixedPhotoMessage.textContent = "Fixed photo updated.";
    renderPhotos();
  } catch (error) {
    console.error(error);
    fixedPhotoMessage.textContent = "That fixed photo could not be saved. Try a smaller image.";
  }
}

function renderApp() {
  const loggedIn = Boolean(currentUser);
  loginGate.classList.toggle("app-hidden", loggedIn);
  appShell.classList.toggle("app-hidden", !loggedIn);

  if (!loggedIn) {
    stopCarouselAutoplay();
    return;
  }

  if (!canEnterAdminMode()) {
    adminMode = false;
  }

  if (activeSection === "admin" && !(adminMode && hasAdminAccess())) {
    activeSection = "home";
  }

  if (currentUserName) {
    currentUserName.textContent = currentUser.name || currentUser.username;
  }
  if (currentUserRole) {
    currentUserRole.textContent = `${roleLabels[currentUser.role] ?? "Member"}${adminMode ? " - Admin Mode" : " - View Mode"}`;
  }
  adminModeButton.classList.toggle("app-hidden", !canEnterAdminMode());
  adminModeButton.textContent = adminMode ? "Exit Admin" : "Admin";
  adminNavButton.classList.toggle("app-hidden", !(adminMode && hasAdminAccess()));
  renderSections();
  renderPhotos();
  renderOrganizer();
  renderAdmin();
}

function renderSections() {
  sectionIds.forEach((sectionId) => {
    const section = document.querySelector(`#section-${sectionId}`);
    section.classList.toggle("app-hidden", sectionId !== activeSection);
  });

  navButtons.forEach((button) => {
    button.classList.toggle("nav-btn-active", button.dataset.section === activeSection);
  });
}

function renderPhotos() {
  ensureCarouselStart();
  renderHomeCarousel();
  startCarouselAutoplay();
  renderPhotoList(photoGallery, getDisplayPhotos(), "No Sunday photos uploaded yet.");
  announcementsInput.value = announcements;
  announcementsInput.disabled = !canEditHomeContent();
  homeModeBadge.textContent = canEditHomeContent() ? "Editing enabled" : "View only";

  const canUpload = canUploadPhotos();
  photoUploadButton.disabled = !canUpload;
  photoDate.disabled = !canUpload;
  photoCaption.disabled = !canUpload;
  photoFile.disabled = !canUpload;
  const canChangeFixedPhoto = canManageFixedPhoto();
  fixedPhotoForm.classList.toggle("app-hidden", !canChangeFixedPhoto);
  fixedPhotoMessage.classList.toggle("app-hidden", !canChangeFixedPhoto);
  fixedPhotoButton.disabled = !canChangeFixedPhoto;
  fixedPhotoDate.disabled = !canChangeFixedPhoto;
  fixedPhotoCaption.disabled = !canChangeFixedPhoto;
  fixedPhotoFile.disabled = !canChangeFixedPhoto;

  if (!canUpload) {
    photoUploadMessage.textContent = "Turn on Admin Mode with a tech team or admin account to upload Sunday photos.";
  } else if (photoUploadMessage.textContent === "Turn on Admin Mode with a tech team or admin account to upload Sunday photos.") {
    photoUploadMessage.textContent = "";
  }

  if (canChangeFixedPhoto && fixedPhotoMessage.textContent === "Only Admin and Head Admin can change the fixed photo.") {
    fixedPhotoMessage.textContent = "";
  }
}

function renderHomeCarousel() {
  const carouselPhotos = getHomeCarouselPhotos().slice(0, 8);
  homeCarouselDots.innerHTML = "";

  if (carouselPhotos.length === 0) {
    homeCarouselIndex = 0;
    homeCarouselResolved = true;
    homeCarouselSlide.innerHTML = `<div class="carousel-empty">No Sunday photos uploaded yet.</div>`;
    homeCarouselPrev.disabled = true;
    homeCarouselNext.disabled = true;
    return;
  }

  if (homeCarouselIndex >= carouselPhotos.length) {
    homeCarouselIndex = 0;
  }

  const photo = carouselPhotos[homeCarouselIndex];
  const source = getPhotoSource(photo);
  homeCarouselResolved = true;
  homeCarouselSlide.innerHTML = `
    <img class="carousel-photo carousel-fade" src="${source}" alt="${escapeHtml(photo.caption || "Sunday photo")}">
  `;

  const currentImage = homeCarouselSlide.querySelector("img");
  currentImage.addEventListener("error", () => {
    skipBrokenCarouselPhoto();
  }, { once: true });

  carouselPhotos.forEach((entry, index) => {
    const dot = document.createElement("button");
    dot.className = `carousel-dot${index === homeCarouselIndex ? " carousel-dot-active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.addEventListener("click", () => {
      homeCarouselIndex = index;
      renderHomeCarousel();
    });
    homeCarouselDots.appendChild(dot);
  });

  homeCarouselPrev.disabled = carouselPhotos.length <= 1;
  homeCarouselNext.disabled = carouselPhotos.length <= 1;
}

function moveCarousel(direction) {
  const carouselPhotos = getHomeCarouselPhotos().slice(0, 8);
  if (carouselPhotos.length <= 1) {
    return;
  }

  homeCarouselResolved = true;
  homeCarouselIndex = (homeCarouselIndex + direction + carouselPhotos.length) % carouselPhotos.length;
  renderHomeCarousel();
  startCarouselAutoplay();
}

function skipBrokenCarouselPhoto() {
  const carouselPhotos = getHomeCarouselPhotos().slice(0, 8);
  if (carouselPhotos.length <= 1) {
    homeCarouselSlide.innerHTML = `<div class="carousel-empty">This photo could not be loaded.</div>`;
    return;
  }

  homeCarouselIndex = (homeCarouselIndex + 1) % carouselPhotos.length;
  renderHomeCarousel();
}

function ensureCarouselStart() {
  if (!homeCarouselResolved) {
    renderHomeCarousel();
  }
}

function renderPhotoList(container, list, emptyLabel) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-card">${escapeHtml(emptyLabel)}</div>`;
    return;
  }

  list.forEach((photo) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    const canDelete = canManageUploadedPhoto(photo);
    card.innerHTML = `
      <img src="${getPhotoSource(photo)}" alt="${escapeHtml(photo.caption)}">
      <div class="photo-meta">
        <strong>${escapeHtml(photo.caption)}</strong>
        <span>${escapeHtml(formatValue("date", photo.date))}</span>
        <span>Uploaded by ${escapeHtml(photo.uploadedBy)}</span>
        ${canDelete ? `<button class="ghost-btn photo-delete-btn" type="button">Delete Photo</button>` : ""}
      </div>
    `;

    if (canDelete) {
      card.querySelector(".photo-delete-btn").addEventListener("click", () => removeUploadedPhoto(photo.id));
    }

    container.appendChild(card);
  });
}

function renderAdmin() {
  if (!(adminMode && hasAdminAccess())) {
    pendingApprovals.innerHTML = `<div class="empty-card">Admin access required.</div>`;
    approvedAccounts.innerHTML = `<div class="empty-card">Admin access required.</div>`;
    return;
  }

  pendingApprovals.innerHTML = "";
  approvedAccounts.innerHTML = "";

  if (authState.pending.length === 0) {
    pendingApprovals.innerHTML = `<div class="empty-card">No pending requests right now.</div>`;
  } else {
    authState.pending.forEach((account) => {
      const item = document.createElement("article");
      item.className = "admin-item";
      item.innerHTML = `
        <div class="admin-item-head">
          <div>
            <strong>${escapeHtml(account.name)}</strong>
            <p>@${escapeHtml(account.username)} requested ${escapeHtml(roleLabels[account.role] ?? "Member")}</p>
          </div>
          <span class="status-pill">Pending</span>
        </div>
        <div class="admin-actions">
          <button class="primary-btn approve-btn" type="button">Approve</button>
          <button class="ghost-btn reject-btn" type="button">Reject</button>
        </div>
      `;
      item.querySelector(".approve-btn").addEventListener("click", () => approveAccount(account.id));
      item.querySelector(".reject-btn").addEventListener("click", () => rejectAccount(account.id));
      pendingApprovals.appendChild(item);
    });
  }

  authState.users.forEach((account) => {
    const item = document.createElement("article");
    item.className = "admin-item";
    item.innerHTML = `
      <div class="admin-item-head">
        <div>
          <strong>${escapeHtml(account.name)}</strong>
          <p>@${escapeHtml(account.username)}</p>
        </div>
        <span class="status-pill">${escapeHtml(roleLabels[account.role] ?? "Member")}</span>
      </div>
      <div class="admin-actions">
        <select class="role-select">
          ${Object.entries(roleLabels).map(([value, label]) => `<option value="${value}" ${account.role === value ? "selected" : ""}>${label}</option>`).join("")}
        </select>
        <button class="ghost-btn remove-account-btn" type="button">Remove</button>
      </div>
    `;

    const roleSelect = item.querySelector(".role-select");
    const lockedPrivilegedAccount = isPrivilegedRole(account.role) && !isCreator();
    roleSelect.disabled = lockedPrivilegedAccount;
    roleSelect.addEventListener("change", () => updateAccountRole(account.id, roleSelect.value));

    const removeButton = item.querySelector(".remove-account-btn");
    if (account.id === currentUser.id || (isPrivilegedRole(account.role) && !isCreator())) {
      removeButton.disabled = true;
    } else {
      removeButton.addEventListener("click", () => removeAccount(account.id));
    }

    approvedAccounts.appendChild(item);
  });
}

function approveAccount(accountId) {
  const match = authState.pending.find((account) => account.id === accountId);
  if (!match) {
    return;
  }

  authState.pending = authState.pending.filter((account) => account.id !== accountId);
  authState.users.push({
    id: `user-${Date.now()}`,
    name: match.name,
    username: match.username,
    password: match.password,
    role: match.role
  });
  persistAuth();
  renderAdmin();
}

function rejectAccount(accountId) {
  authState.pending = authState.pending.filter((account) => account.id !== accountId);
  persistAuth();
  renderAdmin();
}

function updateAccountRole(accountId, role) {
  const target = authState.users.find((account) => account.id === accountId);
  if (!target) {
    return;
  }

  if (isPrivilegedRole(target.role) && !isCreator()) {
    renderAdmin();
    return;
  }

  authState.users = authState.users.map((account) => account.id === accountId ? { ...account, role } : account);

  if (currentUser?.id === accountId) {
    currentUser = authState.users.find((account) => account.id === accountId) ?? currentUser;
  }

  persistAuth();
  renderApp();
}

function removeAccount(accountId) {
  const target = authState.users.find((account) => account.id === accountId);
  if (!target) {
    return;
  }

  if (isPrivilegedRole(target.role) && !isCreator()) {
    renderAdmin();
    return;
  }

  authState.users = authState.users.filter((account) => account.id !== accountId);
  persistAuth();
  renderAdmin();
}

function renderOrganizer() {
  syncCurrentServicesToHistory();
  if (!pdfStartDateInput.value) {
    pdfStartDateInput.value = getEarliestKnownDate() || normalizeDate(new Date().toISOString().slice(0, 10));
  }
  const editingEnabled = canEditOrganizer();
  registryCard.classList.toggle("app-hidden", !editingEnabled);
  daListCard.classList.toggle("app-hidden", !editingEnabled);
  registryType.disabled = !editingEnabled;
  registryName.disabled = !editingEnabled;
  registryForm.querySelector("button").disabled = !editingEnabled;
  pastorRequestName.disabled = !editingEnabled;
  pastorRequestForm.querySelector("button").disabled = !editingEnabled;
  resetDemoButton.disabled = !editingEnabled;
  organizerModeNote.textContent = canEditOrganizer()
    ? "Admin mode is active. Editing is enabled for the PAW Schedule."
    : "You are in view mode. Turn on Admin to edit the PAW Schedule.";
  renderRegistryGroups();
  renderPastorRequests();
  renderPersonScheduleControls();
  renderPersonScheduleResults();
  renderServices();
}

function renderRegistryGroups() {
  registryGroups.innerHTML = "";

  Object.entries(registryMeta).forEach(([key, label]) => {
    const group = document.createElement("article");
    group.className = "registry-group";
    const items = state.registries[key];

    group.innerHTML = `
      <h3>${escapeHtml(label)}</h3>
      <div class="tag-list">
        ${items.length > 0
          ? items.map((name) => `
            <span class="tag">
              <span class="tag-label">${buildDisplayNameMarkup(name)}</span>
              ${canEditOrganizer() ? `<button type="button" data-type="${key}" data-name="${escapeHtml(name)}" aria-label="Remove ${escapeHtml(name)}">&times;</button>` : ""}
            </span>
          `).join("")
          : `<span class="empty-state">No entries yet.</span>`}
      </div>
    `;

    group.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => removeRegistryItem(button.dataset.type, button.dataset.name));
    });

    registryGroups.appendChild(group);
  });
}

function renderPersonScheduleControls() {
  const people = getAllRegistryPeople();
  const selected = personScheduleName.value;
  const placeholder = people.length > 0 ? "Select a person" : "No registered people yet";
  personScheduleName.innerHTML = `<option value="">${placeholder}</option>${people.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(getDisplayName(name))}</option>`).join("")}`;

  if (selected && people.includes(selected)) {
    personScheduleName.value = selected;
  }

  if (!personScheduleStart.value) {
    personScheduleStart.value = pdfStartDateInput.value || getEarliestKnownDate() || normalizeDate(new Date().toISOString().slice(0, 10));
  }
}

function renderPastorRequests() {
  pastorRequestList.innerHTML = "";

  if (!canEditOrganizer()) {
    pastorRequestList.innerHTML = `<span class="empty-state">DA details are hidden in view mode.</span>`;
    return;
  }

  if (!state.daList.length) {
    pastorRequestList.innerHTML = `<span class="empty-state">No one is in the DA list.</span>`;
    return;
  }

  state.daList.forEach((request) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.innerHTML = `<span class="tag-label">${escapeHtml(getDisplayName(request))}<span class="tag-status">DA</span></span><button type="button" data-name="${escapeHtml(request)}" aria-label="Remove ${escapeHtml(request)}">&times;</button>`;

    const button = tag.querySelector("button");
    if (button) {
      button.addEventListener("click", () => removeDaPerson(button.dataset.name));
    }

    pastorRequestList.appendChild(tag);
  });
}

function renderPersonScheduleResults() {
  personScheduleResults.innerHTML = "";
  const person = personScheduleName.value;

  if (!person) {
    personScheduleResults.innerHTML = `<div class="empty-card">Choose a person to view assignments in the selected date range.</div>`;
    return;
  }

  const startDate = normalizeDate(personScheduleStart.value || pdfStartDateInput.value || getEarliestKnownDate() || new Date().toISOString().slice(0, 10));
  const months = Number(personScheduleMonths.value || 3);
  const endDate = addMonths(startDate, months);
  syncCurrentServicesToHistory();

  const matches = sortHistory(history)
    .filter((entry) => {
      const entryDate = normalizeDate(entry.date);
      return entryDate >= startDate && entryDate < endDate;
    })
    .map((entry) => {
      const matchedRoles = [];
      if (samePerson(entry.worshipLeader, person)) {
        matchedRoles.push("Worship Leader");
      }
      if ((entry.backup ?? []).some((name) => samePerson(name, person))) {
        matchedRoles.push("Backup");
      }
      if ((entry.musicians ?? []).some((name) => samePerson(name, person))) {
        matchedRoles.push("Musician");
      }

      return { entry, matchedRoles };
    })
    .filter(({ matchedRoles }) => matchedRoles.length > 0);

  if (!matches.length) {
    personScheduleResults.innerHTML = `<div class="empty-card">No schedules found for ${escapeHtml(getDisplayName(person))} in that range.</div>`;
    return;
  }

  matches.forEach(({ entry, matchedRoles }) => {
    const card = document.createElement("article");
    card.className = "person-schedule-card";
    card.innerHTML = `
      <strong>${escapeHtml(entry.label)}</strong>
      <div class="person-schedule-meta">${escapeHtml(formatValue("date", entry.date))}</div>
      <div>${escapeHtml(matchedRoles.join(", "))}</div>
    `;
    personScheduleResults.appendChild(card);
  });
}

function renderServices() {
  serviceSections.innerHTML = "";
  const editingEnabled = canEditOrganizer();

  Object.values(state.services).forEach((service) => {
    const section = sectionTemplate.content.firstElementChild.cloneNode(true);

    section.querySelector(".service-label").textContent = service.label;
    section.querySelector(".service-title").textContent = service.title;
    section.querySelector(".export-service-btn").addEventListener("click", () => exportRangePdf(service.date || pdfStartDateInput.value, 1, service.id));

    bindServiceDateSelect(section, service);
    bindRoleSelect(section, service, ".worshipLeader", state.registries.worshipLeaders);
    bindBackupMultiSelect(section, service);
    bindMusicianMultiSelect(section, service, Infinity, ".musicians-options", ".musicians-selected", ".multi-summary");
    updateConflictDisplay(section, service);
    applyOrganizerPermissions(section, editingEnabled);

    serviceSections.appendChild(section);
  });
}

function bindServiceDateSelect(section, service) {
  const select = section.querySelector(".service-date");
  const options = getServiceDateOptions(service.id);
  populateDateSelect(select, options, service.date, service.id);

  select.addEventListener("change", (event) => {
    state.services[service.id].date = event.target.value;
    upsertHistoryForService(service.id);
    persistOrganizer();
    renderServices();
  });
}

function getServiceDateOptions(serviceId) {
  const targetDay = serviceId === "saturday" ? 6 : 0;
  const anchorDate = state.services[serviceId].date || pdfStartDateInput.value || normalizeDate(new Date().toISOString().slice(0, 10));
  const startDate = addDays(anchorDate, -182);
  const firstMatch = findNextWeekday(startDate, targetDay);
  const options = [];

  for (let index = 0; index < 104; index += 1) {
    options.push(addDays(firstMatch, index * 7));
  }

  return options;
}

function populateDateSelect(select, options, selectedValue, serviceId) {
  const placeholder = serviceId === "saturday" ? "Select Saturday" : "Select Sunday";
  select.innerHTML = `<option value="">${placeholder}</option>${options.map((date) => `<option value="${escapeHtml(date)}">${escapeHtml(formatValue("date", date))}</option>`).join("")}`;

  if (selectedValue && !options.includes(selectedValue)) {
    const fallback = document.createElement("option");
    fallback.value = selectedValue;
    fallback.textContent = formatValue("date", selectedValue);
    select.appendChild(fallback);
  }

  select.value = selectedValue ?? "";
}

function bindSimpleSelect(section, service, key, selector, options, placeholder) {
  const select = section.querySelector(selector);
  populateSelect(select, options, placeholder, service[key]);
  select.addEventListener("change", (event) => {
    state.services[service.id][key] = event.target.value;
    upsertHistoryForService(service.id);
    persistOrganizer();
  });
}

function bindRoleSelect(section, service, selector, options) {
  const select = section.querySelector(selector);
  populateSelect(select, getAssignableNames(options), "Select leader", service.worshipLeader);
  select.addEventListener("change", (event) => {
    const nextValue = event.target.value;
    const previousValue = state.services[service.id].worshipLeader ?? "";
    const duplicateMessage = getSameServiceDuplicateMessage(service.id, "worshipLeader", nextValue);

    if (duplicateMessage) {
      window.alert(duplicateMessage);
      event.target.value = previousValue;
      return;
    }

    const conflictMessages = getConflictMessages(service.id, nextValue);

    if (conflictMessages.length > 0) {
      const proceed = window.confirm(`${conflictMessages.join("\n\n")}\n\nAre you sure you want to continue with this assignment?`);
      if (!proceed) {
        event.target.value = previousValue;
        return;
      }
    }

    state.services[service.id].worshipLeader = nextValue;
    upsertHistoryForService(service.id);
    persistOrganizer();
    renderServices();
  });
}

function bindBackupMultiSelect(section, service) {
  bindLimitedMultiSelect(section, service, "backup", getBackupOptions(), Infinity, ".backups-options", ".backups-selected", ".backup-summary", "Select backups", "backup", true);
}

function bindMusicianMultiSelect(section, service, limit, optionsSelector, selectedSelector, summarySelector) {
  bindLimitedMultiSelect(section, service, "musicians", getAssignableNames(state.registries.musicians), limit, optionsSelector, selectedSelector, summarySelector, "Select musicians", "musician", false);
}

function bindLimitedMultiSelect(section, service, key, options, limit, optionsSelector, selectedSelector, summarySelector, emptyLabel, unitLabel, rerenderOnChange) {
  const optionsWrap = section.querySelector(optionsSelector);
  const selectedWrap = section.querySelector(selectedSelector);
  const summary = section.querySelector(summarySelector);
  const selected = new Set(service[key] ?? []);
  optionsWrap.innerHTML = "";

  options.forEach((name) => {
    const option = document.createElement("label");
    option.className = "option-row";
    option.innerHTML = `<input type="checkbox" value="${escapeHtml(name)}"><span>${escapeHtml(name)}</span>`;

    const checkbox = option.querySelector("input");
    checkbox.checked = selected.has(name);
    checkbox.addEventListener("change", () => {
      const previousValues = [...selected];

      if (checkbox.checked) {
        if (Number.isFinite(limit) && selected.size >= limit) {
          checkbox.checked = false;
          window.alert(`You can assign up to ${limit} ${unitLabel}${limit > 1 ? "s" : ""} only.`);
          return;
        }
        const duplicateMessage = getSameServiceDuplicateMessage(service.id, key, name);
        if (duplicateMessage) {
          checkbox.checked = false;
          window.alert(duplicateMessage);
          return;
        }
        selected.add(name);
      } else {
        selected.delete(name);
      }

      const nextValues = Array.from(selected);

      const conflictMessages = getAssignmentConflictMessages(service.id, key, nextValues);
      if (conflictMessages.length > 0) {
        const proceed = window.confirm(`${conflictMessages.join("\n\n")}\n\nAre you sure you want to continue with this assignment?`);
        if (!proceed) {
          selected.clear();
          previousValues.forEach((item) => selected.add(item));
          checkbox.checked = previousValues.includes(name);
          updateSelectedItems(selectedWrap, summary, previousValues, emptyLabel, unitLabel);
          return;
        }
      }

      state.services[service.id][key] = nextValues;
      upsertHistoryForService(service.id);
      persistOrganizer();
      updateSelectedItems(selectedWrap, summary, state.services[service.id][key], emptyLabel, unitLabel);
      if (rerenderOnChange) {
        renderServices();
      }
    });

    optionsWrap.appendChild(option);
  });

  updateSelectedItems(selectedWrap, summary, service[key], emptyLabel, unitLabel);
}

function getBackupOptions() {
  return getAssignableNames(sortEntries([...new Set([...state.registries.worshipLeaders, ...state.registries.backups])]));
}

function getAllRegistryPeople() {
  return sortEntries([...new Set(Object.values(state.registries).flat())]);
}

function getAssignableNames(names) {
  return names.filter((name) => !isInDaList(name));
}

function getAssignmentConflictMessages(serviceId, roleKey, values) {
  const nextValues = Array.isArray(values) ? values.filter(Boolean) : [values].filter(Boolean);
  const daMessages = nextValues.filter((person) => isInDaList(person)).map((person) =>
    `${getDisplayName(person)} is in the DA list and cannot be assigned anywhere.`
  );

  if (daMessages.length > 0) {
    return [...new Set(daMessages)];
  }

  if (roleKey === "worshipLeader") {
    return getConflictMessages(serviceId, nextValues[0] ?? "");
  }

  if (roleKey === "backup") {
    return getBackupConflictMessages(serviceId, nextValues);
  }

  return getCrossServiceMessages(serviceId, nextValues);
}

function populateSelect(select, options, placeholder, selectedValue) {
  select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${options.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(getDisplayName(name))}</option>`).join("")}`;

  if (selectedValue && !options.includes(selectedValue)) {
    const fallback = document.createElement("option");
    fallback.value = selectedValue;
    fallback.textContent = `${getDisplayName(selectedValue)} (missing from registry)`;
    select.appendChild(fallback);
  }

  select.value = selectedValue ?? "";
}

function updateSelectedItems(container, summary, names, emptyLabel, unitLabel) {
  const list = names ?? [];
  summary.textContent = list.length > 0 ? `${list.length} ${unitLabel}${list.length > 1 ? "s" : ""} selected` : emptyLabel;
  container.innerHTML = list.length > 0
    ? list.map((name) => `<span class="selected-pill">${buildDisplayNameMarkup(name)}</span>`).join("")
    : `<span class="empty-state">No ${unitLabel}${unitLabel.endsWith("s") ? "" : "s"} assigned.</span>`;
}

function updateConflictDisplay(section, service) {
  const worshipSelect = section.querySelector(".worshipLeader");
  const backupSummary = section.querySelector(".backup-summary");
  const worshipConflict = section.querySelector(".worshipLeader-conflict");
  const backupConflict = section.querySelector(".backup-conflict");
  const worshipMessages = getConflictMessages(service.id, service.worshipLeader);
  const backupMessages = getBackupConflictMessages(service.id, service.backup ?? []);

  worshipSelect.classList.toggle("conflict", worshipMessages.length > 0);
  backupSummary.classList.toggle("conflict", backupMessages.length > 0);
  worshipConflict.textContent = worshipMessages[0] ?? "";
  backupConflict.textContent = backupMessages[0] ?? "";
}

function getConflictMessages(serviceId, person) {
  if (!person) {
    return [];
  }

  if (isInDaList(person)) {
    return [`${getDisplayName(person)} is in the DA list and cannot be assigned anywhere.`];
  }

  const service = state.services[serviceId];
  const messages = [
    ...getCrossServiceMessages(serviceId, [person]),
    ...getSameMonthLeaderMessages(serviceId, service.date, person)
  ];
  if (isLeaderTwoWeeksInARow(serviceId, service.date, person)) {
    const previousAssignment = getPreviousWeekLeaderAssignment(serviceId, service.date, person);
    messages.push(`${getDisplayName(person)} is already scheduled as worship leader on ${formatAssignmentLocation(previousAssignment)}.`);
  }

  return [...new Set(messages)];
}

function getBackupConflictMessages(serviceId, people) {
  const daMessages = people.filter((person) => isInDaList(person)).map((person) =>
    `${getDisplayName(person)} is in the DA list and cannot be assigned anywhere.`
  );

  if (daMessages.length > 0) {
    return [...new Set(daMessages)];
  }

  return getCrossServiceMessages(serviceId, people);
}

function getCrossServiceMessages(serviceId, people) {
  const service = state.services[serviceId];
  const otherService = state.services[serviceId === "saturday" ? "sunday" : "saturday"];

  if (!isSameWeek(service.date, otherService.date)) {
    return [];
  }

  return [...new Set(people.filter(Boolean).flatMap((person) => {
    const conflicts = getAssignmentsForPersonInService(otherService, person);
    return conflicts.map((match) => `${getDisplayName(person)} is already assigned as ${match.roleLabel} on ${formatAssignmentLocation(otherService)}.`);
  }))];
}

function isLeaderTwoWeeksInARow(serviceId, date, person) {
  if (!date || !person) {
    return false;
  }

  const previousWeekDate = addDays(date, -7);
  return history.some((entry) => entry.serviceId === serviceId && samePerson(entry.worshipLeader, person) && normalizeDate(entry.date) === previousWeekDate);
}

function syncCurrentServicesToHistory() {
  Object.keys(state.services).forEach((serviceId) => upsertHistoryForService(serviceId));
}

function upsertHistoryForService(serviceId) {
  const service = state.services[serviceId];
  if (!service.date) {
    return;
  }

  history = history.filter((entry) => !(entry.serviceId === serviceId && normalizeDate(entry.date) === normalizeDate(service.date)));
  history.push(createHistorySnapshot(service));
  history = sortHistory(history);
}

function addRegistryItem(type, rawValue) {
  const value = rawValue.trim();

  if (!value || state.registries[type].some((name) => normalizePersonName(name) === normalizePersonName(value))) {
    return;
  }

  state.registries[type] = sortEntries([...state.registries[type], value]);

  persistOrganizer();
  renderOrganizer();
}

function addDaPerson(rawValue) {
  const value = rawValue.trim();
  if (!value || state.daList.some((request) => normalizePersonName(request) === normalizePersonName(value))) {
    return;
  }

  state.daList = sortEntries([...state.daList, value]);
  persistOrganizer();
  renderOrganizer();
}

function removeDaPerson(name) {
  if (!canEditOrganizer()) {
    return;
  }
  state.daList = state.daList.filter((request) => request !== name);
  persistOrganizer();
  renderOrganizer();
}

function removeRegistryItem(type, name) {
  if (!canEditOrganizer()) {
    return;
  }
  state.registries[type] = state.registries[type].filter((item) => item !== name);
  persistOrganizer();
  renderOrganizer();
}

function applyOrganizerPermissions(section, editingEnabled) {
  const interactiveFields = section.querySelectorAll("input, select");
  interactiveFields.forEach((field) => {
    field.disabled = !editingEnabled;
  });

  section.querySelectorAll("details").forEach((detail) => {
    if (!editingEnabled) {
      detail.open = false;
    }
  });

  section.querySelectorAll("summary").forEach((summary) => {
    summary.style.pointerEvents = editingEnabled ? "" : "none";
    summary.style.opacity = editingEnabled ? "" : "0.7";
  });

  const exportButton = section.querySelector(".export-service-btn");
  exportButton.disabled = false;
}

function getSameServiceDuplicateMessage(serviceId, roleKey, person) {
  if (!person) {
    return "";
  }

  const service = state.services[serviceId];
  const roleMap = {
    worshipLeader: [service.worshipLeader].filter(Boolean),
    backup: service.backup ?? [],
    musicians: service.musicians ?? []
  };

  return Object.entries(roleMap).some(([key, values]) => key !== roleKey && values.some((value) => samePerson(value, person)))
    ? `${getDisplayName(person)} is already assigned in this service. The same name cannot be assigned twice regardless of role.`
    : "";
}

function getAllAssignedNames(service) {
  return [...new Set([
    service.worshipLeader,
    ...(service.backup ?? []),
    ...(service.musicians ?? [])
  ].filter(Boolean))];
}

function getAssignmentsForPersonInService(service, person) {
  const matches = [];
  if (samePerson(service.worshipLeader, person)) {
    matches.push({ roleKey: "worshipLeader", roleLabel: "Worship Leader" });
  }
  if ((service.backup ?? []).some((name) => samePerson(name, person))) {
    matches.push({ roleKey: "backup", roleLabel: "Backup" });
  }
  if ((service.musicians ?? []).some((name) => samePerson(name, person))) {
    matches.push({ roleKey: "musicians", roleLabel: "Musician" });
  }
  return matches;
}

function getSameMonthLeaderMessages(serviceId, date, person) {
  if (!date || !person) {
    return [];
  }

  const monthKey = normalizeDate(date).slice(0, 7);
  const sameMonthEntries = history.filter((entry) =>
    normalizeDate(entry.date).slice(0, 7) === monthKey
    && normalizeDate(entry.date) !== normalizeDate(date)
    && samePerson(entry.worshipLeader, person)
  );

  return sameMonthEntries.map((entry) =>
    `${getDisplayName(person)} is already scheduled as worship leader this month on ${formatAssignmentLocation(entry)}.`
  );
}

function getPreviousWeekLeaderAssignment(serviceId, date, person) {
  if (!date || !person) {
    return null;
  }

  const previousWeekDate = addDays(date, -7);
  return history.find((entry) =>
    entry.serviceId === serviceId
    && samePerson(entry.worshipLeader, person)
    && normalizeDate(entry.date) === previousWeekDate
  ) ?? null;
}

function formatAssignmentLocation(entry) {
  return `${entry.label} - ${formatValue("date", entry.date)}`;
}

function exportPdf(serviceId) {
  exportRangePdf(serviceId ? state.services[serviceId].date : pdfStartDateInput.value, 1, serviceId);
}

function exportRangePdf(startDateValue, monthsValue, serviceFilter = "") {
  const startDate = normalizeDate(startDateValue || getEarliestKnownDate() || new Date().toISOString().slice(0, 10));
  const months = Number(monthsValue || 3);
  const endDate = addMonths(startDate, months);
  const rangedEntries = sortHistory(history.filter((entry) => {
    const entryDate = normalizeDate(entry.date);
    const serviceMatch = !serviceFilter || entry.serviceId === serviceFilter;
    return serviceMatch && entryDate >= startDate && entryDate < endDate;
  }));

  if (rangedEntries.length === 0) {
    const serviceLabel = serviceFilter ? state.services[serviceFilter].label : "Adonai or Sunday Service";
    window.alert(`No saved ${serviceLabel} records were found from ${formatValue("date", startDate)} for the next ${months} month${months > 1 ? "s" : ""}.`);
    return;
  }

  const printWindow = window.open("", "_blank", "width=1200,height=800");
  if (!printWindow) {
    window.alert("Please allow pop-ups to save the roster as PDF.");
    return;
  }

  const rows = rangedEntries.map((entry) => `
    <tr>
      <td>${escapeHtml(formatValue("date", entry.date))}</td>
      <td>${escapeHtml(entry.label)}</td>
      <td>${escapeHtml(formatValue("worshipLeader", entry.worshipLeader))}</td>
      <td>${escapeHtml(formatValue("backup", entry.backup))}</td>
      <td>${escapeHtml(formatValue("musicians", entry.musicians))}</td>
    </tr>
  `).join("");

  const pdfTitle = serviceFilter ? `PAW Schedule - ${state.services[serviceFilter].label}` : "PAW Schedule";
  const subtitle = `Saved ${serviceFilter ? state.services[serviceFilter].label : "PAW Schedule"} records from ${escapeHtml(formatValue("date", startDate))} for the next ${months} month${months > 1 ? "s" : ""}. Use the browser print dialog and choose Save as PDF.`;
  printWindow.document.write(buildPdfDocument(pdfTitle, subtitle, rows));
  printWindow.document.close();
}

function buildPdfDocument(title, subtitle, rows) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body { margin: 0; padding: 24px; font-family: Arial, sans-serif; color: #13231b; background: #ffffff; }
      h1 { margin: 0 0 8px; font-size: 28px; }
      p { margin: 0 0 18px; color: #3d574b; }
      table { width: 100%; border-collapse: collapse; font-size: 13px; }
      th, td { border: 1px solid #b8cabf; padding: 9px; text-align: left; vertical-align: top; }
      th { background: #d9e8df; }
    </style>
  </head>
  <body>
    <h1>${title}</h1>
    <p>${subtitle}</p>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Service</th>
          <th>Worship Leader</th>
          <th>Backups</th>
          <th>Musicians</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <script>window.onload = () => window.print();</script>
  </body>
  </html>`;
}

function loadState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return structuredClone(defaultState);
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      registries: Object.fromEntries(Object.keys(registryMeta).map((key) => [key, sortEntries(parsed.registries?.[key] ?? defaultState.registries[key])])),
      daList: sortEntries(parsed.daList ?? parsed.pastorRequests ?? defaultState.daList),
      services: { ...structuredClone(defaultState.services), ...parsed.services }
    };
  } catch (error) {
    console.warn("Could not parse saved roster state. Using a clean state.", error);
    return structuredClone(defaultState);
  }
}

function loadHistory() {
  const saved = window.localStorage.getItem(HISTORY_KEY);
  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved).map(normalizeHistoryEntry).filter(Boolean);
  } catch (error) {
    console.warn("Could not parse assignment history. Using a clean history.", error);
    return [];
  }
}

function loadAuthState() {
  const saved = window.localStorage.getItem(AUTH_KEY);
  if (!saved) {
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(defaultAuth));
    return structuredClone(defaultAuth);
  }

  try {
    const parsed = JSON.parse(saved);
    const users = Array.isArray(parsed.users) && parsed.users.length > 0
      ? parsed.users.map((user) => user.id === "admin-seed"
        ? { ...user, role: user.role === "member" ? "member" : "headAdmin", isCreator: true }
        : user)
      : structuredClone(defaultAuth.users);
    return {
      users,
      pending: Array.isArray(parsed.pending) ? parsed.pending : []
    };
  } catch (error) {
    console.warn("Could not parse auth state. Restoring defaults.", error);
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(defaultAuth));
    return structuredClone(defaultAuth);
  }
}

function loadPhotos() {
  const saved = window.localStorage.getItem(PHOTOS_KEY);
  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [];
    }
    return sortPhotos(parsed.filter((photo) => !photo.imagePath || !photo.imagePath.startsWith("sample-photos/")));
  } catch (error) {
    console.warn("Could not parse Sunday photos.", error);
    return [];
  }
}

function loadFixedPhoto() {
  const saved = window.localStorage.getItem(FIXED_PHOTO_KEY);
  if (!saved) {
    return { ...fixedHomePhoto };
  }

  try {
    return { ...fixedHomePhoto, ...JSON.parse(saved) };
  } catch (error) {
    console.warn("Could not parse fixed home photo.", error);
    return { ...fixedHomePhoto };
  }
}

function loadAnnouncements() {
  return window.localStorage.getItem(ANNOUNCEMENTS_KEY) ?? "";
}

function restoreSession() {
  const sessionId = window.localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    return null;
  }
  return authState.users.find((user) => user.id === sessionId) ?? null;
}

function persistOrganizer() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function persistAuth() {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
}

function persistPhotos() {
  window.localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
}

function removeUploadedPhoto(photoId) {
  if (!canUploadPhotos()) {
    return;
  }

  photos = photos.filter((photo) => photo.id !== photoId);
  homeCarouselResolved = false;
  persistPhotos();
  renderPhotos();
}

function persistFixedPhoto() {
  window.localStorage.setItem(FIXED_PHOTO_KEY, JSON.stringify(fixedPhoto));
}

function getPhotoSource(photo) {
  return photo.imageData || photo.imagePath || "";
}

function getDisplayPhotos() {
  return [...samplePhotos, ...photos].filter((photo) => Boolean(getPhotoSource(photo)));
}

function canManageUploadedPhoto(photo) {
  return canUploadPhotos() && !photo.imagePath;
}

function getHomeCarouselPhotos() {
  const uploaded = getDisplayPhotos().filter((photo) => photo.id !== fixedHomePhoto.id);
  return [fixedPhoto, ...uploaded];
}

function startCarouselAutoplay() {
  stopCarouselAutoplay();

  const carouselPhotos = getHomeCarouselPhotos().slice(0, 8);
  if (activeSection !== "home" || carouselPhotos.length <= 1 || !homeCarouselResolved) {
    return;
  }

  homeCarouselTimer = window.setInterval(() => {
    homeCarouselIndex = (homeCarouselIndex + 1) % carouselPhotos.length;
    renderHomeCarousel();
  }, 3000);
}

function stopCarouselAutoplay() {
  if (homeCarouselTimer) {
    window.clearInterval(homeCarouselTimer);
    homeCarouselTimer = null;
  }
}


function persistAnnouncements() {
  window.localStorage.setItem(ANNOUNCEMENTS_KEY, announcements);
}

function canUploadPhotos() {
  return adminMode && currentUser && ["headAdmin", "admin", "tech"].includes(currentUser.role);
}

function isAdmin() {
  return currentUser?.role === "admin";
}

function isHeadAdmin() {
  return currentUser?.role === "headAdmin";
}

function hasAdminAccess() {
  return Boolean(currentUser && ["headAdmin", "admin"].includes(currentUser.role));
}

function canManageFixedPhoto() {
  return adminMode && hasAdminAccess();
}

function isCreator() {
  return Boolean(currentUser?.isCreator);
}

function isPrivilegedRole(role) {
  return ["headAdmin", "admin"].includes(role);
}

function canEnterAdminMode() {
  return Boolean(currentUser);
}

function canEditOrganizer() {
  return adminMode && Boolean(currentUser);
}

function canEditHomeContent() {
  return adminMode && Boolean(currentUser && ["headAdmin", "admin", "tech"].includes(currentUser.role));
}

function sortEntries(entries) {
  return [...entries].sort((left, right) => left.localeCompare(right));
}

function isSameWeek(leftDate, rightDate) {
  if (!leftDate || !rightDate) {
    return false;
  }

  return startOfWeek(leftDate) === startOfWeek(rightDate);
}

function startOfWeek(dateString) {
  const date = new Date(`${normalizeDate(dateString)}T00:00:00`);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return normalizeDate(date.toISOString().slice(0, 10));
}

function addDays(dateString, days) {
  const date = new Date(`${normalizeDate(dateString)}T00:00:00`);
  date.setDate(date.getDate() + days);
  return normalizeDate(date.toISOString().slice(0, 10));
}

function findNextWeekday(dateString, targetDay) {
  const date = new Date(`${normalizeDate(dateString)}T00:00:00`);
  while (date.getDay() !== targetDay) {
    date.setDate(date.getDate() + 1);
  }
  return normalizeDate(date.toISOString().slice(0, 10));
}

function addMonths(dateString, months) {
  const date = new Date(`${normalizeDate(dateString)}T00:00:00`);
  date.setMonth(date.getMonth() + months);
  return normalizeDate(date.toISOString().slice(0, 10));
}

function normalizeDate(value) {
  return String(value).slice(0, 10);
}

function createHistorySnapshot(service) {
  return {
    serviceId: service.id,
    label: service.label,
    title: service.title,
    date: normalizeDate(service.date),
    worshipLeader: service.worshipLeader ?? "",
    backup: [...(service.backup ?? [])],
    musicians: [...(service.musicians ?? [])]
  };
}

function normalizeHistoryEntry(entry) {
  if (!entry?.serviceId || !entry?.date) {
    return null;
  }

  const source = state?.services?.[entry.serviceId] ?? defaultState.services[entry.serviceId];
  return {
    serviceId: entry.serviceId,
    label: entry.label ?? source?.label ?? entry.serviceId,
    title: entry.title ?? source?.title ?? entry.serviceId,
    date: normalizeDate(entry.date),
    worshipLeader: entry.worshipLeader ?? "",
    backup: Array.isArray(entry.backup) ? entry.backup : entry.backup ? [entry.backup] : [],
    musicians: Array.isArray(entry.musicians) ? entry.musicians : []
  };
}

function sortHistory(entries) {
  return [...entries].sort((left, right) => {
    const dateCompare = normalizeDate(left.date).localeCompare(normalizeDate(right.date));
    if (dateCompare !== 0) {
      return dateCompare;
    }
    return left.serviceId.localeCompare(right.serviceId);
  });
}

function sortPhotos(entries) {
  return [...entries].sort((left, right) => normalizeDate(right.date).localeCompare(normalizeDate(left.date)));
}

function getEarliestKnownDate() {
  const dates = [
    ...history.map((entry) => normalizeDate(entry.date)),
    ...Object.values(state.services).map((service) => normalizeDate(service.date))
  ].filter(Boolean).sort((left, right) => left.localeCompare(right));

  return dates[0] ?? "";
}

function formatValue(key, value) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.map((entry) => getDisplayName(entry)).join(", ") : "Not assigned yet";
  }

  if (!value) {
    return "Not assigned yet";
  }

  if (key === "date") {
    return new Date(value).toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  return getDisplayName(value);
}

function normalizePersonName(value) {
  return String(value ?? "").replace(/\s*\(DA\)\s*$/i, "").trim().toLowerCase();
}

function isDaName(value) {
  return /\s*\(DA\)\s*$/i.test(String(value ?? ""));
}

function isInDaList(value) {
  return state.daList.some((entry) => samePerson(entry, value));
}

function getDisplayName(value) {
  const baseName = String(value ?? "").replace(/\s*\(DA\)\s*$/i, "").trim();
  if (!baseName) {
    return "";
  }

  if (adminMode && (isDaName(value) || isInDaList(value))) {
    return `${baseName} (DA)`;
  }

  return baseName;
}

function buildDisplayNameMarkup(value) {
  const safeName = escapeHtml(getDisplayName(value));
  if (!(adminMode && (isDaName(value) || isInDaList(value)))) {
    return safeName;
  }

  return `${escapeHtml(String(value ?? "").replace(/\s*\(DA\)\s*$/i, "").trim())}<span class="tag-status">DA</span>`;
}

function samePerson(left, right) {
  return Boolean(normalizePersonName(left)) && normalizePersonName(left) === normalizePersonName(right);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
