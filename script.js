const STORAGE_KEY = "service-roster-prototype-v4";
const HISTORY_KEY = "service-roster-history-v2";
const AUTH_KEY = "jccm-site-auth-v1";
const PHOTOS_KEY = "jccm-sunday-photos-v1";
const FIXED_PHOTO_KEY = "jccm-fixed-home-photo-v1";
const PHOTO_GRANTS_KEY = "jccm-photo-upload-grants-v1";
const SESSION_KEY = "jccm-site-session-v1";
const SESSION_TEMP_KEY = "jccm-site-session-temp-v1";
const ANNOUNCEMENTS_KEY = "jccm-announcements-v3";
const SEAT_LAYOUT_KEY = "jccm-seat-layout-v1";
const ACTIVE_SECTION_KEY = "jccm-active-section-v1";

const registryMeta = {
  worshipLeaders: "Worship Leaders",
  backups: "Backups",
  musicians: "Musicians"
};

const roleLabels = {
  headAdmin: "Head Admin",
  admin: "Admin",
  tech: "Tech Team",
  member: "Member"
};

const registrationRoleLabels = {
  ministryHead: "Ministry Head",
  ministryAssistant: "Ministry Assistant Head",
  ministryPrimaryLeader: "Primary Leader",
  ministryOfficer: "Ministry Officer",
  ministryMember: "Ministry Member",
  churchMember: "Church Member",
  visitor: "Visitor"
};

const defaultMinistries = [
  "Praise And Worship Team",
  "Adonai",
  "Hamakom",
  "Agape",
  "Emcee",
  "Info",
  "Pastoral",
  "Tech",
  "Ushers"
];

const temporaryMinistryTestAccounts = [
  { id: "temp-adonai-head", name: "Adonai Test Head", username: "AdonaiTestHead", ministry: "Adonai", ministryRole: "ministryHead" },
  { id: "temp-adonai-assistant", name: "Adonai Test Assistant", username: "AdonaiTestAssistant", ministry: "Adonai", ministryRole: "ministryAssistant" },
  { id: "temp-adonai-primary", name: "Adonai Test Primary", username: "AdonaiTestPrimary", ministry: "Adonai", ministryRole: "ministryPrimaryLeader" },
  { id: "temp-adonai-officer", name: "Adonai Test Officer", username: "AdonaiTestOfficer", ministry: "Adonai", ministryRole: "ministryOfficer" },
  { id: "temp-adonai-member", name: "Adonai Test Member", username: "AdonaiTestMember", ministry: "Adonai", ministryRole: "ministryMember" },
  { id: "temp-hamakom-head", name: "Hamakom Test Head", username: "HamakomTestHead", ministry: "Hamakom", ministryRole: "ministryHead" },
  { id: "temp-hamakom-assistant", name: "Hamakom Test Assistant", username: "HamakomTestAssistant", ministry: "Hamakom", ministryRole: "ministryAssistant" },
  { id: "temp-hamakom-primary", name: "Hamakom Test Primary", username: "HamakomTestPrimary", ministry: "Hamakom", ministryRole: "ministryPrimaryLeader" },
  { id: "temp-hamakom-officer", name: "Hamakom Test Officer", username: "HamakomTestOfficer", ministry: "Hamakom", ministryRole: "ministryOfficer" },
  { id: "temp-hamakom-member", name: "Hamakom Test Member", username: "HamakomTestMember", ministry: "Hamakom", ministryRole: "ministryMember" },
  { id: "temp-agape-head", name: "Agape Test Head", username: "AgapeTestHead", ministry: "Agape", ministryRole: "ministryHead" },
  { id: "temp-agape-assistant", name: "Agape Test Assistant", username: "AgapeTestAssistant", ministry: "Agape", ministryRole: "ministryAssistant" },
  { id: "temp-agape-primary", name: "Agape Test Primary", username: "AgapeTestPrimary", ministry: "Agape", ministryRole: "ministryPrimaryLeader" },
  { id: "temp-agape-officer", name: "Agape Test Officer", username: "AgapeTestOfficer", ministry: "Agape", ministryRole: "ministryOfficer" },
  { id: "temp-agape-member", name: "Agape Test Member", username: "AgapeTestMember", ministry: "Agape", ministryRole: "ministryMember" },
  { id: "temp-emcee-head", name: "Emcee Test Head", username: "EmceeTestHead", ministry: "Emcee", ministryRole: "ministryHead" },
  { id: "temp-emcee-assistant", name: "Emcee Test Assistant", username: "EmceeTestAssistant", ministry: "Emcee", ministryRole: "ministryAssistant" },
  { id: "temp-emcee-primary", name: "Emcee Test Primary", username: "EmceeTestPrimary", ministry: "Emcee", ministryRole: "ministryPrimaryLeader" },
  { id: "temp-emcee-officer", name: "Emcee Test Officer", username: "EmceeTestOfficer", ministry: "Emcee", ministryRole: "ministryOfficer" },
  { id: "temp-emcee-member", name: "Emcee Test Member", username: "EmceeTestMember", ministry: "Emcee", ministryRole: "ministryMember" },
  { id: "temp-info-head", name: "Info Test Head", username: "InfoTestHead", ministry: "Info", ministryRole: "ministryHead" },
  { id: "temp-info-assistant", name: "Info Test Assistant", username: "InfoTestAssistant", ministry: "Info", ministryRole: "ministryAssistant" },
  { id: "temp-info-primary", name: "Info Test Primary", username: "InfoTestPrimary", ministry: "Info", ministryRole: "ministryPrimaryLeader" },
  { id: "temp-info-officer", name: "Info Test Officer", username: "InfoTestOfficer", ministry: "Info", ministryRole: "ministryOfficer" },
  { id: "temp-info-member", name: "Info Test Member", username: "InfoTestMember", ministry: "Info", ministryRole: "ministryMember" },
  { id: "temp-pastoral-head", name: "Pastoral Test Head", username: "PastoralTestHead", ministry: "Pastoral", ministryRole: "ministryHead" },
  { id: "temp-pastoral-assistant", name: "Pastoral Test Assistant", username: "PastoralTestAssistant", ministry: "Pastoral", ministryRole: "ministryAssistant" },
  { id: "temp-pastoral-primary", name: "Pastoral Test Primary", username: "PastoralTestPrimary", ministry: "Pastoral", ministryRole: "ministryPrimaryLeader" },
  { id: "temp-pastoral-officer", name: "Pastoral Test Officer", username: "PastoralTestOfficer", ministry: "Pastoral", ministryRole: "ministryOfficer" },
  { id: "temp-pastoral-member", name: "Pastoral Test Member", username: "PastoralTestMember", ministry: "Pastoral", ministryRole: "ministryMember" },
  { id: "temp-tech-head", name: "Tech Test Head", username: "TechTestHead", ministry: "Tech", ministryRole: "ministryHead" },
  { id: "temp-tech-assistant", name: "Tech Test Assistant", username: "TechTestAssistant", ministry: "Tech", ministryRole: "ministryAssistant" },
  { id: "temp-tech-primary", name: "Tech Test Primary", username: "TechTestPrimary", ministry: "Tech", ministryRole: "ministryPrimaryLeader" },
  { id: "temp-tech-officer", name: "Tech Test Officer", username: "TechTestOfficer", ministry: "Tech", ministryRole: "ministryOfficer" },
  { id: "temp-tech-member", name: "Tech Test Member", username: "TechTestMember", ministry: "Tech", ministryRole: "ministryMember" },
  { id: "temp-ushers-head", name: "Ushers Test Head", username: "UshersTestHead", ministry: "Ushers", ministryRole: "ministryHead" },
  { id: "temp-ushers-assistant", name: "Ushers Test Assistant", username: "UshersTestAssistant", ministry: "Ushers", ministryRole: "ministryAssistant" },
  { id: "temp-ushers-primary", name: "Ushers Test Primary", username: "UshersTestPrimary", ministry: "Ushers", ministryRole: "ministryPrimaryLeader" },
  { id: "temp-ushers-officer", name: "Ushers Test Officer", username: "UshersTestOfficer", ministry: "Ushers", ministryRole: "ministryOfficer" },
  { id: "temp-ushers-member", name: "Ushers Test Member", username: "UshersTestMember", ministry: "Ushers", ministryRole: "ministryMember" },
  { id: "temp-paw-head", name: "PAW Test Head", username: "PraiseAndWorshipTestHead", ministry: "Praise And Worship Team", ministryRole: "ministryHead" },
  { id: "temp-paw-assistant", name: "PAW Test Assistant", username: "PraiseAndWorshipTestAssistant", ministry: "Praise And Worship Team", ministryRole: "ministryAssistant" },
  { id: "temp-paw-primary", name: "PAW Test Primary", username: "PraiseAndWorshipTestPrimary", ministry: "Praise And Worship Team", ministryRole: "ministryPrimaryLeader" },
  { id: "temp-paw-officer", name: "PAW Test Officer", username: "PraiseAndWorshipTestOfficer", ministry: "Praise And Worship Team", ministryRole: "ministryOfficer" },
  { id: "temp-paw-member", name: "PAW Test Member", username: "PraiseAndWorshipTestMember", ministry: "Praise And Worship Team", ministryRole: "ministryMember" }
];

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
  users: [{
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
    id: "headadmin-seed",
    name: "Medward Head",
    username: "medwardhead",
    usernames: ["medwardhead"],
    password: "",
    role: "headAdmin",
    isCreator: false,
    titles: [
      { scope: "platform", role: "headAdmin", ministry: "" }
    ],
    ministries: [],
    profile: {}
  },
  {
    id: "admin-seed-2",
    name: "Medward Admin",
    username: "medwardadmin",
    usernames: ["medwardadmin"],
    password: "",
    role: "admin",
    isCreator: false,
    titles: [
      { scope: "platform", role: "admin", ministry: "" }
    ],
    ministries: [],
    profile: {}
  },
  {
    id: "member-seed-1",
    name: "Medward Member 1",
    username: "medwardmember1",
    usernames: ["medwardmember1"],
    password: "",
    role: "member",
    isCreator: false,
    titles: [
      { scope: "general", role: "churchMember", ministry: "" }
    ],
    ministries: [],
    profile: {}
  },
  {
    id: "member-seed-2",
    name: "Medward Member 2",
    username: "medwardmember2",
    usernames: ["medwardmember2"],
    password: "",
    role: "member",
    isCreator: false,
    titles: [
      { scope: "general", role: "churchMember", ministry: "" }
    ],
    ministries: [],
    profile: {}
  },
  {
    id: "visitor-seed",
    name: "Medward Visitor",
    username: "medwardvisitor",
    usernames: ["medwardvisitor"],
    password: "",
    role: "member",
    isCreator: false,
    titles: [
      { scope: "general", role: "visitor", ministry: "" }
    ],
    ministries: [],
    profile: {}
  },
  ...temporaryMinistryTestAccounts.map((account) => ({
    id: account.id,
    name: account.name,
    username: account.username,
    usernames: [account.username],
    password: "",
    role: "member",
    isCreator: false,
    isTemporary: true,
    titles: [
      { scope: "ministry", role: account.ministryRole, ministry: account.ministry }
    ],
    ministries: [account.ministry],
    profile: {}
  }))],
  pending: [],
  ministryRequests: [],
  ministries: defaultMinistries
};

const announcementBoardMeta = {
  home: { label: "Home", ministry: "Emcee", grantMinistries: ["Emcee", "Info"] },
  adonai: { label: "Adonai", ministry: "Adonai", grantMinistries: ["Adonai"] },
  hamakom: { label: "Hamakom", ministry: "Hamakom", grantMinistries: ["Hamakom"] },
  agape: { label: "Agape", ministry: "Agape", grantMinistries: ["Agape"] }
};

const samplePhotos = [
  {
    id: "sample-2",
    section: "sunday",
    date: "2026-03-15",
    caption: "Praise and Worship Moments",
    imagePath: "sample-photos/502941961_1009231264747364_7926852184943090571_n.jpg",
    uploadedBy: "JCCM Sample"
  },
  {
    id: "sample-3",
    section: "sunday",
    date: "2026-03-15",
    caption: "Sunday Fellowship",
    imagePath: "sample-photos/503266131_1009231031414054_1071944700553460347_n.jpg",
    uploadedBy: "JCCM Sample"
  },
  {
    id: "sample-4",
    section: "sunday",
    date: "2026-03-15",
    caption: "Worship Team",
    imagePath: "sample-photos/504277569_1012165871120570_7521764333023615902_n.jpg",
    uploadedBy: "JCCM Sample"
  },
  {
    id: "sample-5",
    section: "sunday",
    date: "2026-03-15",
    caption: "Church Snapshot",
    imagePath: "sample-photos/ASDASD.jpg",
    uploadedBy: "JCCM Sample"
  },
  {
    id: "sample-1",
    section: "sunday",
    date: "2026-03-15",
    caption: "JCCM Sunday Service",
    imagePath: "sample-photos/502940991_1009229358080888_1129196559297250763_n.jpg",
    uploadedBy: "JCCM Sample"
  }
];

const fixedHomePhoto = {
  id: "fixed-home-photo",
  section: "sunday",
  date: "2026-03-15",
  caption: "JCCM Sunday Service",
  imagePath: "sample-photos/fixed-photo.jpg",
  uploadedBy: "JCCM"
};

