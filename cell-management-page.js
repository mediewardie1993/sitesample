"use strict";

const AUTH_KEY = "jccm-site-auth-v1";
const SESSION_KEY = "jccm-site-session-v1";
const SESSION_TEMP_KEY = "jccm-site-session-temp-v1";
const ADMIN_MODE_KEY = "jccm-admin-mode-v1";
const CELL_MANAGEMENT_KEY = "jccm-cell-management-v1";

const defaultSeedUsers = [
  {
    id: "admin-seed",
    name: "Medward",
    username: "mediewardie",
    usernames: ["mediewardie", "toGodbetheglory"],
    password: "",
    role: "headAdmin",
    isCreator: true,
    titles: [
      { scope: "platform", role: "creator" },
      { scope: "platform", role: "headAdmin" }
    ],
    ministries: [],
    profile: {}
  },
  {
    id: "rcb-seed",
    name: "RCB",
    username: "RCB",
    usernames: ["RCB"],
    password: "RCB",
    role: "admin",
    isCreator: false,
    titles: [
      { scope: "platform", role: "admin", ministry: "" }
    ],
    ministries: [],
    profile: {}
  },
  {
    id: "ferdie-seed",
    name: "Ptr. Ferdie Tolentino",
    username: "Ferdie",
    usernames: ["Ferdie"],
    password: "Ferdie",
    role: "headAdmin",
    isCreator: false,
    titles: [
      { scope: "platform", role: "headAdmin", ministry: "" }
    ],
    ministries: [],
    profile: {}
  }
];

const cellDiscipleshipLabels = {
  visitor: "Visitor (Level 1)",
  member: "Member (Level 2)",
  cellLeader: "Cell Leader (Level 3)",
  networkLeader: "Network Leader (Level 4)"
};

const cellLeadershipOfficeLabels = {
  seniorPastor: "Senior Pastor",
  adminPastor: "Admin Pastor",
  cellManager: "Cell Manager",
  primaryLeader: "Primary Leader"
};

const cellManagementTreeLevels = [
  { label: "Senior Pastor", slots: ["A1"] },
  { label: "Admin Pastor", slots: ["B1"] },
  { label: "Cell Management / Members", slots: ["C1", "C2", "C3", "C4", "C5", "C6"] }
];

const loginRequiredCard = document.querySelector("#cell-login-required");
const sessionBar = document.querySelector("#cell-session-bar");
const sessionUser = document.querySelector("#cell-session-user");
const sessionMode = document.querySelector("#cell-session-mode");
const adminToggle = document.querySelector("#cell-admin-toggle");
const cellManagementRoot = document.querySelector("#cell-management-root");

let authState = loadAuthState();
let currentUser = restoreSession();
let adminMode = restoreAdminMode();
let cellManagementState = loadCellManagementState();
let selectedRecordId = "";

function sortEntries(entries) {
  return [...entries].sort((left, right) => String(left || "").localeCompare(String(right || "")));
}

