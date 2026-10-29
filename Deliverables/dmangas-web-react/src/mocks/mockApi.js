/**
 * Mock backend for Dmangas.
 *
 * Replaces window.fetch and returns sample data based on the requested URL,
 * so the app runs without a live API.
 *
 * Usage: import as the FIRST line of src/index.js
 *   import "./mocks/mockApi";
 *
 * Only active when REACT_APP_USE_MOCKS=true is set in .env
 */

const ENABLED = process.env.REACT_APP_USE_MOCKS === "true";

/* ---------- Offline placeholder images (inline SVG data URIs) ---------- */

const img = (label, w = 300, h = 420, bg = "#7B2FF7") => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="${bg}"/>
    <text x="50%" y="50%" fill="#fff" font-family="sans-serif" font-size="18"
          text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

/* ---------- Real artwork bundled under public/img, cycled for variety ---------- */

// 22 real cover-art images, one per book (TITLES has 12 entries so no repeats)
const catalogCover = (n) => `/img/catalog/${((n - 1) % 22) + 1}.jpg`;
// 4 background images per card section
const cardBg = (section, n, total) => `/img/card/bg_card_${section}_${((n - 1) % total) + 1}.jpg`;
// category/genre background images (bg_card_genders_4.jpg is missing on disk)
const GENDER_BGS = [1, 2, 3, 5, 6, 7, 8, 9, 10];
const genderBg = (n) => `/img/card/bg_card_genders_${GENDER_BGS[(n - 1) % GENDER_BGS.length]}.jpg`;
// real member/avatar photos for groups and users
const MEMBER_PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8];
const memberPhoto = (n) => `/img/internal/members/${MEMBER_PHOTOS[(n - 1) % MEMBER_PHOTOS.length]}.png`;
const GROUP_COVERS = ["f.jpg", "p.jpg", "glasses.jpg"];
const groupCoverPhoto = (n) => `/img/internal/somos-party/${GROUP_COVERS[(n - 1) % GROUP_COVERS.length]}`;
const LOGIN_AVATARS = ["avatar.png", "akari.png", "nathan.png"];
const loginAvatar = (n) => `/img/login/avatar/${LOGIN_AVATARS[(n - 1) % LOGIN_AVATARS.length]}`;
const sliderDesktop = (n) => `/img/slider/home/slider0${n}-desktop.png`;
const sliderMobile = (n) => `/img/slider/home/slider0${n}_mobile.png`;

/* ---------- Base catalogue ---------- */

const TITLES = [
  {
    title: "My Kingdom Was Transported to a Distant World",
    alt: "Fukushuu o Koinegau yuusha",
    type: "Manga",
    genre: "Fantasy",
    group: "Somos Party",
  },
  {
    title: "The CEO's Dismissal",
    alt: "Wan Gu Shen Wang",
    type: "Manhwa",
    genre: "Drama",
    group: "Big Another Boyang",
  },
  {
    title: "Love Me Gently",
    alt: "Yasashiku Aishite",
    type: "Novel",
    genre: "Childhood Love",
    group: "GB Lovers",
  },
  {
    title: "The Samurai Against the Cyber World",
    alt: "Cyber Samurai",
    type: "Manga",
    genre: "Action",
    group: "Yaoi and Yuri Lovers",
  },
  {
    title: "You're the Mother of My Daughter",
    alt: "Musume no Haha",
    type: "Manhua",
    genre: "Drama",
    group: "Somos Party",
  },
  {
    title: "The Beginning of the Fallen Hero",
    alt: "Ochita Yuusha",
    type: "Manga",
    genre: "Adventure",
    group: "MYAMFLV",
  },
  {
    title: "Cruel Love",
    alt: "Zankoku na Ai",
    type: "Novel",
    genre: "Revenge",
    group: "Big Another Boyang",
  },
  {
    title: "The Emperor's Proposal",
    alt: "Koutei no Puropoozu",
    type: "Manhwa",
    genre: "Drama",
    group: "GB Lovers",
  },
  {
    title: "Beauties on the Deserted Island",
    alt: "Mujintou no Bijo",
    type: "Manga",
    genre: "Comedy",
    group: "MYBLGBAO",
  },
  {
    title: "My Guardian Demon",
    alt: "Mamoribito no Akuma",
    type: "Manga",
    genre: "Fantasy",
    group: "Somos Party",
  },
  {
    title: "Let's Live This Together",
    alt: "Issho ni Ikiyou",
    type: "Novel",
    genre: "Comedy",
    group: "Yaoi and Yuri Lovers",
  },
  {
    title: "Magical Adventure!!",
    alt: "Mahou no Bouken!!",
    type: "Manga",
    genre: "Adventure",
    group: "MYAMFLV",
  },
];