const photoSectionMeta = {
  sunday: { label: "Sunday Service", pageSection: "home" },
  adonai: { label: "Adonai", pageSection: "adonai" },
  hamakom: { label: "Hamakom", pageSection: "hamakom" },
  agape: { label: "Agape", pageSection: "agape" }
};

const sectionIds = ["home", "seats", "profile", "search", "photos", "adonai", "hamakom", "agape", "about", "organizer", "admin"];

const loginGate = document.querySelector("#login-gate");
const appShell = document.querySelector("#app-shell");
const showLoginButton = document.querySelector("#show-login");
const showRegisterButton = document.querySelector("#show-register");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const rememberMe = document.querySelector("#remember-me");
const registerName = document.querySelector("#register-name");
const registerUsername = document.querySelector("#register-username");
const registerPassword = document.querySelector("#register-password");
const registerBirthday = document.querySelector("#register-birthday");
const registerContactNumber = document.querySelector("#register-contact-number");
const registerGender = document.querySelector("#register-gender");
const authMessage = document.querySelector("#auth-message");
const profileEditToggle = document.querySelector("#profile-edit-toggle");
const profileWelcome = document.querySelector("#profile-welcome");
const profilePhotoPreview = document.querySelector("#profile-photo-preview");
const profilePhotoFallback = document.querySelector("#profile-photo-fallback");
const profilePhotoForm = document.querySelector("#profile-photo-form");
const profilePhotoFile = document.querySelector("#profile-photo-file");
const profilePhotoMessage = document.querySelector("#profile-photo-message");
const profileSummary = document.querySelector("#profile-summary");
const profileDisplayName = document.querySelector("#profile-display-name");
const profileDisplayBirthday = document.querySelector("#profile-display-birthday");
const profileDisplayContactNumber = document.querySelector("#profile-display-contact-number");
const profileDisplayGender = document.querySelector("#profile-display-gender");
const profileDisplayOccupation = document.querySelector("#profile-display-occupation");
const profileDisplayCivilStatus = document.querySelector("#profile-display-civil-status");
const profileForm = document.querySelector("#profile-form");
const profileName = document.querySelector("#profile-name");
const profileBirthday = document.querySelector("#profile-birthday");
const profileContactNumber = document.querySelector("#profile-contact-number");
const profileGender = document.querySelector("#profile-gender");
const profileOccupation = document.querySelector("#profile-occupation");
const profileCivilStatus = document.querySelector("#profile-civil-status");
const profileMessage = document.querySelector("#profile-message");
const profileMinistryForm = document.querySelector("#profile-ministry-form");
const profileMinistrySelect = document.querySelector("#profile-ministry-select");
const profileMinistryRole = document.querySelector("#profile-ministry-role");
const profileMinistriesList = document.querySelector("#profile-ministries-list");
const profileMinistryRequests = document.querySelector("#profile-ministry-requests");
const profileSearchForm = document.querySelector("#profile-search-form");
const profileSearchInput = document.querySelector("#profile-search-input");
const profileSearchResults = document.querySelector("#profile-search-results");
const changePasswordForm = document.querySelector("#change-password-form");
const currentPasswordInput = document.querySelector("#current-password");
const newPasswordInput = document.querySelector("#new-password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const passwordMessage = document.querySelector("#password-message");
const profilePasswordCard = document.querySelector("#profile-password-card");
const profileMinistryManager = document.querySelector("#profile-ministry-manager");
const createMinistryForm = document.querySelector("#create-ministry-form");
const createMinistryInput = document.querySelector("#create-ministry-input");
const createMinistryMessage = document.querySelector("#create-ministry-message");
const currentUserName = document.querySelector("#current-user-name");
const currentUserRole = document.querySelector("#current-user-role");
const adminModeButton = document.querySelector("#admin-mode-btn");
const logoutButton = document.querySelector("#logout-btn");
const siteLogo = document.querySelector("#site-logo");
const siteLogoFallback = document.querySelector("#site-logo-fallback");
const navButtons = [...document.querySelectorAll(".nav-btn")];
const adminNavButton = document.querySelector("#admin-nav-btn");
const reserveSeatButton = document.querySelector("#reserve-seat-btn");
const seatLayoutNote = document.querySelector("#seat-layout-note");
const seatLayoutGroups = document.querySelector("#seat-layout-groups");
const homeCarouselSlide = document.querySelector("#home-carousel-slide");
const homeCarouselDots = document.querySelector("#home-carousel-dots");
const homeCarouselPrev = document.querySelector("#home-carousel-prev");
const homeCarouselNext = document.querySelector("#home-carousel-next");
const announcementsInput = document.querySelector("#announcements-input");
const adonaiAnnouncementsInput = document.querySelector("#adonai-announcements-input");
const hamakomAnnouncementsInput = document.querySelector("#hamakom-announcements-input");
const agapeAnnouncementsInput = document.querySelector("#agape-announcements-input");
const announcementsPosts = document.querySelector("#announcements-posts");
const adonaiAnnouncementsPosts = document.querySelector("#adonai-announcements-posts");
const hamakomAnnouncementsPosts = document.querySelector("#hamakom-announcements-posts");
const agapeAnnouncementsPosts = document.querySelector("#agape-announcements-posts");
const announcementsSubmit = document.querySelector("#announcements-submit");
const adonaiAnnouncementsSubmit = document.querySelector("#adonai-announcements-submit");
const hamakomAnnouncementsSubmit = document.querySelector("#hamakom-announcements-submit");
const agapeAnnouncementsSubmit = document.querySelector("#agape-announcements-submit");
const announcementsMessage = document.querySelector("#announcements-message");
const adonaiAnnouncementsMessage = document.querySelector("#adonai-announcements-message");
const hamakomAnnouncementsMessage = document.querySelector("#hamakom-announcements-message");
const agapeAnnouncementsMessage = document.querySelector("#agape-announcements-message");
const announcementsGrantPanel = document.querySelector("#announcements-grant-panel");
const adonaiAnnouncementsGrantPanel = document.querySelector("#adonai-announcements-grant-panel");
const hamakomAnnouncementsGrantPanel = document.querySelector("#hamakom-announcements-grant-panel");
const agapeAnnouncementsGrantPanel = document.querySelector("#agape-announcements-grant-panel");
const announcementsGrantUser = document.querySelector("#announcements-grant-user");
const announcementsGrantUserList = document.querySelector("#announcements-grant-user-list");
const adonaiAnnouncementsGrantUser = document.querySelector("#adonai-announcements-grant-user");
const adonaiAnnouncementsGrantUserList = document.querySelector("#adonai-announcements-grant-user-list");
const hamakomAnnouncementsGrantUser = document.querySelector("#hamakom-announcements-grant-user");
const hamakomAnnouncementsGrantUserList = document.querySelector("#hamakom-announcements-grant-user-list");
const agapeAnnouncementsGrantUser = document.querySelector("#agape-announcements-grant-user");
const agapeAnnouncementsGrantUserList = document.querySelector("#agape-announcements-grant-user-list");
const announcementsGrantButton = document.querySelector("#announcements-grant-button");
const adonaiAnnouncementsGrantButton = document.querySelector("#adonai-announcements-grant-button");
const hamakomAnnouncementsGrantButton = document.querySelector("#hamakom-announcements-grant-button");
const agapeAnnouncementsGrantButton = document.querySelector("#agape-announcements-grant-button");
const announcementsGrants = document.querySelector("#announcements-grants");
const adonaiAnnouncementsGrants = document.querySelector("#adonai-announcements-grants");
const hamakomAnnouncementsGrants = document.querySelector("#hamakom-announcements-grants");
const agapeAnnouncementsGrants = document.querySelector("#agape-announcements-grants");
const photoGallery = document.querySelector("#photo-gallery");
const adonaiCarouselSlide = document.querySelector("#adonai-carousel-slide");
const adonaiCarouselDots = document.querySelector("#adonai-carousel-dots");
const adonaiCarouselPrev = document.querySelector("#adonai-carousel-prev");
const adonaiCarouselNext = document.querySelector("#adonai-carousel-next");
const hamakomCarouselSlide = document.querySelector("#hamakom-carousel-slide");
const hamakomCarouselDots = document.querySelector("#hamakom-carousel-dots");
const hamakomCarouselPrev = document.querySelector("#hamakom-carousel-prev");
const hamakomCarouselNext = document.querySelector("#hamakom-carousel-next");
const agapeCarouselSlide = document.querySelector("#agape-carousel-slide");
const agapeCarouselDots = document.querySelector("#agape-carousel-dots");
const agapeCarouselPrev = document.querySelector("#agape-carousel-prev");
const agapeCarouselNext = document.querySelector("#agape-carousel-next");
const photoUploadForm = document.querySelector("#photo-upload-form");
const photoSectionSelect = document.querySelector("#photo-section");
const photoDate = document.querySelector("#photo-date");
const photoCaption = document.querySelector("#photo-caption");
const photoFile = document.querySelector("#photo-file");
const photoUploadButton = document.querySelector("#photo-upload-button");
const photoUploadMessage = document.querySelector("#photo-upload-message");
const photoUploadStatus = document.querySelector("#photo-upload-status");
const photoGrantPanel = document.querySelector("#photo-grant-panel");
const photoGrantSection = document.querySelector("#photo-grant-section");
const photoGrantUser = document.querySelector("#photo-grant-user");
const photoGrantUserList = document.querySelector("#photo-grant-user-list");
const photoGrantButton = document.querySelector("#photo-grant-button");
const photoGrants = document.querySelector("#photo-grants");
const fixedPhotoForm = document.querySelector("#fixed-photo-form");
const fixedPhotoSectionSelect = document.querySelector("#fixed-photo-section");
const fixedPhotoDate = document.querySelector("#fixed-photo-date");
const fixedPhotoCaption = document.querySelector("#fixed-photo-caption");
const fixedPhotoFile = document.querySelector("#fixed-photo-file");
const fixedPhotoButton = document.querySelector("#fixed-photo-button");
const fixedPhotoMessage = document.querySelector("#fixed-photo-message");
const pendingApprovals = document.querySelector("#pending-approvals");
const approvedAccounts = document.querySelector("#approved-accounts");
const ministryApprovals = document.querySelector("#ministry-approvals");
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
let fixedPhotos = loadFixedPhotos();
let photoUploadGrants = loadPhotoUploadGrants();
let currentUser = restoreSession();
let activeSection = restoreActiveSection();
let adminMode = false;
let carouselIndexes = { sunday: 0, adonai: 0, hamakom: 0, agape: 0 };
let announcements = loadAnnouncements();
let seatLayoutState = loadSeatLayoutState();
let homeCarouselTimer = null;
let homeCarouselResolved = false;
let carouselScrollPauseTimer = null;
let profileEditMode = false;
let lastProfileSearchTerm = "";

const carouselRefs = {
  sunday: { slide: homeCarouselSlide, dots: homeCarouselDots, prev: homeCarouselPrev, next: homeCarouselNext },
  adonai: { slide: adonaiCarouselSlide, dots: adonaiCarouselDots, prev: adonaiCarouselPrev, next: adonaiCarouselNext },
  hamakom: { slide: hamakomCarouselSlide, dots: hamakomCarouselDots, prev: hamakomCarouselPrev, next: hamakomCarouselNext },
  agape: { slide: agapeCarouselSlide, dots: agapeCarouselDots, prev: agapeCarouselPrev, next: agapeCarouselNext }
};

const announcementRefs = {
  home: {
    input: announcementsInput,
    posts: announcementsPosts,
    submit: announcementsSubmit,
    message: announcementsMessage,
    grantPanel: announcementsGrantPanel,
    grantUser: announcementsGrantUser,
    grantUserList: announcementsGrantUserList,
    grantButton: announcementsGrantButton,
    grants: announcementsGrants
  },
  adonai: {
    input: adonaiAnnouncementsInput,
    posts: adonaiAnnouncementsPosts,
    submit: adonaiAnnouncementsSubmit,
    message: adonaiAnnouncementsMessage,
    grantPanel: adonaiAnnouncementsGrantPanel,
    grantUser: adonaiAnnouncementsGrantUser,
    grantUserList: adonaiAnnouncementsGrantUserList,
    grantButton: adonaiAnnouncementsGrantButton,
    grants: adonaiAnnouncementsGrants
  },
  hamakom: {
    input: hamakomAnnouncementsInput,
    posts: hamakomAnnouncementsPosts,
    submit: hamakomAnnouncementsSubmit,
    message: hamakomAnnouncementsMessage,
    grantPanel: hamakomAnnouncementsGrantPanel,
    grantUser: hamakomAnnouncementsGrantUser,
    grantUserList: hamakomAnnouncementsGrantUserList,
    grantButton: hamakomAnnouncementsGrantButton,
    grants: hamakomAnnouncementsGrants
  },
  agape: {
    input: agapeAnnouncementsInput,
    posts: agapeAnnouncementsPosts,
    submit: agapeAnnouncementsSubmit,
    message: agapeAnnouncementsMessage,
    grantPanel: agapeAnnouncementsGrantPanel,
    grantUser: agapeAnnouncementsGrantUser,
    grantUserList: agapeAnnouncementsGrantUserList,
    grantButton: agapeAnnouncementsGrantButton,
    grants: agapeAnnouncementsGrants
  }
};

initializeApp();

function initializeApp() {
  showLoginButton.addEventListener("click", () => setAuthMode("login"));
  showRegisterButton.addEventListener("click", () => setAuthMode("register"));
  loginForm.addEventListener("submit", handleLogin);
  registerForm.addEventListener("submit", handleRegister);
  registerContactNumber.addEventListener("input", enforcePhilippineContactPrefix);
  reserveSeatButton.addEventListener("click", openSeatsPage);
  profileEditToggle.addEventListener("click", toggleProfileEditMode);
  profileForm.addEventListener("submit", handleProfileSave);
  profileContactNumber.addEventListener("input", enforceProfileContactPrefix);
  profilePhotoForm.addEventListener("submit", handleProfilePhotoSave);
  profileMinistryForm.addEventListener("submit", handleProfileMinistrySave);
  profileSearchForm.addEventListener("submit", handleProfileSearch);
  changePasswordForm.addEventListener("submit", handlePasswordChange);
  createMinistryForm.addEventListener("submit", handleCreateMinistry);
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeSection = button.dataset.section;
      renderSections();
      startCarouselAutoplay();
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
  photoGrantButton.addEventListener("click", handlePhotoGrant);
  photoGrantSection.addEventListener("change", renderPhotoGrantList);
  fixedPhotoForm.addEventListener("submit", handleFixedPhotoUpload);
  homeCarouselPrev.addEventListener("click", () => moveCarousel("sunday", -1));
  homeCarouselNext.addEventListener("click", () => moveCarousel("sunday", 1));
  adonaiCarouselPrev.addEventListener("click", () => moveCarousel("adonai", -1));
  adonaiCarouselNext.addEventListener("click", () => moveCarousel("adonai", 1));
  hamakomCarouselPrev.addEventListener("click", () => moveCarousel("hamakom", -1));
  hamakomCarouselNext.addEventListener("click", () => moveCarousel("hamakom", 1));
  agapeCarouselPrev.addEventListener("click", () => moveCarousel("agape", -1));
  agapeCarouselNext.addEventListener("click", () => moveCarousel("agape", 1));
  Object.entries(announcementRefs).forEach(([sectionKey, refs]) => {
    refs.submit.addEventListener("click", () => handleAnnouncementSubmit(sectionKey));
    refs.grantButton.addEventListener("click", () => handleAnnouncementGrant(sectionKey));
  });
  adminModeButton.addEventListener("click", toggleAdminMode);
  logoutButton.addEventListener("click", handleLogout);
  siteLogo.addEventListener("load", handleLogoLoad);
  siteLogo.addEventListener("error", handleLogoError);
  window.addEventListener("scroll", handleWindowScroll, { passive: true });
  if (siteLogo.complete) {
    if (siteLogo.naturalWidth > 0) {
      handleLogoLoad();
    } else {
      handleLogoError();
    }
  }
  buildSeatLayout();
  renderApp();
}

function openSeatsPage() {
  activeSection = "seats";
  renderSections();
  startCarouselAutoplay();
}

function buildSeatLayout() {
  if (!seatLayoutGroups) {
    return;
  }

  seatLayoutGroups.innerHTML = "";

  ["A", "B", "C"].forEach((groupKey, groupIndex) => {
    const group = document.createElement("section");
    group.className = "seat-group";
    group.innerHTML = `
      <div class="seat-group-title">${groupKey}</div>
      <div class="seat-grid" id="seat-grid-${groupIndex}"></div>
    `;

    const grid = group.querySelector(".seat-grid");
    for (let row = 1; row <= 7; row += 1) {
      for (let col = 1; col <= 7; col += 1) {
        const seatId = `${groupKey}${row}-${col}`;
        const seat = document.createElement("button");
        seat.className = "seat-cell";
        seat.type = "button";
        seat.dataset.seatId = seatId;
        seat.addEventListener("click", () => cycleSeatState(seatId));
        grid.appendChild(seat);
      }
    }

    seatLayoutGroups.appendChild(group);
  });

  renderSeatLayout();
}

function renderSeatLayout() {
  if (!seatLayoutGroups) {
    return;
  }

  const canManage = canManageSeats();
  if (seatLayoutNote) {
    seatLayoutNote.textContent = canManage
      ? "You can approve requests and update seat status on this page."
      : "You can request available seats here. Only Ushers Head, Ushers Assistant Head, and upper admins can approve seats.";
  }

  seatLayoutGroups.querySelectorAll(".seat-cell").forEach((seat) => {
    const seatId = seat.dataset.seatId;
    const status = getSeatStatus(seatId);
    const requesterName = getSeatRequesterName(seatId);
    seat.className = `seat-cell seat-cell-${status}`;
    seat.innerHTML = `<span class="seat-cell-id">${escapeHtml(seatId)}</span>`;
    const labelParts = [seatId, status];
    if (requesterName) {
      labelParts.push(`requested by ${requesterName}`);
      seat.title = `${seatId} requested by ${requesterName}`;
    } else {
      seat.title = `${seatId} ${capitalizeWord(status)}`;
    }
    seat.setAttribute("aria-label", labelParts.join(" "));
    seat.disabled = !canManage && !canRequestSeat(seatId);
    seat.classList.toggle("seat-cell-locked", !canManage && !canRequestSeat(seatId));
  });
}

function cycleSeatState(seatId) {
  if (!currentUser) {
    return;
  }

  const current = getSeatStatus(seatId);

  if (canManageSeats()) {
    const next = current === "available"
      ? "reserved"
      : current === "requested"
        ? "reserved"
        : current === "reserved"
          ? "occupied"
          : "available";
    seatLayoutState[seatId] = next === "available" ? "available" : { status: next, requestedBy: "", requestedByName: "" };
    persistSeatLayoutState();
    renderSeatLayout();
    return;
  }

  if (!canRequestSeat(seatId)) {
    return;
  }

  if (current === "available") {
    seatLayoutState[seatId] = {
      status: "requested",
      requestedBy: currentUser.id,
      requestedByName: currentUser.name || currentUser.username || "Unknown"
    };
  } else if (current === "requested" && isSeatRequestedByCurrentUser(seatId)) {
    seatLayoutState[seatId] = "available";
  } else {
    return;
  }

  persistSeatLayoutState();
  renderSeatLayout();
}

function canRequestSeat(seatId) {
  if (!currentUser) {
    return false;
  }

  const status = getSeatStatus(seatId);
  return status === "available" || (status === "requested" && isSeatRequestedByCurrentUser(seatId));
}

function isSeatRequestedByCurrentUser(seatId) {
  const entry = normalizeSeatEntry(seatLayoutState[seatId]);
  return Boolean(currentUser && entry.status === "requested" && entry.requestedBy === currentUser.id);
}

function getSeatStatus(seatId) {
  return normalizeSeatEntry(seatLayoutState[seatId]).status;
}

function getSeatRequesterName(seatId) {
  return normalizeSeatEntry(seatLayoutState[seatId]).requestedByName;
}

function normalizeSeatEntry(value) {
  if (value && typeof value === "object") {
    return {
      status: value.status || "available",
      requestedBy: value.requestedBy || "",
      requestedByName: value.requestedByName || ""
    };
  }

  return {
    status: typeof value === "string" ? value : "available",
    requestedBy: "",
    requestedByName: ""
  };
}

function enforcePhilippineContactPrefix() {
  const digits = registerContactNumber.value.replace(/\D/g, "");
  const localDigits = digits.startsWith("63") ? digits.slice(2) : digits;
  registerContactNumber.value = `+63${localDigits.slice(0, 10)}`;
}

function enforceProfileContactPrefix() {
  const digits = profileContactNumber.value.replace(/\D/g, "");
  const localDigits = digits.startsWith("63") ? digits.slice(2) : digits;
  profileContactNumber.value = `+63${localDigits.slice(0, 10)}`;
}

function handleWindowScroll() {
  stopCarouselAutoplay();

  if (carouselScrollPauseTimer) {
    window.clearTimeout(carouselScrollPauseTimer);
  }

  carouselScrollPauseTimer = window.setTimeout(() => {
    carouselScrollPauseTimer = null;
    startCarouselAutoplay();
  }, 1000);
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
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();
  const matchedUser = authState.users.find((user) => {
    const matchesUsername = getUsernames(user).includes(username);
    if (!matchesUsername) {
      return false;
    }

    if (user.isCreator) {
      return true;
    }

    return user.password === password;
  });

  if (!matchedUser) {
    authMessage.textContent = "Login failed. Please check your username and password.";
    return;
  }

  currentUser = matchedUser;
  if (rememberMe.checked) {
    window.localStorage.setItem(SESSION_KEY, matchedUser.id);
    window.sessionStorage.removeItem(SESSION_TEMP_KEY);
  } else {
    window.sessionStorage.setItem(SESSION_TEMP_KEY, matchedUser.id);
    window.localStorage.removeItem(SESSION_KEY);
  }
  authMessage.textContent = "";
  loginForm.reset();
  rememberMe.checked = false;
  renderApp();
}

function handleRegister(event) {
  event.preventDefault();
  const name = registerName.value.trim();
  const username = registerUsername.value.trim();
  const password = registerPassword.value.trim();
  const birthday = registerBirthday.value;
  const contactNumber = registerContactNumber.value.trim();
  const gender = registerGender.value;

  if (!name || !username || !password || !birthday || !contactNumber || !gender) {
    authMessage.textContent = "Please complete all required registration fields.";
    return;
  }

  if (!isValidPassword(password)) {
    authMessage.textContent = "Password must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 special character.";
    return;
  }

  if (!isValidPhilippineContactNumber(contactNumber)) {
    authMessage.textContent = "Contact number must start with +63 and contain exactly 10 digits after it.";
    return;
  }

  const alreadyExists = authState.users.some((user) => getUsernames(user).includes(username))
    || authState.pending.some((user) => user.username === username);

  if (alreadyExists) {
    authMessage.textContent = "That username is already in use.";
    return;
  }

  const duplicateContact = authState.users.some((user) => normalizeContactNumber(user.profile?.contactNumber) === normalizeContactNumber(contactNumber))
    || authState.pending.some((user) => normalizeContactNumber(user.profile?.contactNumber) === normalizeContactNumber(contactNumber));

  if (duplicateContact) {
    authMessage.textContent = "That contact number is already registered.";
    return;
  }

  const duplicateName = authState.users.some((user) => normalizeFullName(user.name) === normalizeFullName(name))
    || authState.pending.some((user) => normalizeFullName(user.name) === normalizeFullName(name));

  if (duplicateName) {
    authMessage.textContent = "That full name is already registered.";
    return;
  }

  authState.users.push({
    id: `user-${Date.now()}`,
    name,
    username,
    usernames: [username],
    password,
    role: "member",
    titles: [],
    ministries: [],
    profile: {
      birthday,
      contactNumber,
      gender
    }
  });
  persistAuth();
  registerForm.reset();
  setAuthMode("login");
  authMessage.textContent = "Account created. You can log in now.";
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
  profileEditMode = false;
  stopCarouselAutoplay();
  homeCarouselResolved = false;
  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(ACTIVE_SECTION_KEY);
  window.sessionStorage.removeItem(SESSION_TEMP_KEY);
  activeSection = "home";
  photoUploadMessage.textContent = "";
  renderApp();
}

function handleAnnouncementSubmit(sectionKey) {
  const refs = announcementRefs[sectionKey];
  if (!refs) {
    return;
  }

  if (!canPostAnnouncement(sectionKey)) {
    refs.message.textContent = "You do not have posting permission for this board.";
    return;
  }

  const content = refs.input.value.trim();
  if (!content) {
    refs.message.textContent = "Write something first.";
    return;
  }

  const post = {
    id: `announcement-${sectionKey}-${Date.now()}`,
    authorId: currentUser?.id || "",
    authorName: currentUser?.name || currentUser?.username || "Unknown",
    content,
    createdAt: new Date().toISOString()
  };

  announcements.posts[sectionKey] = [...getAnnouncementPosts(sectionKey), post];
  markAnnouncementGrantUsed(sectionKey, currentUser?.id);
  persistAnnouncements();
  refs.input.value = "";
  refs.message.textContent = "Announcement posted.";
  renderAnnouncements();
}

function handleAnnouncementGrant(sectionKey) {
  const refs = announcementRefs[sectionKey];
  if (!refs || !canGrantAnnouncementPost(sectionKey)) {
    return;
  }

  const userId = resolveGrantUserId(refs.grantUser.value);
  if (!userId) {
    refs.message.textContent = "Choose a user first.";
    return;
  }

  const grants = getAnnouncementGrants(sectionKey);
  const existingIndex = grants.findIndex((grant) => grant.userId === userId);
  if (existingIndex < 0 && hasReachedGrantLimit(grants)) {
    refs.message.textContent = "Ministry-level grantors can only keep 5 active grants at a time.";
    return;
  }
  const nextGrant = {
    userId,
    status: "unused",
    grantedAt: new Date().toISOString(),
    grantedBy: currentUser?.name || currentUser?.username || "Unknown"
  };

  if (existingIndex >= 0) {
    grants.splice(existingIndex, 1, nextGrant);
  } else {
    grants.push(nextGrant);
  }

  announcements.grants[sectionKey] = grants;
  persistAnnouncements();
  refs.message.textContent = "1 post permission granted.";
  renderAnnouncements();
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

  const section = photoSectionSelect.value;

  if (!canUploadPhotos(section)) {
    photoUploadMessage.textContent = "You do not have photo upload permission for this section.";
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
      section,
      date,
      caption: files.length > 1
        ? `${caption || "Sunday service highlight"} ${index + 1}`
        : (caption || "Sunday service highlight"),
      imageData: await readFileAsDataUrl(file),
      uploadedBy: currentUser?.name || currentUser?.username || "Unknown"
    })));
    photos = sortPhotos([...uploadedPhotos, ...photos]).slice(0, 120);
    homeCarouselResolved = false;
    markPhotoGrantUsed(section, currentUser?.id);
    persistPhotos();
    photoUploadForm.reset();
    photoUploadMessage.textContent = `${uploadedPhotos.length} ${photoSectionMeta[section].label} photo${uploadedPhotos.length > 1 ? "s" : ""} uploaded.`;
    renderPhotos();
  } catch (error) {
    console.error(error);
    photoUploadMessage.textContent = "One or more photos could not be saved. Try smaller images.";
  }
}

