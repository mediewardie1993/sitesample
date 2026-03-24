const ministryOrganizerSection = document.querySelector("#section-organizer");
const ministryAppShell = document.querySelector("#app-shell");

function detachOrganizerSection() {
  if (!ministryOrganizerSection || !ministryAppShell) {
    return;
  }

  if (ministryOrganizerSection.parentElement !== ministryAppShell) {
    ministryAppShell.appendChild(ministryOrganizerSection);
  }

  ministryOrganizerSection.classList.add("app-hidden");
}

function attachOrganizerSectionToMinistryDetail() {
  if (!ministryOrganizerSection || !ministryDetailExtra) {
    return;
  }

  if (ministryOrganizerSection.parentElement !== ministryDetailExtra) {
    ministryDetailExtra.appendChild(ministryOrganizerSection);
  }

  ministryOrganizerSection.classList.remove("app-hidden");
}

function buildCellManagementPanel() {
  if (typeof renderCellManagementWorkspace === "function") {
    return renderCellManagementWorkspace();
  }

  const fallback = document.createElement("section");
  fallback.className = "managed-ministry-row ministry-card";
  fallback.innerHTML = `
    <div class="ministry-card-head">
      <strong>Cell Management Page</strong>
    </div>
    <p class="ministry-card-copy">Cell Management tools are loading.</p>
  `;
  return fallback;
}

function getAnnouncementBoardConfig(sectionKey) {
  if (sectionKey === "ministryDetail") {
    const ministry = selectedMinistryPage || "Ministry";
    return { label: ministry, ministry, grantMinistries: [ministry] };
  }

  return announcementBoardMeta[sectionKey] ?? { label: "Board", ministry: "", grantMinistries: [] };
}

function getAnnouncementStorageKey(sectionKey) {
  if (sectionKey === "ministryDetail") {
    return `ministry:${selectedMinistryPage || "Ministry"}`;
  }

  return sectionKey;
}

function renderMinistriesPage() {
  if (!ministriesList) {
    return;
  }

  const sortedMinistries = sortEntries(authState.ministries ?? []);
  ministriesList.innerHTML = "";

  sortedMinistries.forEach((ministry) => {
    const card = document.createElement("article");
    card.className = "managed-ministry-row ministry-card";

    const isWorshipTeam = ministry === "Praise And Worship Team";
    card.innerHTML = `
      <div class="ministry-card-head">
        <button class="ghost-btn ministry-open-link" type="button">${escapeHtml(ministry)}</button>
      </div>
      <p class="ministry-card-copy">${isWorshipTeam ? "Open this ministry page to view updates and the schedule link." : "Open this ministry page to view announcements."}</p>
    `;

    const openButton = card.querySelector(".ministry-open-link");
    if (openButton) {
      openButton.addEventListener("click", () => {
        selectedMinistryPage = ministry;
        if (typeof persistSelectedMinistryPage === "function") {
          persistSelectedMinistryPage();
        }
        activeSection = "ministryDetail";
        renderSections();
        renderMinistryDetailPage();
      });
    }

    ministriesList.appendChild(card);
  });
}

function renderMinistryDetailPage() {
  if (!ministryDetailTitle) {
    return;
  }

  const ministry = typeof normalizeMinistryName === "function"
    ? normalizeMinistryName(selectedMinistryPage || "Ministry")
    : (selectedMinistryPage || "Ministry");
  selectedMinistryPage = ministry;
  if (typeof persistSelectedMinistryPage === "function") {
    persistSelectedMinistryPage();
  }
  ministryDetailTitle.textContent = ministry;
  ministryDetailBoardTitle.textContent = `${ministry} Board`;
  ministryDetailCopy.textContent = "General announcements from Stage Management and upper admins also appear here.";
  ministryDetailInput.placeholder = `Write a post for ${ministry}`;
  ministryDetailExtra.innerHTML = "";
  detachOrganizerSection();

  if (ministry === "Praise And Worship Team") {
    attachOrganizerSectionToMinistryDetail();
    renderOrganizer();
    return;
  }

  if (ministry === "Cell Management") {
    ministryDetailExtra.appendChild(buildCellManagementPanel());
  }
}
