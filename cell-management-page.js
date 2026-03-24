"use strict";

const AUTH_KEY = "jccm-site-auth-v1";
const SESSION_KEY = "jccm-site-session-v1";
const SESSION_TEMP_KEY = "jccm-site-session-temp-v1";
const ADMIN_MODE_KEY = "jccm-admin-mode-v1";
const CELL_MANAGEMENT_KEY = "jccm-cell-management-v1";
const SUPABASE_URL = "https://gxgdetvlehwlxsenpijn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_IAmOapMof9S8qv-rX8WoLg_fBXDqBTs";

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
  { label: "Ferdie Cell Members", slots: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12"] }
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
let selectedLeaderId = "";
let transferPromptRecordId = "";
let hideEmptyNetworkSlots = true;
let remoteUserSyncInFlight = false;

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
  const removableSeedUsernames = ["admin", "medwardhead", "medwardadmin", "medwardmember1", "medwardmember2", "medwardvisitor"];
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

function normalizeRemoteUserAccount(user) {
  if (!user || typeof user !== "object") {
    return null;
  }

  return normalizeUserAccount({
    id: user.id,
    name: user.name || user.full_name || user.username || "",
    username: user.username || "",
    usernames: [user.username].filter(Boolean),
    createdAt: user.createdAt || user.created_at || new Date().toISOString(),
    role: user.role || "member",
    isCreator: Boolean(user.isCreator),
    titles: Array.isArray(user.titles) ? user.titles : [],
    ministries: Array.isArray(user.ministries) ? user.ministries : [],
    profile: {
      birthday: user.profile?.birthday || "",
      contactNumber: user.profile?.contactNumber || "",
      gender: user.profile?.gender || "",
      occupation: user.profile?.occupation || "",
      civilStatus: user.profile?.civilStatus || "",
      networkName: user.profile?.networkName || "",
      photo: user.profile?.photo || ""
    }
  });
}

async function callSupabaseRpc(functionName, payload = {}) {
  try {
    const response = await window.fetch(`${SUPABASE_URL}/rest/v1/rpc/${functionName}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch (error) {
    console.warn(`Supabase RPC ${functionName} failed on Cell Management page.`, error);
    return {};
  }
}

function syncRemoteUserLocally(remoteUser) {
  const normalized = normalizeRemoteUserAccount(remoteUser);
  if (!normalized || isExcludedLegacyOrTestAccount(normalized)) {
    return null;
  }

  const existingIndex = authState.users.findIndex((user) => user.id === normalized.id || user.username === normalized.username);
  if (existingIndex >= 0) {
    authState.users[existingIndex] = {
      ...authState.users[existingIndex],
      ...normalized,
      profile: {
        ...(authState.users[existingIndex].profile ?? {}),
        ...(normalized.profile ?? {})
      }
    };
  } else {
    authState.users.push(normalized);
  }

  window.localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  return normalized;
}

async function syncUsersFromSupabase() {
  if (remoteUserSyncInFlight) {
    return;
  }

  remoteUserSyncInFlight = true;
  try {
    const result = await callSupabaseRpc("list_users_admin", {});
    const users = Array.isArray(result?.users) ? result.users : [];
    users.forEach((user) => syncRemoteUserLocally(user));
    currentUser = restoreSession();
  } finally {
    remoteUserSyncInFlight = false;
  }
}

function loadAuthState() {
  const saved = window.localStorage.getItem(AUTH_KEY);
  const fallback = {
    users: defaultSeedUsers,
    pending: [],
    ministryRequests: [],
    usernameRequests: [],
    ministries: []
  };
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
      .filter((user) => !isExcludedLegacyOrTestAccount(user)),
    pending: Array.isArray(parsed.pending) ? parsed.pending : [],
    ministryRequests: Array.isArray(parsed.ministryRequests) ? parsed.ministryRequests : [],
    usernameRequests: Array.isArray(parsed.usernameRequests) ? parsed.usernameRequests : [],
    ministries: Array.isArray(parsed.ministries) ? parsed.ministries : []
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
    { id: "cell-seed-ferdie", userId: "ferdie-seed", name: "Ptr. Ferdie Tolentino", leadershipOffice: "adminPastor", cellGroup: "Ferds Flock", manualLevelOverride: "networkLeader" },
    { id: "cell-seed-reny", userId: "", name: "Reny Borlagdan", leadershipOffice: "cellManager", cellGroup: "Renygades Network", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" },
    { id: "cell-seed-edward", userId: "", name: "Edward Manapol", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" },
    { id: "cell-seed-charles", userId: "", name: "Charles Francis Echano", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" },
    { id: "cell-seed-louisse", userId: "", name: "Louisse Encela", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" },
    { id: "cell-seed-edmund", userId: "", name: "Edmund Echano", cellGroup: "Floodgates Network", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" },
    { id: "cell-seed-roel", userId: "", name: "Roel Bayonon", cellLeaderUserId: "cell-seed-ferdie", cellLeaderName: "Ptr. Ferdie Tolentino", manualLevelOverride: "member" }
  ];
}

function getDefaultCellManagementState() {
  return {
    records: getSeedCellManagementRecords(),
    groups: [],
    networkAssignments: {},
    treeAssignments: {
      A1: "cell-seed-babes",
      B1: "cell-seed-ferdie",
      C1: "cell-seed-reny",
      C2: "cell-seed-edward",
      C3: "cell-seed-charles",
      C4: "cell-seed-louisse",
      C5: "cell-seed-edmund",
      C6: "cell-seed-roel",
      C7: "",
      C8: "",
      C9: "",
      C10: "",
      C11: "",
      C12: ""
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
      networkAssignments: parsed.networkAssignments && typeof parsed.networkAssignments === "object"
        ? parsed.networkAssignments
        : {},
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

function getEffectiveLeadershipOfficeValue(record) {
  if (!record) {
    return "";
  }

  if (record.leadershipOffice) {
    return record.leadershipOffice;
  }

  const leader = getCellManagementRecord(record.cellLeaderUserId);
  if (leader?.leadershipOffice === "adminPastor") {
    return "primaryLeader";
  }

  return "";
}

function getEffectiveCellGroup(record) {
  if (!record) {
    return "";
  }

  if (record.cellGroup) {
    return record.cellGroup;
  }

  const leader = getCellManagementRecord(record.cellLeaderUserId);
  if (!leader) {
    return "";
  }

  const linkedLeader = authState.users.find((user) => user.id === leader.userId);
  const profileNetworkName = String(linkedLeader?.profile?.networkName || "").trim();
  if (profileNetworkName) {
    return profileNetworkName;
  }

  if (leader.cellGroup) {
    return leader.cellGroup;
  }

  if (["networkLeader"].includes(leader.discipleshipLevel) || leader.leadershipOffice === "adminPastor") {
    return `${leader.name} Flock`;
  }

  return "";
}

function getCellDisplayPrioritySummary(record) {
  return [getCellLeadershipOfficeLabel(getEffectiveLeadershipOfficeValue(record)), getCellDiscipleshipLabel(record.discipleshipLevel)]
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
  normalized.effectiveLeadershipOffice = getEffectiveLeadershipOfficeValue(normalized);
  normalized.effectiveCellGroup = getEffectiveCellGroup(normalized);
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
  return authState.users
    .filter((user) => !user.isCreator && !isExcludedLegacyOrTestAccount(user))
    .map(normalizeUserAccount)
    .filter((user) => String(user.profile?.gender || "").toLowerCase() === "male");
}

function getManagedCellProfiles() {
  const usedUserIds = new Set((cellManagementState.records ?? []).map((record) => record.userId).filter(Boolean));
  return getRegisteredChurchProfiles()
    .filter((user) => !usedUserIds.has(user.id))
    .sort((left, right) => (left.name || left.username || "").localeCompare(right.name || right.username || ""));
}

function getSelectableExistingMemberRecords(excludeRecordId = "", excludeLeaderId = "") {
  return sortCellManagementRecords(cellManagementState.records ?? []).filter((record) =>
    record.id !== excludeRecordId
    && record.id !== excludeLeaderId
    && ["visitor", "member"].includes(record.discipleshipLevel)
  );
}

function getSelectionOptionValueForUser(userId) {
  return `user:${userId}`;
}

function buildAssignableSelectionOptions(existingRecords, availableProfiles, selectedValue = "", emptyLabel = "Assign member") {
  const recordOptions = existingRecords.map((record) => ({
    value: record.id,
    label: `${record.name}${record.effectiveCellGroup ? ` | ${record.effectiveCellGroup}` : ""}`
  }));
  const profileOptions = availableProfiles.map((user) => ({
    value: getSelectionOptionValueForUser(user.id),
    label: `${user.name || user.username} | Registered user`
  }));

  return [`<option value="">${escapeHtml(emptyLabel)}</option>`, ...[...recordOptions, ...profileOptions].map((option) =>
    `<option value="${escapeHtml(option.value)}" ${selectedValue === option.value ? "selected" : ""}>${escapeHtml(option.label)}</option>`
  )].join("");
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

function getAdminPastorRecord() {
  return (cellManagementState.records ?? []).find((record) => getEffectiveLeadershipOfficeValue(record) === "adminPastor")
    || getCellManagementRecord("cell-seed-ferdie");
}

function shouldAllowNoLeader(record) {
  return ["seniorPastor", "adminPastor"].includes(getEffectiveLeadershipOfficeValue(record));
}

function getRosterOwnerName(record) {
  if (shouldAllowNoLeader(record)) {
    return record.name || "";
  }

  return record.cellLeaderName || record.consolidatorName || getAdminPastorRecord()?.name || "";
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
  const defaultLeader = getAdminPastorRecord();
  const nextRecord = normalizeCellRecord({
    id: `cell-record-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    userId: user.id,
    name: user.name || user.username || "",
    leadershipOffice: payload.leadershipOffice || "",
    invitedByUserId: payload.invitedByUserId || "",
    consolidatorUserId: payload.consolidatorUserId || "",
    cellLeaderUserId: payload.leadershipOffice ? "" : (payload.cellLeaderUserId || defaultLeader?.id || ""),
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

function createRecordFromRegisteredUser(userId, extraPayload = {}) {
  const alreadyLinked = (cellManagementState.records ?? []).find((record) => record.userId === userId);
  if (alreadyLinked) {
    return alreadyLinked.id;
  }

  const added = addCellManagementRecord({
    userId,
    leadershipOffice: extraPayload.leadershipOffice || "",
    invitedByUserId: extraPayload.invitedByUserId || "",
    consolidatorUserId: extraPayload.consolidatorUserId || "",
    cellLeaderUserId: extraPayload.cellLeaderUserId || "",
    manualLevelOverride: extraPayload.manualLevelOverride || "",
    consolidationCount: extraPayload.consolidationCount || 0,
    successfullyRetainedVisitorCount: extraPayload.successfullyRetainedVisitorCount || 0,
    raisedCellLeadersCount: extraPayload.raisedCellLeadersCount || 0,
    preEncounterCompleted: Boolean(extraPayload.preEncounterCompleted),
    encounterCompleted: Boolean(extraPayload.encounterCompleted),
    postEncounterCompleted: Boolean(extraPayload.postEncounterCompleted)
  });

  if (!added) {
    return "";
  }

  return (cellManagementState.records ?? []).find((record) => record.userId === userId)?.id || "";
}

function resolveAssignableSelection(selectedValue, extraPayload = {}) {
  if (!selectedValue) {
    return "";
  }

  if (selectedValue.startsWith("user:")) {
    return createRecordFromRegisteredUser(selectedValue.slice(5), extraPayload);
  }

  return selectedValue;
}

function getCellTreeAssignedRecord(slotId) {
  const recordId = cellManagementState.treeAssignments?.[slotId] || "";
  return getCellManagementRecord(recordId);
}

function getNetworkSlotIds() {
  return Array.from({ length: 12 }, (_, index) => `N${index + 1}`);
}

function getLeaderNetworkAssignments(leaderId) {
  const saved = cellManagementState.networkAssignments?.[leaderId];
  const defaults = Object.fromEntries(getNetworkSlotIds().map((slotId) => [slotId, ""]));
  return {
    ...defaults,
    ...(saved && typeof saved === "object" ? saved : {})
  };
}

function setLeaderNetworkAssignments(leaderId, assignments) {
  cellManagementState.networkAssignments = {
    ...(cellManagementState.networkAssignments ?? {}),
    [leaderId]: assignments
  };
  persistCellManagement();
}

function removeRecordFromAllNetworkAssignments(recordId) {
  if (!recordId) {
    return;
  }

  const nextAssignments = { ...(cellManagementState.networkAssignments ?? {}) };
  Object.keys(nextAssignments).forEach((leaderId) => {
    const assignments = { ...(nextAssignments[leaderId] ?? {}) };
    let changed = false;
    Object.keys(assignments).forEach((slotId) => {
      if (assignments[slotId] === recordId) {
        assignments[slotId] = "";
        changed = true;
      }
    });
    if (changed) {
      nextAssignments[leaderId] = assignments;
    }
  });
  cellManagementState.networkAssignments = nextAssignments;
  persistCellManagement();
}

function assignRecordToFirstOpenNetworkSlot(leaderId, recordId) {
  if (!leaderId || !recordId) {
    return;
  }

  const assignments = getLeaderNetworkAssignments(leaderId);
  const existingSlotId = Object.keys(assignments).find((slotId) => assignments[slotId] === recordId);
  if (existingSlotId) {
    return;
  }

  const openSlotId = getNetworkSlotIds().find((slotId) => !assignments[slotId]);
  if (!openSlotId) {
    return;
  }

  assignments[openSlotId] = recordId;
  setLeaderNetworkAssignments(leaderId, assignments);
}

function getNetworkLeaderCandidates() {
  return sortCellManagementRecords(cellManagementState.records ?? []).filter((record) =>
    ["cellLeader", "networkLeader"].includes(record.discipleshipLevel)
    || ["cellManager", "adminPastor", "seniorPastor"].includes(record.effectiveLeadershipOffice)
  );
}

function getTransferTargetCandidates(record) {
  return sortCellManagementRecords(cellManagementState.records ?? []).filter((entry) => {
    if (!entry || entry.id === record?.id) {
      return false;
    }

    return ["adminPastor", "cellManager"].includes(entry.effectiveLeadershipOffice)
      || ["cellLeader", "networkLeader"].includes(entry.discipleshipLevel);
  });
}

function getNetworkSlotAssignedRecord(leaderId, slotId) {
  const assignments = getLeaderNetworkAssignments(leaderId);
  return getCellManagementRecord(assignments[slotId] || "");
}

function canEditProtectedRecord(record) {
  if (!record) {
    return false;
  }

  if (isCreator()) {
    return true;
  }

  return !["seniorPastor", "adminPastor"].includes(record.effectiveLeadershipOffice);
}

function canGrantLeadershipOffice() {
  if (isCreator()) {
    return true;
  }

  const record = getCurrentUserCellRecord();
  return ["adminPastor", "seniorPastor"].includes(record?.effectiveLeadershipOffice || record?.leadershipOffice || "");
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
  const availableProfiles = getManagedCellProfiles();
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
                    `Cell Leader: ${["seniorPastor", "adminPastor"].includes(assigned.effectiveLeadershipOffice) ? "-" : (assigned.cellLeaderName || "-")}`,
                    `Cell Group: ${assigned.effectiveCellGroup || "-"}`,
                    `Consolidations: ${assigned.consolidationCount || 0}`,
                    `Retained Visitors: ${assigned.successfullyRetainedVisitorCount || 0}`,
                    `Raised Leaders: ${assigned.raisedCellLeadersCount || 0}`
                  ].join(" | ")
                  : `${slotId} is currently unassigned.`;
                return `
                  <article class="cell-tree-node" title="${escapeHtml(hoverStats)}">
                    <strong>${escapeHtml(slotId)}</strong>
                    <button class="ghost-btn cell-tree-name-link" type="button" data-record-id="${escapeHtml(assigned?.id || "")}" ${assigned ? "" : "disabled"}>${escapeHtml(assigned?.name || "Empty slot")}</button>
                    <div class="person-schedule-meta">${escapeHtml(summary)}</div>
                    ${canManage && canEditProtectedRecord(assigned) ? `
                      <select class="cell-tree-select" data-slot-id="${escapeHtml(slotId)}">
                        ${buildAssignableSelectionOptions(getSelectableExistingMemberRecords(assigned?.id || ""), availableProfiles, assigned?.id || "", "Assign record")}
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
    const key = getRosterOwnerName(record);
    if (!key) {
      return;
    }
    groups[key] = groups[key] || [];
    groups[key].push(record);
  });
  const orderedGroups = Object.entries(groups).sort(([left], [right]) => left.localeCompare(right));
  if (!orderedGroups.length) {
    return `<div class="empty-card">No cell management records yet.</div>`;
  }
  return orderedGroups.map(([leaderName, records]) => `
    <article class="managed-ministry-row">
      <strong>${escapeHtml(leaderName)}</strong>
      <div class="admin-readonly-meta">
        ${records.sort((left, right) => (left.name || "").localeCompare(right.name || "")).map((record) => `${escapeHtml(record.name)} | ${escapeHtml(getCellDiscipleshipLabel(record.discipleshipLevel))}${record.effectiveCellGroup ? ` | ${escapeHtml(record.effectiveCellGroup)}` : ""}`).map((line) => `<div>${line}</div>`).join("")}
      </div>
    </article>
  `).join("");
}

function buildLeaderWorkspace(selectedLeader, canManage) {
  if (!selectedLeader) {
    return `
      <section class="shell-card">
        <div class="section-heading">
          <div>
            <p class="mini-label">Leader View</p>
            <h2>Select a name in the pyramid</h2>
          </div>
        </div>
        <div class="empty-card">Click a leader name in the pyramid to open their focused network view.</div>
      </section>
    `;
  }

  const isProtected = !canEditProtectedRecord(selectedLeader);
  const assignments = getLeaderNetworkAssignments(selectedLeader.id);
  const memberCandidates = getSelectableExistingMemberRecords(selectedLeader.id, selectedLeader.id);
  const availableProfiles = getManagedCellProfiles();
  const transferCandidates = getTransferTargetCandidates(selectedLeader);
  const selectedLeaderCurrentLevel = selectedLeader.manualLevelOverride || selectedLeader.discipleshipLevel;
  const visibleSlots = getNetworkSlotIds().filter((slotId) => !hideEmptyNetworkSlots || assignments[slotId]);
  const transferOpen = transferPromptRecordId === selectedLeader.id;

  return `
    <section class="shell-card">
      <div class="section-heading">
        <div>
          <p class="mini-label">Leader View</p>
          <h2>${escapeHtml(selectedLeader.name)}</h2>
        </div>
        <button id="toggle-empty-network-slots" class="ghost-btn" type="button">${hideEmptyNetworkSlots ? "Show Empty Positions" : "Hide Empty Positions"}</button>
      </div>
      <div class="managed-ministry-row">
        <strong>${escapeHtml(getCellDisplayPrioritySummary(selectedLeader) || getCellDiscipleshipLabel(selectedLeader.discipleshipLevel))}</strong>
        <div class="admin-readonly-meta">
          <div>Network: ${escapeHtml(selectedLeader.effectiveCellGroup || "-")}</div>
          <div>Under: ${escapeHtml(selectedLeader.cellLeaderName || "-")}</div>
          <div>Invited Visitors: ${escapeHtml(getInvitedVisitorsForRecord(selectedLeader.id).map((entry) => entry.name).join(", ") || "-")}</div>
        </div>
      </div>
      ${canManage ? `
        <div class="managed-ministry-row">
          <div class="admin-readonly-meta">${isProtected ? "Only the Creator can edit this protected leadership record." : "Use Promote, Transfer, and Demote here. Transfer changes the person to another leader, which also changes the automatic group."}</div>
        </div>
        ${!isProtected ? `
          <div class="admin-actions">
            <button class="ghost-btn cell-record-promote" type="button" data-record-id="${escapeHtml(selectedLeader.id)}">Promote</button>
            <button class="secondary-btn cell-record-start-transfer" type="button" data-record-id="${escapeHtml(selectedLeader.id)}">${transferOpen ? "Choose Destination" : "Transfer"}</button>
            <button class="ghost-btn cell-record-demote" type="button" data-record-id="${escapeHtml(selectedLeader.id)}">Demote</button>
          </div>
          ${transferOpen ? `
            <div class="admin-actions">
              <select class="cell-record-transfer-target" data-record-id="${escapeHtml(selectedLeader.id)}">
                <option value="">Transfer to leader</option>
                ${transferCandidates.map((record) => `<option value="${escapeHtml(record.id)}" ${selectedLeader.cellLeaderUserId === record.id ? "selected" : ""}>${escapeHtml(getRecordPickerLabel(record))}</option>`).join("")}
              </select>
              <button class="secondary-btn cell-record-transfer" type="button" data-record-id="${escapeHtml(selectedLeader.id)}">Confirm Transfer</button>
              <button class="ghost-btn cell-record-cancel-transfer" type="button" data-record-id="${escapeHtml(selectedLeader.id)}">Cancel</button>
            </div>
          ` : ""}
          <div class="admin-readonly-meta">
            <div>Current Level: ${escapeHtml(getCellDiscipleshipLabel(selectedLeaderCurrentLevel) || "-")}</div>
            <div>Current Group: ${escapeHtml(selectedLeader.effectiveCellGroup || "-")}</div>
          </div>
        ` : ""}
      ` : ""}
      <div class="cell-tree">
        <div class="cell-tree-level">
          <div class="cell-tree-level-label">Focused Network</div>
          <div class="cell-tree-row">
            ${visibleSlots.map((slotId) => {
              const assigned = getCellManagementRecord(assignments[slotId] || "");
              return `
                <article class="cell-tree-node" title="${escapeHtml(assigned ? `${assigned.name} | ${getCellDiscipleshipLabel(assigned.discipleshipLevel)}` : `${slotId} is currently unassigned.`)}">
                  <strong>${escapeHtml(slotId)}</strong>
                  <button class="ghost-btn cell-tree-name-link" type="button" data-record-id="${escapeHtml(assigned?.id || "")}" ${assigned ? "" : "disabled"}>${escapeHtml(assigned?.name || "Empty slot")}</button>
                  <div class="person-schedule-meta">${escapeHtml(assigned ? (assigned.effectiveCellGroup || getCellDiscipleshipLabel(assigned.discipleshipLevel)) : "Open position")}</div>
                  ${canManage && !isProtected ? `
                    <select class="leader-network-select" data-leader-id="${escapeHtml(selectedLeader.id)}" data-slot-id="${escapeHtml(slotId)}">
                      ${buildAssignableSelectionOptions(memberCandidates, availableProfiles, assigned?.id || "", "Assign member")}
                    </select>
                    <div class="admin-actions">
                      <button class="secondary-btn leader-network-save" type="button" data-leader-id="${escapeHtml(selectedLeader.id)}" data-slot-id="${escapeHtml(slotId)}">Save</button>
                      <button class="ghost-btn leader-network-clear" type="button" data-leader-id="${escapeHtml(selectedLeader.id)}" data-slot-id="${escapeHtml(slotId)}">Clear</button>
                    </div>
                  ` : ""}
                </article>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildCellManagementEditor(canManage, availableProfiles, consolidators, cellLeaders) {
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
            <option value="">Leadership office (auto if blank)</option>
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
              <option value="">Auto leadership office</option>
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

  cellManagementRoot.querySelectorAll(".cell-management-edit").forEach((button) => {
    button.addEventListener("click", () => {
      selectedRecordId = button.dataset.recordId || "";
      renderWorkspace();
    });
  });

  const editForm = cellManagementRoot.querySelector("#cell-management-edit-form");
  editForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const recordId = cellManagementRoot.querySelector("#cell-editor-record")?.value || selectedRecordId;
    if (!recordId) {
      return;
    }

    const allRecords = sortCellManagementRecords(cellManagementState.records ?? []);
    const inviterUserId = resolveRecordIdFromPicker(cellManagementRoot.querySelector("#cell-editor-inviter")?.value || "", allRecords.filter((entry) => entry.id !== recordId));
    const consolidatorUserId = resolveRecordIdFromPicker(cellManagementRoot.querySelector("#cell-editor-consolidator")?.value || "", getEligibleConsolidators().filter((entry) => entry.id !== recordId));
    const selectedOffice = cellManagementRoot.querySelector("#cell-editor-office")?.value || "";
    const resolvedLeaderUserId = resolveRecordIdFromPicker(cellManagementRoot.querySelector("#cell-editor-leader")?.value || "", getEligibleCellLeaders().filter((entry) => entry.id !== recordId));
    const defaultLeader = getAdminPastorRecord();
    const cellLeaderUserId = ["seniorPastor", "adminPastor"].includes(selectedOffice) ? "" : (resolvedLeaderUserId || defaultLeader?.id || "");

    if (cellLeaderUserId && getCellLeaderAssignedCount(cellLeaderUserId, recordId) >= 12) {
      window.alert("That cell leader is already handling 12 members.");
      return;
    }

    updateCellRecord(recordId, (record) => ({
      ...record,
      leadershipOffice: selectedOffice,
      manualLevelOverride: cellManagementRoot.querySelector("#cell-editor-level")?.value || "",
      invitedByUserId,
      consolidatorUserId,
      cellLeaderUserId,
      consolidationCount: Number(cellManagementRoot.querySelector("#cell-editor-consolidations")?.value || 0),
      successfullyRetainedVisitorCount: Number(cellManagementRoot.querySelector("#cell-editor-retained")?.value || 0),
      raisedCellLeadersCount: Number(cellManagementRoot.querySelector("#cell-editor-raised")?.value || 0),
      preEncounterCompleted: Boolean(cellManagementRoot.querySelector("#cell-editor-pre")?.checked),
      encounterCompleted: Boolean(cellManagementRoot.querySelector("#cell-editor-encounter")?.checked),
      postEncounterCompleted: Boolean(cellManagementRoot.querySelector("#cell-editor-post")?.checked)
    }));

    const savedRecord = getCellManagementRecord(recordId);
    if (savedRecord?.cellGroup && !(cellManagementState.groups ?? []).includes(savedRecord.cellGroup)) {
      cellManagementState.groups = sortEntries([...(cellManagementState.groups ?? []), savedRecord.cellGroup]);
      persistCellManagement();
    }
    selectedRecordId = recordId;
    renderWorkspace();
  });

  cellManagementRoot.querySelector("#cell-editor-record")?.addEventListener("change", (event) => {
    selectedRecordId = event.target.value || "";
    renderWorkspace();
  });

  cellManagementRoot.querySelector("#cell-editor-promote")?.addEventListener("click", () => {
    const record = getCellManagementRecord(selectedRecordId);
    if (!record) {
      return;
    }
    const order = ["visitor", "member", "cellLeader", "networkLeader"];
    const currentIndex = order.indexOf(record.manualLevelOverride || record.discipleshipLevel);
    updateCellRecord(record.id, (entry) => ({ ...entry, manualLevelOverride: order[Math.min(order.length - 1, Math.max(0, currentIndex + 1))] }));
    renderWorkspace();
  });

  cellManagementRoot.querySelector("#cell-editor-demote")?.addEventListener("click", () => {
    const record = getCellManagementRecord(selectedRecordId);
    if (!record) {
      return;
    }
    const order = ["visitor", "member", "cellLeader", "networkLeader"];
    const currentIndex = order.indexOf(record.manualLevelOverride || record.discipleshipLevel);
    updateCellRecord(record.id, (entry) => ({ ...entry, manualLevelOverride: order[Math.max(0, currentIndex - 1)] }));
    renderWorkspace();
  });

  cellManagementRoot.querySelector("#cell-editor-clear")?.addEventListener("click", () => {
    selectedRecordId = "";
    renderWorkspace();
  });

  cellManagementRoot.querySelectorAll(".cell-tree-name-link").forEach((button) => {
    button.addEventListener("click", () => {
      const recordId = button.dataset.recordId || "";
      if (!recordId) {
        return;
      }
      selectedLeaderId = recordId;
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".cell-record-promote").forEach((button) => {
    button.addEventListener("click", () => {
      const record = getCellManagementRecord(button.dataset.recordId || "");
      if (!record || !canEditProtectedRecord(record)) {
        return;
      }
      if (!window.confirm(`Promote ${record.name}?`)) {
        return;
      }
      const order = ["visitor", "member", "cellLeader", "networkLeader"];
      const currentIndex = order.indexOf(record.manualLevelOverride || record.discipleshipLevel);
      updateCellRecord(record.id, (entry) => ({
        ...entry,
        manualLevelOverride: order[Math.min(order.length - 1, Math.max(0, currentIndex + 1))]
      }));
      selectedLeaderId = record.id;
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".cell-record-demote").forEach((button) => {
    button.addEventListener("click", () => {
      const record = getCellManagementRecord(button.dataset.recordId || "");
      if (!record || !canEditProtectedRecord(record)) {
        return;
      }
      if (!window.confirm(`Demote ${record.name}?`)) {
        return;
      }
      const order = ["visitor", "member", "cellLeader", "networkLeader"];
      const currentIndex = order.indexOf(record.manualLevelOverride || record.discipleshipLevel);
      updateCellRecord(record.id, (entry) => ({
        ...entry,
        manualLevelOverride: order[Math.max(0, currentIndex - 1)]
      }));
      selectedLeaderId = record.id;
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".cell-record-start-transfer").forEach((button) => {
    button.addEventListener("click", () => {
      const record = getCellManagementRecord(button.dataset.recordId || "");
      if (!record || !canEditProtectedRecord(record)) {
        return;
      }
      if (!window.confirm(`Open transfer options for ${record.name}?`)) {
        return;
      }
      transferPromptRecordId = record.id;
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".cell-record-cancel-transfer").forEach((button) => {
    button.addEventListener("click", () => {
      if (transferPromptRecordId === (button.dataset.recordId || "")) {
        transferPromptRecordId = "";
      }
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".cell-record-transfer").forEach((button) => {
    button.addEventListener("click", () => {
      const recordId = button.dataset.recordId || "";
      const record = getCellManagementRecord(recordId);
      if (!record || !canEditProtectedRecord(record)) {
        return;
      }

      const targetLeaderId = cellManagementRoot.querySelector(`.cell-record-transfer-target[data-record-id="${cssEscape(recordId)}"]`)?.value || "";
      if (!targetLeaderId) {
        return;
      }
      const targetLeader = getCellManagementRecord(targetLeaderId);
      if (!window.confirm(`Transfer ${record.name} to ${targetLeader?.name || "this leader"}?`)) {
        return;
      }

      if (["visitor", "member"].includes(record.discipleshipLevel) && getCellLeaderAssignedCount(targetLeaderId, recordId) >= 12) {
        window.alert("That leader is already handling 12 members.");
        return;
      }

      removeRecordFromAllNetworkAssignments(recordId);
      updateCellRecord(recordId, (entry) => ({
        ...entry,
        cellLeaderUserId: targetLeaderId
      }));
      assignRecordToFirstOpenNetworkSlot(targetLeaderId, recordId);

      transferPromptRecordId = "";
      selectedLeaderId = recordId;
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelector("#toggle-empty-network-slots")?.addEventListener("click", () => {
    hideEmptyNetworkSlots = !hideEmptyNetworkSlots;
    renderWorkspace();
  });

  cellManagementRoot.querySelectorAll(".leader-network-save").forEach((button) => {
    button.addEventListener("click", () => {
      const leaderId = button.dataset.leaderId || "";
      const slotId = button.dataset.slotId || "";
      const selectedValue = cellManagementRoot.querySelector(`.leader-network-select[data-leader-id="${cssEscape(leaderId)}"][data-slot-id="${cssEscape(slotId)}"]`)?.value || "";
      const recordId = resolveAssignableSelection(selectedValue, { cellLeaderUserId: leaderId });
      const assignments = getLeaderNetworkAssignments(leaderId);
      assignments[slotId] = recordId;
      setLeaderNetworkAssignments(leaderId, assignments);
      if (recordId) {
        removeRecordFromAllNetworkAssignments(recordId);
        assignments[slotId] = recordId;
        setLeaderNetworkAssignments(leaderId, assignments);
        updateCellRecord(recordId, (record) => ({
          ...record,
          cellLeaderUserId: leaderId
        }));
      }
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".leader-network-clear").forEach((button) => {
    button.addEventListener("click", () => {
      const leaderId = button.dataset.leaderId || "";
      const slotId = button.dataset.slotId || "";
      const assignments = getLeaderNetworkAssignments(leaderId);
      const recordId = assignments[slotId] || "";
      assignments[slotId] = "";
      setLeaderNetworkAssignments(leaderId, assignments);
      if (recordId) {
        updateCellRecord(recordId, (record) => ({
          ...record,
          cellLeaderUserId: record.cellLeaderUserId === leaderId ? "" : record.cellLeaderUserId
        }));
      }
      renderWorkspace();
    });
  });

  cellManagementRoot.querySelectorAll(".cell-tree-save").forEach((button) => {
    button.addEventListener("click", () => {
      const slotId = button.dataset.slotId;
      const selectedValue = cellManagementRoot.querySelector(`.cell-tree-select[data-slot-id="${cssEscape(slotId)}"]`)?.value || "";
      const defaultLeaderId = slotId.startsWith("C") ? "cell-seed-ferdie" : "";
      const recordId = resolveAssignableSelection(selectedValue, { cellLeaderUserId: defaultLeaderId });
      cellManagementState.treeAssignments = { ...(cellManagementState.treeAssignments ?? {}), [slotId]: recordId };
      if (recordId && defaultLeaderId) {
        updateCellRecord(recordId, (record) => ({
          ...record,
          cellLeaderUserId: defaultLeaderId
        }));
      }
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
  const leaderCandidates = getNetworkLeaderCandidates();
  if (selectedLeaderId && !getCellManagementRecord(selectedLeaderId)) {
    selectedLeaderId = "";
  }
  const selectedLeader = getCellManagementRecord(selectedLeaderId) || leaderCandidates[0] || null;
  const sortedCellRecords = sortCellManagementRecords(cellManagementState.records ?? []).filter((record) =>
    ["visitor", "member"].includes(record.discipleshipLevel)
  );

  cellManagementRoot.innerHTML = `
    <div class="cell-page-grid">
      ${renderCellManagementTree(cellManagementState.records ?? [], canManage)}
      ${buildLeaderWorkspace(selectedLeader, canManage)}
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
                </tr>
              </thead>
              <tbody>
                ${sortedCellRecords.map((record) => {
                  const leadershipOffice = getCellLeadershipOfficeLabel(record.effectiveLeadershipOffice);
                  const levelLabel = getCellDiscipleshipLabel(record.discipleshipLevel);
                  const priorityLabel = [leadershipOffice, levelLabel].filter(Boolean).join(" | ") || "-";
                  const hideCellLeader = ["seniorPastor", "adminPastor"].includes(record.effectiveLeadershipOffice);
                  const linkedLeader = record.cellLeaderUserId ? getCellManagementRecord(record.cellLeaderUserId) : null;
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
                      <td><button class="ghost-btn cell-tree-name-link inline-name-link" type="button" data-record-id="${escapeHtml(record.id)}"><strong>${escapeHtml(record.name)}</strong></button></td>
                      <td>${escapeHtml(priorityLabel)}</td>
                      <td>${escapeHtml(record.invitedByName || "-")}</td>
                      <td>${escapeHtml(record.consolidatorName || "-")}</td>
                      <td>${hideCellLeader || !linkedLeader ? escapeHtml("-") : `<button class="ghost-btn cell-tree-name-link inline-name-link" type="button" data-record-id="${escapeHtml(linkedLeader.id)}">${escapeHtml(record.cellLeaderName || "-")}</button>`}</td>
                      <td>${escapeHtml(record.effectiveCellGroup || "-")}</td>
                      <td>${escapeHtml(progressParts.join(" | "))}</td>
                      <td>${escapeHtml(getInvitedVisitorsForRecord(record.id).map((entry) => entry.name).join(", ") || "-")}</td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        ` : `<div class="empty-card">No cell discipleship records yet.</div>`}
      </section>
    </div>
  `;

  bindEditableControls();
}

adminToggle?.addEventListener("click", () => {
  if (!canManageCellManagement()) {
    return;
  }
  adminMode = !adminMode;
  window.sessionStorage.setItem(ADMIN_MODE_KEY, adminMode ? "true" : "false");
  renderWorkspace();
});

(async () => {
  await syncUsersFromSupabase();
  renderWorkspace();
})();