function handlePhotoGrant() {
  const section = photoGrantSection.value;
  const userId = resolveGrantUserId(photoGrantUser.value);

  if (!canGrantPhotoUpload(section)) {
    return;
  }

  if (!userId) {
    photoUploadMessage.textContent = "Choose a user first.";
    return;
  }

  const grants = getPhotoUploadGrants(section);
  const existingIndex = grants.findIndex((grant) => grant.userId === userId);
  if (existingIndex < 0 && hasReachedGrantLimit(grants)) {
    photoUploadMessage.textContent = "Ministry-level grantors can only keep 5 active grants at a time.";
    return;
  }
  const nextGrant = {
    userId,
    status: "unused",
    grantedAt: new Date().toISOString(),
    grantedBy: currentUser?.name || currentUser?.username || "Unknown"
  };

  if (existingIndex >= 0) {
    grants.splice(existingIndex, 1, nextGrant);
  } else {
    grants.push(nextGrant);
  }

  photoUploadGrants[section] = grants;
  persistPhotoUploadGrants();
  photoUploadMessage.textContent = `1 upload granted for ${photoSectionMeta[section].label}.`;
  renderPhotos();
}

async function handleFixedPhotoUpload(event) {
  event.preventDefault();

  if (!canManageFixedPhoto()) {
    fixedPhotoMessage.textContent = "Only Admin and Head Admin can change the fixed photo.";
    return;
  }

  const file = fixedPhotoFile.files?.[0];
  const section = fixedPhotoSectionSelect.value;
  if (!file) {
    fixedPhotoMessage.textContent = "Please choose an image for the fixed photo.";
    return;
  }

  try {
    const imageData = await readFileAsDataUrl(file);
    fixedPhotos[section] = {
      id: `fixed-${section}-photo`,
      section,
      date: fixedPhotoDate.value || fixedPhotos[section]?.date || normalizeDate(new Date().toISOString().slice(0, 10)),
      caption: fixedPhotoCaption.value.trim() || fixedPhotos[section]?.caption || `${photoSectionMeta[section].label} Highlights`,
      imageData,
      uploadedBy: currentUser?.name || currentUser?.username || "Unknown"
    };
    persistFixedPhotos();
    fixedPhotoForm.reset();
    fixedPhotoMessage.textContent = `${photoSectionMeta[section].label} fixed photo updated.`;
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

  if (activeSection === "admin" && !(adminMode && hasMinistryApprovalAccess())) {
    activeSection = "home";
  }

  if (currentUserName) {
    currentUserName.textContent = currentUser.name || currentUser.username;
  }
  if (currentUserRole) {
    const roleSummary = formatAccountSummary(currentUser) || roleLabels[currentUser.role] || "Member";
    currentUserRole.textContent = `${roleSummary}${adminMode ? " - Admin Mode" : " - View Mode"}`;
  }
  adminModeButton.classList.toggle("app-hidden", !canEnterAdminMode());
  adminModeButton.textContent = adminMode ? "Exit Admin" : "Admin";
  adminNavButton.classList.toggle("app-hidden", !(adminMode && hasMinistryApprovalAccess()));
  renderSections();
  renderSeatLayout();
  renderProfile();
  renderPhotos();
  renderOrganizer();
  renderAdmin();
}

function renderSections() {
  persistActiveSection();
  sectionIds.forEach((sectionId) => {
    const section = document.querySelector(`#section-${sectionId}`);
    section.classList.toggle("app-hidden", sectionId !== activeSection);
  });

  navButtons.forEach((button) => {
    button.classList.toggle("nav-btn-active", button.dataset.section === activeSection);
  });
}

function renderProfile() {
  if (!currentUser) {
    return;
  }

  const profile = currentUser.profile ?? {};
  const displayName = currentUser.name || currentUser.username || "Friend";
  profileWelcome.textContent = `Welcome ${displayName}!`;
  profileEditToggle.textContent = profileEditMode ? "Done Editing" : "Edit Profile";
  profileName.value = currentUser.name || "";
  profileBirthday.value = profile.birthday || "";
  profileContactNumber.value = profile.contactNumber || "+63";
  if (!profileContactNumber.value.startsWith("+63")) {
    profileContactNumber.value = `+63${profileContactNumber.value.replace(/\D/g, "").slice(0, 10)}`;
  }
  profileGender.value = profile.gender || "";
  profileOccupation.value = profile.occupation || "";
  profileCivilStatus.value = profile.civilStatus || "";
  profileDisplayName.textContent = currentUser.name || "-";
  profileDisplayBirthday.textContent = profile.birthday ? formatValue("date", profile.birthday) : "-";
  profileDisplayContactNumber.textContent = profile.contactNumber || "-";
  profileDisplayGender.textContent = profile.gender || "-";
  profileDisplayOccupation.textContent = profile.occupation || "-";
  profileDisplayCivilStatus.textContent = profile.civilStatus || "-";

  const photoSource = profile.photoData || "";
  profilePhotoPreview.classList.toggle("app-hidden", !photoSource);
  profilePhotoFallback.classList.toggle("app-hidden", Boolean(photoSource));
  if (photoSource) {
    profilePhotoPreview.src = photoSource;
  } else {
    profilePhotoPreview.removeAttribute("src");
  }

  renderProfileMinistries();
  renderProfileMinistryOptions();
  renderProfileMinistryRequests();
  renderProfileSearchResults();
  profileSummary.classList.toggle("app-hidden", profileEditMode);
  profileForm.classList.toggle("app-hidden", !profileEditMode);
  profilePhotoForm.classList.toggle("app-hidden", !profileEditMode);
  profileMinistryForm.classList.toggle("app-hidden", !profileEditMode);
  profilePasswordCard.classList.toggle("app-hidden", !profileEditMode);
  profileMinistryManager.classList.toggle("app-hidden", !(profileEditMode && (isCreator() || hasAdminAccess())));
}

function renderProfileMinistries() {
  const ministries = Array.isArray(currentUser?.ministries) ? currentUser.ministries : [];

  if (ministries.length === 0) {
    profileMinistriesList.innerHTML = `<span class="empty-state">No ministries added yet.</span>`;
    return;
  }

  profileMinistriesList.innerHTML = "";
  ministries.forEach((ministry) => {
    const roleLabel = getMinistryRoleLabel(currentUser, ministry);
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.innerHTML = `<span class="tag-label">${escapeHtml(ministry)}${roleLabel ? `<span class="tag-status">${escapeHtml(roleLabel)}</span>` : ""}</span>${profileEditMode ? `<button type="button" aria-label="Remove ${escapeHtml(ministry)}">&times;</button>` : ""}`;
    const removeButton = tag.querySelector("button");
    if (removeButton) {
      removeButton.addEventListener("click", () => removeProfileMinistry(ministry));
    }
    profileMinistriesList.appendChild(tag);
  });
}

function renderProfileMinistryRequests() {
  const requests = getPendingMinistryRequestsForUser(currentUser?.id);

  if (!requests.length) {
    profileMinistryRequests.innerHTML = `<div class="empty-card">No pending ministry requests.</div>`;
    return;
  }

  profileMinistryRequests.innerHTML = "";
  requests.forEach((request) => {
    const card = document.createElement("article");
    card.className = "person-schedule-card";
    card.innerHTML = `
      <div class="profile-request-head">
        <strong>${escapeHtml(request.ministry)}</strong>
        <button class="ghost-btn profile-request-remove" type="button" aria-label="Cancel ${escapeHtml(request.ministry)} request">&times;</button>
      </div>
      <div class="person-schedule-meta">${escapeHtml(registrationRoleLabels[request.role] ?? request.role)}</div>
      <div>Waiting for ministry head or assistant head approval.</div>
    `;
    card.querySelector(".profile-request-remove").addEventListener("click", () => removeMinistryRequest(request.id));
    profileMinistryRequests.appendChild(card);
  });
}

function renderProfileSearchResults() {
  profileSearchResults.innerHTML = "";

  if (!lastProfileSearchTerm) {
    profileSearchResults.innerHTML = `<div class="empty-card">Search for a member to view their public profile details.</div>`;
    return;
  }

  const matches = authState.users.filter((user) => {
    const haystack = `${user.name || ""} ${user.username || ""}`.toLowerCase();
    return haystack.includes(lastProfileSearchTerm.toLowerCase());
  });

  if (!matches.length) {
    profileSearchResults.innerHTML = `<div class="empty-card">No profiles found for "${escapeHtml(lastProfileSearchTerm)}".</div>`;
    return;
  }

  matches.forEach((user) => {
    const card = document.createElement("article");
    card.className = "person-schedule-card";
    card.innerHTML = `
      <strong>${escapeHtml(user.name || user.username)}</strong>
      <div class="person-schedule-meta">@${escapeHtml(user.username || "")}</div>
      <div>${escapeHtml((user.profile?.gender || "-"))}</div>
      <div>${escapeHtml(user.profile?.occupation || "No occupation yet")}</div>
      <div class="profile-search-ministries">${renderSearchProfileMinistries(user)}</div>
    `;
    profileSearchResults.appendChild(card);
  });

  profileSearchResults.querySelectorAll(".managed-ministry-save").forEach((button) => {
    button.addEventListener("click", () => {
      const userId = button.dataset.userId;
      const ministry = button.dataset.ministry;
      const select = profileSearchResults.querySelector(`.managed-ministry-select[data-user-id="${cssEscape(userId)}"][data-ministry="${cssEscape(ministry)}"]`);
      if (!select) {
        return;
      }
      updateUserMinistryRole(userId, ministry, select.value);
    });
  });

  profileSearchResults.querySelectorAll(".managed-ministry-remove").forEach((button) => {
    button.addEventListener("click", () => removeUserMinistry(button.dataset.userId, button.dataset.ministry));
  });
}

function renderSearchProfileMinistries(user) {
  const ministries = Array.isArray(user?.ministries) ? user.ministries : [];
  if (!ministries.length) {
    return `<div>No ministries yet</div>`;
  }

  return ministries.map((ministry) => {
    const roleValue = getMinistryRoleValue(user, ministry);
    const roleLabel = getMinistryRoleLabel(user, ministry);
    const canManage = canManageUserMinistry(user, ministry);
    const options = Object.entries(registrationRoleLabels)
      .filter(([value]) => requiresMinistry(value))
      .map(([value, label]) => `<option value="${value}" ${roleValue === value ? "selected" : ""}>${escapeHtml(label)}</option>`)
      .join("");

    return `
      <div class="managed-ministry-row">
        <span class="tag-label">${escapeHtml(ministry)}${roleLabel ? `<span class="tag-status">${escapeHtml(roleLabel)}</span>` : ""}</span>
        ${canManage ? `
          <div class="managed-ministry-actions">
            <select class="managed-ministry-select" data-user-id="${escapeHtml(user.id)}" data-ministry="${escapeHtml(ministry)}">
              ${options}
            </select>
            <button class="secondary-btn managed-ministry-save" type="button" data-user-id="${escapeHtml(user.id)}" data-ministry="${escapeHtml(ministry)}">Save</button>
            <button class="ghost-btn managed-ministry-remove" type="button" data-user-id="${escapeHtml(user.id)}" data-ministry="${escapeHtml(ministry)}">Remove</button>
          </div>
        ` : ""}
      </div>
    `;
  }).join("");
}

function renderProfileMinistryOptions() {
  const selected = profileMinistrySelect.value;
  const available = authState.ministries.filter((ministry) => !(currentUser?.ministries ?? []).includes(ministry));
  profileMinistrySelect.innerHTML = `<option value="">${available.length ? "Select ministry" : "No more ministries to add"}</option>${available.map((ministry) => `<option value="${escapeHtml(ministry)}">${escapeHtml(ministry)}</option>`).join("")}`;
  profileMinistrySelect.disabled = available.length === 0;
  profileMinistryForm.querySelector("button").disabled = available.length === 0;

  if (selected && available.includes(selected)) {
    profileMinistrySelect.value = selected;
  }
}

async function handleProfilePhotoSave(event) {
  event.preventDefault();

  if (!currentUser) {
    return;
  }

  const file = profilePhotoFile.files?.[0];
  if (!file) {
    profilePhotoMessage.textContent = "Choose a profile photo first.";
    return;
  }

  try {
    const photoData = await compressImageFile(file, {
      maxWidth: 360,
      maxHeight: 360,
      quality: 0.62
    });
    updateCurrentUser((user) => ({
      ...user,
      profile: {
        ...(user.profile ?? {}),
        photoData
      }
    }));
    profilePhotoForm.reset();
    profilePhotoMessage.textContent = "Profile picture updated.";
    renderApp();
  } catch (error) {
    console.error(error);
    profilePhotoMessage.textContent = "That profile photo could not be saved. Try a smaller image.";
  }
}

function handleProfileSave(event) {
  event.preventDefault();

  if (!currentUser) {
    return;
  }

  const name = profileName.value.trim();
  const birthday = profileBirthday.value;
  const contactNumber = profileContactNumber.value.trim();
  const gender = profileGender.value;
  const occupation = profileOccupation.value.trim();
  const civilStatus = profileCivilStatus.value;

  if (!name || !birthday || !contactNumber || !gender) {
    profileMessage.textContent = "Full name, birthday, contact number, and gender are required.";
    return;
  }

  if (!isValidPhilippineContactNumber(contactNumber)) {
    profileMessage.textContent = "Contact number must start with +63 and contain exactly 10 digits after it.";
    return;
  }

  const duplicateName = authState.users.some((user) => user.id !== currentUser.id && normalizeFullName(user.name) === normalizeFullName(name));
  if (duplicateName) {
    profileMessage.textContent = "That full name is already registered.";
    return;
  }

  const duplicateContact = authState.users.some((user) => user.id !== currentUser.id && normalizeContactNumber(user.profile?.contactNumber) === normalizeContactNumber(contactNumber));
  if (duplicateContact) {
    profileMessage.textContent = "That contact number is already registered.";
    return;
  }

  updateCurrentUser((user) => ({
    ...user,
    name,
    profile: {
      ...(user.profile ?? {}),
      birthday,
      contactNumber,
      gender,
      occupation,
      civilStatus
    }
  }));
  profileMessage.textContent = "Profile saved.";
  profileEditMode = false;
  renderApp();
}

function handleProfileMinistrySave(event) {
  event.preventDefault();

  if (!currentUser) {
    return;
  }

  const ministry = profileMinistrySelect.value;
  const role = profileMinistryRole.value;
  if (!ministry) {
    profileMessage.textContent = "Choose a ministry first.";
    return;
  }

  const duplicatePending = authState.ministryRequests.some((request) =>
    request.userId === currentUser.id
    && request.ministry === ministry
  );

  if ((currentUser.ministries ?? []).includes(ministry) || duplicatePending) {
    profileMessage.textContent = "That ministry is already added or waiting for approval.";
    return;
  }

  authState.ministryRequests = [
    ...(Array.isArray(authState.ministryRequests) ? authState.ministryRequests : []),
    {
      id: `ministry-request-${Date.now()}`,
      userId: currentUser.id,
      name: currentUser.name || currentUser.username,
      username: currentUser.username,
      ministry,
      role,
      requestedAt: new Date().toISOString()
    }
  ];
  persistAuth();
  profileMessage.textContent = "Ministry request sent for approval.";
  renderApp();
}

function handleProfileSearch(event) {
  event.preventDefault();
  lastProfileSearchTerm = profileSearchInput.value.trim();
  renderProfileSearchResults();
}

function handlePasswordChange(event) {
  event.preventDefault();

  if (!currentUser) {
    return;
  }

  const currentPassword = currentPasswordInput.value;
  const nextPassword = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!nextPassword || !confirmPassword) {
    passwordMessage.textContent = "Enter and confirm your new password.";
    return;
  }

  if (nextPassword !== confirmPassword) {
    passwordMessage.textContent = "New passwords do not match.";
    return;
  }

  if (!currentUser.isCreator) {
    if (currentUser.password !== currentPassword) {
      passwordMessage.textContent = "Current password is incorrect.";
      return;
    }

    if (!isValidPassword(nextPassword)) {
      passwordMessage.textContent = "Password must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 special character.";
      return;
    }
  }

  updateCurrentUser((user) => ({
    ...user,
    password: nextPassword
  }));
  changePasswordForm.reset();
  passwordMessage.textContent = currentUser.isCreator
    ? "Creator account password updated. Login still works without requiring it."
    : "Password changed.";
  renderApp();
}

