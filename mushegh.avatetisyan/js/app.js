/**
 * Courses – hardcoded data (no Strapi).
 * Update REGISTER_GOOGLE_FORM_URL with your form link.
 */
const REGISTER_GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdizRXknOJ5dNd7FQDTfpaD8n4CX97rhoKBbAZv8IpmXPowVg/viewform';

/**
 * Hardcoded courses: project management, coaching, and other.
 * Add or edit entries here. For images, use a URL or leave empty for placeholder.
 */
const COURSES = [
  {
    id: 1,
    documentId: '1',
    title: 'Project Management Fundamentals',
    title_hy: 'Նախագծերի կառավարման հիմունքներ',
    slug: 'project-management-fundamentals',
    excerpt: 'Learn core PM concepts, planning, and execution. Ideal for new project managers and anyone leading projects.',
    excerpt_hy: 'Սովորեք PM-ի հիմնական հասկացությունները, պլանավորումն ու իրականացումը: Նախատեսված է նոր ղեկավարների և նախագծեր վարողների համար:',
    description: '<p>This course covers the essential principles of project management: initiating, planning, executing, monitoring, and closing projects. You will learn how to define scope, build schedules, manage stakeholders, and deliver on time and budget.</p><h2>What you’ll learn</h2><ul><li>Project lifecycle and methodologies</li><li>Scope and requirements</li><li>Schedule and resource planning</li><li>Risk and communication</li></ul>',
    duration: '6 weeks',
    duration_hy: '6 շաբաթ',
    schedule: 'Tuesdays & Thursdays, 6–8 PM',
    schedule_hy: 'Երեքշաբթի և Հինգշաբթի, 18:00–20:00',
    images: [
      { url: 'https://peoplelogy.com/wp-content/uploads/2025/02/Project_management_Fundamentals.webp', alt: 'Project Management Fundamentals – team collaboration and planning' },
    ],
    description_hy: '<p>Այս դասընթացը ներառում է նախագծերի կառավարման հիմնական սկզբունքները՝ նախագծերի մեկնարկ, պլանավորում, իրականացում, մոնիտորինգ և ավարտ: Կսովորեք սահմանել շրջանակ, կառուցել ժամանակացույց, կառավարել շահառուներին և ավարտին հասցնել ժամանակին և բյուջեի սահմաններում:</p><h2>Ինչ կսովորեք</h2><ul><li>Նախագծի կյանքի ցիկլ և մեթոդաբանություններ</li><li>Շրջանակ և պահանջներ</li><li>Ժամանակացույց և ռեսուրսների պլանավորում</li><li>Ռիսկ և հաղորդակցություն</li></ul>',
    registerUrl: REGISTER_GOOGLE_FORM_URL,
  },
  {
    id: 2,
    documentId: '2',
    title: 'Agile & Scrum in Practice',
    title_hy: 'Agile և Scrum գործնականում',
    slug: 'agile-scrum-practice',
    excerpt: 'Hands-on Agile and Scrum: sprints, ceremonies, and delivery. For teams and aspiring Scrum Masters.',
    excerpt_hy: 'Agile և Scrum գործնականորեն: sprint-եր, արարողություններ և առաքում: Թիմերի և Scrum Master-ների համար:',
    description: '<p>Practical Agile and Scrum training with real-world exercises. Run sprints, facilitate ceremonies, and improve team delivery.</p><h2>Topics</h2><ul><li>Agile values and principles</li><li>Scrum roles and events</li><li>Backlog refinement and estimation</li><li>Metrics and continuous improvement</li></ul>',
    description_hy: '<p>Գործնական Agile և Scrum ուսուցում իրական վարժություններով: Sprint-երի անցկացում, արարողությունների ղեկավարում և թիմի արդյունքների բարելավում:</p><h2>Թեմաներ</h2><ul><li>Agile արժեքներ և սկզբունքներ</li><li>Scrum դերեր և իրադարձություններ</li><li>Backlog մշակում և գնահատում</li><li>Ցուցանիշներ և շարունակական բարելավում</li></ul>',
    duration: '4 weeks',
    duration_hy: '4 շաբաթ',
    schedule: 'Mondays & Wednesdays, 7–9 PM',
    schedule_hy: 'Երկուշաբթի և Չորեքշաբթի, 19:00–21:00',
    images: [
      { url: 'https://cdn.prod.website-files.com/65fd31d519cdd770990dd488/6749a9298d0032fcd34d6fd1_Agile%20vs%20Srcum%20Main.webp', alt: 'Agile and Scrum in Practice – sprints, ceremonies and delivery' },
    ],
    registerUrl: REGISTER_GOOGLE_FORM_URL,
  },
  {
    id: 3,
    documentId: '3',
    title: 'Leadership for Project Managers',
    title_hy: 'Առաջնորդություն նախագծերի ղեկավարների համար',
    slug: 'leadership-for-pm',
    excerpt: 'Build influence, motivate teams, and lead without authority. Soft skills that distinguish great PMs.',
    excerpt_hy: 'Կառուցեք ազդեցություն, խթանեք թիմերին և առաջնորդեք առանց պաշտոնական լիազորությունների: Իր soft skills-ը, որ առանձնացնում են մեծ PM-ներին:',
    description: '<p>Develop the soft skills that distinguish great project managers: communication, influence, and leading without formal authority.</p><h2>Focus areas</h2><ul><li>Stakeholder influence</li><li>Team motivation and conflict</li><li>Decision-making under uncertainty</li><li>Leading remote and hybrid teams</li></ul>',
    description_hy: '<p>Զարգացրեք այն soft skills-ը, որոնք առանձնացնում են մեծ նախագծերի ղեկավարներին՝ հաղորդակցություն, ազդեցություն և առաջնորդություն առանց պաշտոնական լիազորությունների:</p><h2>Կենտրոնացման ոլորտներ</h2><ul><li>Շահառուների վրա ազդեցություն</li><li>Թիմի մոտիվացիա և կոնֆլիկտ</li><li>Որոշումների կայացում անորոշության պայմաններում</li><li>Հեռավոր և հիբրիդ թիմերի ղեկավարում</li></ul>',
    duration: '5 weeks',
    duration_hy: '5 շաբաթ',
    schedule: 'Saturdays, 10 AM–12 PM',
    schedule_hy: 'Շաբաթ, 10:00–12:00',
    images: [
      { url: 'https://synami.com/wp-content/uploads/2024/09/leader-min-2-scaled.jpg', alt: 'Leadership for Project Managers – influence and team motivation' },
    ],
    registerUrl: REGISTER_GOOGLE_FORM_URL,
  },
  {
    id: 4,
    documentId: '4',
    title: 'Professional & Career Coaching',
    title_hy: 'Մասնագիտական և կարիերայի կոուչինգ',
    slug: 'professional-career-coaching',
    excerpt: 'One-on-one and small-group coaching to clarify goals, overcome blocks, and move your career forward.',
    excerpt_hy: 'Մեկ-առ-մեկ և փոքր խմբերի կոուչինգ նպատակները պարզաբանելու, խոչընդոտները հաղթահարելու և կարիերան առաջ տանելու համար:',
    description: '<p>Structured coaching sessions to help you get clear on what you want, identify obstacles, and take concrete steps. Suitable for professionals at any stage – whether you’re stepping into a new role, considering a change, or want to perform better in your current one.</p><h2>What we work on</h2><ul><li>Clarifying goals and priorities</li><li>Building confidence and communication</li><li>Action plans and accountability</li><li>Navigating transitions and decisions</li></ul>',
    duration: 'Ongoing (sessions by arrangement)',
    duration_hy: 'Շարունակական (զրույցներ պայմանավորվածությամբ)',
    schedule: 'Flexible',
    schedule_hy: 'Ճկուն',
    images: [
      { url: 'https://static.wixstatic.com/media/762156_aacb3b2227a840fabf209dc70c3b569e~mv2.png/v1/fill/w_980,h_551,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/762156_aacb3b2227a840fabf209dc70c3b569e~mv2.png', alt: 'Professional and Career Coaching – goals and growth' },
    ],
    description_hy: '<p>Կառուցվածքային կոուչինգային զրույցներ, որպեսզի պարզ դառնա, թե ինչ եք ցանկանում, նույնացնել խոչընդոտները և ձեռնարկել կոնկրետ քայլեր: Հարմար է ցանկացած փուլի մասնագետների համար:</p><h2>Ինչի վրա աշխատում ենք</h2><ul><li>Նպատակների և առաջնայնությունների պարզաբանում</li><li>Վստահության և հաղորդակցության զարգացում</li><li>Գործողությունների պլաններ և պատասխանատվություն</li><li>Անցումներ և որոշումներ</li></ul>',
    registerUrl: REGISTER_GOOGLE_FORM_URL,
  },
  {
    id: 5,
    documentId: '5',
    title: 'Crisis Management & Decision-Making',
    title_hy: 'Ճգնաժամերի կառավարում և որոշումների կայացում',
    slug: 'crisis-management-decision-making',
    excerpt: 'How to assess risks, stay calm under pressure, and make sound decisions when it matters most.',
    excerpt_hy: 'Ինչպես գնահատել ռիսկերը, հանգիստ մնալ ճնշման տակ և ճիշտ որոշումներ կայացնել, երբ ամենակարևորն է:',
    description: '<p>Drawing on crisis management and operational experience, this course covers how to prepare for uncertainty, assess situations quickly, and make clear decisions under pressure. Relevant for managers, team leads, and anyone in high-stakes roles.</p><h2>Topics</h2><ul><li>Risk assessment and preparedness</li><li>Communication in a crisis</li><li>Decision frameworks under pressure</li><li>Recovery and learning</li></ul>',
    description_hy: '<p>Ճգնաժամերի կառավարման և օպերատիվ փորձի հիման վրա այս դասընթացը ներառում է, թե ինչպես պատրաստվել անորոշությանը, արագ գնահատել իրավիճակները և ճնշման տակ հստակ որոշումներ կայացնել: Առնչվում է ղեկավարների, թիմի առաջնորդների և բարձր պատասխանատվություն կրող բոլորի համար:</p><h2>Թեմաներ</h2><ul><li>Ռիսկերի գնահատում և պատրաստվածություն</li><li>Հաղորդակցություն ճգնաժամի ժամանակ</li><li>Որոշումների կայացում ճնշման տակ</li><li>Վերականգնում և սովորելը</li></ul>',
    duration: '3 weeks',
    duration_hy: '3 շաբաթ',
    schedule: 'Weekday evenings',
    schedule_hy: 'Շաբաթվա երեկոյան ժամեր',
    images: [
      { url: 'https://www.shutterstock.com/image-photo/ceo-manager-explaining-business-associates-600nw-2480403247.jpg', alt: 'Crisis Management and Decision-Making – risk assessment and decisions under pressure' },
    ],
    registerUrl: REGISTER_GOOGLE_FORM_URL,
  },
];

