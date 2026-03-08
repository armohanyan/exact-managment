/**
 * English / Armenian i18n. Persists lang in localStorage and applies to [data-i18n] elements.
 */
(function () {
  const STORAGE_KEY = 'mushegh-lang';
  const defaultLang = 'en';

  const translations = {
    en: {
      navCourses: 'Courses',
      navAbout: 'About',
      heroTitle: 'Courses',
      heroLead: 'Project management, coaching, and professional development. Practical training to help you and your team grow.',
      aboutTitle: 'About your instructor',
      aboutLead: 'Mushegh Avetisyan – trainer and coach for project management, professional development, and coaching.',
      aboutBackground: 'Background',
      aboutBackgroundText1: 'Mushegh is based in <strong>Yerevan, Armenia</strong>. He combines hands-on experience in project delivery, crisis management, and technology with a focus on helping individuals and teams perform better.',
      aboutBackgroundText2: 'He holds a background in <strong>Crisis Management and Economics</strong> from the Armenian Crisis Management Academy and has worked across sectors including software development, aviation, and security. That mix of structure, risk awareness, and collaboration feeds directly into his teaching.',
      aboutTeaches: 'What he teaches',
      aboutTeachesText: 'His courses cover <strong>project management</strong> (from fundamentals to Agile and Scrum), <strong>leadership and influence</strong>, and <strong>coaching</strong> for personal and professional growth. The goal is always practical: tools and mindsets you can use right away at work.',
      aboutWhy: 'Why learn with Mushegh',
      aboutWhy1: 'Real-world experience in project delivery, crisis management, and team collaboration',
      aboutWhy2: 'Clear, structured content – no fluff, focused on what works',
      aboutWhy3: 'Small groups and interactive sessions so you can ask questions and practice',
      viewCourses: 'View courses',
      backToCourses: '← Back to courses',
      readyToJoin: 'Ready to join?',
      registerNow: 'Register now',
      registerCourse: 'Register for this course',
      loadingCourses: 'Loading courses…',
      noCourses: 'No courses available yet.',
      courseNotFound: 'Course not found.',
      returnToCourses: 'Return to all courses',
      loadingCourse: 'Loading course…',
      footerCopy: 'Mushegh Avetisyan. All rights reserved.',
      availableCourses: 'Available courses',
      enableJs: 'Please enable JavaScript to view our courses, or',
      viewSampleCourse: 'view a sample course',
    },
    hy: {
      navCourses: 'Դասընթացներ',
      navAbout: 'Մեր մասին',
      heroTitle: 'Դասընթացներ',
      heroLead: 'Նախագծերի կառավարում, կոուչինգ և մասնագիտական զարգացում: Գործնական ուսուցում ձեզ և ձեր թիմին աճելու համար:',
      aboutTitle: 'Ձեր դասընթացավարի մասին',
      aboutLead: 'Մուշեղ Ավետիսյան – դասընթացավար և կոուչ նախագծերի կառավարման, մասնագիտական զարգացման և կոուչինգի ոլորտներում:',
      aboutBackground: 'Կենսագրություն',
      aboutBackgroundText1: 'Մուշեղը ապրում և աշխատում է <strong>Երևանում, Հայաստան</strong>: Նա միավորում է նախագծերի իրականացման, ճգնաժամերի կառավարման և տեխնոլոգիաների փորձը՝ կենտրոնանալով անհատների և թիմերի արդյունավետության բարձրացման վրա:',
      aboutBackgroundText2: 'Նա ունի <strong>Ճգնաժամերի կառավարում և տնտեսագիտություն</strong> մասնագիտացում Հայաստանի Ճգնաժամերի կառավարման ակադեմիայից և աշխատել է ծրագրային ապահովման, ավիացիայի և անվտանգության ոլորտներում: Կառուցվածքը, ռիսկերի գիտակցումը և համագործակցությունը ուղղակիորեն արտացոլվում են նրա դասավանդման մեջ:',
      aboutTeaches: 'Ինչ է դասավանդում',
      aboutTeachesText: 'Նրա դասընթացները ներառում են <strong>նախագծերի կառավարում</strong> (հիմունքներից մինչև Agile և Scrum), <strong>առաջնորդություն և ազդեցություն</strong>, ինչպես նաև <strong>կոուչինգ</strong> անձնական և մասնագիտական աճի համար: Նպատակը միշտ գործնական է՝ գործիքներ և մտածելակերպ, որոնք կարող եք անմիջապես կիրառել աշխատանքում:',
      aboutWhy: 'Ինչու սովորել Մուշեղի հետ',
      aboutWhy1: 'Իրական փորձ նախագծերի իրականացման, ճգնաժամերի կառավարման և թիմային համագործակցության ոլորտներում',
      aboutWhy2: 'Հստակ, կառուցվածքային բովանդակություն – առանց դատարկ խոսքի, կենտրոնանալով արդյունավետի վրա',
      aboutWhy3: 'Փոքր խմբեր և ինտերակտիվ զրույցներ, որպեսզի կարողանաք հարցեր տալ և փորձել',
      viewCourses: 'Դասընթացներ',
      backToCourses: '← Վերադառնալ դասընթացներին',
      readyToJoin: 'Պատրաստ եք միանալու?',
      registerNow: 'Գրանցվել հիմա',
      registerCourse: 'Գրանցվել այս դասընթացին',
      loadingCourses: 'Դասընթացները բեռնվում են…',
      noCourses: 'Դասընթացներ դեռ չկան:',
      courseNotFound: 'Դասընթացը չի գտնվել:',
      returnToCourses: 'Վերադառնալ բոլոր դասընթացներին',
      loadingCourse: 'Դասընթացը բեռնվում է…',
      footerCopy: 'Մուշեղ Ավետիսյան: Բոլոր իրավունքները պաշտպանված են:',
      availableCourses: 'Առկա դասընթացներ',
      enableJs: 'Խնդրում ենք միացնել JavaScript դասընթացները դիտելու համար, կամ',
      viewSampleCourse: 'դիտել օրինակ դասընթաց',
    },
  };

  function getLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'hy') return stored;
    } catch (e) {}
    const docLang = document.documentElement.lang || '';
    if (docLang.startsWith('hy')) return 'hy';
    return defaultLang;
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'hy') return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.documentElement.lang = lang === 'hy' ? 'hy' : 'en';
    applyTranslations(lang);
    updateLangSwitcher(lang);
    try { window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } })); } catch (e) {}
  }

  function applyTranslations(lang) {
    const t = translations[lang] || translations.en;
    window.__t = t;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const value = t[key];
      if (value != null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = value;
        else el.innerHTML = value;
      }
    });
  }

  window.t = function (key) {
    const t = window.__t || translations.en;
    return t[key] != null ? t[key] : key;
  };

  function updateLangSwitcher(currentLang) {
    document.querySelectorAll('.lang-switcher [data-lang]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === currentLang ? 'true' : 'false');
    });
  }

  function init() {
    const lang = getLang();
    document.documentElement.lang = lang === 'hy' ? 'hy' : 'en';
    window.__t = translations[lang] || translations.en;
    applyTranslations(lang);
    updateLangSwitcher(lang);
    document.querySelectorAll('.lang-switcher [data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.setLang = setLang;
  window.getLang = getLang;
  window.applyI18n = function () {
    applyTranslations(getLang());
    updateLangSwitcher(getLang());
  };
})();