function handleCreateMinistry(event) {
  event.preventDefault();

  if (!(isCreator() || hasAdminAccess())) {
    return;
  }

  const ministry = createMinistryInput.value.trim();
  if (!ministry) {
    createMinistryMessage.textContent = "Enter a ministry name first.";
    return;
  }

  const exists = authState.ministries.some((entry) => entry.toLowerCase() === ministry.toLowerCase());
  if (exists) {
    createMinistryMessage.textContent = "That ministry already exists.";
    return;
  }

  authState.ministries = sortEntries([...(authState.ministries ?? []), ministry]);
  persistAuth();
  createMinistryForm.reset();
  createMinistryMessage.textContent = "Ministry added.";
  renderApp();
}

function removeProfileMinistry(ministry) {
  if (!currentUser) {
    return;
  }

  updateCurrentUser((user) => ({
    ...user,
    ministries: (Array.isArray(user.ministries) ? user.ministries : []).filter((entry) => entry !== ministry),
    titles: (Array.isArray(user.titles) ? user.titles : []).filter((title) => !(title.scope === "ministry" && title.ministry === ministry))
  }));
  renderApp();
}

function updateUserMinistryRole(userId, ministry, role) {
  const target = authState.users.find((user) => user.id === userId);
  if (!target || !canManageUserMinistry(target, ministry) || !requiresMinistry(role)) {
    return;
  }

  authState.users = authState.users.map((user) => {
    if (user.id !== userId) {
      return user;
    }

    return normalizeUserAccount({
      ...user,
      titles: upsertMinistryTitle(user, ministry, role)
    });
  });
  currentUser = authState.users.find((user) => user.id === currentUser?.id) ?? currentUser;
  persistAuth();
  renderApp();
}