/**
 * Normalize course to a single shape (id, documentId, title, slug, excerpt, description, duration, schedule, images[], registerUrl).
 */
function normalizeCourse(entry) {
  if (!entry) return null;
  const images = entry.images && Array.isArray(entry.images) ? entry.images : [];
  return {
    id: entry.id,
    documentId: String(entry.documentId ?? entry.id),
    title: entry.title ?? '',
    title_hy: entry.title_hy ?? entry.title ?? '',
    slug: entry.slug ?? '',
    excerpt: entry.excerpt ?? '',
    excerpt_hy: entry.excerpt_hy ?? entry.excerpt ?? '',
    description: entry.description ?? '',
    description_hy: entry.description_hy ?? entry.description ?? '',
    duration: entry.duration ?? '',
    duration_hy: entry.duration_hy ?? entry.duration ?? '',
    schedule: entry.schedule ?? '',
    schedule_hy: entry.schedule_hy ?? entry.schedule ?? '',
    images: images.map((img) => ({
      url: typeof img === 'string' ? img : (img?.url ?? ''),
      alt: typeof img === 'object' && img ? (img.alt ?? entry.title) : entry.title,
    })),
    registerUrl: entry.registerUrl ?? REGISTER_GOOGLE_FORM_URL,
  };
}

function getCourses() {
  return COURSES.map(normalizeCourse).filter(Boolean);
}