const wrapImages = (idx) => [
  { type: "PROFILE", image: { path: catalogCover(idx + 1) } },
  { type: "COVER", image: { path: cardBg("books", idx + 1, 4) } },
];

const makeBook = (i, idx) => ({
  bookCode: `BOOK${String(idx + 1).padStart(3, "0")}`,
  bookTitle: i.title,
  bookAlternativeTitle: i.alt,
  bookDescription:
    "Qin Tian is stranded on a deserted island after a shipwreck. All he has " +
    "is a survival system and a knife. He must start from scratch — building " +
    "a camp, making fire, fishing — doing whatever it takes to survive.",
  bookRate: (7 + (idx % 30) / 10).toFixed(1),
  bookLabelViews: `${20 + idx}K`,
  bookHourLatest: (idx % 12) + 1,
  bookDateCreated: "2022-01-11",
  bookContentType: "Original Content (Copyrighted)",
  bookType: { name: { value: i.type } },
  bookStatus: { name: { value: idx % 3 === 0 ? "Ongoing" : "Completed" } },
  attributes: [
    { name: { value: i.genre } },
    { name: { value: "Shoujo" } },
  ],
  images: wrapImages(idx),
  groupCreated: {
    groupName: i.group,
    groupCode: `GRP${String((idx % 5) + 1).padStart(3, "0")}`,
    images: [{ type: "PROFILE", image: { path: memberPhoto(idx + 1) } }],
  },
  latestChapter: {
    chapterCode: `CH${String((idx % 45) + 1).padStart(3, "0")}`,
    chapterNumber: (idx % 45) + 1,
    chapterTitle: `Chapter ${(idx % 45) + 1}`,
    group: { name: i.group },
  },
});

const BOOKS = TITLES.map(makeBook);

const paged = (list, limit) => ({
  items: list.slice(0, limit || list.length),
  total: list.length,
  currentPage: 1,
  lastPage: 1,
  perPage: limit || list.length,
});

/* ---------- Canned responses per endpoint ---------- */

const BANNERS = {
  items: [0, 1, 2, 3].map((n) => ({
    bannerOrder: n,
    bannerTitle: "Let's Live This Magical Adventure!!",
    bannerCode: `BAN00${n + 1}`,
    images: [
      { type: "DESKTOP", image: { path: sliderDesktop(n + 1) } },
      { type: "MOBILE", image: { path: sliderMobile(n + 1) } },
    ],
  })),
};

const CATEGORIES = {
  items: [
    "Action", "Adventure", "Comedy", "Drama",
    "Fantasy", "Revenge", "Childhood Love",
  ].map((value, idx) => ({
    attributeCode: `ATT00${idx + 1}`,
    attributeName: { value },
    attributeAlias: value.toLowerCase().replace(/\s+/g, "-"),
    attributeType: "categories",
    name: { value },
    images: [{ type: "PROFILE", image: { path: genderBg(idx + 1) } }],
  })),
};

/**
 * NavBar reads `i.name.value` and `i.linkRelative.value`,
 * the same shape the footer uses.
 */
const NAVBAR_PAGES = {
  items: [
    ["Home", ""],
    ["Our Books", "books"],
    ["Community", "community"],
    ["Library", "library"],
  ].map(([label, url], i) => ({
    pageCode: `P00${i + 1}`,
    name: { value: label },
    linkRelative: { value: url },
    viewOnNavBar: true,
  })),
};

