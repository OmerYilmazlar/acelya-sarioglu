import fs from 'node:fs/promises'
import path from 'node:path'

const siteUrl = 'https://acelyasarioglu.com'
const distDir = path.resolve('dist')
const templatePath = path.join(distDir, 'index.html')

const routeMeta = {
  '/': {
    title: 'Uzman Klinik Psikolog Acelya Sarioglu | Ana Sayfa',
    description:
      'Yetiskin, cocuk ve ergen psikoterapi ile otizm ve DEHB degerlendirme hizmetleri. London merkezli yuz yuze ve online danismanlik.',
    keywords:
      'psikolog, klinik psikolog, psikoloji, danismanlik, terapi, Acelya Sarioglu, yetiskin terapisi, cocuk ergen terapisi, online terapi',
    label: 'Anasayfa',
  },
  '/yetiskin': {
    title: 'Yetiskin Psikoterapi | Acelya Sarioglu',
    description:
      'Yetiskin psikoterapi surecinde kaygi, panik atak, depresyon, obsesif belirtiler ve iliski zorluklari icin kisiye ozel destek.',
    keywords:
      'yetiskin psikolog, yetiskin terapisi, kaygi terapisi, panik atak psikologu, depresyon terapisi, online psikolog turkiye, turk psikolog londra',
    label: 'Yetiskin Psikoterapi',
  },
  '/cocuk-ergen': {
    title: 'Cocuk ve Ergen Psikoterapi | Acelya Sarioglu',
    description:
      'Cocuk ve ergenler icin guvenli terapi alani: duygusal zorluklar, okul uyumu, davranis sorunlari ve ebeveyn danismanligi.',
    keywords:
      'cocuk psikologu, ergen psikologu, cocuk terapisi, ergen terapisi, ebeveyn danismanligi, oyun terapisi, turk psikolog uk',
    label: 'Cocuk ve Ergen Psikoterapi',
  },
  '/terapi': {
    title: 'Terapi ve Tedavi Yaklasimlari | Acelya Sarioglu',
    description:
      'Bilissel Davranisci Terapi, Sema Terapi, Oyun Terapisi ve Mindfulness odakli, danisana ozel yapilandirilmis terapi surecleri.',
    keywords:
      'terapi yontemleri, bilissel davranisci terapi, sema terapi, mindfulness terapi, online terapi turkiye, turkce terapi londra',
    label: 'Terapi ve Tedavi',
  },
  '/otizm-dehb': {
    title: 'Otizm ve DEHB Degerlendirme | Acelya Sarioglu',
    description:
      'Otizm ve DEHB icin kapsamli tarama, degerlendirme, raporlama, psiko-egitim ve bireye ozel yonlendirme hizmetleri.',
    keywords:
      'otizm degerlendirme, dehb degerlendirme, dikkat eksikligi, hiperaktivite bozuklugu, norogelisimsel degerlendirme, otizm danismanlik',
    label: 'Otizm ve DEHB',
  },
  '/iletisim': {
    title: 'Iletisim | Acelya Sarioglu',
    description:
      'Terapi, otizm ve DEHB danismanligi icin iletisime gecin. London adresi, telefon ve e-posta bilgileri ile basvuru formu.',
    keywords:
      'psikolog iletisim, acelya sarioglu iletisim, psikolojik danismanlik randevu, online terapi randevu',
    label: 'Iletisim',
  },
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function upsert(html, regex, replacement) {
  if (regex.test(html)) return html.replace(regex, replacement)
  return html.replace('</head>', `  ${replacement}\n</head>`)
}

function upsertMetaByName(html, name, content) {
  const escaped = escapeHtml(content)
  const replacement = `<meta name="${name}" content="${escaped}" />`
  const regex = new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, 'i')
  return upsert(html, regex, replacement)
}

function upsertMetaByProperty(html, property, content) {
  const escaped = escapeHtml(content)
  const replacement = `<meta property="${property}" content="${escaped}" />`
  const regex = new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, 'i')
  return upsert(html, regex, replacement)
}