function removeUserMinistry(userId, ministry) {
  const target = authState.users.find((user) => user.id === userId);
  if (!target || !canManageUserMinistry(target, ministry)) {
    return;
  }

  authState.users = authState.users.map((user) => {
    if (user.id !== userId) {
      return user;
    }

    return normalizeUserAccount({
      ...user,
      ministries: (Array.isArray(user.ministries) ? user.ministries : []).filter((entry) => entry !== ministry),
      titles: (Array.isArray(user.titles) ? user.titles : []).filter((title) => !(title.scope === "ministry" && title.ministry === ministry))
    });
  });
  currentUser = authState.users.find((user) => user.id === currentUser?.id) ?? currentUser;
  persistAuth();
  renderApp();
}

function toggleProfileEditMode() {
  profileEditMode = !profileEditMode;
  profileMessage.textContent = "";
  passwordMessage.textContent = "";
  profilePhotoMessage.textContent = "";
  renderProfile();
}

function renderPhotos() {
  renderAllCarousels();
  startCarouselAutoplay();
  renderPhotoList(photoGallery, getDisplayPhotos(), "No photos uploaded yet.");
  renderAnnouncements();

  const selectedPhotoSection = photoSectionSelect.value || "sunday";
  const canUpload = canUploadPhotos(selectedPhotoSection);
  photoUploadButton.disabled = !canUpload;
  photoSectionSelect.disabled = false;
  photoDate.disabled = !canUpload;
  photoCaption.disabled = !canUpload;
  photoFile.disabled = !canUpload;
  photoGrantPanel.classList.toggle("app-hidden", !canModeratePhotoUploads());
  photoGrantSection.disabled = !canModeratePhotoUploads();
  photoGrantUser.disabled = !canModeratePhotoUploads();
  photoGrantButton.disabled = !canGrantPhotoUpload(photoGrantSection.value || "sunday");
  populatePhotoGrantUsers();
  renderPhotoGrantList();
  const photoStatusNote = getPhotoUploadStatusNote(selectedPhotoSection);
  photoUploadStatus.textContent = photoStatusNote;
  photoUploadStatus.classList.toggle("app-hidden", !photoStatusNote);
  const canChangeFixedPhoto = canManageFixedPhoto();
  fixedPhotoForm.classList.toggle("app-hidden", !canChangeFixedPhoto);
  fixedPhotoMessage.classList.toggle("app-hidden", !canChangeFixedPhoto);
  fixedPhotoButton.disabled = !canChangeFixedPhoto;
  fixedPhotoSectionSelect.disabled = !canChangeFixedPhoto;
  fixedPhotoDate.disabled = !canChangeFixedPhoto;
  fixedPhotoCaption.disabled = !canChangeFixedPhoto;
  fixedPhotoFile.disabled = !canChangeFixedPhoto;

  if (!canUpload) {
    photoUploadMessage.textContent = "You do not have photo upload permission for this section.";
  } else if (photoUploadMessage.textContent === "You do not have photo upload permission for this section.") {
    photoUploadMessage.textContent = "";
  }

  if (canChangeFixedPhoto && fixedPhotoMessage.textContent === "Only Admin and Head Admin can change the fixed photo.") {
    fixedPhotoMessage.textContent = "";
  }
}

function renderAllCarousels() {
  Object.keys(photoSectionMeta).forEach((sectionKey) => renderCarousel(sectionKey));
  homeCarouselResolved = true;
}