/**
 * The footer component iterates `result.items` with `for (var index in ...)`
 * and switches on the keys "category", "about_us" and "information",
 * so this response must be an OBJECT, not an array.
 *
 * Each group is rendered as:
 *   value.pageGroup.group.name.value
 *   value.pageGroup.pages[].name.value
 *   value.pageGroup.pages[].linkRelative.value
 */
const footerGroup = (title, pages) => ({
  group: { name: { value: title } },
  pages: pages.map(([label, url], i) => ({
    pageCode: `${title.slice(0, 3).toUpperCase()}${i + 1}`,
    name: { value: label },
    linkRelative: { value: url },
  })),
});

const FOOTER_PAGES = {
  items: {
    category: footerGroup("Categories", [
      ["Action", "category/action"],
      ["Adventure", "category/adventure"],
      ["Comedy", "category/comedy"],
      ["Drama", "category/drama"],
      ["Fantasy", "category/fantasy"],
    ]),
    about_us: footerGroup("About Us", [
      ["Who Are We?", "about-us"],
      ["Contact Us", "contact"],
      ["Join Us", "join-us"],
    ]),
    information: footerGroup("Information", [
      ["Terms of Use", "terms"],
      ["Privacy Policy", "privacy"],
      ["Cookies", "cookies"],
    ]),
  },
};

const FOOTER_PAGES_FLAT = {
  items: [
    { pageCode: "F001", pageTitle: "About Us", pageUrl: "/about-us", groupName: "About Us" },
    { pageCode: "F002", pageTitle: "Who Are We?", pageUrl: "/about-us", groupName: "About Us" },
    { pageCode: "F003", pageTitle: "Terms of Use", pageUrl: "/terms", groupName: "Legal" },
    { pageCode: "F004", pageTitle: "Privacy Policy", pageUrl: "/privacy", groupName: "Legal" },
    { pageCode: "F005", pageTitle: "Cookies", pageUrl: "/cookies", groupName: "Legal" },
    { pageCode: "F006", pageTitle: "Contact Us", pageUrl: "/contact", groupName: "Contact" },
  ],
};

const SETTINGS = {
  items: [
    { settingKey: "site_name", settingValue: "Dmangas Online" },
    { settingKey: "site_slogan", settingValue: "WHERE THE BEST STORIES ARE BORN" },
    { settingKey: "copyright", settingValue: "All rights reserved, we don't own any projects © 2022 Dmangas Online" },
  ],
};

/**
 * menu-left and the comment boxes read auth.user_name and auth.avatar_id
 * (avatar is a short name -- e.g. "akari1" -- resolved by menu-left's
 * getAvatarPath() against /img/login/avatar-selected/, not a full path),
 * so both spellings are included alongside username/name/avatar.
 */
const USER = {
  id: 1,
  code: "USR001",
  username: "juan",
  user_name: "juan",
  name: "Juan",
  email: "juan@example.com",
  avatar: "akari1",
  avatar_id: 1,
  roles: ["READER"],
};

const GROUPS = {
  items: [1, 2, 3, 4, 5].map((n) => ({
    groupCode: `GRP00${n}`,
    groupName: ["Somos Party", "Big Another Boyang", "GB Lovers", "Yaoi and Yuri Lovers", "MYAMFLV"][n - 1],
    groupDescription: "Scanlation group working on manga and novels.",
    membersCount: 4 + n,
    booksCount: 2 + n,
    images: [
      { type: "PROFILE", image: { path: memberPhoto(n) } },
      { type: "COVER", image: { path: groupCoverPhoto(n) } },
    ],
  })),
};

/**
 * BookDetail groups chapters by `chapter.number` and matches `chapter.group_code`
 * against the book's group, so both fields are required. LittleBook,
 * ChaptersDropdown and BooksReadChapter all read `chapter.name` and
 * `chapter.chapter_code` (not `title`/`code`), so both spellings are
 * included here.
 * `getChaptersPreview` is assigned straight to state, so it must be a bare ARRAY.
 */
