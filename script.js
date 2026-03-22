const STORAGE_KEY = "service-roster-prototype-v4";
const HISTORY_KEY = "service-roster-history-v2";
const AUTH_KEY = "jccm-site-auth-v1";
const PHOTOS_KEY = "jccm-sunday-photos-v1";
const SESSION_KEY = "jccm-site-session-v1";
const ANNOUNCEMENTS_KEY = "jccm-announcements-v1";

const registryMeta = {
  worshipLeaders: "Worship Leaders",
  backups: "Backups",
  musicians: "Musicians",
  emcees: "Emcees",
  pastors: "Pastors",
  testimonies: "Testimonies"
};

const roleLabels = {
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
    musicians: [],
    emcees: [],
    pastors: [],
    testimonies: []
  },
  services: {
    saturday: { id: "saturday", label: "Adonai", title: "Adonai Only", date: "", worshipLeader: "", backup: [], musicians: [], emcee: "", pastor: "", tech: "", topic: "", testimony: "" },
    sunday: { id: "sunday", label: "Sunday Service", title: "Sunday Service Only", date: "", worshipLeader: "", backup: [], musicians: [], emcee: "", pastor: "", tech: "", topic: "", testimony: "" }
  }
};

const defaultAuth = {
  users: [{ id: "admin-seed", name: "Main Admin", username: "admin", password: "admin123", role: "admin" }],
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

const sectionIds = ["home", "photos", "organizer", "admin"];

const loginGate = document.querySelector("#login-gate");
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
const pendingApprovals = document.querySelector("#pending-approvals");
const approvedAccounts = document.querySelector("#approved-accounts");
const serviceSections = document.querySelector("#service-sections");
const sectionTemplate = document.querySelector("#service-section-template");
const registryForm = document.querySelector("#registry-form");
const registryType = document.querySelector("#registry-type");
const registryName = document.querySelector("#registry-name");
const registryGroups = document.querySelector("#registry-groups");
const organizerModeNote = document.querySelector("#organizer-mode-note");
const pdfStartDateInput = document.querySelector("#pdf-start-date");
const pdfRangeMonthsSelect = document.querySelector("#pdf-range-months");
const saveRangeButton = document.querySelector("#save-range-pdf");
const saveAllButton = document.querySelector("#save-all-pdf");
const resetDemoButton = document.querySelector("#reset-demo");

let state = loadState();
let history = loadHistory();
let authState = loadAuthState();
let photos = loadPhotos();
let currentUser = restoreSession();
let activeSection = "home";
let adminMode = false;
let homeCarouselIndex = 0;
let announcements = loadAnnouncements();
let homeCarouselTimer = null;

initializeApp();

function initializeApp() {
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
  saveAllButton.addEventListener("click", () => exportPdf());
  saveRangeButton.addEventListener("click", () => exportRangePdf(pdfStartDateInput.value, pdfRangeMonthsSelect.value));
  resetDemoButton.addEventListener("click", resetOrganizer);
  photoUploadForm.addEventListener("submit", handlePhotoUpload);
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

  const file = photoFile.files?.[0];
  const date = photoDate.value;
  const caption = photoCaption.value.trim();

  if (!file || !date) {
    photoUploadMessage.textContent = "Please choose a Sunday date and an image file.";
    return;
  }

  try {
    const imageData = await readFileAsDataUrl(file);
    photos.unshift({
      id: `photo-${Date.now()}`,
      date,
      caption: caption || "Sunday service highlight",
      imageData,
      uploadedBy: currentUser?.name || currentUser?.username || "Unknown"
    });
    photos = sortPhotos(photos).slice(0, 60);
    persistPhotos();
    photoUploadForm.reset();
    photoUploadMessage.textContent = "Sunday photo uploaded.";
    renderPhotos();
  } catch (error) {
    console.error(error);
    photoUploadMessage.textContent = "That photo could not be saved. Try a smaller image.";
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

  if (activeSection === "admin" && !(adminMode && isAdmin())) {
    activeSection = "home";
  }

  currentUserName.textContent = currentUser.name || currentUser.username;
  currentUserRole.textContent = `${roleLabels[currentUser.role] ?? "Member"}${adminMode ? " - Admin Mode" : " - View Mode"}`;
  adminModeButton.classList.toggle("app-hidden", !canEnterAdminMode());
  adminModeButton.textContent = adminMode ? "Exit Admin" : "Admin";
  adminNavButton.classList.toggle("app-hidden", !(adminMode && isAdmin()));
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

  if (!canUpload) {
    photoUploadMessage.textContent = "Turn on Admin Mode with a tech team or admin account to upload Sunday photos.";
  } else if (photoUploadMessage.textContent === "Turn on Admin Mode with a tech team or admin account to upload Sunday photos.") {
    photoUploadMessage.textContent = "";
  }
}

function renderHomeCarousel() {
  const carouselPhotos = getDisplayPhotos().slice(0, 8);
  homeCarouselDots.innerHTML = "";

  if (carouselPhotos.length === 0) {
    homeCarouselIndex = 0;
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
  homeCarouselSlide.innerHTML = `<div class="carousel-empty">Loading photo...</div>`;

  const preloader = new Image();
  preloader.onload = () => {
    if (getDisplayPhotos().slice(0, 8)[homeCarouselIndex]?.id !== photo.id) {
      return;
    }

    homeCarouselSlide.innerHTML = "";
    const img = document.createElement("img");
    img.className = "carousel-photo carousel-fade";
    img.alt = photo.caption || "Sunday photo";
    img.src = source;
    homeCarouselSlide.appendChild(img);
  };
  preloader.onerror = () => {
    skipBrokenCarouselPhoto();
  };
  preloader.src = source;

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
  const carouselPhotos = getDisplayPhotos().slice(0, 8);
  if (carouselPhotos.length <= 1) {
    return;
  }

  homeCarouselIndex = (homeCarouselIndex + direction + carouselPhotos.length) % carouselPhotos.length;
  renderHomeCarousel();
  startCarouselAutoplay();
}

function skipBrokenCarouselPhoto() {
  const carouselPhotos = getDisplayPhotos().slice(0, 8);
  if (carouselPhotos.length <= 1) {
    homeCarouselSlide.innerHTML = `<div class="carousel-empty">This photo could not be loaded.</div>`;
    return;
  }

  homeCarouselIndex = (homeCarouselIndex + 1) % carouselPhotos.length;
  renderHomeCarousel();
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
    card.innerHTML = `
      <img src="${getPhotoSource(photo)}" alt="${escapeHtml(photo.caption)}">
      <div class="photo-meta">
        <strong>${escapeHtml(photo.caption)}</strong>
        <span>${escapeHtml(formatValue("date", photo.date))}</span>
        <span>Uploaded by ${escapeHtml(photo.uploadedBy)}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderAdmin() {
  if (!(adminMode && isAdmin())) {
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
    roleSelect.addEventListener("change", () => updateAccountRole(account.id, roleSelect.value));

    const removeButton = item.querySelector(".remove-account-btn");
    if (account.id === currentUser.id) {
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
  authState.users = authState.users.map((account) => account.id === accountId ? { ...account, role } : account);

  if (currentUser?.id === accountId) {
    currentUser = authState.users.find((account) => account.id === accountId) ?? currentUser;
  }

  persistAuth();
  renderApp();
}

function removeAccount(accountId) {
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
  registryType.disabled = !editingEnabled;
  registryName.disabled = !editingEnabled;
  registryForm.querySelector("button").disabled = !editingEnabled;
  resetDemoButton.disabled = !editingEnabled;
  organizerModeNote.textContent = canEditOrganizer()
    ? "Admin mode is active. Editing is enabled for the Praise and Worship organizer."
    : "You are in view mode. Only the Praise and Worship Head, Assistant Head, or Admin in Admin Mode can edit assignments.";
  renderRegistryGroups();
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
              <span>${escapeHtml(name)}</span>
              <button type="button" data-type="${key}" data-name="${escapeHtml(name)}" aria-label="Remove ${escapeHtml(name)}">&times;</button>
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

function renderServices() {
  serviceSections.innerHTML = "";
  const editingEnabled = canEditOrganizer();

  Object.values(state.services).forEach((service) => {
    const section = sectionTemplate.content.firstElementChild.cloneNode(true);

    section.querySelector(".service-label").textContent = service.label;
    section.querySelector(".service-title").textContent = service.title;
    section.querySelector(".export-service-btn").addEventListener("click", () => exportPdf(service.id));

    bindTextField(section, service, "date", ".service-date");
    bindTextField(section, service, "tech", ".tech");
    bindTextField(section, service, "topic", ".topic");
    bindRoleSelect(section, service, ".worshipLeader", state.registries.worshipLeaders);
    bindBackupMultiSelect(section, service);
    bindSimpleSelect(section, service, "emcee", ".emcee", state.registries.emcees, "Select emcee");
    bindSimpleSelect(section, service, "pastor", ".pastor", state.registries.pastors, "Select pastor");
    bindSimpleSelect(section, service, "testimony", ".testimony", state.registries.testimonies, "Select testimony");
    bindMusicianMultiSelect(section, service, 5, ".musicians-options", ".musicians-selected", ".multi-summary");
    updateConflictDisplay(section, service);
    applyOrganizerPermissions(section, editingEnabled);

    serviceSections.appendChild(section);
  });
}

function bindTextField(section, service, key, selector) {
  const field = section.querySelector(selector);
  field.value = service[key] ?? "";
  field.addEventListener("input", (event) => {
    state.services[service.id][key] = event.target.value;
    upsertHistoryForService(service.id);
    persistOrganizer();
    if (key === "date") {
      renderServices();
    }
  });
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
  populateSelect(select, options, "Select leader", service.worshipLeader);
  select.addEventListener("change", (event) => {
    const nextValue = event.target.value;
    const previousValue = state.services[service.id].worshipLeader ?? "";
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
  bindLimitedMultiSelect(section, service, "backup", state.registries.backups, 4, ".backups-options", ".backups-selected", ".backup-summary", "Select backups", "backup", true);
}

function bindMusicianMultiSelect(section, service, limit, optionsSelector, selectedSelector, summarySelector) {
  bindLimitedMultiSelect(section, service, "musicians", state.registries.musicians, limit, optionsSelector, selectedSelector, summarySelector, "Select musicians", "musician", false);
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
        if (selected.size >= limit) {
          checkbox.checked = false;
          window.alert(`You can assign up to ${limit} ${unitLabel}${limit > 1 ? "s" : ""} only.`);
          return;
        }
        selected.add(name);
      } else {
        selected.delete(name);
      }

      const nextValues = Array.from(selected);

      if (key === "backup") {
        const conflictMessages = getBackupConflictMessages(service.id, nextValues);
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

function populateSelect(select, options, placeholder, selectedValue) {
  select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${options.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}`;

  if (selectedValue && !options.includes(selectedValue)) {
    const fallback = document.createElement("option");
    fallback.value = selectedValue;
    fallback.textContent = `${selectedValue} (missing from registry)`;
    select.appendChild(fallback);
  }

  select.value = selectedValue ?? "";
}

function updateSelectedItems(container, summary, names, emptyLabel, unitLabel) {
  const list = names ?? [];
  summary.textContent = list.length > 0 ? `${list.length} ${unitLabel}${list.length > 1 ? "s" : ""} selected` : emptyLabel;
  container.innerHTML = list.length > 0
    ? list.map((name) => `<span class="selected-pill">${escapeHtml(name)}</span>`).join("")
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

  const service = state.services[serviceId];
  const otherService = state.services[serviceId === "saturday" ? "sunday" : "saturday"];
  const messages = [];
  const backups = service.backup ?? [];
  const otherAssignments = [otherService.worshipLeader, ...(otherService.backup ?? [])].filter(Boolean);

  if (backups.includes(person)) {
    messages.push(`${person} cannot be both worship leader and backup on the same day.`);
  }
  if (otherAssignments.includes(person) && isSameWeek(service.date, otherService.date)) {
    messages.push(`${person} is already assigned to both Adonai and Sunday Service in the same week.`);
  }
  if (isLeaderTwoWeeksInARow(serviceId, service.date, person)) {
    messages.push(`${person} is already scheduled as worship leader in the previous week's ${service.label}.`);
  }

  return messages;
}

function getBackupConflictMessages(serviceId, people) {
  const service = state.services[serviceId];
  const otherService = state.services[serviceId === "saturday" ? "sunday" : "saturday"];
  const messages = [];

  [...new Set(people.filter(Boolean))].forEach((person) => {
    if (service.worshipLeader === person) {
      messages.push(`${person} cannot be both worship leader and backup on the same day.`);
    }

    const otherAssignments = [otherService.worshipLeader, ...(otherService.backup ?? [])].filter(Boolean);
    if (otherAssignments.includes(person) && isSameWeek(service.date, otherService.date)) {
      messages.push(`${person} is already assigned to both Adonai and Sunday Service in the same week.`);
    }
  });

  return [...new Set(messages)];
}

function isLeaderTwoWeeksInARow(serviceId, date, person) {
  if (!date || !person) {
    return false;
  }

  const previousWeekDate = addDays(date, -7);
  return history.some((entry) => entry.serviceId === serviceId && entry.worshipLeader === person && normalizeDate(entry.date) === previousWeekDate);
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
  if (!value || state.registries[type].some((name) => name.toLowerCase() === value.toLowerCase())) {
    return;
  }

  state.registries[type] = sortEntries([...state.registries[type], value]);
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

function exportPdf(serviceId) {
  const services = serviceId ? [state.services[serviceId]] : Object.values(state.services);
  const printWindow = window.open("", "_blank", "width=1100,height=760");

  if (!printWindow) {
    window.alert("Please allow pop-ups to save the roster as PDF.");
    return;
  }

  const tableRows = services.map((service) => `
    <tr>
      <td>${escapeHtml(service.label)}</td>
      <td>${escapeHtml(formatValue("date", service.date))}</td>
      <td>${escapeHtml(formatValue("worshipLeader", service.worshipLeader))}</td>
      <td>${escapeHtml(formatValue("backup", service.backup))}</td>
      <td>${escapeHtml(formatValue("musicians", service.musicians))}</td>
      <td>${escapeHtml(formatValue("emcee", service.emcee))}</td>
      <td>${escapeHtml(formatValue("pastor", service.pastor))}</td>
      <td>${escapeHtml(formatValue("tech", service.tech))}</td>
      <td>${escapeHtml(formatValue("topic", service.topic))}</td>
      <td>${escapeHtml(formatValue("testimony", service.testimony))}</td>
    </tr>
  `).join("");

  printWindow.document.write(buildPdfDocument("JCCM PAW Team Organizer", "Use the browser print dialog and choose Save as PDF.", tableRows, false));
  printWindow.document.close();
}

function exportRangePdf(startDateValue, monthsValue) {
  const startDate = normalizeDate(startDateValue || getEarliestKnownDate() || new Date().toISOString().slice(0, 10));
  const months = Number(monthsValue || 3);
  const endDate = addMonths(startDate, months);
  const rangedEntries = sortHistory(history.filter((entry) => {
    const entryDate = normalizeDate(entry.date);
    return entryDate >= startDate && entryDate < endDate;
  }));

  if (rangedEntries.length === 0) {
    window.alert(`No saved Adonai or Sunday Service records were found from ${formatValue("date", startDate)} for the next ${months} month${months > 1 ? "s" : ""}.`);
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
      <td>${escapeHtml(formatValue("emcee", entry.emcee))}</td>
      <td>${escapeHtml(formatValue("pastor", entry.pastor))}</td>
      <td>${escapeHtml(formatValue("tech", entry.tech))}</td>
      <td>${escapeHtml(formatValue("topic", entry.topic))}</td>
      <td>${escapeHtml(formatValue("testimony", entry.testimony))}</td>
    </tr>
  `).join("");

  const subtitle = `Saved weekly roster records from ${escapeHtml(formatValue("date", startDate))} for the next ${months} month${months > 1 ? "s" : ""}. Use the browser print dialog and choose Save as PDF.`;
  printWindow.document.write(buildPdfDocument("JCCM PAW Team Organizer", subtitle, rows, true));
  printWindow.document.close();
}

function buildPdfDocument(title, subtitle, rows, compact) {
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
      table { width: 100%; border-collapse: collapse; font-size: ${compact ? "12px" : "14px"}; }
      th, td { border: 1px solid #b8cabf; padding: ${compact ? "8px" : "10px"}; text-align: left; vertical-align: top; }
      th { background: #d9e8df; }
    </style>
  </head>
  <body>
    <h1>${title}</h1>
    <p>${subtitle}</p>
    <table>
      <thead>
        <tr>
          <th>${compact ? "Date" : "Service"}</th>
          <th>${compact ? "Service" : "Date"}</th>
          <th>Worship Leader</th>
          <th>Backup</th>
          <th>Musicians</th>
          <th>Emcee</th>
          <th>Pastor</th>
          <th>Tech</th>
          <th>Topic</th>
          <th>Testimony</th>
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
    return {
      users: Array.isArray(parsed.users) && parsed.users.length > 0 ? parsed.users : structuredClone(defaultAuth.users),
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
    return sortPhotos(structuredClone(samplePhotos));
  }

  try {
    const parsed = JSON.parse(saved);
    return sortPhotos(parsed.length > 0 ? parsed : structuredClone(samplePhotos));
  } catch (error) {
    console.warn("Could not parse Sunday photos.", error);
    return sortPhotos(structuredClone(samplePhotos));
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

function getPhotoSource(photo) {
  return photo.imageData || photo.imagePath || "";
}

function getDisplayPhotos() {
  return photos.filter((photo) => Boolean(getPhotoSource(photo)));
}

function startCarouselAutoplay() {
  stopCarouselAutoplay();

  const carouselPhotos = getDisplayPhotos().slice(0, 8);
  if (activeSection !== "home" || carouselPhotos.length <= 1) {
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
  return adminMode && currentUser && (currentUser.role === "admin" || currentUser.role === "tech");
}

function isAdmin() {
  return currentUser?.role === "admin";
}

function canEnterAdminMode() {
  return Boolean(currentUser && currentUser.role !== "member");
}

function canEditOrganizer() {
  return adminMode && Boolean(currentUser && ["admin", "pwHead", "pwAssistant"].includes(currentUser.role));
}

function canEditHomeContent() {
  return adminMode && Boolean(currentUser && ["admin", "tech"].includes(currentUser.role));
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
    musicians: [...(service.musicians ?? [])],
    emcee: service.emcee ?? "",
    pastor: service.pastor ?? "",
    tech: service.tech ?? "",
    topic: service.topic ?? "",
    testimony: service.testimony ?? ""
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
    musicians: Array.isArray(entry.musicians) ? entry.musicians : [],
    emcee: entry.emcee ?? "",
    pastor: entry.pastor ?? "",
    tech: entry.tech ?? "",
    topic: entry.topic ?? "",
    testimony: entry.testimony ?? ""
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
    return value.length > 0 ? value.join(", ") : "Not assigned yet";
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

  return value;
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