function renderCarousel(sectionKey) {
  const refs = carouselRefs[sectionKey];
  const carouselPhotos = getCarouselPhotos(sectionKey).slice(0, 8);
  refs.dots.innerHTML = "";

  if (carouselPhotos.length === 0) {
    carouselIndexes[sectionKey] = 0;
    refs.slide.innerHTML = `<div class="carousel-empty">No ${photoSectionMeta[sectionKey].label} photos uploaded yet.</div>`;
    refs.prev.disabled = true;
    refs.next.disabled = true;
    return;
  }

  if (carouselIndexes[sectionKey] >= carouselPhotos.length) {
    carouselIndexes[sectionKey] = 0;
  }

  const photo = carouselPhotos[carouselIndexes[sectionKey]];
  const source = getPhotoSource(photo);
  const existingImages = [...refs.slide.querySelectorAll(".carousel-photo")];
  const currentImage = existingImages.at(-1) ?? null;

  if (currentImage && currentImage.getAttribute("src") === source) {
    currentImage.classList.add("is-active");
    existingImages.slice(0, -1).forEach((image) => image.remove());
  } else {
    const nextImage = document.createElement("img");
    nextImage.className = "carousel-photo";
    nextImage.alt = photo.caption || `${photoSectionMeta[sectionKey].label} photo`;
    nextImage.src = source;
    nextImage.addEventListener("error", () => {
      skipBrokenCarouselPhoto(sectionKey);
    }, { once: true });
    refs.slide.appendChild(nextImage);

    window.requestAnimationFrame(() => {
      nextImage.classList.add("is-active");
      if (currentImage) {
        currentImage.classList.remove("is-active");
        currentImage.classList.add("is-exit");
        window.setTimeout(() => {
          if (currentImage.parentElement) {
            currentImage.remove();
          }
        }, 1500);
      }
    });
  }

  carouselPhotos.forEach((entry, index) => {
    const dot = document.createElement("button");
    dot.className = `carousel-dot${index === carouselIndexes[sectionKey] ? " carousel-dot-active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.addEventListener("click", () => {
      carouselIndexes[sectionKey] = index;
      renderCarousel(sectionKey);
      startCarouselAutoplay();
    });
    refs.dots.appendChild(dot);
  });

  refs.prev.disabled = carouselPhotos.length <= 1;
  refs.next.disabled = carouselPhotos.length <= 1;
}

function moveCarousel(sectionKey, direction) {
  const carouselPhotos = getCarouselPhotos(sectionKey).slice(0, 8);
  if (carouselPhotos.length <= 1) {
    return;
  }

  carouselIndexes[sectionKey] = (carouselIndexes[sectionKey] + direction + carouselPhotos.length) % carouselPhotos.length;
  renderCarousel(sectionKey);
  startCarouselAutoplay();
}

function skipBrokenCarouselPhoto(sectionKey) {
  const carouselPhotos = getCarouselPhotos(sectionKey).slice(0, 8);
  const refs = carouselRefs[sectionKey];
  if (carouselPhotos.length <= 1) {
    refs.slide.innerHTML = `<div class="carousel-empty">This photo could not be loaded.</div>`;
    return;
  }

  carouselIndexes[sectionKey] = (carouselIndexes[sectionKey] + 1) % carouselPhotos.length;
  renderCarousel(sectionKey);
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
        <span>${escapeHtml(photoSectionMeta[photo.section ?? "sunday"]?.label ?? "Sunday Service")}</span>
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
  if (!(adminMode && hasMinistryApprovalAccess())) {
    pendingApprovals.innerHTML = `<div class="empty-card">Admin access required.</div>`;
    approvedAccounts.innerHTML = `<div class="empty-card">Admin access required.</div>`;
    ministryApprovals.innerHTML = `<div class="empty-card">Admin or ministry leadership access required.</div>`;
    return;
  }

  const fullAdmin = hasAdminAccess();
  pendingApprovals.innerHTML = "";
  approvedAccounts.innerHTML = "";

  if (!fullAdmin) {
    pendingApprovals.innerHTML = `<div class="empty-card">Full admin access is needed for account approvals.</div>`;
    approvedAccounts.innerHTML = `<div class="empty-card">Full admin access is needed for role management.</div>`;
  } else if (authState.pending.length === 0) {
    pendingApprovals.innerHTML = `<div class="empty-card">No pending requests right now.</div>`;
  } else {
    authState.pending.forEach((account) => {
      const item = document.createElement("article");
      item.className = "admin-item";
      item.innerHTML = `
        <div class="admin-item-head">
          <div>
            <strong>${escapeHtml(account.name)}</strong>
            <p>@${escapeHtml(account.username)} requested ${escapeHtml(getRequestedAccessLabel(account))}</p>
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

  if (fullAdmin) {
    authState.users
      .filter((account) => canViewManagedAccount(account))
      .forEach((account) => {
      const lockedPrivilegedAccount = isPrivilegedRole(account.role) && !isCreator();
      const allowedRoles = getAssignableAccountRoles(account);
      const item = document.createElement("article");
      item.className = "admin-item";
      item.innerHTML = `
        <div class="admin-item-head">
          <div>
            <strong>${escapeHtml(account.name)}</strong>
            <p>@${escapeHtml(account.username)}${formatAccountSummary(account) ? ` • ${escapeHtml(formatAccountSummary(account))}` : ""}</p>
          </div>
          <span class="status-pill">${escapeHtml(roleLabels[account.role] ?? "Member")}</span>
        </div>
        <div class="admin-actions">
          ${lockedPrivilegedAccount
            ? `<div class="role-note">Protected role</div>`
            : `
              <select class="role-select role-select-compact" aria-label="Change role for ${escapeHtml(account.name)}">
                ${allowedRoles.map(([value, label]) => `<option value="${value}" ${account.role === value ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}
              </select>
            `}
          <button class="ghost-btn reset-password-btn" type="button">Reset Password</button>
          <button class="ghost-btn remove-account-btn" type="button">Remove</button>
        </div>
      `;

      const roleSelect = item.querySelector(".role-select");
      if (roleSelect) {
        roleSelect.addEventListener("change", () => updateAccountRole(account.id, roleSelect.value));
      }

      const resetPasswordButton = item.querySelector(".reset-password-btn");
      if (account.isCreator && !isCreator()) {
        resetPasswordButton.disabled = true;
      } else {
        resetPasswordButton.addEventListener("click", () => resetManagedAccountPassword(account.id));
      }

      const removeButton = item.querySelector(".remove-account-btn");
      if (account.id === currentUser.id || (isPrivilegedRole(account.role) && !isCreator())) {
        removeButton.disabled = true;
      } else {
        removeButton.addEventListener("click", () => removeAccount(account.id));
      }

      approvedAccounts.appendChild(item);
      });
  }

  renderMinistryApprovals();
}

function renderMinistryApprovals() {
  ministryApprovals.innerHTML = "";
  const requests = getActionableMinistryRequests();

  if (!requests.length) {
    ministryApprovals.innerHTML = `<div class="empty-card">No ministry requests waiting for you.</div>`;
    return;
  }

  requests.forEach((request) => {
    const item = document.createElement("article");
    item.className = "admin-item";
    item.innerHTML = `
      <div class="admin-item-head">
        <div>
          <strong>${escapeHtml(request.name)}</strong>
          <p>@${escapeHtml(request.username)} requested ${escapeHtml(registrationRoleLabels[request.role] ?? request.role)} - ${escapeHtml(request.ministry)}</p>
        </div>
        <span class="status-pill">Pending</span>
      </div>
      <div class="admin-actions">
        <button class="primary-btn approve-btn" type="button">Approve</button>
        <button class="ghost-btn reject-btn" type="button">Reject</button>
      </div>
    `;
    item.querySelector(".approve-btn").addEventListener("click", () => approveMinistryRequest(request.id));
    item.querySelector(".reject-btn").addEventListener("click", () => rejectMinistryRequest(request.id));
    ministryApprovals.appendChild(item);
  });
}

function approveMinistryRequest(requestId) {
  const request = (authState.ministryRequests ?? []).find((entry) => entry.id === requestId);
  if (!request || !canApproveMinistryRequest(request)) {
    return;
  }

  authState.users = authState.users.map((user) => {
    if (user.id !== request.userId) {
      return user;
    }

    return normalizeUserAccount({
      ...user,
      ministries: sortEntries([...(Array.isArray(user.ministries) ? user.ministries : []), request.ministry]),
      titles: upsertMinistryTitle(user, request.ministry, request.role)
    });
  });
  authState.ministryRequests = (authState.ministryRequests ?? []).filter((entry) => entry.id !== requestId);
  currentUser = authState.users.find((user) => user.id === currentUser?.id) ?? currentUser;
  persistAuth();
  renderApp();
}

function rejectMinistryRequest(requestId) {
  const request = (authState.ministryRequests ?? []).find((entry) => entry.id === requestId);
  if (!request || !canApproveMinistryRequest(request)) {
    return;
  }

  authState.ministryRequests = (authState.ministryRequests ?? []).filter((entry) => entry.id !== requestId);
  persistAuth();
  renderApp();
}

function removeMinistryRequest(requestId) {
  if (!currentUser) {
    return;
  }

  authState.ministryRequests = (authState.ministryRequests ?? []).filter((request) => !(request.id === requestId && request.userId === currentUser.id));
  persistAuth();
  renderApp();
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
    usernames: [match.username],
    password: match.password,
    role: match.role ?? "member",
    titles: Array.isArray(match.titles) ? match.titles : buildInitialTitles(match.requestedRole, match.requestedMinistry),
    ministries: Array.isArray(match.ministries) ? match.ministries : (match.requestedMinistry ? [match.requestedMinistry] : []),
    profile: match.profile ?? {}
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

  if (!canAssignAccountRole(target, role)) {
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

function resetManagedAccountPassword(accountId) {
  const target = authState.users.find((account) => account.id === accountId);
  if (!target || !canViewManagedAccount(target)) {
    return;
  }

  if (target.isCreator && !isCreator()) {
    return;
  }

  const nextPasswordInput = window.prompt(`Set a new password for ${target.name || target.username}.`);
  if (nextPasswordInput === null) {
    return;
  }

  const nextPassword = nextPasswordInput.trim();
  if (!nextPassword) {
    window.alert("Password reset cancelled. A blank password is not allowed here.");
    return;
  }

  if (!isValidPassword(nextPassword)) {
    window.alert("Password must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 special character.");
    return;
  }

  authState.users = authState.users.map((account) => account.id === accountId
    ? normalizeUserAccount({
      ...account,
      password: nextPassword
    })
    : account);

  persistAuth();
  window.alert(`Password reset saved for ${target.name || target.username}.`);
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
      ? parsed.users.map(normalizeUserAccount)
      : structuredClone(defaultAuth.users);
    return {
      users: ensureSeedAccounts(users),
      pending: Array.isArray(parsed.pending) ? parsed.pending : [],
      ministryRequests: Array.isArray(parsed.ministryRequests) ? parsed.ministryRequests : [],
      ministries: Array.isArray(parsed.ministries) && parsed.ministries.length > 0 ? sortEntries(parsed.ministries) : [...defaultMinistries]
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
    return sortPhotos(parsed
      .filter((photo) => !photo.imagePath || !photo.imagePath.startsWith("sample-photos/"))
      .map((photo) => ({ section: photo.section ?? "sunday", ...photo })));
  } catch (error) {
    console.warn("Could not parse Sunday photos.", error);
    return [];
  }
}

function loadFixedPhotos() {
  const saved = window.localStorage.getItem(FIXED_PHOTO_KEY);
  const fallback = { sunday: { ...fixedHomePhoto }, adonai: null, hamakom: null, agape: null };
  if (!saved) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(saved);
    if (parsed && !Array.isArray(parsed) && (parsed.sunday || parsed.adonai || parsed.hamakom || parsed.agape)) {
      return {
        sunday: parsed.sunday ? { section: "sunday", ...parsed.sunday } : { ...fixedHomePhoto },
        adonai: parsed.adonai ? { section: "adonai", ...parsed.adonai } : null,
        hamakom: parsed.hamakom ? { section: "hamakom", ...parsed.hamakom } : null,
        agape: parsed.agape ? { section: "agape", ...parsed.agape } : null
      };
    }

    return { ...fallback, sunday: { section: "sunday", ...fixedHomePhoto, ...parsed } };
  } catch (error) {
    console.warn("Could not parse fixed home photo.", error);
    return fallback;
  }
}

function loadPhotoUploadGrants() {
  const saved = window.localStorage.getItem(PHOTO_GRANTS_KEY);
  const fallback = { sunday: [], adonai: [], hamakom: [], agape: [] };
  if (!saved) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      sunday: Array.isArray(parsed.sunday) ? parsed.sunday : [],
      adonai: Array.isArray(parsed.adonai) ? parsed.adonai : [],
      hamakom: Array.isArray(parsed.hamakom) ? parsed.hamakom : [],
      agape: Array.isArray(parsed.agape) ? parsed.agape : []
    };
  } catch (error) {
    return fallback;
  }
}

function loadAnnouncements() {
  const saved = window.localStorage.getItem(ANNOUNCEMENTS_KEY);
  const fallback = { posts: { home: [], adonai: [], hamakom: [], agape: [] }, grants: { home: [], adonai: [], hamakom: [], agape: [] } };

  if (!saved) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(saved);
    if (typeof parsed === "string") {
      return {
        ...fallback,
        posts: {
          ...fallback.posts,
          home: parsed ? [buildLegacyAnnouncementPost(parsed)] : []
        }
      };
    }

    if (parsed.posts || parsed.grants) {
      return {
        posts: {
          home: Array.isArray(parsed.posts?.home) ? parsed.posts.home : [],
          adonai: Array.isArray(parsed.posts?.adonai) ? parsed.posts.adonai : [],
          hamakom: Array.isArray(parsed.posts?.hamakom) ? parsed.posts.hamakom : [],
          agape: Array.isArray(parsed.posts?.agape) ? parsed.posts.agape : []
        },
        grants: {
          home: Array.isArray(parsed.grants?.home) ? parsed.grants.home : [],
          adonai: Array.isArray(parsed.grants?.adonai) ? parsed.grants.adonai : [],
          hamakom: Array.isArray(parsed.grants?.hamakom) ? parsed.grants.hamakom : [],
          agape: Array.isArray(parsed.grants?.agape) ? parsed.grants.agape : []
        }
      };
    }

    return {
      ...fallback,
      posts: {
        home: parsed.home ? [buildLegacyAnnouncementPost(parsed.home)] : [],
        adonai: parsed.adonai ? [buildLegacyAnnouncementPost(parsed.adonai)] : [],
        hamakom: parsed.hamakom ? [buildLegacyAnnouncementPost(parsed.hamakom)] : [],
        agape: parsed.agape ? [buildLegacyAnnouncementPost(parsed.agape)] : []
      }
    };
  } catch (error) {
    return fallback;
  }
}

function loadSeatLayoutState() {
  const saved = window.localStorage.getItem(SEAT_LAYOUT_KEY);
  if (!saved) {
    return {};
  }

  try {
    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function restoreSession() {
  const sessionId = window.localStorage.getItem(SESSION_KEY) || window.sessionStorage.getItem(SESSION_TEMP_KEY);
  if (!sessionId) {
    return null;
  }
  return authState.users.find((user) => user.id === sessionId) ?? null;
}

function restoreActiveSection() {
  const saved = window.localStorage.getItem(ACTIVE_SECTION_KEY);
  return sectionIds.includes(saved) ? saved : "home";
}

function normalizeContactNumber(value) {
  const raw = String(value ?? "").trim();
  if (raw.startsWith("+63")) {
    return `+63${raw.slice(3).replace(/\D/g, "")}`;
  }
  return raw.replace(/\D/g, "");
}

function normalizeFullName(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}

function formatGrantUserOption(user) {
  return `${user.name || user.username} (@${user.username || ""})`;
}

function resolveGrantUserId(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "";
  }

  const match = authState.users.find((user) => formatGrantUserOption(user).toLowerCase() === normalized);
  return match?.id || "";
}

function isValidPhilippineContactNumber(value) {
  return /^\+63\d{10}$/.test(String(value ?? "").trim());
}

function normalizeUserAccount(user) {
  const usernames = Array.isArray(user.usernames) && user.usernames.length > 0
    ? user.usernames
    : [user.username].filter(Boolean);
  const normalized = {
    ...user,
    username: user.username || usernames[0] || "",
    usernames,
    role: user.id === "admin-seed" && user.role !== "member" ? "headAdmin" : (user.role || "member"),
    isCreator: Boolean(user.isCreator || user.id === "admin-seed"),
    titles: Array.isArray(user.titles) && user.titles.length > 0 ? user.titles : inferTitlesFromLegacyUser(user),
    ministries: Array.isArray(user.ministries) ? user.ministries : [],
    profile: user.profile ?? {}
  };

  if (normalized.isCreator) {
    normalized.usernames = [...new Set([...normalized.usernames, "mediewardie", "toGodbetheglory"])];
    normalized.username = normalized.usernames[0];
  }

  return normalized;
}

function ensureSeedAccounts(users) {
  const normalizedUsers = Array.isArray(users) ? users.map(normalizeUserAccount) : [];
  const seenUsernames = new Set(normalizedUsers.flatMap((user) => getUsernames(user)));
  const missingSeeds = defaultAuth.users
    .map((user) => normalizeUserAccount(user))
    .filter((seed) => getUsernames(seed).every((username) => !seenUsernames.has(username)));

  return [...normalizedUsers, ...missingSeeds];
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
  const targetPhoto = photos.find((photo) => photo.id === photoId);
  if (!targetPhoto || !canUploadPhotos(targetPhoto.section ?? "sunday")) {
    return;
  }

  photos = photos.filter((photo) => photo.id !== photoId);
  homeCarouselResolved = false;
  persistPhotos();
  renderPhotos();
}

function persistFixedPhotos() {
  window.localStorage.setItem(FIXED_PHOTO_KEY, JSON.stringify(fixedPhotos));
}

function persistPhotoUploadGrants() {
  window.localStorage.setItem(PHOTO_GRANTS_KEY, JSON.stringify(photoUploadGrants));
}

function getPhotoSource(photo) {
  return photo.imageData || photo.imagePath || "";
}

function getDisplayPhotos() {
  return [...samplePhotos, ...photos].filter((photo) => Boolean(getPhotoSource(photo)));
}

function getSectionPhotos(sectionKey) {
  return getDisplayPhotos().filter((photo) => (photo.section ?? "sunday") === sectionKey);
}

function getCarouselPhotos(sectionKey) {
  const fixed = fixedPhotos[sectionKey];
  const sectionPhotos = getSectionPhotos(sectionKey).filter((photo) => photo.id !== fixed?.id);
  return fixed ? [fixed, ...sectionPhotos] : sectionPhotos;
}

function canManageUploadedPhoto(photo) {
  return canUploadPhotos(photo.section ?? "sunday") && !photo.imagePath;
}

function startCarouselAutoplay() {
  stopCarouselAutoplay();

  const currentCarouselSection = getCarouselSectionForPage(activeSection);
  if (!currentCarouselSection || carouselScrollPauseTimer) {
    return;
  }

  const carouselPhotos = getCarouselPhotos(currentCarouselSection).slice(0, 8);
  if (carouselPhotos.length <= 1 || !homeCarouselResolved) {
    return;
  }

  homeCarouselTimer = window.setInterval(() => {
    carouselIndexes[currentCarouselSection] = (carouselIndexes[currentCarouselSection] + 1) % carouselPhotos.length;
    renderCarousel(currentCarouselSection);
  }, 3000);
}

function stopCarouselAutoplay() {
  if (homeCarouselTimer) {
    window.clearInterval(homeCarouselTimer);
    homeCarouselTimer = null;
  }
}

function getCarouselSectionForPage(pageSection) {
  return Object.entries(photoSectionMeta).find(([, meta]) => meta.pageSection === pageSection)?.[0] ?? "";
}


function persistAnnouncements() {
  window.localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
}

function persistSeatLayoutState() {
  window.localStorage.setItem(SEAT_LAYOUT_KEY, JSON.stringify(seatLayoutState));
}

function persistActiveSection() {
  if (sectionIds.includes(activeSection)) {
    window.localStorage.setItem(ACTIVE_SECTION_KEY, activeSection);
  }
}

function renderAnnouncements() {
  Object.entries(announcementRefs).forEach(([sectionKey, refs]) => {
    const posts = getAnnouncementPosts(sectionKey);
    const canPost = canPostAnnouncement(sectionKey);
    const statusNote = getAnnouncementStatusNote(sectionKey);
    refs.posts.innerHTML = `
      ${statusNote ? `<div class="announcement-status-note">${escapeHtml(statusNote)}</div>` : ""}
      ${posts.length
      ? posts.map((post) => `
        <article class="announcement-post-card">
          <div class="announcement-post-head">
            <span class="announcement-post-label">Official Announcement</span>
            <span class="announcement-post-date">${escapeHtml(formatValue("date", (post.createdAt || "").slice(0, 10) || ""))}</span>
          </div>
          <strong class="announcement-post-author">${escapeHtml(post.authorName || "Unknown")}</strong>
          <div class="announcement-post-body">${escapeHtml(post.content || "").replace(/\n/g, "<br>")}</div>
          ${canDeleteAnnouncement(sectionKey, post) ? `
            <div class="announcement-post-actions">
              <button class="ghost-btn announcement-delete-btn" type="button" data-section="${sectionKey}" data-post-id="${escapeHtml(post.id)}">Remove Announcement</button>
            </div>
          ` : ""}
        </article>
      `).join("")
      : `<div class="empty-card">No announcements yet.</div>`}
    `;

    refs.input.disabled = !canPost;
    refs.submit.disabled = !canPost;
    refs.input.classList.toggle("app-hidden", !canPost);
    refs.submit.classList.toggle("app-hidden", !canPost);
    refs.message.classList.toggle("app-hidden", !canPost);
    refs.input.placeholder = canPost
      ? `Write a post for ${announcementBoardMeta[sectionKey].label}`
      : "View only";
    refs.grantPanel.classList.toggle("app-hidden", !canGrantAnnouncementPost(sectionKey));
    populateAnnouncementGrantUsers(sectionKey);
    renderAnnouncementGrantList(sectionKey);
    refs.posts.querySelectorAll(".announcement-delete-btn").forEach((button) => {
      button.addEventListener("click", () => removeAnnouncementPost(button.dataset.section, button.dataset.postId));
    });
  });
}

function populateAnnouncementGrantUsers(sectionKey) {
  const refs = announcementRefs[sectionKey];
  const candidates = getAnnouncementGrantCandidates(sectionKey);
  refs.grantUser.value = "";
  refs.grantUserList.innerHTML = candidates.map((user) => `<option value="${escapeHtml(formatGrantUserOption(user))}"></option>`).join("");
}

function renderAnnouncementGrantList(sectionKey) {
  const refs = announcementRefs[sectionKey];
  const grants = getAnnouncementGrants(sectionKey);

  refs.grants.innerHTML = grants.length
    ? grants.map((grant) => {
      const user = authState.users.find((entry) => entry.id === grant.userId);
      return `
        <article class="admin-item">
          <div class="admin-item-head">
            <div>
              <strong>${escapeHtml(user?.name || grant.userId)}</strong>
              <p>${escapeHtml(grant.grantedBy || "Unknown")} granted this</p>
            </div>
            <span class="status-pill">${escapeHtml(grant.status === "used" ? "Used" : "Unused")}</span>
          </div>
          <div class="admin-actions">
            <button class="ghost-btn grant-reset-btn" type="button" data-section="${sectionKey}" data-user-id="${escapeHtml(grant.userId)}">Reset</button>
            <button class="ghost-btn grant-revoke-btn" type="button" data-section="${sectionKey}" data-user-id="${escapeHtml(grant.userId)}">Revoke</button>
          </div>
        </article>
      `;
    }).join("")
    : `<div class="empty-card">No one-post permissions granted yet.</div>`;

  refs.grants.querySelectorAll(".grant-reset-btn").forEach((button) => {
    button.addEventListener("click", () => resetAnnouncementGrant(button.dataset.section, button.dataset.userId));
  });
  refs.grants.querySelectorAll(".grant-revoke-btn").forEach((button) => {
    button.addEventListener("click", () => revokeAnnouncementGrant(button.dataset.section, button.dataset.userId));
  });
}

function getAnnouncementPosts(sectionKey) {
  return Array.isArray(announcements.posts?.[sectionKey]) ? announcements.posts[sectionKey] : [];
}

function getAnnouncementGrants(sectionKey) {
  return Array.isArray(announcements.grants?.[sectionKey]) ? [...announcements.grants[sectionKey]] : [];
}

function buildLegacyAnnouncementPost(content) {
  return {
    id: `legacy-announcement-${Date.now()}`,
    authorId: "",
    authorName: "System",
    content,
    createdAt: new Date().toISOString()
  };
}

function canPostAnnouncement(sectionKey) {
  if (!currentUser) {
    return false;
  }

  if (canModerateAnnouncementBoard(sectionKey)) {
    return true;
  }

  const grant = getAnnouncementGrants(sectionKey).find((entry) => entry.userId === currentUser.id && entry.status === "unused");
  return Boolean(grant);
}

function getAnnouncementStatusNote(sectionKey) {
  if (!currentUser) {
    return "";
  }

  if (canModerateAnnouncementBoard(sectionKey)) {
    return `You can post and manage announcements for ${announcementBoardMeta[sectionKey].label}.`;
  }

  const grant = getAnnouncementGrants(sectionKey).find((entry) => entry.userId === currentUser.id);
  return grant?.status === "unused" ? "You have 1 unused post permission on this board." : "";
}

function canDeleteAnnouncement(sectionKey, post) {
  if (!currentUser) {
    return false;
  }

  return canModerateAnnouncementBoard(sectionKey)
    || (post.authorId === currentUser.id && canPostAnnouncement(sectionKey));
}

function removeAnnouncementPost(sectionKey, postId) {
  const post = getAnnouncementPosts(sectionKey).find((entry) => entry.id === postId);
  if (!post || !canDeleteAnnouncement(sectionKey, post)) {
    return;
  }

  announcements.posts[sectionKey] = getAnnouncementPosts(sectionKey).filter((entry) => entry.id !== postId);
  persistAnnouncements();
  renderAnnouncements();
}

function hasAnyAnnouncementPostingAccess() {
  return Object.keys(announcementBoardMeta).some((sectionKey) => canPostAnnouncement(sectionKey));
}

function canGrantAnnouncementPost(sectionKey) {
  return adminMode && canModerateAnnouncementBoard(sectionKey);
}

function canModerateAnnouncementBoard(sectionKey) {
  if (!currentUser) {
    return false;
  }

  if (!(adminMode || isCreator() || ["headAdmin", "admin"].includes(currentUser.role))) {
    return false;
  }

  if (isCreator() || ["headAdmin", "admin"].includes(currentUser.role)) {
    return true;
  }

  if (hasMinistryLeadership(currentUser, "Emcee")) {
    return true;
  }

  const ministry = announcementBoardMeta[sectionKey]?.ministry;
  return hasMinistryLeadership(currentUser, ministry);
}

function markAnnouncementGrantUsed(sectionKey, userId) {
  if (!userId) {
    return;
  }

  announcements.grants[sectionKey] = getAnnouncementGrants(sectionKey).map((grant) =>
    grant.userId === userId ? { ...grant, status: "used", usedAt: new Date().toISOString() } : grant
  );
}

function resetAnnouncementGrant(sectionKey, userId) {
  if (!canGrantAnnouncementPost(sectionKey)) {
    return;
  }

  announcements.grants[sectionKey] = getAnnouncementGrants(sectionKey).map((grant) =>
    grant.userId === userId ? { ...grant, status: "unused", usedAt: "" } : grant
  );
  persistAnnouncements();
  renderAnnouncements();
}

function revokeAnnouncementGrant(sectionKey, userId) {
  if (!canGrantAnnouncementPost(sectionKey)) {
    return;
  }

  announcements.grants[sectionKey] = getAnnouncementGrants(sectionKey).filter((grant) => grant.userId !== userId);
  persistAnnouncements();
  renderAnnouncements();
}

function hasReachedGrantLimit(grants) {
  if (isCreator() || ["headAdmin", "admin"].includes(currentUser?.role)) {
    return false;
  }

  return grants.filter((grant) => grant.status === "unused").length >= 5;
}

function getPhotoUploadGrants(sectionKey) {
  return Array.isArray(photoUploadGrants?.[sectionKey]) ? [...photoUploadGrants[sectionKey]] : [];
}

function markPhotoGrantUsed(sectionKey, userId) {
  if (!userId) {
    return;
  }

  photoUploadGrants[sectionKey] = getPhotoUploadGrants(sectionKey).map((grant) =>
    grant.userId === userId ? { ...grant, status: "used", usedAt: new Date().toISOString() } : grant
  );
  persistPhotoUploadGrants();
}

function populatePhotoGrantUsers() {
  const candidates = getPhotoGrantCandidates();
  photoGrantUser.value = "";
  photoGrantUserList.innerHTML = candidates.map((user) => `<option value="${escapeHtml(formatGrantUserOption(user))}"></option>`).join("");
}

function renderPhotoGrantList() {
  const section = photoGrantSection.value || "sunday";
  const grants = getPhotoUploadGrants(section);

  photoGrants.innerHTML = grants.length
    ? grants.map((grant) => {
      const user = authState.users.find((entry) => entry.id === grant.userId);
      return `
        <article class="admin-item">
          <div class="admin-item-head">
            <div>
              <strong>${escapeHtml(user?.name || grant.userId)}</strong>
              <p>${escapeHtml(grant.grantedBy || "Unknown")} granted this</p>
            </div>
            <span class="status-pill">${escapeHtml(grant.status === "used" ? "Used" : "Unused")}</span>
          </div>
          <div class="admin-actions">
            <button class="ghost-btn photo-grant-reset-btn" type="button" data-section="${section}" data-user-id="${escapeHtml(grant.userId)}">Reset</button>
            <button class="ghost-btn photo-grant-revoke-btn" type="button" data-section="${section}" data-user-id="${escapeHtml(grant.userId)}">Revoke</button>
          </div>
        </article>
      `;
    }).join("")
    : `<div class="empty-card">No upload permissions granted yet for this section.</div>`;

  photoGrants.querySelectorAll(".photo-grant-reset-btn").forEach((button) => {
    button.addEventListener("click", () => resetPhotoGrant(button.dataset.section, button.dataset.userId));
  });
  photoGrants.querySelectorAll(".photo-grant-revoke-btn").forEach((button) => {
    button.addEventListener("click", () => revokePhotoGrant(button.dataset.section, button.dataset.userId));
  });
}

function resetPhotoGrant(sectionKey, userId) {
  if (!canGrantPhotoUpload(sectionKey)) {
    return;
  }

  photoUploadGrants[sectionKey] = getPhotoUploadGrants(sectionKey).map((grant) =>
    grant.userId === userId ? { ...grant, status: "unused", usedAt: "" } : grant
  );
  persistPhotoUploadGrants();
  renderPhotos();
}

function revokePhotoGrant(sectionKey, userId) {
  if (!canGrantPhotoUpload(sectionKey)) {
    return;
  }

  photoUploadGrants[sectionKey] = getPhotoUploadGrants(sectionKey).filter((grant) => grant.userId !== userId);
  persistPhotoUploadGrants();
  renderPhotos();
}

function canUploadPhotos(sectionKey) {
  if (!currentUser) {
    return false;
  }

  if (canGrantPhotoUpload(sectionKey)) {
    return true;
  }

  const grant = getPhotoUploadGrants(sectionKey).find((entry) => entry.userId === currentUser.id && entry.status === "unused");
  return Boolean(grant);
}

function getPhotoUploadStatusNote(sectionKey) {
  if (!currentUser) {
    return "";
  }

  if (canGrantPhotoUpload(sectionKey)) {
    return `You can post and manage uploads for ${photoSectionMeta[sectionKey].label}.`;
  }

  const grant = getPhotoUploadGrants(sectionKey).find((entry) => entry.userId === currentUser.id);
  return grant?.status === "unused" ? `You have 1 unused upload permission for ${photoSectionMeta[sectionKey].label}.` : "";
}

function isAdmin() {
  return isCreator() || currentUser?.role === "admin";
}

function isHeadAdmin() {
  return isCreator() || currentUser?.role === "headAdmin";
}

function hasAdminAccess() {
  return Boolean(currentUser && (isCreator() || ["headAdmin", "admin"].includes(currentUser.role)));
}

function hasMinistryApprovalAccess() {
  return Boolean(currentUser && (
    isCreator()
    || ["headAdmin", "admin"].includes(currentUser.role)
    || (Array.isArray(currentUser.titles) && currentUser.titles.some((title) =>
      title.scope === "ministry" && ["ministryHead", "ministryAssistant"].includes(title.role)
    ))
  ));
}

function canManageFixedPhoto() {
  return adminMode && (isCreator() || hasAdminAccess());
}

function canModeratePhotoUploads() {
  if (!currentUser) {
    return false;
  }

  if (!(adminMode || isCreator() || ["headAdmin", "admin"].includes(currentUser.role))) {
    return false;
  }

  if (isCreator() || ["headAdmin", "admin"].includes(currentUser.role)) {
    return true;
  }

  return hasMinistryLeadership(currentUser, "Info");
}

function canManageSeats() {
  if (!currentUser) {
    return false;
  }

  if (!(adminMode || isCreator() || ["headAdmin", "admin"].includes(currentUser.role))) {
    return false;
  }

  if (isCreator() || ["headAdmin", "admin"].includes(currentUser.role)) {
    return true;
  }

  return hasMinistryLeadership(currentUser, "Ushers");
}

function canGrantPhotoUpload(sectionKey) {
  return canModeratePhotoUploads() && Boolean(sectionKey && photoSectionMeta[sectionKey]);
}

function isCreator() {
  return Boolean(currentUser?.isCreator);
}

function isPrivilegedRole(role) {
  return ["headAdmin", "admin"].includes(role);
}

function getAssignableAccountRoles(target) {
  if (!currentUser) {
    return [[target.role, roleLabels[target.role] ?? "Member"]];
  }

  if (isCreator()) {
    return Object.entries(roleLabels);
  }

  if (currentUser.role === "headAdmin") {
    return Object.entries(roleLabels).filter(([value]) => ["admin", "tech", "member"].includes(value));
  }

  if (currentUser.role === "admin") {
    return Object.entries(roleLabels).filter(([value]) => ["tech", "member"].includes(value));
  }

  return [[target.role, roleLabels[target.role] ?? "Member"]];
}

function canAssignAccountRole(target, role) {
  if (!currentUser || !roleLabels[role]) {
    return false;
  }

  if (isPrivilegedRole(target.role) && !isCreator()) {
    return false;
  }

  return getAssignableAccountRoles(target).some(([value]) => value === role);
}

function canViewManagedAccount(target) {
  if (!currentUser) {
    return false;
  }

  if (isCreator()) {
    return true;
  }

  if (currentUser.role === "headAdmin") {
    return target.role !== "headAdmin" && !target.isCreator;
  }

  if (currentUser.role === "admin") {
    return !target.isCreator && !["headAdmin", "admin"].includes(target.role);
  }

  return false;
}

function canEnterAdminMode() {
  return Boolean(currentUser && (
    isCreator()
    || ["headAdmin", "admin"].includes(currentUser.role)
    || (Array.isArray(currentUser.titles) && currentUser.titles.some((title) =>
      title.scope === "ministry" && ["ministryHead", "ministryAssistant"].includes(title.role)
    ))
  ));
}

function canEditOrganizer() {
  return adminMode && Boolean(currentUser) && (isCreator() || Boolean(currentUser));
}

function canEditHomeContent() {
  return adminMode && Boolean(currentUser && (isCreator() || ["headAdmin", "admin", "tech"].includes(currentUser.role)));
}

function getUsernames(user) {
  return Array.isArray(user.usernames) && user.usernames.length > 0 ? user.usernames : [user.username].filter(Boolean);
}

function updateCurrentUser(updater) {
  if (!currentUser) {
    return;
  }

  authState.users = authState.users.map((user) => {
    if (user.id !== currentUser.id) {
      return user;
    }

    return normalizeUserAccount(updater(user));
  });

  currentUser = authState.users.find((user) => user.id === currentUser.id) ?? currentUser;
  persistAuth();
}

function upsertMinistryTitle(user, ministry, role) {
  const titles = Array.isArray(user.titles) ? user.titles : [];
  const withoutMinistry = titles.filter((title) => !(title.scope === "ministry" && title.ministry === ministry));
  return [...withoutMinistry, { id: `ministry-title-${ministry}-${role}`.toLowerCase().replace(/[^a-z0-9-]/g, "-"), scope: "ministry", role, ministry }];
}

function getMinistryRoleLabel(user, ministry) {
  const title = (Array.isArray(user?.titles) ? user.titles : []).find((entry) => entry.scope === "ministry" && entry.ministry === ministry);
  return title ? (registrationRoleLabels[title.role] ?? title.role) : "";
}

function getMinistryRoleValue(user, ministry) {
  const title = (Array.isArray(user?.titles) ? user.titles : []).find((entry) => entry.scope === "ministry" && entry.ministry === ministry);
  return title?.role || "ministryMember";
}

function requiresMinistry(requestedRole) {
  return ["ministryHead", "ministryAssistant", "ministryPrimaryLeader", "ministryOfficer", "ministryMember"].includes(requestedRole);
}

function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
}

function buildInitialTitles(requestedRole, ministry) {
  if (requiresMinistry(requestedRole) && ministry) {
    return [{ scope: "ministry", role: requestedRole, ministry }];
  }

  if (requestedRole === "churchMember" || requestedRole === "visitor") {
    return [{ scope: "general", role: requestedRole, ministry: "" }];
  }

  return [];
}

function inferTitlesFromLegacyUser(user) {
  if (user.isCreator || user.role === "headAdmin") {
    return [
      { scope: "platform", role: "creator", ministry: "" },
      { scope: "platform", role: "headAdmin", ministry: "" }
    ];
  }

  if (user.role === "admin") {
    return [{ scope: "platform", role: "admin", ministry: "" }];
  }

  if (user.role === "tech") {
    return [{ scope: "ministry", role: "ministryMember", ministry: "Tech" }];
  }

  return [{ scope: "general", role: "churchMember", ministry: "" }];
}

function getRequestedAccessLabel(account) {
  if (account.requestedRole) {
    return formatTitleLabel({ scope: requiresMinistry(account.requestedRole) ? "ministry" : "general", role: account.requestedRole, ministry: account.requestedMinistry ?? "" });
  }

  if (Array.isArray(account.titles) && account.titles.length > 0) {
    return account.titles.map(formatTitleLabel).join(", ");
  }

  return "Account Request";
}

function formatAccountSummary(account) {
  if (!Array.isArray(account.titles) || account.titles.length === 0) {
    return "";
  }

  return account.titles.map(formatTitleLabel).join(", ");
}

function getPendingMinistryRequestsForUser(userId) {
  return (authState.ministryRequests ?? []).filter((request) => request.userId === userId);
}

function getActionableMinistryRequests() {
  return (authState.ministryRequests ?? []).filter((request) => canApproveMinistryRequest(request));
}

function canApproveMinistryRequest(request) {
  if (!currentUser || !adminMode) {
    return false;
  }

  if (isCreator() || ["headAdmin", "admin"].includes(currentUser.role)) {
    return true;
  }

  return (Array.isArray(currentUser.titles) ? currentUser.titles : []).some((title) =>
    title.scope === "ministry"
    && title.ministry === request.ministry
    && ["ministryHead", "ministryAssistant"].includes(title.role)
  );
}

function formatProfileMinistriesSummary(user) {
  const ministries = Array.isArray(user?.ministries) ? user.ministries : [];
  if (!ministries.length) {
    return "";
  }

  return ministries.map((ministry) => {
    const role = getMinistryRoleLabel(user, ministry);
    return role ? `${ministry} (${role})` : ministry;
  }).join(", ");
}

function hasMinistryLeadership(user, ministry) {
  return (Array.isArray(user?.titles) ? user.titles : []).some((title) =>
    title.scope === "ministry"
    && title.ministry === ministry
    && ["ministryHead", "ministryAssistant"].includes(title.role)
  );
}

function hasMinistryDownlinePostingRole(user, ministry) {
  return (Array.isArray(user?.titles) ? user.titles : []).some((title) =>
    title.scope === "ministry"
    && title.ministry === ministry
    && ["ministryOfficer", "ministryMember"].includes(title.role)
  );
}

function getAnnouncementGrantCandidates(sectionKey) {
  if (isCreator() || ["headAdmin", "admin"].includes(currentUser?.role)) {
    return authState.users.filter((user) => user.id !== currentUser?.id);
  }

  const grantMinistries = announcementBoardMeta[sectionKey]?.grantMinistries ?? [];
  return authState.users.filter((user) =>
    user.id !== currentUser?.id
    && grantMinistries.some((ministry) => hasMinistryDownlinePostingRole(user, ministry))
  );
}

function getPhotoGrantCandidates() {
  if (isCreator() || ["headAdmin", "admin"].includes(currentUser?.role)) {
    return authState.users.filter((user) => user.id !== currentUser?.id);
  }

  return authState.users.filter((user) =>
    user.id !== currentUser?.id
    && hasMinistryDownlinePostingRole(user, "Info")
  );
}

function canManageUserMinistry(targetUser, ministry) {
  if (!currentUser || !adminMode) {
    return false;
  }

  if (isCreator() || ["headAdmin", "admin"].includes(currentUser.role)) {
    return true;
  }

  return (Array.isArray(currentUser.titles) ? currentUser.titles : []).some((title) =>
    title.scope === "ministry"
    && title.ministry === ministry
    && title.role === "ministryHead"
  );
}

function cssEscape(value) {
  return String(value ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function capitalizeWord(value) {
  const text = String(value ?? "");
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";
}

function formatTitleLabel(title) {
  if (!title) {
    return "";
  }

  if (title.scope === "custom") {
    return title.label || "";
  }

  if (title.scope === "platform") {
    if (title.role === "creator") {
      return "Creator";
    }
    return roleLabels[title.role] ?? title.role;
  }

  const base = registrationRoleLabels[title.role] ?? title.role;
  return title.ministry ? `${base} - ${title.ministry}` : base;
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

function compressImageFile(file, options = {}) {
  const {
    maxWidth = 480,
    maxHeight = 480,
    quality = 0.7
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Canvas is not available."));
          return;
        }

        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.onerror = () => reject(new Error("Image could not be loaded."));
      image.src = String(reader.result || "");
    };
    reader.onerror = () => reject(reader.error || new Error("File could not be read."));
    reader.readAsDataURL(file);
  });
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
