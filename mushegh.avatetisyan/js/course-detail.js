/**
 * Course detail page – loads one course by ?id= or ?slug= and renders title, details, images, register CTA.
 */

(function () {
  const REGISTER_GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdizRXknOJ5dNd7FQDTfpaD8n4CX97rhoKBbAZv8IpmXPowVg/viewform';
  const SITE_NAME = 'Mushegh Avetisyan';

  function getCourseIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || params.get('slug') || '';
  }

  function getBaseUrl() {
    const meta = document.querySelector('meta[name="site-base-url"]');
    return (meta && meta.getAttribute('content')) || (window.SITE_BASE_URL || '').replace(/\/$/, '') || '';
  }

  function setPageMeta(course) {
    const lang = typeof window.getLang === 'function' ? window.getLang() : 'en';
    const displayTitle = (lang === 'hy' && course.title_hy) ? course.title_hy : course.title;
    const title = displayTitle + ' – ' + SITE_NAME;
    document.title = title;
    const desc = course.excerpt || course.description?.replace(/<[^>]+>/g, '').substring(0, 160) || 'Course details';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
    const baseUrl = getBaseUrl();
    const courseImageUrl = course.images?.[0]?.url;
    if (baseUrl && courseImageUrl) {
      const absImage = courseImageUrl.startsWith('http') ? courseImageUrl : baseUrl + '/' + courseImageUrl.replace(/^\//, '');
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', absImage);
      else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.setAttribute('content', absImage);
        document.head.appendChild(meta);
      }
      const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
      const alt = course.images?.[0]?.alt || course.title;
      if (ogImageAlt) ogImageAlt.setAttribute('content', alt);
      else {
        const metaAlt = document.createElement('meta');
        metaAlt.setAttribute('property', 'og:image:alt');
        metaAlt.setAttribute('content', alt);
        document.head.appendChild(metaAlt);
      }
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', window.location.href.split('?')[0] + '?id=' + (course.documentId || course.id));
    injectCourseSchema(course, baseUrl);
  }

  function injectCourseSchema(course, baseUrl) {
    const existing = document.getElementById('course-json-ld');
    if (existing) existing.remove();
    const pageUrl = baseUrl ? baseUrl + '/course.html?id=' + (course.documentId || course.id) : window.location.href;
    const imageUrl = course.images?.[0]?.url;
    const absImage = (baseUrl && imageUrl && !imageUrl.startsWith('http')) ? baseUrl + '/' + imageUrl.replace(/^\//, '') : (imageUrl || '');
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': course.title,
      'description': course.excerpt || course.description?.replace(/<[^>]+>/g, '').substring(0, 500) || '',
      'url': pageUrl,
      'provider': { '@type': 'Person', 'name': SITE_NAME, 'url': baseUrl ? baseUrl + '/' : '' },
      'inLanguage': ['en', 'hy'],
    };
    if (course.duration) schema.timeRequired = course.duration;
    if (absImage) schema.image = absImage;
    const script = document.createElement('script');
    script.id = 'course-json-ld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function escapeHtml(s) {
    if (s == null) return '';
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

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

  function renderDetail(course) {
    const lang = typeof window.getLang === 'function' ? window.getLang() : 'en';
    const title = lang === 'hy' && course.title_hy ? course.title_hy : course.title;
    const registerUrl = course.registerUrl || REGISTER_GOOGLE_FORM_URL;
    const imagesHtml =
      course.images && course.images.length > 0
        ? course.images
            .map(
              (img) => {
                const src = resolveImageUrl(img.url);
                return src ? `<div class="course-detail__gallery-item"><img src="${escapeHtml(src)}" alt="${escapeHtml(img.alt || course.title)}" width="400" height="250" loading="lazy" onerror="this.classList.add('img-failed')"></div>` : '';
              }
            )
            .join('')
        : '';

    const duration = (lang === 'hy' && course.duration_hy) ? course.duration_hy : (course.duration || '');
    const schedule = (lang === 'hy' && course.schedule_hy) ? course.schedule_hy : (course.schedule || '');
    const metaParts = [duration, schedule].filter(Boolean);
    const metaText = metaParts.join(' · ');
    const metaHtml = metaText ? `<p class="course-detail__meta">${escapeHtml(metaText)}</p>` : '';

    const description = (lang === 'hy' && course.description_hy) ? course.description_hy : (course.description || '');
    const contentHtml = description
      ? `<div class="course-detail__content-wrap"><div class="course-detail__content">${description}</div></div>`
      : '';

    const root = document.getElementById('course-detail-root');
    if (!root) return;
    root.innerHTML = `
      <section class="hero course-detail__hero">
        <div class="container">
          <h1 class="course-detail__title">${escapeHtml(title)}</h1>
          ${metaText ? `<p class="hero-lead">${escapeHtml(metaText)}</p>` : ''}
        </div>
      </section>
      <article class="course-detail__layout">
        <div class="course-detail__main">
          ${imagesHtml ? `<div class="course-detail__gallery">${imagesHtml}</div>` : ''}
          ${contentHtml}
        </div>
        <aside class="course-detail__cta">
          <p class="course-detail__cta-heading"><strong data-i18n="readyToJoin">Ready to join?</strong></p>
          <a href="${escapeHtml(registerUrl)}" class="btn-register course-detail__cta-btn" target="_blank" rel="noopener noreferrer" data-i18n="registerNow">Register now</a>
        </aside>
      </article>
    `;
  }

  function showLoading() {
    const loading = document.getElementById('course-loading');
    const error = document.getElementById('course-error');
    const notFound = document.getElementById('course-not-found');
    if (loading) loading.hidden = false;
    if (error) error.hidden = true;
    if (notFound) notFound.hidden = true;
  }

  function showNotFound() {
    const loading = document.getElementById('course-loading');
    const error = document.getElementById('course-error');
    const notFound = document.getElementById('course-not-found');
    if (loading) loading.hidden = true;
    if (error) error.hidden = true;
    if (notFound) notFound.hidden = false;
  }

  function init() {
    const idOrSlug = getCourseIdFromUrl();
    if (!idOrSlug) {
      showNotFound();
      return;
    }

    showLoading();
    const course = window.getCourseByIdOrSlug(idOrSlug);

    const loading = document.getElementById('course-loading');
    if (loading) loading.hidden = true;

    if (!course) {
      showNotFound();
      return;
    }

    window.__currentCourseId = idOrSlug;
    setPageMeta(course);
    renderDetail(course);
    if (window.applyI18n) window.applyI18n();
  }

  window.addEventListener('langchange', function () {
    const idOrSlug = window.__currentCourseId;
    if (!idOrSlug) return;
    const course = window.getCourseByIdOrSlug(idOrSlug);
    if (course) {
      setPageMeta(course);
      renderDetail(course);
      if (window.applyI18n) window.applyI18n();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
