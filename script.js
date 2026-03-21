const STORAGE_KEY = "service-roster-prototype-v4";
const HISTORY_KEY = "service-roster-history-v2";

const registryMeta = {
  worshipLeaders: "Worship Leaders",
  backups: "Backups",
  musicians: "Musicians",
  emcees: "Emcees",
  pastors: "Pastors",
  testimonies: "Testimonies"
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
    saturday: {
      id: "saturday",
      label: "Adonai",
      title: "Adonai Only",
      date: "",
      worshipLeader: "",
      backup: [],
      musicians: [],
      emcee: "",
      pastor: "",
      tech: "",
      topic: "",
      testimony: ""
    },
    sunday: {
      id: "sunday",
      label: "Sunday Service",
      title: "Sunday Service Only",
      date: "",
      worshipLeader: "",
      backup: [],
      musicians: [],
      emcee: "",
      pastor: "",
      tech: "",
      topic: "",
      testimony: ""
    }
  }
};

const defaultHistory = [];

const serviceSections = document.querySelector("#service-sections");
const sectionTemplate = document.querySelector("#service-section-template");
const legendGate = document.querySelector("#legend-gate");
const appShell = document.querySelector("#app-shell");
const legendMessage = document.querySelector("#legend-message");
const registryForm = document.querySelector("#registry-form");
const registryType = document.querySelector("#registry-type");
const registryName = document.querySelector("#registry-name");
const registryGroups = document.querySelector("#registry-groups");
const pdfStartDateInput = document.querySelector("#pdf-start-date");
const pdfRangeMonthsSelect = document.querySelector("#pdf-range-months");
const saveRangeButton = document.querySelector("#save-range-pdf");
const saveAllButton = document.querySelector("#save-all-pdf");
const resetDemoButton = document.querySelector("#reset-demo");
const HANDSOME_NAME = "Mark Edward Manapol";

let state = loadState();
let history = loadHistory();

initializeLegendGate();

registryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addRegistryItem(registryType.value, registryName.value);
  registryName.value = "";
});

saveAllButton.addEventListener("click", () => exportPdf());
saveRangeButton.addEventListener("click", () => exportRangePdf(pdfStartDateInput.value, pdfRangeMonthsSelect.value));
resetDemoButton.addEventListener("click", () => {
  state = structuredClone(defaultState);
  history = structuredClone(defaultHistory);
  persist();
  render();
});

function initializeLegendGate() {
  document.querySelectorAll(".legend-choice").forEach((button) => {
    button.addEventListener("click", () => handleLegendChoice(button.dataset.choice));
  });
}

function handleLegendChoice(choice) {
  if (choice === "c") {
    showHandsomeScreen();
    return;
  }

  showDeniedScreen();

  window.setTimeout(() => {
    window.close();
  }, 5000);
}

function showDeniedScreen() {
  document.body.innerHTML = `
    <div class="legend-gate denied-shake">
      <div class="legend-card denied-card">
        <p class="eyebrow denied-eyebrow">Access Denied</p>
        <h1 class="legend-title denied-title">WHO THE HECK ARE YOU!!!!!!!!!!!!!!!!!!!!!!!!</h1>
      </div>
    </div>
  `;
}