function upsertLinkCanonical(html, href) {
  const replacement = `<link rel="canonical" href="${escapeHtml(href)}" />`
  const regex = /<link\s+rel=["']canonical["'][^>]*>/i
  return upsert(html, regex, replacement)
}

function upsertAlternate(html, hreflang, href) {
  const replacement = `<link rel="alternate" hreflang="${hreflang}" href="${escapeHtml(href)}" />`
  const regex = new RegExp(`<link\\s+rel=["']alternate["'][^>]*hreflang=["']${hreflang}["'][^>]*>`, 'i')
  return upsert(html, regex, replacement)
}

function buildJsonLd(routePath, label, absoluteUrl) {
  const list = [{ name: 'Anasayfa', item: siteUrl }]

  if (routePath !== '/') {
    list.push({ name: label, item: absoluteUrl })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        name: 'Uzman Klinik Psikolog Acelya Sarioglu',
        url: siteUrl,
        inLanguage: 'tr-TR',
      },
      {
        '@type': 'WebPage',
        '@id': `${absoluteUrl}#webpage`,
        url: absoluteUrl,
        isPartOf: { '@id': `${siteUrl}#website` },
        inLanguage: 'tr-TR',
        name: label,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: list.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: entry.name,
          item: entry.item,
        })),
      },
    ],
  }
}

async function writePrerenderedRoute(routePath, meta, template) {
  const absoluteUrl = `${siteUrl}${routePath}`
  const socialImage = `${siteUrl}/og-default.jpg`
  let html = template

  html = upsert(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`)
  html = upsertMetaByName(html, 'description', meta.description)
  html = upsertMetaByName(html, 'keywords', meta.keywords)
  html = upsertMetaByName(html, 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
  html = upsertMetaByProperty(html, 'og:type', 'website')
  html = upsertMetaByProperty(html, 'og:site_name', 'Acelya Sarioglu')
  html = upsertMetaByProperty(html, 'og:locale', 'tr_TR')
  html = upsertMetaByProperty(html, 'og:title', meta.title)
  html = upsertMetaByProperty(html, 'og:description', meta.description)
  html = upsertMetaByProperty(html, 'og:url', absoluteUrl)
  html = upsertMetaByProperty(html, 'og:image', socialImage)
  html = upsertMetaByProperty(html, 'og:image:secure_url', socialImage)
  html = upsertMetaByProperty(html, 'og:image:width', '1200')
  html = upsertMetaByProperty(html, 'og:image:height', '630')
  html = upsertMetaByProperty(html, 'og:image:alt', meta.title)
  html = upsertMetaByName(html, 'twitter:card', 'summary_large_image')
  html = upsertMetaByName(html, 'twitter:title', meta.title)
  html = upsertMetaByName(html, 'twitter:description', meta.description)
  html = upsertMetaByName(html, 'twitter:image', socialImage)
  html = upsertLinkCanonical(html, absoluteUrl)
  html = upsertAlternate(html, 'tr-TR', absoluteUrl)
  html = upsertAlternate(html, 'x-default', absoluteUrl)

  const ldJsonScript = `<script type="application/ld+json" id="ld-json-main">${JSON.stringify(
    buildJsonLd(routePath, meta.label, absoluteUrl)
  )}</script>`
  html = upsert(html, /<script[^>]*id=["']ld-json-main["'][^>]*>[\s\S]*?<\/script>/i, ldJsonScript)

  const outputPath = routePath === '/' ? path.join(distDir, 'index.html') : path.join(distDir, routePath.slice(1), 'index.html')
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, html, 'utf8')
}

async function run() {
  const template = await fs.readFile(templatePath, 'utf8')

  for (const [routePath, meta] of Object.entries(routeMeta)) {
    await writePrerenderedRoute(routePath, meta, template)
  }

  console.log(`Prerendered ${Object.keys(routeMeta).length} routes.`)
}

run().catch((error) => {
  console.error('Route prerender failed:', error)
  process.exitCode = 1
})