const CHAPTER_LIST = Array.from({ length: 8 }, (_, n) => ({
  _id: `CH${String(n + 1).padStart(3, "0")}`,
  code: `CH${String(n + 1).padStart(3, "0")}`,
  chapter_code: `CH${String(n + 1).padStart(3, "0")}`,
  number: n + 1,
  title: `Chapter ${String(n + 1).padStart(2, "0")}`,
  name: `Chapter ${String(n + 1).padStart(2, "0")}`,
  volume: 1,
  group_code: "GRP001",
  group_name: "Somos Party",
  isMember: true,
  profileImage: memberPhoto(n + 1),
  book_code: "BOOK001",
  views: 100 + n * 7,
  createdAt: "2022-01-11T12:30:00Z",
  created_at: "2022-01-11T12:30:00Z",
  updatedAt: "2022-01-11T12:30:00Z",
  images: [{ image: { path: img(`Page ${n + 1}`, 800, 1200, "#424242") } }],
  pages: [{ path: img(`Page ${n + 1}`, 800, 1200, "#424242") }],
}));

const CHAPTERS = { items: CHAPTER_LIST, data: CHAPTER_LIST };

/**
 * CommentBook/CommentBox read comment.{comment_id, comment_book_id, text,
 * user_id, user_name, user.avatar, likes_count, replies, images,
 * updated_at, book_rating} — both id spellings are included so this same
 * list works for both the book-level and chapter-level comment endpoints.
 */
const COMMENTS = {
  items: [
    {
      _id: "C001",
      comment_id: "C001",
      comment_book_id: "C001",
      comment: "This chapter was great, thanks for the release!",
      text: "This chapter was great, thanks for the release!",
      user_id: "USR002",
      user_name: "reader01",
      user: { username: "reader01", avatar: loginAvatar(2) },
      likes: 12,
      likes_count: 12,
      replies: [],
      images: [],
      book_rating: 4.5,
      createdAt: "2022-01-11T12:30:00Z",
      created_at: "2022-01-11T12:30:00Z",
      updated_at: "2022-01-11T12:30:00Z",
    },
    {
      _id: "C002",
      comment_id: "C002",
      comment_book_id: "C002",
      comment: "When is the next volume coming out?",
      text: "When is the next volume coming out?",
      user_id: "USR003",
      user_name: "reader02",
      user: { username: "reader02", avatar: loginAvatar(3) },
      likes: 2,
      likes_count: 2,
      replies: [],
      images: [],
      book_rating: 4,
      createdAt: "2022-01-11T15:00:00Z",
      created_at: "2022-01-11T15:00:00Z",
      updated_at: "2022-01-11T15:00:00Z",
    },
  ],
};

/* ---------- URL routing ---------- */

