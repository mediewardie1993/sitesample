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

  const ministry = selectedMinistryPage || "Ministry";
  ministryDetailTitle.textContent = ministry;
  ministryDetailBoardTitle.textContent = `${ministry} Board`;
  ministryDetailCopy.textContent = "General announcements from Stage Management and upper admins also appear here.";
  ministryDetailInput.placeholder = `Write a post for ${ministry}`;
  ministryDetailExtra.innerHTML = "";

  if (ministry === "Praise And Worship Team") {
    const copy = document.createElement("p");
    copy.className = "mode-note";
    copy.textContent = canEditOrganizer()
      ? "You can also open the scheduling page from here."
      : "The schedule is managed from admin mode by Praise and Worship Team heads, assistants, and upper admins.";
    const button = document.createElement("button");
    button.className = "secondary-btn";
    button.type = "button";
    button.textContent = "Open Schedule";
    button.addEventListener("click", () => {
      activeSection = "organizer";
      renderSections();
      renderOrganizer();
    });
    ministryDetailExtra.append(copy, button);
  }
}