function showHandsomeScreen() {
  legendGate.innerHTML = `
    <div class="legend-card handsome-screen">
      <p class="eyebrow">Level Two</p>
      <h1 class="legend-title handsome-question">Who is the Handsomest of them all?</h1>
      <div class="handsome-input-shell">
        <span class="handsome-label">Your answer</span>
        <input id="handsome-real-input" class="handsome-real-input" type="text" inputmode="text" autocomplete="off" autocapitalize="none" spellcheck="false">
        <p id="handsome-output" class="handsome-output"><span class="handsome-cursor">|</span></p>
      </div>
      <div class="handsome-actions">
        <button id="handsome-continue" class="primary-btn continue-hidden" type="button">Enter App</button>
      </div>
    </div>
  `;

  const output = document.querySelector("#handsome-output");
  const continueButton = document.querySelector("#handsome-continue");
  const realInput = document.querySelector("#handsome-real-input");
  const inputShell = document.querySelector(".handsome-input-shell");
  let progress = 0;
  let previousRawValue = "";

  function renderOutput() {
    const revealed = HANDSOME_NAME.slice(0, progress);
    output.innerHTML = `${escapeHtml(revealed)}<span class="handsome-cursor">|</span>`;

    if (progress >= HANDSOME_NAME.length) {
      continueButton.classList.remove("continue-hidden");
    }
  }

  function focusInput() {
    realInput.focus({ preventScroll: true });
  }

  function handleKeydown(event) {
    if (event.key === "Tab") {
      return;
    }

    if (event.key === "Enter" && progress >= HANDSOME_NAME.length) {
      event.preventDefault();
      openAppFromHandsomeScreen();
    }
  }

  function handleInput() {
    const rawValue = realInput.value;

    if (rawValue.length > previousRawValue.length) {
      const delta = rawValue.length - previousRawValue.length;
      progress = Math.min(HANDSOME_NAME.length, progress + delta);
    } else if (rawValue.length < previousRawValue.length) {
      const delta = previousRawValue.length - rawValue.length;
      progress = Math.max(0, progress - delta);
    }

    previousRawValue = rawValue;
    renderOutput();
    continueButton.classList.toggle("continue-hidden", progress < HANDSOME_NAME.length);
  }

  continueButton.addEventListener("click", openAppFromHandsomeScreen);
  inputShell.addEventListener("click", focusInput);
  window.addEventListener("keydown", handleKeydown, { once: false });
  realInput.addEventListener("keydown", handleKeydown);
  realInput.addEventListener("input", handleInput);
  focusInput();

  function openAppFromHandsomeScreen() {
    window.removeEventListener("keydown", handleKeydown);
    realInput.removeEventListener("keydown", handleKeydown);
    realInput.removeEventListener("input", handleInput);
    legendGate.style.display = "none";
    appShell.classList.remove("app-hidden");
    render();
  }
}

function loadState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return structuredClone(defaultState);
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      registries: Object.fromEntries(
        Object.keys(registryMeta).map((key) => [key, sortEntries(parsed.registries?.[key] ?? defaultState.registries[key])])
      ),
      services: {
        ...structuredClone(defaultState.services),
        ...parsed.services
      }
    };
  } catch (error) {
    console.warn("Could not parse saved roster state. Using demo data.", error);
    return structuredClone(defaultState);
  }
}

function loadHistory() {
  const saved = window.localStorage.getItem(HISTORY_KEY);

  if (!saved) {
    return structuredClone(defaultHistory);
  }

  try {
    return JSON.parse(saved).map(normalizeHistoryEntry).filter(Boolean);
  } catch (error) {
    console.warn("Could not parse assignment history. Using demo history.", error);
    return structuredClone(defaultHistory);
  }
}

function persist() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function render() {
  syncCurrentServicesToHistory();
  renderRangeControls();
  renderRegistryGroups();
  renderServices();
}

function renderRangeControls() {
  if (!pdfStartDateInput.value) {
    pdfStartDateInput.value = getEarliestKnownDate() || normalizeDate(new Date().toISOString().slice(0, 10));
  }
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

  Object.values(state.services).forEach((service) => {
    const section = sectionTemplate.content.firstElementChild.cloneNode(true);

    section.querySelector(".service-label").textContent = service.label;
    section.querySelector(".service-title").textContent = service.title;
    section.querySelector(".export-service-btn").addEventListener("click", () => exportPdf(service.id));

    bindTextField(section, service, "date", ".service-date");
    bindTextField(section, service, "tech", ".tech");
    bindTextField(section, service, "topic", ".topic");

    bindRoleSelect(section, service, "worshipLeader", ".worshipLeader", state.registries.worshipLeaders);
    bindBackupMultiSelect(section, service);
    bindSimpleSelect(section, service, "emcee", ".emcee", state.registries.emcees, "Select emcee");
    bindSimpleSelect(section, service, "pastor", ".pastor", state.registries.pastors, "Select pastor");
    bindSimpleSelect(section, service, "testimony", ".testimony", state.registries.testimonies, "Select testimony");
    bindMusicianMultiSelect(section, service, 5, ".musicians-options", ".musicians-selected", ".multi-summary");
    updateConflictDisplay(section, service);

    serviceSections.appendChild(section);
  });
}