function resolve(url, method) {
  const u = String(url);
  const q = new URL(u, window.location.origin);
  const limit = parseInt(q.searchParams.get("limitPage") || "0", 10);

  /* --- Core API --- */
  if (u.includes("/banners")) return BANNERS;
  if (u.includes("/attributes")) return paged(CATEGORIES.items, limit);
  if (u.includes("/book-types")) {
    return paged(["Manga", "Manhwa", "Manhua", "Novel", "Doujinshi", "One-shot"]
      .map((value, i) => ({ code: `T00${i}`, name: { value } })), limit);
  }
  if (u.includes("/book-activity-status")) {
    return paged(["Ongoing", "Completed", "On Hold", "Dropped"]
      .map((value, i) => ({ code: `S00${i}`, name: { value } })), limit);
  }
  if (u.includes("/pages")) {
    if (u.includes("viewOnNavBar")) return NAVBAR_PAGES;
    if (u.includes("viewOnBootom")) return FOOTER_PAGES;
    return { items: [...NAVBAR_PAGES.items, ...FOOTER_PAGES_FLAT.items] };
  }
  if (u.includes("/settings")) return SETTINGS;

  if (u.includes("/books")) {
    const filter = q.searchParams.get("filterUrl");
    let list = BOOKS;
    if (filter) {
      const needle = decodeURIComponent(filter).toLowerCase();
      list = BOOKS.filter((b) => b.bookTitle.toLowerCase().includes(needle));
    }
    return paged(list, limit || 12);
  }

  /* --- Auth API --- */
  if (u.includes("/login")) {
    return { token: "mock.jwt.token", user: USER, success: true };
  }
  if (u.includes("/profile") || u.includes("/member-info")) {
    return { data: USER, user: USER, success: true };
  }
  if (u.includes("/forget-password") || u.includes("/confirm")) {
    return { success: true, message: "OK" };
  }

  /* --- Groups API (Node) ---
   * REACT_APP_NODE_API_CORE_URL is itself ".../groups", so every endpoint
   * below also contains "/groups" as a substring. Keep the generic
   * `/groups` catch-all LAST in this block, after every more specific
   * check, or it swallows all of them.
   */
  // menu-left expects { success, data }
  if (u.includes("/group-with-images")) {
    return { success: true, data: GROUPS.items[0] };
  }
  if (u.includes("/group-by-code")) return { data: GROUPS.items[0], success: true };
  if (u.includes("/groups-by-membercode")) return { data: GROUPS.items.slice(0, 2), success: true };
  if (u.includes("/book-by-group") || u.includes("/books-by-category")) {
    return { data: BOOKS.slice(0, 6), items: BOOKS.slice(0, 6), success: true };
  }
  if (u.includes("/books-by-status")) return { data: BOOKS.slice(0, 4), success: true };
  // menu-left calls data.slice(1) directly, so this must be a bare array too
  if (u.includes("/member-role")) return ["Owner", "Admin", "Editor", "Member"];
  // preview is assigned directly to state, so it must be a bare array
  if (u.includes("/get-chapters-preview")) return CHAPTER_LIST;
  if (u.includes("/get-chapters")) return CHAPTERS;
  if (u.includes("/increment-book-views")) {
    return { success: true, book: { views: 21345, code: "BOOK001" } };
  }
  // CommentBook/CommentBox call setComments(data) directly, so GET must be a bare array
  if (u.includes("comments") || u.includes("comment")) {
    return method === "GET" ? COMMENTS.items : { success: true, data: COMMENTS.items[0] };
  }
  if (u.includes("/user-library")) return { data: null, success: true };
  if (u.includes("/user-history")) return { data: { lastChapter: 1 }, success: true };
  // CommunityRequest.js reads this straight into state and calls .map()
  // on it directly, so GET must be a bare array.
  if (u.includes("/my-requests")) return [];
  // CommunityRequest.js reads pendingRequests from `.data` and maps it.
  if (u.includes("/member-status")) return { data: [], success: true };
  if (u.includes("/member-request")) {
    return { data: [], items: [], success: true };
  }
  // Generic catch-all for the Groups API base URL itself: must stay last
  // in this block, see the note above.
  if (u.includes("/groups")) return GROUPS;

  /* --- fallback --- */
  return { items: [], data: [], success: true, mocked: true, url: u };
}

/* ---------- window.fetch patch ---------- */

if (ENABLED) {
  const realFetch = window.fetch.bind(window);

  const API_HOSTS = [
    process.env.REACT_APP_API_URL_CORE,
    process.env.REACT_APP_API_URL_AUTH,
    process.env.REACT_APP_NODE_API_CORE_URL,
    "example.com",
    "localhost:4000",
    "localhost:5000",
    "dmangas.local.web",
  ].filter(Boolean);

  const isApiCall = (url) => {
    const u = String(url);
    return API_HOSTS.some((h) => u.includes(h));
  };

  window.fetch = async (input, init = {}) => {
    const url = typeof input === "string" ? input : input?.url;
    const method = (init.method || "GET").toUpperCase();

    if (!isApiCall(url)) return realFetch(input, init);

    const body = resolve(url, method);
    // eslint-disable-next-line no-console
    console.debug("[mock]", method, url);

    // CustomImageLoader's sweep animation runs over 6s, so a response this
    // fast (120ms) never gave it enough time to visibly move -- every page
    // that shows it while loading (Home, BookDetail, Tabs, ...) would just
    // flash it for an instant. 700ms is still snappy but gives it room to
    // actually animate.
    await new Promise((r) => setTimeout(r, 700));

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  // eslint-disable-next-line no-console
  console.info("%c[mock] Mock backend active", "color:#7B2FF7;font-weight:bold");
}

export default {};