function getCourseByIdOrSlug(idOrSlug) {
  const courses = getCourses();
  const byId = courses.find((c) => c.id === Number(idOrSlug) || c.documentId === String(idOrSlug));
  const bySlug = courses.find((c) => c.slug === idOrSlug);
  return byId ?? bySlug ?? null;
}

window.getCourses = getCourses;
window.getCourseByIdOrSlug = getCourseByIdOrSlug;
window.normalizeCourse = normalizeCourse;

function escapeHtml(s) {
  if (s == null) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

/**
 * Build course card DOM node for listing page.
 */
function getImageBaseUrl() {
  const path = window.location.pathname;
  const lastSlash = path.lastIndexOf('/');
  const basePath = lastSlash > 0 ? path.substring(0, lastSlash) : '';
  return window.location.origin + (basePath ? basePath + '/' : '/');
}

function resolveImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  const base = getImageBaseUrl();
  return base + url.replace(/^\//, '');
}

function renderCourseCard(course) {
  const lang = typeof window.getLang === 'function' ? window.getLang() : 'en';
  const title = lang === 'hy' ? (course.title_hy || course.title) : course.title;
  const excerpt = lang === 'hy' ? (course.excerpt_hy || course.excerpt) : course.excerpt;
  const link = document.createElement('a');
  link.href = `course.html?id=${encodeURIComponent(course.documentId || course.id)}`;
  link.setAttribute('role', 'listitem');
  link.className = 'course-card';
  const imgUrl = course.images?.[0]?.url;
  const imgAlt = course.images?.[0]?.alt || title;
  const resolvedImgUrl = resolveImageUrl(imgUrl);
  const imgHtml = resolvedImgUrl
    ? `<div class="course-card__image-wrap"><img class="course-card__image" src="${escapeHtml(resolvedImgUrl)}" alt="${escapeHtml(imgAlt)}" loading="lazy" width="400" height="250" onerror="this.classList.add('img-failed')"></div>`
    : `<div class="course-card__image-wrap" aria-hidden="true"></div>`;
  link.innerHTML = `
    ${imgHtml}
    <div class="course-card__body">
      <h3 class="course-card__title">${escapeHtml(title)}</h3>
      <p class="course-card__excerpt">${escapeHtml(excerpt)}</p>
    </div>
  `;
  return link;
}

/**
 * Render courses on index page.
 */
function initCoursesList() {
  const grid = document.getElementById('courses-grid');
  const loading = document.getElementById('courses-loading');
  const errorEl = document.getElementById('courses-error');
  if (!grid) return;

  loading.hidden = false;
  errorEl.hidden = true;
  grid.innerHTML = '';

  const courses = getCourses();
  loading.hidden = true;
  if (courses.length === 0) {
    const msg = typeof window.t === 'function' ? window.t('noCourses') : 'No courses available yet.';
    grid.innerHTML = '<p class="loading">' + escapeHtml(msg) + '</p>';
    return;
  }
  courses.forEach((course) => grid.appendChild(renderCourseCard(course)));
}

function runInit() {
  initCoursesList();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}
window.addEventListener('langchange', runInit);