function bindTextField(section, service, key, selector) {
  const field = section.querySelector(selector);
  field.value = service[key] ?? "";

  field.addEventListener("input", (event) => {
    state.services[service.id][key] = event.target.value;
    upsertHistoryForService(service.id);
    persist();
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
    persist();
  });
}

function bindRoleSelect(section, service, key, selector, options) {
  const select = section.querySelector(selector);
  populateSelect(select, options, `Select ${key === "worshipLeader" ? "leader" : "backup"}`, service[key]);

  select.addEventListener("change", (event) => {
    const nextValue = event.target.value;
    const previousValue = state.services[service.id][key] ?? "";
    const conflictMessages = getConflictMessages(service.id, key, nextValue);

    if (conflictMessages.length > 0) {
      const proceed = window.confirm(
        `${conflictMessages.join("\n\n")}\n\nAre you sure you want to continue with this assignment?`
      );

      if (!proceed) {
        event.target.value = previousValue;
        return;
      }
    }

    state.services[service.id][key] = nextValue;
    upsertHistoryForService(service.id);
    persist();
    renderServices();
  });
}

function bindBackupMultiSelect(section, service) {
  bindLimitedMultiSelect(
    section,
    service,
    "backup",
    state.registries.backups,
    4,
    ".backups-options",
    ".backups-selected",
    ".backup-summary",
    "Select backups",
    "backup",
    true
  );
}

function bindMusicianMultiSelect(section, service, limit, optionsSelector, selectedSelector, summarySelector) {
  bindLimitedMultiSelect(
    section,
    service,
    "musicians",
    state.registries.musicians,
    limit,
    optionsSelector,
    selectedSelector,
    summarySelector,
    "Select musicians",
    "musician",
    false
  );
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
    option.innerHTML = `
      <input type="checkbox" value="${escapeHtml(name)}">
      <span>${escapeHtml(name)}</span>
    `;

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
          const proceed = window.confirm(
            `${conflictMessages.join("\n\n")}\n\nAre you sure you want to continue with this assignment?`
          );

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
      persist();
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
  select.innerHTML = `
    <option value="">${escapeHtml(placeholder)}</option>
    ${options.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}
  `;

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

  const worshipMessages = getConflictMessages(service.id, "worshipLeader", service.worshipLeader);
  const backupMessages = getBackupConflictMessages(service.id, service.backup ?? []);

  worshipSelect.classList.toggle("conflict", worshipMessages.length > 0);
  backupSummary.classList.toggle("conflict", backupMessages.length > 0);
  worshipConflict.textContent = worshipMessages[0] ?? "";
  backupConflict.textContent = backupMessages[0] ?? "";
}

function getConflictMessages(serviceId, role, person) {
  if (!person) {
    return [];
  }

  const service = state.services[serviceId];
  const otherRole = role === "worshipLeader" ? "backup" : "worshipLeader";
  const otherServiceId = serviceId === "saturday" ? "sunday" : "saturday";
  const otherService = state.services[otherServiceId];
  const messages = [];
  const backups = service.backup ?? [];
  const otherAssignments = [otherService.worshipLeader, ...(otherService.backup ?? [])].filter(Boolean);

  if (role === "worshipLeader" && backups.includes(person)) {
    messages.push(`${person} cannot be both worship leader and backup on the same day.`);
  }

  if (otherAssignments.includes(person)) {
    if (isSameWeek(service.date, otherService.date)) {
      messages.push(`${person} is already assigned to both Adonai and Sunday Service in the same week.`);
    }
  }

  if (role === "worshipLeader" && isLeaderTwoWeeksInARow(serviceId, service.date, person)) {
    messages.push(`${person} is already scheduled as worship leader in the previous week's ${service.label}.`);
  }

  return messages;
}