function samePerson(left, right) {
  return String(left || "").trim().replace(/\s+/g, " ").toLowerCase()
    === String(right || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cssEscape(value) {
  if (window.CSS?.escape) {
    return window.CSS.escape(String(value ?? ""));
  }
  return String(value ?? "").replace(/["\\]/g, "\\$&");
}

function isExcludedLegacyOrTestAccount(user) {
  const id = String(user?.id ?? "");
  const usernames = (Array.isArray(user?.usernames) ? user.usernames : [user?.username].filter(Boolean))
    .map((value) => String(value));
  const name = String(user?.name ?? "");
  const removableSeedUsernames = ["admin", "medward", "medwardhead", "medwardadmin", "medwardmember1", "medwardmember2", "medwardvisitor"];
  const testPattern = /test(head|assistant|primary|officer|member)$/i;

  return Boolean(
    user?.isTemporary
    || id.startsWith("temp-")
    || usernames.some((username) => removableSeedUsernames.includes(username) || testPattern.test(username))
    || testPattern.test(name)
  );
}

function normalizeUserAccount(user) {
  const usernames = Array.isArray(user?.usernames) && user.usernames.length > 0
    ? user.usernames
    : [user?.username].filter(Boolean);

  return {
    ...user,
    username: user?.username || usernames[0] || "",
    usernames,
    role: user?.id === "admin-seed" && user?.role !== "member" ? "headAdmin" : (user?.role || "member"),
    isCreator: Boolean(user?.isCreator || user?.id === "admin-seed"),
    ministries: Array.isArray(user?.ministries) ? user.ministries : [],
    titles: Array.isArray(user?.titles) ? user.titles : [],
    profile: user?.profile ?? {}
  };
}

function loadAuthState() {
  const saved = window.localStorage.getItem(AUTH_KEY);
  const fallback = { users: defaultSeedUsers };
  let parsed = fallback;

  if (saved) {
    try {
      parsed = JSON.parse(saved);
    } catch (error) {
      console.warn("Could not parse saved auth state for Cell Management page.", error);
    }
  }

  const mergedUsers = [...(Array.isArray(parsed.users) ? parsed.users : [])];
  defaultSeedUsers.forEach((seedUser) => {
    if (!mergedUsers.some((user) => String(user?.id || "") === seedUser.id)) {
      mergedUsers.push(seedUser);
    }
  });

  return {
    users: mergedUsers
      .map(normalizeUserAccount)
      .filter((user) => !isExcludedLegacyOrTestAccount(user))
  };
}

function restoreSession() {
  const sessionId = window.localStorage.getItem(SESSION_KEY) || window.sessionStorage.getItem(SESSION_TEMP_KEY);
  if (!sessionId) {
    return null;
  }
  return authState.users.find((user) => user.id === sessionId) ?? null;
}

function restoreAdminMode() {
  return window.sessionStorage.getItem(ADMIN_MODE_KEY) === "true";
}

function isCreator() {
  return Boolean(currentUser?.isCreator);
}

function getSeedCellManagementRecords() {
  return [
    { id: "cell-seed-babes", userId: "", name: "Ptra. Babes Dionisio", leadershipOffice: "seniorPastor", manualLevelOverride: "networkLeader" },
    { id: "cell-seed-ferdie", userId: "ferdie-seed", name: "Ptr. Ferdie Tolentino", leadershipOffice: "adminPastor", manualLevelOverride: "networkLeader" },
    { id: "cell-seed-reny", userId: "", name: "Reny Borlagdan", leadershipOffice: "cellManager", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" },
    { id: "cell-seed-edward", userId: "", name: "Edward Manapol", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" },
    { id: "cell-seed-charles", userId: "", name: "Charles Francis Echano", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" },
    { id: "cell-seed-louisse", userId: "", name: "Louisse Encela", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" },
    { id: "cell-seed-edmund", userId: "", name: "Edmund Echano", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" },
    { id: "cell-seed-roel", userId: "", name: "Roel Bayonon", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" }
  ];
}

function getDefaultCellManagementState() {
  return {
    records: getSeedCellManagementRecords(),
    groups: [],
    treeAssignments: {
      A1: "cell-seed-babes",
      B1: "cell-seed-ferdie",
      C1: "cell-seed-reny",
      C2: "cell-seed-edward",
      C3: "cell-seed-charles",
      C4: "cell-seed-louisse",
      C5: "cell-seed-edmund",
      C6: "cell-seed-roel"
    }
  };
}

function loadCellManagementState() {
  const saved = window.localStorage.getItem(CELL_MANAGEMENT_KEY);
  if (!saved) {
    return getDefaultCellManagementState();
  }

  try {
    const parsed = JSON.parse(saved);
    const seedRecords = getSeedCellManagementRecords();
    const savedRecords = Array.isArray(parsed.records) ? parsed.records : [];
    const mergedRecords = [...savedRecords];
    seedRecords.forEach((seedRecord) => {
      const exists = mergedRecords.some((record) =>
        String(record?.id || "") === seedRecord.id
        || samePerson(record?.name || "", seedRecord.name)
      );
      if (!exists) {
        mergedRecords.push(seedRecord);
      }
    });

    const defaults = getDefaultCellManagementState();
    return {
      records: mergedRecords,
      groups: Array.isArray(parsed.groups) ? sortEntries(parsed.groups.map((value) => String(value || "").trim()).filter(Boolean)) : [],
      treeAssignments: parsed.treeAssignments && typeof parsed.treeAssignments === "object"
        ? { ...defaults.treeAssignments, ...parsed.treeAssignments }
        : defaults.treeAssignments
    };
  } catch (error) {
    console.warn("Could not parse saved cell management state for standalone page.", error);
    return getDefaultCellManagementState();
  }
}

function persistCellManagement() {
  window.localStorage.setItem(CELL_MANAGEMENT_KEY, JSON.stringify(cellManagementState));
}

function getCellDisplayPersonName(userId, fallbackName = "") {
  const matchedUser = authState.users.find((user) => user.id === userId);
  return matchedUser?.name || matchedUser?.username || fallbackName || "";
}

function getCellLeadershipOfficeLabel(value) {
  return cellLeadershipOfficeLabels[value] || "";
}

function getCellDiscipleshipLabel(value) {
  return cellDiscipleshipLabels[value] || "";
}

function getCellDisplayPrioritySummary(record) {
  return [getCellLeadershipOfficeLabel(record.leadershipOffice), getCellDiscipleshipLabel(record.discipleshipLevel)]
    .filter(Boolean)
    .join(" | ");
}

function getEffectiveDiscipleshipLevel(record) {
  if (!record) {
    return "visitor";
  }
  if (record.manualLevelOverride && cellDiscipleshipLabels[record.manualLevelOverride]) {
    return record.manualLevelOverride;
  }
  if ((Number(record.raisedCellLeadersCount) || 0) >= 2) {
    return "networkLeader";
  }
  if (record.preEncounterCompleted && record.encounterCompleted && record.postEncounterCompleted && (Number(record.successfullyRetainedVisitorCount) || 0) >= 1) {
    return "cellLeader";
  }
  if ((Number(record.consolidationCount) || 0) >= 4) {
    return "member";
  }
  return "visitor";
}

function normalizeCellRecord(record) {
  const normalized = {
    id: record.id || `cell-record-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    userId: record.userId || "",
    name: record.name || getCellDisplayPersonName(record.userId, ""),
    leadershipOffice: record.leadershipOffice || "",
    invitedByUserId: record.invitedByUserId || "",
    invitedByName: record.invitedByName || "",
    consolidatorUserId: record.consolidatorUserId || "",
    consolidatorName: record.consolidatorName || "",
    cellLeaderUserId: record.cellLeaderUserId || "",
    cellLeaderName: record.cellLeaderName || "",
    cellGroup: String(record.cellGroup || "").trim(),
    consolidationCount: Number(record.consolidationCount) || 0,
    preEncounterCompleted: Boolean(record.preEncounterCompleted),
    encounterCompleted: Boolean(record.encounterCompleted),
    postEncounterCompleted: Boolean(record.postEncounterCompleted),
    successfullyRetainedVisitorCount: Number(record.successfullyRetainedVisitorCount) || 0,
    raisedCellLeadersCount: Number(record.raisedCellLeadersCount) || 0,
    manualLevelOverride: record.manualLevelOverride || "",
    createdAt: record.createdAt || new Date().toISOString()
  };

  normalized.name = getCellDisplayPersonName(normalized.userId, normalized.name);
  normalized.invitedByName = getCellDisplayPersonName(normalized.invitedByUserId, normalized.invitedByName);
  normalized.consolidatorName = getCellDisplayPersonName(normalized.consolidatorUserId, normalized.consolidatorName);
  normalized.cellLeaderName = getCellDisplayPersonName(normalized.cellLeaderUserId, normalized.cellLeaderName);
  normalized.discipleshipLevel = getEffectiveDiscipleshipLevel(normalized);
  return normalized;
}

function syncCellManagementRecords() {
  cellManagementState.records = (cellManagementState.records ?? []).map(normalizeCellRecord).filter((record) => record.name);
  persistCellManagement();
}

function getCellManagementRecord(recordId) {
  return (cellManagementState.records ?? []).find((record) => record.id === recordId) ?? null;
}

function getRegisteredChurchProfiles() {
  return authState.users.filter((user) => !user.isCreator && !isExcludedLegacyOrTestAccount(user)).map(normalizeUserAccount);
}

function getManagedCellProfiles() {
  const usedUserIds = new Set((cellManagementState.records ?? []).map((record) => record.userId).filter(Boolean));
  return getRegisteredChurchProfiles()
    .filter((user) => !usedUserIds.has(user.id))
    .sort((left, right) => (left.name || left.username || "").localeCompare(right.name || right.username || ""));
}

function getEligibleConsolidators() {
  return (cellManagementState.records ?? []).filter((record) => ["cellLeader", "networkLeader"].includes(record.discipleshipLevel));
}

function getEligibleCellLeaders() {
  return (cellManagementState.records ?? []).filter((record) => ["cellLeader", "networkLeader"].includes(record.discipleshipLevel));
}

function getInvitedVisitorsForRecord(recordId) {
  return (cellManagementState.records ?? []).filter((record) => record.invitedByUserId === recordId);
}

function getCellLeaderAssignedCount(recordId, excludeRecordId = "") {
  return (cellManagementState.records ?? []).filter((record) =>
    record.id !== excludeRecordId
    && record.cellLeaderUserId === recordId
    && ["member", "visitor"].includes(record.discipleshipLevel)
  ).length;
}

function getCellDiscipleshipOrder(level) {
  return { visitor: 0, member: 1, cellLeader: 2, networkLeader: 3 }[level] ?? 99;
}

function sortCellManagementRecords(records) {
  return [...records].sort((left, right) => {
    const levelCompare = getCellDiscipleshipOrder(left.discipleshipLevel) - getCellDiscipleshipOrder(right.discipleshipLevel);
    if (levelCompare !== 0) {
      return levelCompare;
    }
    const officeLeft = getCellLeadershipOfficeLabel(left.leadershipOffice);
    const officeRight = getCellLeadershipOfficeLabel(right.leadershipOffice);
    if (officeLeft || officeRight) {
      const officeCompare = officeLeft.localeCompare(officeRight);
      if (officeCompare !== 0) {
        return officeCompare;
      }
    }
    return (left.name || "").localeCompare(right.name || "");
  });
}

function buildCellManagementOptionList(records, selectedId = "", emptyLabel = "Select") {
  return [`<option value="">${escapeHtml(emptyLabel)}</option>`, ...records.map((record) =>
    `<option value="${escapeHtml(record.id)}" ${record.id === selectedId ? "selected" : ""}>${escapeHtml(record.name)}</option>`
  )].join("");
}

function getRecordPickerLabel(record) {
  const priority = getCellDisplayPrioritySummary(record);
  return priority ? `${record.name} | ${priority}` : record.name;
}

function resolveRecordIdFromPicker(value, records) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) {
    return "";
  }

  const direct = records.find((record) => String(record.id) === value);
  if (direct) {
    return direct.id;
  }

  const byLabel = records.find((record) => getRecordPickerLabel(record).toLowerCase() === normalized);
  if (byLabel) {
    return byLabel.id;
  }

  const byName = records.find((record) => String(record.name || "").trim().toLowerCase() === normalized);
  return byName?.id || "";
}

function buildRecordPickerOptions(records) {
  return records.map((record) => `<option value="${escapeHtml(getRecordPickerLabel(record))}"></option>`).join("");
}

function updateCellRecord(recordId, updater) {
  cellManagementState.records = (cellManagementState.records ?? []).map((record) =>
    record.id === recordId ? normalizeCellRecord(updater(record)) : normalizeCellRecord(record)
  );
  persistCellManagement();
}

function addCellManagementRecord(payload) {
  const user = authState.users.find((entry) => entry.id === payload.userId);
  if (!user) {
    return false;
  }
  const nextRecord = normalizeCellRecord({
    id: `cell-record-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    userId: user.id,
    name: user.name || user.username || "",
    leadershipOffice: payload.leadershipOffice || "",
    invitedByUserId: payload.invitedByUserId || "",
    consolidatorUserId: payload.consolidatorUserId || "",
    cellLeaderUserId: payload.cellLeaderUserId || "",
    cellGroup: payload.cellGroup || "",
    consolidationCount: payload.consolidationCount || 0,
    preEncounterCompleted: Boolean(payload.preEncounterCompleted),
    encounterCompleted: Boolean(payload.encounterCompleted),
    postEncounterCompleted: Boolean(payload.postEncounterCompleted),
    successfullyRetainedVisitorCount: payload.successfullyRetainedVisitorCount || 0,
    raisedCellLeadersCount: payload.raisedCellLeadersCount || 0,
    manualLevelOverride: payload.manualLevelOverride || ""
  });
  cellManagementState.records = [...(cellManagementState.records ?? []), nextRecord];
  persistCellManagement();
  return true;
}

function getCellTreeAssignedRecord(slotId) {
  const recordId = cellManagementState.treeAssignments?.[slotId] || "";
  return getCellManagementRecord(recordId);
}

function getCurrentUserCellRecord() {
  if (!currentUser) {
    return null;
  }
  return (cellManagementState.records ?? []).find((record) => record.userId === currentUser.id) ?? null;
}

function canManageCellManagement() {
  if (!currentUser) {
    return false;
  }
  if (isCreator() || ["headAdmin", "admin"].includes(currentUser.role)) {
    return true;
  }
  const record = getCurrentUserCellRecord();
  return ["seniorPastor", "adminPastor", "cellManager"].includes(record?.leadershipOffice || "");
}

function renderCellManagementTree(records, canManage) {
  return `
    <section class="shell-card">
      <div class="section-heading">
        <div>
          <p class="mini-label">Tree</p>
          <h2>Cell Management structure</h2>
        </div>
      </div>
      <div class="cell-tree">
        ${cellManagementTreeLevels.map((level) => `
          <div class="cell-tree-level">
            <div class="cell-tree-level-label">${escapeHtml(level.label)}</div>
            <div class="cell-tree-row">
              ${level.slots.map((slotId) => {
                const assigned = getCellTreeAssignedRecord(slotId);
                const summary = assigned ? (getCellDisplayPrioritySummary(assigned) || getCellDiscipleshipLabel(assigned.discipleshipLevel)) : "Unassigned";
                const hoverStats = assigned
                  ? [
                    assigned.name || "",
                    getCellDisplayPrioritySummary(assigned) || getCellDiscipleshipLabel(assigned.discipleshipLevel),
                    `Invited By: ${assigned.invitedByName || "-"}`,
                    `Consolidator: ${assigned.consolidatorName || "-"}`,
                    `Cell Leader: ${["seniorPastor", "adminPastor"].includes(assigned.leadershipOffice) ? "-" : (assigned.cellLeaderName || "-")}`,
                    `Cell Group: ${assigned.cellGroup || "-"}`,
                    `Consolidations: ${assigned.consolidationCount || 0}`,
                    `Retained Visitors: ${assigned.successfullyRetainedVisitorCount || 0}`,
                    `Raised Leaders: ${assigned.raisedCellLeadersCount || 0}`
                  ].join(" | ")
                  : `${slotId} is currently unassigned.`;
                return `
                  <article class="cell-tree-node" title="${escapeHtml(hoverStats)}">
                    <strong>${escapeHtml(slotId)}</strong>
                    <div class="cell-tree-name">${escapeHtml(assigned?.name || "Empty slot")}</div>
                    <div class="person-schedule-meta">${escapeHtml(summary)}</div>
                    ${canManage ? `
                      <select class="cell-tree-select" data-slot-id="${escapeHtml(slotId)}">
                        <option value="">Assign record</option>
                        ${records.map((record) => `<option value="${escapeHtml(record.id)}" ${assigned?.id === record.id ? "selected" : ""}>${escapeHtml(record.name)}</option>`).join("")}
                      </select>
                      <div class="admin-actions">
                        <button class="secondary-btn cell-tree-save" type="button" data-slot-id="${escapeHtml(slotId)}">Save</button>
                        <button class="ghost-btn cell-tree-clear" type="button" data-slot-id="${escapeHtml(slotId)}">Clear</button>
                      </div>
                    ` : ""}
                  </article>
                `;
              }).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function buildCellManagementRoster() {
  const groups = {};
  sortCellManagementRecords(cellManagementState.records ?? []).forEach((record) => {
    const key = record.cellLeaderName || record.consolidatorName || "Unassigned";
    groups[key] = groups[key] || [];
    groups[key].push(record);
  });
  const orderedGroups = Object.entries(groups).sort(([left], [right]) => left.localeCompare(right));
  if (!orderedGroups.length) {
    return `<div class="empty-card">No cell management records yet.</div>`;
  }
  return orderedGroups.map(([leaderName, records]) => `
    <article class="managed-ministry-row">
      <strong>${escapeHtml(leaderName === "Unassigned" ? "Unassigned Roster" : leaderName)}</strong>
      <div class="admin-readonly-meta">
        ${records.sort((left, right) => (left.name || "").localeCompare(right.name || "")).map((record) => `${escapeHtml(record.name)} | ${escapeHtml(getCellDiscipleshipLabel(record.discipleshipLevel))}${record.cellGroup ? ` | ${escapeHtml(record.cellGroup)}` : ""}`).map((line) => `<div>${line}</div>`).join("")}
      </div>
    </article>
  `).join("");
}

function buildCellManagementEditor(canManage, availableProfiles, consolidators, cellLeaders, groups) {
  if (!canManage) {
    return `
      <section class="shell-card">
        <div class="section-heading">
          <div>
            <p class="mini-label">Editor</p>
            <h2>Cell Management editor</h2>
          </div>
        </div>
        <div class="empty-card">Viewer mode is active. Turn on Admin mode to add or edit records.</div>
      </section>
    `;
  }

  const editingRecord = selectedRecordId ? getCellManagementRecord(selectedRecordId) : null;
  const title = editingRecord ? `Editing ${editingRecord.name}` : "Add or edit a record";
  const allRecords = sortCellManagementRecords(cellManagementState.records ?? []);
  const inviterPool = allRecords.filter((entry) => !editingRecord || entry.id !== editingRecord.id);
  const consolidatorPool = consolidators.filter((entry) => !editingRecord || entry.id !== editingRecord.id);
  const leaderPool = cellLeaders.filter((entry) => !editingRecord || entry.id !== editingRecord.id);

  return `
    <section class="shell-card">
      <div class="section-heading">
        <div>
          <p class="mini-label">Editor</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
      </div>
      <div class="cell-editor-grid">
        <form id="cell-management-add-form" class="inline-form compact-form">
          <select id="cell-management-user">
            <option value="">Select registered member</option>
            ${availableProfiles.map((user) => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name || user.username)}</option>`).join("")}
          </select>
          <select id="cell-management-office">
            <option value="">Leadership office (optional)</option>
            ${Object.entries(cellLeadershipOfficeLabels).map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`).join("")}
          </select>
          <button class="secondary-btn" type="submit">Add Record</button>
        </form>
        <form id="cell-management-edit-form" class="cell-editor-form">
          <div class="cell-editor-row">
            <select id="cell-editor-record">
              <option value="">Select existing record</option>
              ${allRecords.map((record) => `<option value="${escapeHtml(record.id)}" ${editingRecord?.id === record.id ? "selected" : ""}>${escapeHtml(getRecordPickerLabel(record))}</option>`).join("")}
            </select>
            <select id="cell-editor-office">
              <option value="">No leadership office</option>
              ${Object.entries(cellLeadershipOfficeLabels).map(([value, label]) => `<option value="${value}" ${editingRecord?.leadershipOffice === value ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}
            </select>
            <select id="cell-editor-level">
              <option value="">Automatic discipleship title</option>
              ${Object.entries(cellDiscipleshipLabels).map(([value, label]) => `<option value="${value}" ${editingRecord?.manualLevelOverride === value ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}
            </select>
          </div>
          <div class="cell-editor-row">
            <input id="cell-editor-inviter" list="cell-record-picker-list" type="text" value="${escapeHtml(editingRecord ? getRecordPickerLabel(getCellManagementRecord(editingRecord.invitedByUserId) || { name: editingRecord.invitedByName || "" }) : "")}" placeholder="Invited by">
            <input id="cell-editor-consolidator" list="cell-record-picker-list" type="text" value="${escapeHtml(editingRecord ? getRecordPickerLabel(getCellManagementRecord(editingRecord.consolidatorUserId) || { name: editingRecord.consolidatorName || "" }) : "")}" placeholder="Consolidator">
            <input id="cell-editor-leader" list="cell-record-picker-list" type="text" value="${escapeHtml(editingRecord ? getRecordPickerLabel(getCellManagementRecord(editingRecord.cellLeaderUserId) || { name: editingRecord.cellLeaderName || "" }) : "")}" placeholder="Cell leader">
          </div>
          <div class="cell-editor-row cell-editor-row-tight">
            <input id="cell-editor-group" list="cell-management-group-list" type="text" value="${escapeHtml(editingRecord?.cellGroup || "")}" placeholder="Cell group">
            <input id="cell-editor-consolidations" type="number" min="0" max="4" value="${escapeHtml(String(editingRecord?.consolidationCount || 0))}" placeholder="Consolidations">
            <input id="cell-editor-retained" type="number" min="0" value="${escapeHtml(String(editingRecord?.successfullyRetainedVisitorCount || 0))}" placeholder="Retained visitors">
            <input id="cell-editor-raised" type="number" min="0" value="${escapeHtml(String(editingRecord?.raisedCellLeadersCount || 0))}" placeholder="Raised leaders">
          </div>
          <div class="cell-editor-row cell-editor-checks">
            <label class="tag"><input id="cell-editor-pre" type="checkbox" ${editingRecord?.preEncounterCompleted ? "checked" : ""}> Pre</label>
            <label class="tag"><input id="cell-editor-encounter" type="checkbox" ${editingRecord?.encounterCompleted ? "checked" : ""}> Encounter</label>
            <label class="tag"><input id="cell-editor-post" type="checkbox" ${editingRecord?.postEncounterCompleted ? "checked" : ""}> Post</label>
          </div>
          <div class="admin-actions">
            <button class="secondary-btn" type="submit">Save Record</button>
            <button id="cell-editor-promote" class="ghost-btn" type="button" ${editingRecord ? "" : "disabled"}>Promote</button>
            <button id="cell-editor-demote" class="ghost-btn" type="button" ${editingRecord ? "" : "disabled"}>Demote</button>
            <button id="cell-editor-clear" class="ghost-btn" type="button" ${editingRecord ? "" : "disabled"}>Clear Editor</button>
          </div>
        </form>
      </div>
      <datalist id="cell-record-picker-list">
        ${buildRecordPickerOptions([...inviterPool, ...consolidatorPool, ...leaderPool].filter((record, index, list) => list.findIndex((entry) => entry.id === record.id) === index))}
      </datalist>
      <datalist id="cell-management-group-list">
        ${groups.map((group) => `<option value="${escapeHtml(group)}"></option>`).join("")}
      </datalist>
    </section>
  `;
}

function bindEditableControls() {
  const addForm = cellManagementRoot.querySelector("#cell-management-add-form");
  addForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const userId = cellManagementRoot.querySelector("#cell-management-user")?.value || "";
    const leadershipOffice = cellManagementRoot.querySelector("#cell-management-office")?.value || "";
    if (!userId) {
      return;
    }
    addCellManagementRecord({ userId, leadershipOffice });
    renderWorkspace();
  });

  cellManagementRoot.querySelectorAll(".cell-management-save").forEach((button) => {
    button.addEventListener("click", () => {
      const recordId = button.dataset.recordId;
      const consolidatorUserId = cellManagementRoot.querySelector(`.cell-management-consolidator-select[data-record-id="${cssEscape(recordId)}"]`)?.value || "";
      const cellLeaderUserId = cellManagementRoot.querySelector(`.cell-management-leader-select[data-record-id="${cssEscape(recordId)}"]`)?.value || "";
      if (cellLeaderUserId && getCellLeaderAssignedCount(cellLeaderUserId, recordId) >= 12) {
        window.alert("That cell leader is already handling 12 members.");
        return;
      }
      updateCellRecord(recordId, (record) => ({
        ...record,
        leadershipOffice: cellManagementRoot.querySelector(`.cell-management-office-select[data-record-id="${cssEscape(recordId)}"]`)?.value || "",
        manualLevelOverride: cellManagementRoot.querySelector(`.cell-management-level-select[data-record-id="${cssEscape(recordId)}"]`)?.value || "",
        invitedByUserId: cellManagementRoot.querySelector(`.cell-management-inviter-select[data-record-id="${cssEscape(recordId)}"]`)?.value || "",
        consolidatorUserId,
        cellLeaderUserId,
        cellGroup: cellManagementRoot.querySelector(`.cell-management-group-input[data-record-id="${cssEscape(recordId)}"]`)?.value || "",
        consolidationCount: Number(cellManagementRoot.querySelector(`.cell-management-consolidations-input[data-record-id="${cssEscape(recordId)}"]`)?.value || 0),
        successfullyRetainedVisitorCount: Number(cellManagementRoot.querySelector(`.cell-management-retained-input[data-record-id="${cssEscape(recordId)}"]`)?.value || 0),
        raisedCellLeadersCount: Number(cellManagementRoot.querySelector(`.cell-management-raised-input[data-record-id="${cssEscape(recordId)}"]`)?.value || 0),
        preEncounterCompleted: Boolean(cellManagementRoot.querySelector(`.cell-management-check[data-key="preEncounterCompleted"][data-record-id="${cssEscape(recordId)}"]`)?.checked),
        encounterCompleted: Boolean(cellManagementRoot.querySelector(`.cell-management-check[data-key="encounterCompleted"][data-record-id="${cssEscape(recordId)}"]`)?.checked),
        postEncounterCompleted: Boolean(cellManagementRoot.querySelector(`.cell-management-check[data-key="postEncounterCompleted"][data-record-id="${cssEscape(recordId)}"]`)?.checked)
      }));
      const savedRecord = getCellManagementRecord(recordId);
      if (savedRecord?.cellGroup && !(cellManagementState.groups ?? []).includes(savedRecord.cellGroup)) {
        cellManagementState.groups = sortEntries([...(cellManagementState.groups ?? []), savedRecord.cellGroup]);
        persistCellManagement();
      }
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".cell-management-promote").forEach((button) => {
    button.addEventListener("click", () => {
      const record = getCellManagementRecord(button.dataset.recordId);
      if (!record) {
        return;
      }
      const order = ["visitor", "member", "cellLeader", "networkLeader"];
      const currentIndex = order.indexOf(record.manualLevelOverride || record.discipleshipLevel);
      updateCellRecord(record.id, (entry) => ({ ...entry, manualLevelOverride: order[Math.min(order.length - 1, Math.max(0, currentIndex + 1))] }));
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".cell-management-demote").forEach((button) => {
    button.addEventListener("click", () => {
      const record = getCellManagementRecord(button.dataset.recordId);
      if (!record) {
        return;
      }
      const order = ["visitor", "member", "cellLeader", "networkLeader"];
      const currentIndex = order.indexOf(record.manualLevelOverride || record.discipleshipLevel);
      updateCellRecord(record.id, (entry) => ({ ...entry, manualLevelOverride: order[Math.max(0, currentIndex - 1)] }));
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".cell-tree-save").forEach((button) => {
    button.addEventListener("click", () => {
      const slotId = button.dataset.slotId;
      const recordId = cellManagementRoot.querySelector(`.cell-tree-select[data-slot-id="${cssEscape(slotId)}"]`)?.value || "";
      cellManagementState.treeAssignments = { ...(cellManagementState.treeAssignments ?? {}), [slotId]: recordId };
      persistCellManagement();
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".cell-tree-clear").forEach((button) => {
    button.addEventListener("click", () => {
      const slotId = button.dataset.slotId;
      const nextAssignments = { ...(cellManagementState.treeAssignments ?? {}) };
      delete nextAssignments[slotId];
      cellManagementState.treeAssignments = nextAssignments;
      persistCellManagement();
      renderWorkspace();
    });
  });
}

function renderWorkspace() {
  if (!currentUser) {
    loginRequiredCard.classList.remove("app-hidden");
    sessionBar.classList.add("app-hidden");
    cellManagementRoot.classList.add("app-hidden");
    adminToggle.hidden = true;
    return;
  }

  loginRequiredCard.classList.add("app-hidden");
  sessionBar.classList.remove("app-hidden");
  cellManagementRoot.classList.remove("app-hidden");

  syncCellManagementRecords();

  const canOpenAdminTools = canManageCellManagement();
  if (!canOpenAdminTools && adminMode) {
    adminMode = false;
    window.sessionStorage.removeItem(ADMIN_MODE_KEY);
  }

  adminToggle.hidden = !canOpenAdminTools;
  adminToggle.textContent = adminMode ? "Turn Off Admin" : "Turn On Admin";
  sessionUser.textContent = currentUser.name || currentUser.username || "Signed in";
  sessionMode.textContent = adminMode && canOpenAdminTools ? "Admin mode" : "View mode";

  const canManage = canOpenAdminTools && adminMode;
  const availableProfiles = getManagedCellProfiles();
  const consolidators = getEligibleConsolidators();
  const cellLeaders = getEligibleCellLeaders();
  const groups = sortEntries(cellManagementState.groups ?? []);
  const sortedCellRecords = sortCellManagementRecords(cellManagementState.records ?? []);

  cellManagementRoot.innerHTML = `
    <div class="cell-page-grid">
      <section class="shell-card">
        <div class="section-heading">
          <div>
            <p class="mini-label">Cell Management</p>
            <h2>Discipleship records</h2>
          </div>
        </div>
        ${canManage ? `
          <form id="cell-management-add-form" class="inline-form compact-form">
            <select id="cell-management-user">
              <option value="">Select registered member</option>
              ${availableProfiles.map((user) => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name || user.username)}</option>`).join("")}
            </select>
            <select id="cell-management-office">
              <option value="">Leadership office (optional)</option>
              ${Object.entries(cellLeadershipOfficeLabels).map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`).join("")}
            </select>
            <button class="secondary-btn" type="submit">Add Record</button>
          </form>
        ` : `<div class="empty-card">Viewer mode is active. Turn on Admin mode to edit records.</div>`}
      </section>
      ${renderCellManagementTree(cellManagementState.records ?? [], canManage)}
      <section class="shell-card">
        <div class="section-heading">
          <div>
            <p class="mini-label">Roster</p>
            <h2>Grouped by cell leader</h2>
          </div>
        </div>
        <div class="admin-list">${buildCellManagementRoster()}</div>
      </section>
      <section class="shell-card">
        <div class="section-heading">
          <div>
            <p class="mini-label">Records</p>
            <h2>People and progress</h2>
          </div>
        </div>
        ${sortedCellRecords.length ? `
          <div class="table-wrap">
            <table class="assignment-table cell-management-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Priority</th>
                  <th>Invited By</th>
                  <th>Consolidator</th>
                  <th>Cell Leader</th>
                  <th>Cell Group</th>
                  <th>Progress</th>
                  <th>Invited Visitors</th>
                  ${canManage ? "<th>Actions</th>" : ""}
                </tr>
              </thead>
              <tbody>
                ${sortedCellRecords.map((record) => {
                  const leadershipOffice = getCellLeadershipOfficeLabel(record.leadershipOffice);
                  const levelLabel = getCellDiscipleshipLabel(record.discipleshipLevel);
                  const priorityLabel = [leadershipOffice, levelLabel].filter(Boolean).join(" | ") || "-";
                  const hideCellLeader = ["seniorPastor", "adminPastor"].includes(record.leadershipOffice);
                  const progressParts = [
                    `Consolidations: ${record.consolidationCount || 0}`,
                    `Retained: ${record.successfullyRetainedVisitorCount || 0}`,
                    `Raised: ${record.raisedCellLeadersCount || 0}`,
                    `Pre: ${record.preEncounterCompleted ? "Done" : "No"}`,
                    `Encounter: ${record.encounterCompleted ? "Done" : "No"}`,
                    `Post: ${record.postEncounterCompleted ? "Done" : "No"}`
                  ];
                  return `
                    <tr>
                      <td><strong>${escapeHtml(record.name)}</strong></td>
                      <td>${escapeHtml(priorityLabel)}</td>
                      <td>${escapeHtml(record.invitedByName || "-")}</td>
                      <td>${escapeHtml(record.consolidatorName || "-")}</td>
                      <td>${escapeHtml(hideCellLeader ? "-" : (record.cellLeaderName || "-"))}</td>
                      <td>${escapeHtml(record.cellGroup || "-")}</td>
                      <td>${escapeHtml(progressParts.join(" | "))}</td>
                      <td>${escapeHtml(getInvitedVisitorsForRecord(record.id).map((entry) => entry.name).join(", ") || "-")}</td>
                      ${canManage ? `
                        <td>
                          <div class="managed-ministry-actions cell-management-actions">
                            <select class="cell-management-office-select" data-record-id="${escapeHtml(record.id)}">
                              <option value="">No leadership office</option>
                              ${Object.entries(cellLeadershipOfficeLabels).map(([value, label]) => `<option value="${value}" ${record.leadershipOffice === value ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}
                            </select>
                            <select class="cell-management-level-select" data-record-id="${escapeHtml(record.id)}">
                              <option value="">Automatic discipleship title</option>
                              ${Object.entries(cellDiscipleshipLabels).map(([value, label]) => `<option value="${value}" ${record.manualLevelOverride === value ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}
                            </select>
                            <select class="cell-management-inviter-select" data-record-id="${escapeHtml(record.id)}">
                              ${buildCellManagementOptionList(cellManagementState.records.filter((entry) => entry.id !== record.id), record.invitedByUserId, "Invited by")}
                            </select>
                            <select class="cell-management-consolidator-select" data-record-id="${escapeHtml(record.id)}">
                              ${buildCellManagementOptionList(consolidators.filter((entry) => entry.id !== record.id), record.consolidatorUserId, "Consolidator")}
                            </select>
                            <select class="cell-management-leader-select" data-record-id="${escapeHtml(record.id)}">
                              ${buildCellManagementOptionList(cellLeaders.filter((entry) => entry.id !== record.id), record.cellLeaderUserId, "Cell leader")}
                            </select>
                            <input class="cell-management-group-input" data-record-id="${escapeHtml(record.id)}" list="cell-management-group-list" type="text" value="${escapeHtml(record.cellGroup || "")}" placeholder="Cell group">
                            <input class="cell-management-consolidations-input" data-record-id="${escapeHtml(record.id)}" type="number" min="0" max="4" value="${escapeHtml(String(record.consolidationCount || 0))}" placeholder="Consolidations">
                            <input class="cell-management-retained-input" data-record-id="${escapeHtml(record.id)}" type="number" min="0" value="${escapeHtml(String(record.successfullyRetainedVisitorCount || 0))}" placeholder="Retained visitors">
                            <input class="cell-management-raised-input" data-record-id="${escapeHtml(record.id)}" type="number" min="0" value="${escapeHtml(String(record.raisedCellLeadersCount || 0))}" placeholder="Raised leaders">
                            <label class="tag"><input class="cell-management-check" data-key="preEncounterCompleted" data-record-id="${escapeHtml(record.id)}" type="checkbox" ${record.preEncounterCompleted ? "checked" : ""}> Pre</label>
                            <label class="tag"><input class="cell-management-check" data-key="encounterCompleted" data-record-id="${escapeHtml(record.id)}" type="checkbox" ${record.encounterCompleted ? "checked" : ""}> Encounter</label>
                            <label class="tag"><input class="cell-management-check" data-key="postEncounterCompleted" data-record-id="${escapeHtml(record.id)}" type="checkbox" ${record.postEncounterCompleted ? "checked" : ""}> Post</label>
                            <div class="admin-actions">
                              <button class="secondary-btn cell-management-save" type="button" data-record-id="${escapeHtml(record.id)}">Save</button>
                              <button class="ghost-btn cell-management-promote" type="button" data-record-id="${escapeHtml(record.id)}">Promote</button>
                              <button class="ghost-btn cell-management-demote" type="button" data-record-id="${escapeHtml(record.id)}">Demote</button>
                            </div>
                          </div>
                        </td>
                      ` : ""}
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        ` : `<div class="empty-card">No cell discipleship records yet.</div>`}
        <datalist id="cell-management-group-list">
          ${groups.map((group) => `<option value="${escapeHtml(group)}"></option>`).join("")}
        </datalist>
      </section>
    </div>
  `;

  if (canManage) {
    bindEditableControls();
  }
}

adminToggle?.addEventListener("click", () => {
  if (!canManageCellManagement()) {
    return;
  }
  adminMode = !adminMode;
  window.sessionStorage.setItem(ADMIN_MODE_KEY, adminMode ? "true" : "false");
  renderWorkspace();
});

renderWorkspace();