function getBackupConflictMessages(serviceId, people) {
  const service = state.services[serviceId];
  const otherServiceId = serviceId === "saturday" ? "sunday" : "saturday";
  const otherService = state.services[otherServiceId];
  const messages = [];
  const uniquePeople = [...new Set(people.filter(Boolean))];

  uniquePeople.forEach((person) => {
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

  return history.some((entry) =>
    entry.serviceId === serviceId &&
    entry.worshipLeader === person &&
    normalizeDate(entry.date) === previousWeekDate
  );
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

  if (!value) {
    return;
  }

  if (state.registries[type].some((name) => name.toLowerCase() === value.toLowerCase())) {
    return;
  }

  state.registries[type] = sortEntries([...state.registries[type], value]);
  persist();
  render();
}

function removeRegistryItem(type, name) {
  state.registries[type] = state.registries[type].filter((item) => item !== name);
  persist();
  render();
}

function sortEntries(entries) {
  return [...entries].sort((left, right) => left.localeCompare(right));
}

function isSameWeek(leftDate, rightDate) {
  if (!leftDate || !rightDate) {
    return false;
  }

  const startLeft = startOfWeek(leftDate);
  const startRight = startOfWeek(rightDate);
  return startLeft === startRight;
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

function normalizeDate(value) {
  return String(value).slice(0, 10);
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

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Edgin Personal Assigning App PDF</title>
      <style>
        body {
          margin: 0;
          padding: 24px;
          font-family: Arial, sans-serif;
          color: #13231b;
          background: #ffffff;
        }
        h1 {
          margin: 0 0 8px;
          font-size: 28px;
        }
        p {
          margin: 0 0 18px;
          color: #3d574b;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #b8cabf;
          padding: 10px;
          text-align: left;
          vertical-align: top;
        }
        th {
          background: #d9e8df;
        }
      </style>
    </head>
    <body>
      <h1>Edgin Personal Assigning App</h1>
      <p>Use the browser print dialog and choose Save as PDF.</p>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Date</th>
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
        <tbody>${tableRows}</tbody>
      </table>
      <script>
        window.onload = () => window.print();
      </script>
    </body>
    </html>
  `);

  printWindow.document.close();
}

function exportRangePdf(startDateValue, monthsValue) {
  const startDate = normalizeDate(startDateValue || getEarliestKnownDate() || new Date().toISOString().slice(0, 10));
  const months = Number(monthsValue || 3);
  const endDate = addMonths(startDate, months);
  const rangedEntries = sortHistory(
    history.filter((entry) => {
      const entryDate = normalizeDate(entry.date);
      return entryDate >= startDate && entryDate < endDate;
    })
  );

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

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Edgin Personal Assigning App Range PDF</title>
      <style>
        body {
          margin: 0;
          padding: 24px;
          font-family: Arial, sans-serif;
          color: #13231b;
          background: #ffffff;
        }
        h1 {
          margin: 0 0 8px;
          font-size: 28px;
        }
        p {
          margin: 0 0 18px;
          color: #3d574b;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        th, td {
          border: 1px solid #b8cabf;
          padding: 8px;
          text-align: left;
          vertical-align: top;
        }
        th {
          background: #d9e8df;
        }
      </style>
    </head>
    <body>
      <h1>Edgin Personal Assigning App</h1>
      <p>Saved weekly roster records from ${escapeHtml(formatValue("date", startDate))} for the next ${months} month${months > 1 ? "s" : ""}. Use the browser print dialog and choose Save as PDF.</p>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Service</th>
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
      <script>
        window.onload = () => window.print();
      </script>
    </body>
    </html>
  `);

  printWindow.document.close();
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

function getEarliestKnownDate() {
  const dates = [
    ...history.map((entry) => normalizeDate(entry.date)),
    ...Object.values(state.services).map((service) => normalizeDate(service.date))
  ].filter(Boolean).sort((left, right) => left.localeCompare(right));

  return dates[0] ?? "";
}

function addMonths(dateString, months) {
  const date = new Date(`${normalizeDate(dateString)}T00:00:00`);
  date.setMonth(date.getMonth() + months);
  return normalizeDate(date.toISOString().slice(0, 10));
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
