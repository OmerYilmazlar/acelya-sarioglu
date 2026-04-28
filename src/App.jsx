import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import cpcHands from './assets/images/home/cpc-hands.jpg'
import harleyStreet from './assets/images/home/harley-street.jpg'
import londonView1 from './assets/images/home/london4k.jpeg'
import mainHomeImage from './assets/images/home/main-image.png'
import sevenLionYard from './assets/images/home/seven-lion-yard-2.webp'
import tpdLogo from './assets/images/affiliations/turkish-psychological-association.png'
import bpsLogo from './assets/images/affiliations/british-psychological-society.png'
import isstLogo from './assets/images/affiliations/isst-schema-therapy.png'
import datemLogo from './assets/images/affiliations/datem-logo.png'
import aptLogo from './assets/images/affiliations/association-for-play-therapy.png'
import brandLogo from './assets/images/brand/klinik-psikolog.png'
import heroYetiskin from './assets/images/pages/yetiskin-terapi.jpg'
import heroCocukErgen from './assets/images/pages/hero-cocuk-ergen.jpg'
import heroTerapi from './assets/images/pages/hero-terapi.jpg'
import heroOtizmDehb from './assets/images/pages/hero-otizm-dehb.jpeg'
import heroIletisim from './assets/images/pages/hero-iletisim.jpeg'
import acelyaPortrait from './assets/images/profile/acelya-sarioglu.jpeg'
import sectionTherapyNotesCottonbro from './assets/images/sections/therapy-notes-cottonbro.jpg'
import sectionTerapiYaklasimlariVeTedavi from './assets/images/sections/Terapi Yaklaşımları ve Tedavi.png'
import sectionChildTherapyRoomTimur from './assets/images/sections/child-therapy-room-timur.jpg'
import sectionChildWithAbacus from './assets/images/sections/child_with_abacus.png'
import sectionNewImage from './assets/images/sections/new-image.jpg'
import sectionOzenleUyarlanmisTerapi from './assets/images/sections/ozenle-uyarlanmis-terapi.jpg'
import onlineTherapyImage from './assets/images/sections/online_therapy.png'
import sectionTraumaTherapyNewleaf from './assets/images/sections/trauma-therapy-newleaf.jpg'
import sectionAttentioner from './assets/images/sections/attentioner.png'
import eventParticipation1 from './assets/images/events/event-participation-1.jpg'
import eventParticipation2 from './assets/images/events/event-participation-2.jpg'
import eventParticipation3 from './assets/images/events/event-participation-3.jpg'
import platformLinkedin from './assets/images/platforms/platform-linkedin.jpg'
import platformPsychologyToday from './assets/images/platforms/platform-psychology-today.jpeg'
import platformItsComplicated from './assets/images/platforms/platform-its-complicated.png'
import platformMhwClinic from './assets/images/platforms/platform-mhw-clinic.webp'

const navItems = [
  { label: 'Yetişkin', path: '/yetiskin' },
  { label: 'Çocuk ve Ergen', path: '/cocuk-ergen' },
  { label: 'Terapi', path: '/terapi' },
  { label: 'Otizm ve DEHB', path: '/otizm-dehb' },
  { label: 'İletişim', path: '/iletisim' },
]

const menuGroups = {
  '/yetiskin': {
    title: 'Yetişkin',
    left: ['Yetişkin Psikoterapi', 'Kaygı ve Stres', 'Depresif Duygu Durumu', 'İlişki Zorlukları', 'Travma Sonrası Süreç'],
    right: ['Panik Atak', 'Obsesif Kompulsif Belirtiler', 'Sosyal Anksiyete', 'Öfke Problemleri', 'Online Terapi'],
  },
  '/cocuk-ergen': {
    title: 'Çocuk ve Ergen',
    left: ['Çocuk Terapisi', 'Ergen Terapisi', 'Ebeveyn Danışmanlığı', 'Okul Uyum Süreci', 'Duygu Düzenleme'],
    right: ['Boşanma Süreci', 'Kayıp ve Yas', 'Davranışsal Zorluklar', 'Akran İlişkileri', 'Oyun Terapisi'],
  },
  '/terapi': {
    title: 'Terapi',
    left: ['Bilişsel ve Davranışçı Terapiler', 'Şema Terapi', 'Oyun Terapisi', 'Mindfulness', 'Kısa Süreli Çözüm Odaklı Terapi'],
    right: ['Kişiye Özel Yaklaşım', 'Kanıta Dayalı Yöntemler', 'Online Seans', 'Yüz Yüze Seans', 'Uzman Danışmanlık'],
  },
  '/otizm-dehb': {
    title: 'Otizm ve DEHB',
    left: ['Otizm Taraması', 'DEHB Taraması', 'Kapsamlı Değerlendirme', 'Altın Standart Araçlar', 'Tanı Süreci'],
    right: ['Psiko-eğitim', 'Raporlama', 'Eğitim Ortamına Yönlendirme', 'Sosyal Uyum Desteği', 'Bakım Paketi'],
  },
}

const stockImages = {
  menuClinic: sectionAttentioner,
  menuFamily: sectionChildTherapyRoomTimur,
  yetiskinSplitA: sectionNewImage,
  yetiskinSplitB: sectionOzenleUyarlanmisTerapi,
  cocukSplitA: sectionChildTherapyRoomTimur,
  cocukSplitB: sectionChildWithAbacus,
  terapiSplitA: sectionNewImage,
  terapiSplitB: onlineTherapyImage,
  otizmSplitA: sectionTraumaTherapyNewleaf,
  otizmSplitB: sectionAttentioner,
  homeSplitA: sectionOzenleUyarlanmisTerapi,
  homeSplitB: sectionTherapyNotesCottonbro,
  therapyShowcase: sectionTerapiYaklasimlariVeTedavi,
}

const homeCarouselImages = [londonView1, cpcHands, harleyStreet, sevenLionYard]

const seoByPath = {
  '/': {
    title: 'Açelya Sarıoğlu - Klinik Psikolog | Terapi Hizmetleri',
    description:
      'Açelya Sarıoğlu - Klinik Psikolog. Yetişkin, çocuk-ergen psikoterapi, otizm ve DEHB değerlendirme. London merkezli profesyonel terapi, yüz yüze ve online danışmanlık hizmetleri.',
    keywords:
      'açelya sarıoğlu, psikolog london, klinik psikolog, psikoterapi, yetişkin terapisi, çocuk terapisi, ergen terapisi, otizm değerlendirme, dehb tanısı, online terapi',
  },
  '/yetiskin': {
    title: 'Yetişkin Psikoterapi | Açelya Sarıoğlu',
    description:
      'Yetişkin psikoterapi hizmetleri: kaygı, panik atak, depresyon, obsesif düşünceler, ilişki sorunları, travma ve stres yönetimi için kişiye özel terapi. Professional clinical psychologist Açelya Sarıoğlu tarafından.',
    keywords:
      'yetişkin psikolog, yetişkin psikoterapi, kaygı terapisi, panik atak, depresyon tedavisi, travma terapisi, london psikolog, online terapi uk',
  },
  '/cocuk-ergen': {
    title: 'Çocuk ve Ergen Psikoterapi | Açelya Sarıoğlu',
    description:
      'Çocuk ve ergen psikoterapi: duygusal sorunlar, davranış zorlukları, okul uyumu, duygu düzenleme, attentioner dikkat programı, ebeveyn danışmanlığı. Ankara ve London\'da hizmet.',
    keywords:
      'çocuk psikolog, ergen psikolog, çocuk psikoterapi, ergen psikoterapi, oyun terapisi, davranış terapisi, attentioner dikkat programı, ebeveyn rehberliği, london çocuk psikolog',
  },
  '/terapi': {
    title: 'Terapi Yöntemleri | Açelya Sarıoğlu',
    description:
      'Bilişsel Davranışçı Terapi (CBT), Şema Terapi, Oyun Terapisi, Mindfulness ve modern terapi yaklaşımları. Kanıta dayalı tedavi yöntemleri danışana özel uyarlanır.',
    keywords:
      'terapi yöntemleri, cbt terapi, şema terapi, mindfulness terapi, oyun terapisi, davranış değiştirme, psikolojik tedavi, london terapi merkezleri',
  },
  '/otizm-dehb': {
    title: 'Otizm ve DEHB Değerlendirme | Açelya Sarıoğlu',
    description:
      'Otizm Spektrum Bozukluğu (ASD) ve DEHB kapsamlı değerlendirmesi, tanısı, attentioner dikkat programı, psiko-eğitim ve eğitim yönlendirmesi. Altın standart değerlendirme araçları kullanılır.',
    keywords:
      'otizm değerlendirmesi, dehb tanısı, dikkat eksikliği hiperaktivite, nörogelişimsel değerlendirme, attentioner program, otizm spektrumu, london otizm değerlendirmesi',
  },
  '/iletisim': {
    title: 'İletişim | Açelya Sarıoğlu - Klinik Psikolog',
    description:
      'Açelya Sarıoğlu ile iletişime geçin. Terapi randevusu, otizm-DEHB değerlendirmesi danışmanlığı. London adresi, telefon, WhatsApp ve randevu formu.',
    keywords:
      'psikolog randevu, açelya sarıoğlu randevu, london psikolog iletişim, online terapi randevu, psikolojik danışmanlık',
  },
}

const siteUrl = 'https://www.acelyasarioglu.com'

const toAbsoluteUrl = (value) => (value.startsWith('http') ? value : `${siteUrl}${value}`)

const CONTACT_EMAIL = 'acelyasarioglu9@gmail.com'
const CONTACT_DISPLAY_EMAIL = 'psikolog@acelyasarioglu.com'
const CONTACT_PHONE_TR = '+905536121546'
const CONTACT_PHONE_UK = '+447541434812'
const WHATSAPP_LINK = 'https://wa.me/905536121546'
const INSTAGRAM_LINK = 'https://www.instagram.com/psikologacelyasarioglu/'
const DOKTOR_TAKVIMI_PROFILE_LINK = 'https://www.doktortakvimi.com/acelya-sarioglu/psikoloji/kadikoy'
const DOKTOR_TAKVIMI_LINK =
  'https://www.doktortakvimi.com/acelya-sarioglu/psikoloji/kadikoy?utm_source=mailing&utm_medium=email&utm_campaign=new_opinion%23profile-opinions&fbclid=PAQ0xDSwMUDwBleHRuA2FlbQIxMQABp6l5gh7UD_d_oA7-DvOY7OE-nz2fSfE1snBdiWNq55eFX7n12mrLov9hCODw_aem_JRSenP5MsFkPla13Q5TRVw'
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

const ogImageByPath = {
  '/': cpcHands,
  '/yetiskin': heroYetiskin,
  '/cocuk-ergen': heroCocukErgen,
  '/terapi': heroTerapi,
  '/otizm-dehb': heroOtizmDehb,
  '/iletisim': heroIletisim,
}

const socialLinks = [
  { id: 'whatsapp', label: 'WhatsApp', href: WHATSAPP_LINK },
  { id: 'instagram', label: 'Instagram', href: INSTAGRAM_LINK },
  { id: 'calendar', label: 'DoktorTakvimi', href: DOKTOR_TAKVIMI_LINK },
]

const profilePlatforms = [
  {
    name: 'LinkedIn',
    href: 'https://uk.linkedin.com/in/a%C3%A7elya-sar%C4%B1o%C4%9Flu-362128152',
    image: platformLinkedin,
    summary:
      'LinkedIn sayfam, mesleki yolculuğumun resmi özeti gibi; eğitim geçmişimi, klinik deneyimlerimi ve Londra\'daki profesyonel adımlarımı burada net biçimde görebilirsiniz.',
    story:
      'Burada eğitim adımlarımı, uzmanlaştığım alanları ve yıllar içinde üstlendiğim görevleri şeffaf biçimde anlatıyorum. Danışanlarımla kurduğum etik ve güvene dayalı yaklaşımın profesyonel arka planını görmek isteyen herkes için bu profil benim dijital özgeçmişim niteliğinde.',
  },
  {
    name: 'Complicated Life',
    href: 'https://complicated.life/find-a-therapist/london/counsellor-acelya-sarioglu',
    image: platformItsComplicated,
    summary:
      'Complicated Life profili, benimle çalışmayı düşünen danışanların terapi sürecini daha yakından hissetmesi için hazırladığım samimi bir tanıtım alanı.',
    story:
      'Bu platformda yeni danışanlara açık olduğum dönemleri, Türkçe ve İngilizce seans seçeneklerini ve hem online hem yüz yüze desteği nasıl planladığımı anlatıyorum. Anksiyete, panik atak, travma ve ilişki zorlukları gibi sık karşılaşılan konularda birlikte nasıl bir yol haritası çizdiğimizi burada net bir şekilde görebilirsiniz.',
  },
  {
    name: 'Psychology Today',
    href: 'https://www.psychologytoday.com/gb/counselling/acelya-sarioglu-london/1438632',
    image: platformPsychologyToday,
    summary:
      'Psychology Today üzerinde, hangi terapi ekollerinden beslendiğimi ve bu yöntemleri farklı ihtiyaçlara göre nasıl uyarladığımı daha teknik bir çerçevede anlatıyorum.',
    story:
      'CBT, Şema Terapi, Mindfulness ve Oyun Terapisi gibi yöntemleri danışanın ihtiyacına göre nasıl birleştirdiğimi bu sayfada anlatıyorum. BPS ve Türk Psikologlar Derneği üyeliğimle desteklenen profesyonel yaklaşımımı, kaygıdan travmaya uzanan farklı başlıklarda nasıl uyguladığımı görmek için bu profil en kapsamlı kaynaklardan biri.',
  },
  {
    name: 'MHW Clinic',
    href: 'https://mhwclinic.co.uk/acelya-sarioglu/',
    image: platformMhwClinic,
    summary:
      'MHW Clinic sayfasında ise ekip içindeki aktif rolümü ve çocuk, ergen, yetişkin danışanlarla yürüttüğüm çok disiplinli çalışma modelini paylaşıyorum.',
    story:
      'Bu sayfada psikoterapiye ek olarak otizm ve DEHB değerlendirme süreçlerini, ebeveyn ve okul iş birliğini nasıl yapılandırdığımı adım adım anlatıyorum. Hedefim yalnızca semptomları azaltmak değil; danışanın günlük yaşamına, aile sistemine ve gelişim yolculuğuna sürdürülebilir bir destek planı kurmak.',
  },
]

const eventPosts = [
  {
    id: 'event-1',
    title: 'Ekibimizle Tanışın',
    image: eventParticipation1,
    href: 'https://www.instagram.com/mhwcpsychology/p/DTgBBEtjePw/',
    summary:
      'MHW Clinic ekibi tanıtım paylaşımı: terapi süreci hakkında bilgi alma ve ön görüşme planlama duyurusu.',
  },
  {
    id: 'event-2',
    title: 'Online Ebeveyn Semineri: Otizm & DEHB',
    image: eventParticipation2,
    href: 'https://www.instagram.com/psikologacelyasarioglu/p/DVtj11PoEvI/',
    summary:
      'Erken belirtileri fark etme semineri: otizm ve DEHB belirtileri, değerlendirme süreci ve ebeveynler için destek adımları.',
  },
  {
    id: 'event-3',
    title: 'Meet Our Psychologist: Açelya',
    image: eventParticipation3,
    href: 'https://www.instagram.com/mhwcpsychology/p/DTgId08jkgx/',
    summary: 'Klinik profil paylaşımı: Açelya Sarıoğlu uzmanlığını ve klinik içindeki aktif rolünü öne çıkaran tanıtım içeriği.',
  },
]

const routeLabelByPath = {
  '/': 'Anasayfa',
  '/yetiskin': 'Yetişkin Psikoterapi',
  '/cocuk-ergen': 'Çocuk ve Ergen Psikoterapi',
  '/terapi': 'Terapi ve Tedavi',
  '/otizm-dehb': 'Otizm ve DEHB',
  '/iletisim': 'İletişim',
}

const serviceByPath = {
  '/yetiskin': {
    name: 'Yetişkin Psikoterapi',
    description: 'Kaygı, panik atak, depresyon, obsesif belirtiler ve ilişki zorlukları için kişiye özel psikoterapi desteği.',
  },
  '/cocuk-ergen': {
    name: 'Çocuk ve Ergen Psikoterapi',
    description: 'Çocuk ve ergenler için gelişim dönemine uygun terapi, ebeveyn danışmanlığı ve duygusal destek hizmeti.',
  },
  '/terapi': {
    name: 'Terapi ve Tedavi Yaklaşımları',
    description: 'BDT, Şema Terapi, Oyun Terapisi ve Mindfulness temelli, danışana özel yapılandırılmış terapi süreci.',
  },
  '/otizm-dehb': {
    name: 'Otizm ve DEHB Değerlendirme',
    description: 'Otizm ve DEHB için tarama, değerlendirme, raporlama, Attentioner ve psiko-eğitim odaklı profesyonel danışmanlık.',
  },
}

const practiceSchema = {
  '@type': 'Psychologist',
  '@id': `${siteUrl}#practice`,
  name: 'Uzman Klinik Psikolog Açelya Sarıoğlu',
  url: siteUrl,
  image: toAbsoluteUrl(acelyaPortrait),
  email: CONTACT_DISPLAY_EMAIL,
  telephone: CONTACT_PHONE_UK,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '97-99 Whitechapel Rd',
    addressLocality: 'London',
    postalCode: 'E1 1DT',
    addressCountry: 'GB',
  },
  sameAs: [
    INSTAGRAM_LINK,
    DOKTOR_TAKVIMI_PROFILE_LINK,
    'https://uk.linkedin.com/in/a%C3%A7elya-sar%C4%B1o%C4%9Flu-362128152',
    'https://www.psychologytoday.com/gb/counselling/acelya-sarioglu-london/1438632',
    'https://complicated.life/find-a-therapist/london/counsellor-acelya-sarioglu',
    'https://mhwclinic.co.uk/acelya-sarioglu/',
  ],
  areaServed: ['TR', 'GB'],
  knowsAbout: [
    'Yetişkin Psikoterapi',
    'Çocuk ve Ergen Terapisi',
    'Otizm Değerlendirmesi',
    'DEHB Değerlendirmesi',
    'Attentioner Dikkatimi Topluyorum Programı',
    'Online Terapi',
  ],
}

function buildBreadcrumbSchema(path) {
  const list = [{ name: 'Anasayfa', item: siteUrl }]

  if (path !== '/') {
    list.push({ name: routeLabelByPath[path], item: `${siteUrl}${path}` })
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: list.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  }
}

function buildServiceSchema(path) {
  const service = serviceByPath[path]
  if (!service) return null

  return {
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: { '@id': `${siteUrl}#practice` },
    areaServed: ['TR', 'GB'],
    availableChannel: [
      {
        '@type': 'ServiceChannel',
        serviceUrl: `${siteUrl}${path}`,
        availableLanguage: ['tr', 'en'],
      },
    ],
  }
}

const schemaByPath = Object.keys(seoByPath).reduce((acc, path) => {
  const graph = [practiceSchema, buildBreadcrumbSchema(path)]
  const service = buildServiceSchema(path)

  if (service) graph.push(service)

  if (path === '/iletisim') {
    graph.push({
      '@type': 'ContactPage',
      name: 'İletişim',
      url: `${siteUrl}/iletisim`,
    })
  }

  acc[path] = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return acc
}, {})

function setMetaTag(name, content, attr = 'name') {
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

function setAlternateLink(hreflang, href) {
  let link = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'alternate')
    link.setAttribute('hreflang', hreflang)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function setJsonLd(schemaObj) {
  let script = document.head.querySelector('#ld-json-main')
  if (!script) {
    script = document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    script.setAttribute('id', 'ld-json-main')
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(schemaObj)
}

function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const meta = seoByPath[location.pathname] || seoByPath['/']
    const absoluteUrl = `${siteUrl}${location.pathname}`
    const absoluteImage = toAbsoluteUrl(ogImageByPath[location.pathname] || ogImageByPath['/'])

    document.title = meta.title
    setMetaTag('description', meta.description)
    setMetaTag('keywords', meta.keywords)
    setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
    setMetaTag('og:title', meta.title, 'property')
    setMetaTag('og:description', meta.description, 'property')
    setMetaTag('og:type', 'website', 'property')
    setMetaTag('og:site_name', 'Açelya Sarıoğlu', 'property')
    setMetaTag('og:locale', 'tr_TR', 'property')
    setMetaTag('og:url', absoluteUrl, 'property')
    setMetaTag('og:image', absoluteImage, 'property')
    setMetaTag('og:image:secure_url', absoluteImage, 'property')
    setMetaTag('og:image:alt', meta.title, 'property')
    setMetaTag('og:image:width', '1200', 'property')
    setMetaTag('og:image:height', '630', 'property')
    setMetaTag('twitter:title', meta.title)
    setMetaTag('twitter:description', meta.description)
    setMetaTag('twitter:image', absoluteImage)
    setMetaTag('twitter:card', 'summary_large_image')
    setCanonical(absoluteUrl)
    setAlternateLink('tr-TR', absoluteUrl)
    setAlternateLink('x-default', absoluteUrl)

    const pageSchema = schemaByPath[location.pathname] || schemaByPath['/']
    setJsonLd(pageSchema)
  }, [location.pathname])

  return null
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}

function SocialIcon({ id }) {
  if (id === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M19.1 4.9A9.95 9.95 0 0 0 12 2a10 10 0 0 0-8.7 15l-1.2 4.4 4.5-1.2A10 10 0 1 0 19.1 4.9ZM12 20a7.9 7.9 0 0 1-4-1.1l-.3-.2-2.6.7.7-2.5-.2-.3A8 8 0 1 1 12 20Zm4.4-5.8c-.2-.1-1.3-.6-1.5-.6s-.3-.1-.5.1-.5.6-.6.7c-.1.1-.3.2-.5.1-1.3-.7-2.2-1.3-3.1-2.9-.2-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.3-.4.1-.2 0-.3 0-.4s-.5-1.2-.7-1.6c-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.1.9 2.3c.1.1 1.5 2.4 3.7 3.3 2.2.9 2.2.6 2.6.6s1.3-.5 1.5-1c.2-.6.2-1 .1-1.1-.1-.1-.2-.1-.5-.3Z" />
      </svg>
    )
  }

  if (id === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm5.2-3.1a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm.9 15.9h-2v-6h2Zm-1-7.1a1.1 1.1 0 1 1 1.1-1.1 1.1 1.1 0 0 1-1.1 1.1Zm6 7.1h-2v-3.3c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.7v3.4h-2v-6h1.9v.8h.1a2.1 2.1 0 0 1 1.9-1c2 0 2.4 1.3 2.4 3.1Z" />
    </svg>
  )
}

function SocialLinks({ className = '' }) {
  return (
    <div className={`social-links ${className}`.trim()}>
      {socialLinks.map((item) => (
        <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className={`social-link ${item.id}`}>
          <SocialIcon id={item.id} />
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  )
}

function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState('')
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const lastScrollYRef = useRef(0)
  const isHome = location.pathname === '/'

  useEffect(() => {
    setMobileOpen(false)
    setDesktopOpen('')
    setIsHeaderVisible(true)
    setIsAtTop(true)
    lastScrollYRef.current = window.scrollY
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsAtTop(currentY < 12)

      if (currentY < 80) {
        setIsHeaderVisible(true)
      } else if (currentY < lastScrollYRef.current) {
        setIsHeaderVisible(true)
      } else {
        setIsHeaderVisible(false)
      }

      lastScrollYRef.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openData = useMemo(() => menuGroups[desktopOpen], [desktopOpen])

  return (
    <header className={`site-header ${isHome ? 'home-overlay' : ''} ${isAtTop ? 'at-top' : ''} ${isHeaderVisible ? 'is-visible' : 'is-hidden'}`}>
      <div className="header-inner">
        <Link className="brand" to="/">
          <img src={brandLogo} alt="Açelya Klinik Psikoloji" className="brand-logo" />
          <span className="sr-only">Açelya Klinik Psikoloji</span>
        </Link>
        <button className="burger" onClick={() => setMobileOpen((p) => !p)} aria-label="Menüyü aç">
          <span />
          <span />
          <span />
        </button>
        <nav className="desktop-nav" aria-label="Ana menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              className={`nav-button ${location.pathname === item.path ? 'active' : ''}`}
              to={item.path}
              onClick={() => {
                if (menuGroups[item.path]) {
                  setDesktopOpen((p) => (p === item.path ? '' : item.path))
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <SocialLinks className="header-social" />
      </div>

      {openData && (
        <div className="mega-menu">
          <div className="menu-image" style={{ backgroundImage: `url(${stockImages.menuClinic})` }} />
          <div className="menu-content">
            <div className="menu-top">
              <h2>{openData.title}</h2>
              <button className="menu-close" onClick={() => setDesktopOpen('')}>
                Kapat
              </button>
            </div>
            <div className="menu-grid">
              <ul>
                {openData.left.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul>
                {openData.right.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="menu-image" style={{ backgroundImage: `url(${stockImages.menuFamily})` }} />
        </div>
      )}

      {mobileOpen && (
        <div className="mobile-panel">
          <div className="mobile-links">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="mobile-link">
                {item.label}
              </Link>
            ))}
          </div>
          <SocialLinks className="mobile-social" />
        </div>
      )}
    </header>
  )
}

function FloatingScrollArrows() {
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateScrollState = () => {
      const currentY = window.scrollY
      const viewport = window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      const threshold = Math.max(320, viewport)

      setCanScrollUp(currentY > 140)
      setCanScrollDown(currentY + viewport < pageHeight - 140)
      setIsVisible(currentY > threshold)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollDown = () => {
    window.scrollBy({ top: Math.round(window.innerHeight * 0.85), behavior: 'smooth' })
  }

  return (
    <div className={`floating-scroll-arrows ${isVisible ? 'is-visible' : 'is-hidden'}`} aria-label="Sayfa Kaydırma Kontrolleri">
      <button
        type="button"
        className="scroll-arrow"
        onClick={scrollUp}
        aria-label="Yukarı Git"
        disabled={!canScrollUp}
      >
        ↑
      </button>
      <button
        type="button"
        className="scroll-arrow"
        onClick={scrollDown}
        aria-label="Aşağı Git"
        disabled={!canScrollDown}
      >
        ↓
      </button>
    </div>
  )
}

function Hero({ title, subtitle, image, images, homeStyle = false, homeCtaLabel = 'Daha Fazla', homeCtaTo = '/iletisim' }) {
  const hasCarousel = Array.isArray(images) && images.length > 0
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!hasCarousel) return

    images.forEach((src) => {
      const preloadImage = new Image()
      preloadImage.decoding = 'async'
      preloadImage.src = src
      if (typeof preloadImage.decode === 'function') {
        preloadImage.decode().catch(() => {})
      }
    })
  }, [hasCarousel, images])

  useEffect(() => {
    if (!hasCarousel) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [hasCarousel, images])

  const heroBackground = hasCarousel ? images[activeIndex] : image

  return (
    <section className={`hero ${homeStyle ? 'home-clinic' : ''}`} style={{ backgroundImage: `linear-gradient(rgba(15, 44, 53, 0.45), rgba(15, 44, 53, 0.45)), url(${heroBackground})` }}>
      <div className="hero-content">
        <p>{subtitle}</p>
        <h1>{title}</h1>
        {!homeStyle ? (
          <a href="#icerik" className="btn-primary">
            Daha Fazla
          </a>
        ) : null}
      </div>
      {homeStyle ? (
        <Link to={homeCtaTo} className="hero-contact-cta">
          {homeCtaLabel}
        </Link>
      ) : null}
    </section>
  )
}

function CardGrid({ title, items }) {
  const [expandedCards, setExpandedCards] = useState({})

  const toggleExpandedCard = (title) => {
    setExpandedCards((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <section className="section" id="icerik">
      <div className="section-head">
        <h2>{title}</h2>
      </div>
      <div className={`card-grid ${items.length === 3 ? 'card-grid-three' : ''}`}>
        {items.map((item) => {
          const isExpandable = Boolean(item.readMoreText)
          const isExpanded = Boolean(expandedCards[item.title])

          return (
            <article key={item.title} className={`card ${isExpanded ? 'expanded' : ''}`}>
              <h3>{item.title}</h3>
              <p className="card-summary">{item.text}</p>
              {isExpandable ? (
                <>
                  {isExpanded ? <p className="card-read-more-text">{item.readMoreText}</p> : null}
                  <button
                    type="button"
                    className="card-read-more-btn"
                    onClick={() => toggleExpandedCard(item.title)}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? 'Daha Az Göster' : 'Devamını Oku'}
                  </button>
                </>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ChildFocusSection() {
  const methods = [
    {
      title: 'Oyun Terapisi',
      text: 'Çocuklarla çalışırken sık kullandığım ekollerden biri Oyun Terapisidir.',
    },
    {
      title: 'Bilişsel ve Davranışçı Terapiler',
      text: 'Çocuklarla çalışırken sık kullandığım diğer yaklaşım Bilişsel ve Davranışçı Terapilerdir.',
    },
    {
      title: 'Dikkat Geliştirme Çalışmaları',
      text: 'Dikkat Eksikliği ve Hiperaktivite (DEHB) olan 7-18 yaş arası çocuklarla, bilimsel temelli Attentioner – Dikkatimi Topluyorum Programı ile çalışıyorum.',
    },
  ]

  return (
    <section className="section child-focus-section" id="icerik">
      <div className="section-head">
        <h2>Kullandığım Yaklaşımlar</h2>
      </div>
      <div className="child-focus-list">
        {methods.map((item) => (
          <article key={item.title} className="card child-focus-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <aside className="attentioner-callout">
        <h3>Attentioner</h3>
        <p>
          Dikkat Eksikliği ve Hiperaktivite (DEHB) olan 7-18 yaş arası çocuklarla, bilimsel temelli Attentioner – Dikkatimi Topluyorum Programı ile çalışıyorum.
        </p>
        <p>
          Bu program, dikkat sürdürme, dürtüsellik yönetimi ve günlük işlevselliği desteklemeye yardımcı olur. Detaylı bilgi için{' '}
          <Link to="/otizm-dehb" className="attentioner-link">
            Otizm ve DEHB sayfasını
          </Link>
          {' '}inceleyebilirsiniz.
        </p>
      </aside>
    </section>
  )
}

function AffiliationsSection() {
  const logos = [
    { src: tpdLogo, alt: 'Türk Psikologlar Derneği' },
    { src: bpsLogo, alt: 'The British Psychological Society' },
    { src: isstLogo, alt: 'International Society of Schema Therapy' },
    { src: datemLogo, alt: 'DATEM' },
    { src: aptLogo, alt: 'Association for Play Therapy' },
  ]

  return (
    <section className="section affiliations">
      <div className="section-head centered">
        <h2>Üye Olduğu Kurum ve Kuruluşlar</h2>
      </div>
      <div className="affiliations-grid">
        {logos.map((logo) => (
          <article key={logo.alt} className="affiliation-card">
            <img src={logo.src} alt={logo.alt} loading="lazy" />
            <p className="affiliation-caption">{logo.alt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function PlatformReferencesSection() {
  return (
    <section className="section platform-references">
      <div className="section-head centered">
        <h2>Diğer Platformlar</h2>
        <p className="platform-subtitle">Açelya Sarıoğlu profilini doğrulayabileceğiniz profesyonel platformlar</p>
      </div>
      <div className="platform-stack">
        {profilePlatforms.map((platform, index) => (
          <article
            key={platform.name}
            className={`platform-feature ${index % 2 === 1 ? 'reverse' : ''} ${index === 1 || index === 2 ? 'compact' : ''}`}
          >
            <div className="platform-feature-media" aria-hidden="true" />
            <div className="platform-feature-content">
              <div className="platform-feature-frame">
                <h3>{platform.name}</h3>
                <p>{platform.summary}</p>
                <p>{platform.story}</p>
                <a href={platform.href} target="_blank" rel="noreferrer" className="platform-link-btn">
                  Profili Gör
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function InstagramWidgetSection() {
  return (
    <section className="instagram-events-showcase">
      <div className="instagram-events-shell">
        {eventPosts.map((post, index) => (
          <article
            key={post.id}
            className={`instagram-event-tile ${index === 0 ? 'tile-left' : ''} ${index === 1 ? 'tile-center' : ''} ${index === 2 ? 'tile-right' : ''}`}
          >
            <div className="instagram-event-image-wrap">
              <img src={post.image} alt={`${post.title} etkinlik görseli`} loading="lazy" />
            </div>
            <div className="instagram-event-head">
              <span className="instagram-event-motif" aria-hidden="true"></span>
              <h3>{post.title}</h3>
            </div>
            <p>{post.summary}</p>
            <a href={post.href} target="_blank" rel="noreferrer" className="instagram-event-link">
              Gönderiyi Gör
            </a>
          </article>
        ))}
      </div>

      <div className="instagram-events-cta-wrap">
        <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" className="btn-primary dark-cta">
          Instagram Profiline Git
        </a>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const comments = [
    {
      name: 'K....M',
      text: 'Gerek samimiyeti gerekse anlayışlı yaklaşımıyla olaylara farklı açılardan bakmamı ve kendimi daha iyi anlamamı sağladı. Altı aydır devam eden seanslarda verilen görevlerle sorunumun üzerine daha etkili gidebiliyorum.',
    },
    {
      name: 'E.....',
      text: 'Kaygı ve stres durumum için seans alıyorum. Seanslardan sonra ilerleme kaydetmek için görevler veriyor ve süreci takip ediyor. Bakış açımın değiştiğini ve kaygımın azalmaya başladığını fark ediyorum.',
    },
    {
      name: 'A.....',
      text: 'Açelya Hanım ile eşimden ayrıldığım dönemde çalıştım. Bu süreci atlatamayacağımı düşünürken, sağladığı farkındalık ve destek sayesinde kendimi daha güçlü ve özgüvenli hissediyorum.',
    },
  ]

  return (
    <section className="section testimonials">
      <div className="section-head centered">
        <h2>Danışan Görüşleri</h2>
      </div>
      <div className="testimonials-grid">
        {comments.map((comment) => (
          <article key={comment.name} className="testimonial-card">
            <p>{comment.text}</p>
            <h3>{comment.name}</h3>
          </article>
        ))}
      </div>
      <div className="centered-link-wrap">
        <a href={DOKTOR_TAKVIMI_LINK} className="text-link dark" target="_blank" rel="noreferrer">
          Tüm Yorumlar
        </a>
      </div>
    </section>
  )
}

function ServicePreviewSection() {
  const previews = [
    {
      title: 'Yetişkin Psikoterapi',
      text: 'Terapide herkese uyan tek bir yöntem yoktur. Hepimiz farklıyız ve terapiye farklı sebeplerle geliriz. İşte bu yüzden yaklaşımımız kişiye özeldir...',
      to: '/yetiskin',
    },
    {
      title: 'Çocuk ve Ergen',
      text: 'Çocuk ve ergen terapisi, çocukların zorlayıcı düşüncelerini, duygularını ve davranışlarını ifade edebilecekleri güvenli bir alan sunar...',
      to: '/cocuk-ergen',
    },
    {
      title: 'Otizm ve DEHB',
      text: 'Çocuklar, ergenler ve yetişkinler için otizm tanısı almak gelişimsel zorlukları anlamak ve çözmek açısından önemlidir...',
      to: '/otizm-dehb',
    },
    {
      title: 'Terapi',
      text: 'Terapi, birçok farklı şekilde uygulanabilir. Her danışanım için en etkili yaklaşımı belirleyerek süreci ihtiyaçlara göre şekillendiriyorum...',
      to: '/terapi',
    },
  ]

  return (
    <section className="section service-preview">
      <div className="service-preview-grid">
        {previews.map((item) => (
          <article key={item.title} className="service-preview-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link className="text-link dark" to={item.to}>
              Daha Fazlası İçin
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

function TherapyMethodsSection() {
  const leftColumn = [
    'Kaygı (Anksiyete) Bozuklukları ve Panik Atak',
    'Obsesif Kompulsif Bozukluk (OKB)',
    'Depresyon ve Duygu Durum Süreçleri',
    'Travma ve Travma Sonrası Stres Bozukluğu (TSSB)',
    'Sosyal Fobi ve Özgül Fobiler',
    'Öfke Kontrolü ve Duygu Düzenleme Güçlükleri',
    'Kişilik Örüntüleri ve Kişilik Bozuklukları',
    'Yeme ve Beslenme Bozuklukları',
  ]

  const rightColumn = [
    'Çocuk ve Ergen Psikoterapisi',
    'Ebeveyn Danışmanlığı ve Rehberliği',
    'Otizm ve DEHB Değerlendirmesi Sonrası Psikoeğitim',
  ]

  return (
    <section className="therapy-showcase section">
      <div className="therapy-showcase-image" style={{ backgroundImage: `url(${stockImages.therapyShowcase})` }} />
      <div className="therapy-showcase-content">
        <div className="therapy-showcase-frame">
          <h2>Çalışma Alanları</h2>
          <p className="therapy-intro">
            Destek sunduğum başlıca konuları aşağıda kategorize edilmiş olarak bulabilirsiniz:
          </p>
          <div className="therapy-columns">
            <ul className="therapy-list">
              <li className="therapy-category">Yetişkin Psikoterapisi</li>
              {leftColumn.map((item) => (
                <li key={item} className="therapy-item">{item}</li>
              ))}
            </ul>
            <ul className="therapy-list">
              <li className="therapy-category">Çocuk, Ergen ve Aile Danışmanlığı</li>
              {rightColumn.map((item) => (
                <li key={item} className="therapy-item">{item}</li>
              ))}
            </ul>
          </div>
          <p className="therapy-note">
            Not: Londra dışında olan veya çeşitli sebeplerle kliniğe gelemeyen danışanlarım için Online Terapi hizmeti de sunmaktayım.
          </p>
          <p className="therapy-contact">
            Sürece dair sorularınız veya randevu talepleriniz için benimle iletişime geçebilirsiniz.
          </p>
          <Link className="btn-primary dark-cta therapy-showcase-cta" to="/iletisim">
            İletişim
          </Link>
        </div>
      </div>
    </section>
  )
}

function HomeChelseaSplit({ title, text, image, reverse = false, stretchRight = false }) {
  return (
    <section className={`chelsea-split-wrap ${reverse ? 'reverse' : ''} ${stretchRight ? 'stretch-right' : ''}`}>
      <div className="chelsea-split-image" style={{ backgroundImage: `url(${image})` }} />
      <div className="chelsea-split-panel">
        <article className="chelsea-split-frame">
          <h2>{title}</h2>
          <p>{text}</p>
          <Link to="/iletisim" className="text-link chelsea-link">İletişime Geçin</Link>
        </article>
      </div>
    </section>
  )
}

function SplitSection({ title, text, image, reverse = false }) {
  return (
    <section className={`split ${reverse ? 'reverse' : ''}`}>
      <div className="split-image" style={{ backgroundImage: `url(${image})` }} />
      <div className="split-content">
        <h2>{title}</h2>
        <p>{text}</p>
        <Link to="/iletisim" className="text-link">İletişime Geçin</Link>
      </div>
    </section>
  )
}

function MockForm({ title = 'Danışmanlık Başvuru Formu' }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Lütfen zorunlu alanları doldurun.' })
      return
    }

    if (!formData.consent) {
      setStatus({ type: 'error', message: 'Lütfen gizlilik onay kutusunu işaretleyin.' })
      return
    }

    setIsSending(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: 'Yeni Danışmanlık Başvurusu - acelyasarioglu.com',
          _template: 'table',
          _captcha: 'false',
        }),
      })

      if (!response.ok) {
        throw new Error('Form gönderilemedi')
      }

      setStatus({ type: 'success', message: 'Mesajınız başarıyla gönderildi. En kısa sürede dönüş sağlanacaktır.' })
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
      })
    } catch {
      setStatus({
        type: 'error',
        message: `Form şu anda gönderilemedi. Lütfen tekrar deneyin veya ${CONTACT_EMAIL} adresine e-posta gönderin.`,
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="section form-wrap">
      <div className="section-head">
        <h2>{title}</h2>
      </div>
      <form className="mock-form" onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="Ad"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input name="lastName" placeholder="Soyad" value={formData.lastName} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
        <input name="phone" placeholder="Telefon numaranız" type="tel" value={formData.phone} onChange={handleChange} />
        <textarea
          name="message"
          placeholder="Kısaca nasıl destek almak istediğinizi yazabilirsiniz"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <label className="checkbox">
          <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required />
          Gizlilik metnini okudum ve kabul ediyorum.
        </label>
        {status.message ? <p className={`form-status ${status.type}`}>{status.message}</p> : null}
        <button type="submit" className="btn-primary">
          {isSending ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </form>
    </section>
  )
}

function PageTemplate({ title, subtitle, image, introTitle, introText, cardsTitle, cards, cardsSection, splitA, splitB, currentPath }) {
  const introParagraphs = introText.split(/\n\s*\n/)

  return (
    <main>
      <Hero title={title} subtitle={subtitle} image={image} />
      <section className="section" id="icerik">
        <div className="section-head">
          <h2>{introTitle}</h2>
        </div>
        {introParagraphs.map((paragraph) => (
          <p key={paragraph} className="intro-text-large">
            {paragraph}
          </p>
        ))}
      </section>
      {cardsSection || <CardGrid title={cardsTitle} items={cards} />}
      <SplitSection title={splitA.title} text={splitA.text} image={splitA.image} />
      <SplitSection title={splitB.title} text={splitB.text} image={splitB.image} reverse />
      <RelatedServicesSection currentPath={currentPath} />
      <MockForm />
    </main>
  )
}

function RelatedServicesSection({ currentPath }) {
  const items = navItems.filter((item) => item.path !== currentPath && item.path !== '/iletisim')

  return (
    <section className="section related-services" aria-labelledby="related-services-title">
      <div className="section-head">
        <h2 id="related-services-title">İlgili Hizmetler</h2>
      </div>
      <div className="related-services-links">
        {items.map((item) => (
          <Link key={item.path} to={item.path} className="related-service-link">
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  )
}

function YetiskinPage() {
  return (
    <PageTemplate
      title="Yetişkin Psikoterapi"
      subtitle="Kişiye özel terapi ve danışmanlık"
      image={heroYetiskin}
      introTitle="Yetişkin Psikoterapi"
      introText="Terapide herkese uyan tek bir yöntem yoktur. Hepimiz farklıyız ve terapiye farklı sebeplerle geliriz. Bazı insanlar belirli bir hedef üzerinde çalışmak için terapiye gelir. Bazıları geçmişlerini daha derinlemesine anlamak ve bunun bugün onları nasıl etkilediğini keşfetmek ister. Kimileri ise sadece bir şeylerin ters gittiğini hisseder ama tam olarak nedenini bilemez. İşte bu yüzden yaklaşımımız kişiye özeldir. Bize ulaştığınız andan itibaren size en doğru desteği sağlamaya odaklanıyoruz. İyi bir terapi, doğru eşleşmeyi bulmakla ilgilidir hem terapistinizle kurduğunuz bağ açısından hem de üzerinde çalışmak istediğiniz konu ve terapistin benimsediği yöntem açısından. Sizi doğru psikologla eşleştirmek için ihtiyaçlarınız, hedefleriniz ve öğrenme tarzınız gibi çeşitli faktörleri dikkate alıyoruz. Bu kişiye özel yaklaşım, terapiye başladıktan sonra da devam ediyor. Tüm psikologlarımız birden fazla terapi yöntemi konusunda eğitimlidir, bu sayede süreciniz boyunca size en fazla fayda sağlayacağını düşündükleri yaklaşıma göre yöntemlerini uyarlayabilirler. Yetişkin psikoterapi seanslarımı Londra'da ikamet eden danışanlarımla My Health and Wellbeing Clinic'te yüz yüze olarak düzenlerken, Londra dışında yaşayan danışanlarıma online olarak hizmet vermekteyim."
      cardsTitle="Yetişkinlerle Çalıştığım Başlıca Konular"
      cards={[
        { title: 'Kaygı ve Stres', text: 'Danışanlar terapiye çok farklı sebeplerle gelebilir. Belirli bir ruh sağlığı sorunu ile mücadele ediyor olabilirsin ya da sadece içten içe bir şeylerin yolunda gitmediğini hissedebilirsin.' },
        { title: 'Duygu Durumu ve İlişkiler', text: 'Her durumda, sana en iyi şekilde destek olmak için buradayım. Geniş bir yelpazede farklı konular üzerine çalışıyorum.' },
        { title: 'Kişiye Özel Planlama', text: 'Her danışanım için süreci kişiye özel olarak planlıyor ve en uygun terapi yaklaşımını belirleyerek ilerliyorum.' },
        { title: 'Online ve Yüz Yüze Destek', text: 'Eğer yaşadığın zorlukla ilgili destek alma zamanının geldiğini düşünüyorsan destek almak için benimle iletişime geçebilirsin.' },
      ]}
      splitA={{
        title: 'Yetişkinlerle Çalıştığım Başlıca Konular',
        text: 'Danışanlar terapiye çok farklı sebeplerle gelebilir. Belirli bir ruh sağlığı sorunu ile mücadele ediyor olabilirsin ya da sadece içten içe bir şeylerin yolunda gitmediğini hissedebilirsin. Her durumda, sana en iyi şekilde destek olmak için buradayım. Geniş bir yelpazede farklı konular üzerine çalışıyorum.',
        image: stockImages.yetiskinSplitA,
      }}
      splitB={{
        title: 'Destek Sürecine Başlayın',
        text: 'Eğer yaşadığın zorlukla ilgili destek alma zamanının geldiğini düşünüyorsan destek almak için benimle iletişime geçebilirsin. Her danışanım için süreci kişiye özel olarak planlıyor ve en uygun terapi yaklaşımını belirleyerek ilerliyorum.',
        image: stockImages.yetiskinSplitB,
      }}
      currentPath="/yetiskin"
    />
  )
}

function CocukPage() {
  return (
    <PageTemplate
      title="Çocuk ve Ergen Psikoterapi"
      subtitle="Gelişim dönemlerine uygun güvenli destek alanı"
      image={heroCocukErgen}
      introTitle="Çocuk ve Ergen Psikoterapi"
      introText="Çocuk ve ergen terapisi, yetişkin terapisine benzer şekilde, çocukların zorlayıcı düşüncelerini, duygularını ve davranışlarını ifade edebilecekleri güvenli bir alan sunar. Tıpkı yetişkinler gibi, çocuklar da büyük yaşam değişimlerinden (boşanma, okul değişikliği, sevilen birini kaybetme gibi) duygusal olarak etkilenebilir. Bazı durumlarda, bu duygusal zorluklar zamanla kendiliğinden düzelirken, bazen ise düzelmez. Eğer çocuğunuzun böyle bir durum yaşadığını düşünüyorsanız, onun ihtiyaç duyduğu desteği alabilmesi için uzman bir terapistten yardım almak önemlidir. Çocukken, çoğu zaman duygularımızı tam olarak ifade edecek kelimelere veya yaşam deneyimine sahip olmayız. Bu yüzden, çocukların hayatındaki yetişkinlerin, bir şeylerin yolunda gitmediğini fark etmeleri ve harekete geçmeleri büyük önem taşır."
      cardsSection={<ChildFocusSection />}
      splitA={{
        title: 'Çocuğunuz İçin Güvenli Alan',
        text: 'Çocuk ve ergenlerle yürütülen terapi sürecinde, yaş dönemine uygun, güvenli ve destekleyici bir çalışma alanı oluşturuyorum. Amaç; duygusal zorlukları anlamlandırmak, baş etme becerilerini güçlendirmek ve aileyi sürece aktif şekilde dahil etmektir.',
        image: stockImages.cocukSplitA,
      }}
      splitB={{
        title: 'Çocuklarla Çalışırken Kullandığım Ekoller',
        text: 'Çocuklarla çalışırken sık kullandığım ekoller: Oyun terapisi, Bilişsel ve Davranışçı Terapiler.',
        image: stockImages.cocukSplitB,
      }}
      currentPath="/cocuk-ergen"
    />
  )
}

function TerapiPage() {
  const methods = [
    { title: 'Bilişsel Davranışçı Terapi (BDT)', text: 'Güncel sorunlara odaklanarak, bizi zorlayan olumsuz düşünce ve davranış kalıplarını daha sağlıklı olanlarla dönüştürmeyi hedefler.' },
    { title: 'Şema Terapi', text: 'Kökeni çocukluk dönemine dayanan ve yetişkinlikte tekrar eden derin inançları (şemaları) fark edip, bu kökleşmiş kalıpları iyileştirmeye odaklanır.' },
    { title: 'Mindfulness Temelli Yaklaşımlar', text: 'Şimdiki ana odaklanmayı öğreterek stres, kaygı ve duygusal zorluklarla daha sağlıklı ve farkındalıklı bir bağ kurmayı destekler.' },
    { title: 'Çözüm Odaklı Kısa Süreli Terapi', text: 'Sorunun kendisinden ziyade çözüme ve danışanın mevcut güçlü kaynaklarını kullanarak hızlı bir değişim yaratmaya odaklanır.' },
  ]

  return (
    <PageTemplate
      title="Terapi ve Tedavi"
      subtitle="Bilimsel temelli, kişiye özel terapi yaklaşımları"
      image={heroTerapi}
      introTitle="Terapi ve Tedavi Yaklaşımım"
      introText={`Terapi süreci, her bireyin kendi hızında ve ihtiyacına göre şekillenen bir keşif yolculuğudur. Psikoterapi süreci her birey için farklı işleyen dinamik bir yapı olduğu için, tek bir yönteme bağlı kalmak yerine; sizin yaşantınıza, beklentilerinize ve hedeflerinize en uygun yolu belirlemek temel önceliğimdir.

Bazı terapi yöntemleri spesifik zorluklar üzerinde daha hızlı sonuç verirken, bazıları bireyin kişisel mizacına ve yaşam tarzına daha iyi uyum sağlar. Bu nedenle seanslarımda, "tek bir kalıba" sığmak yerine danışan odaklı, esnek ve bütüncül (eklektik) bir yol izliyorum. Aldığım farklı terapi eğitimlerini ve bilimsel kanıta dayalı yaklaşımları sentezleyerek, süreci tamamen sizin ihtiyaçlarınıza özel olarak yapılandırıyor; her aşamada size en etkili ve kalıcı desteği sunmayı hedefliyorum.`}
      cardsSection={(
        <section className="section therapy-methods-section">
          <div className="section-head centered">
            <h2>Kullandığım Terapi Yaklaşımları</h2>
            <p className="therapy-methods-intro">
              Ziyaretçilerimin ihtiyaçlarına ve çalışılan konunun dinamiklerine göre aşağıdaki bilimsel yöntemlerden faydalanıyorum:
            </p>
          </div>
          <div className="card-grid">
            {methods.map((method) => (
              <article key={method.title} className="card">
                <h3>{method.title}</h3>
                <p className="card-summary">{method.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      splitA={{
        title: 'Kısa Süreli Çözüm Odaklı Terapi',
        text: 'Danışanın güçlü yönlerini ve hedeflerini merkeze alarak, daha kısa sürede işlevsel adımlar atılmasına yardımcı olur.',
        image: stockImages.terapiSplitA,
      }}
      splitB={{
        title: 'Online Terapi',
        text: 'Terapi ve Uzman Danışmanlık Hizmetleri Londra ile sınırlı kalmayıp, dünya genelinde çevrimiçi özel terapi seansları ve danışmanlık hizmetleri sunmaktadır. Esnek terapi seçenekleriyle, size uygun bir zaman ve mekanda görüşmeler planlanmaktadır. Çevrimiçi terapi seçenekleri hakkında daha fazla bilgi almak için lütfen iletişime geçin.',
        image: stockImages.terapiSplitB,
      }}
      currentPath="/terapi"
    />
  )
}

function OtizmPage() {
  return (
    <PageTemplate
      title="Otizm ve DEHB"
      subtitle="Tanı, değerlendirme ve danışmanlık"
      image={heroOtizmDehb}
      introTitle="Otizm ve DEHB Tanı ve Değerlendirme"
      introText="Çocuklar, ergenler ve yetişkinler için otizm tanısı almak, gelişimsel zorlukları anlamak ve çözmek açısından önemlidir. Küçük çocukların ebeveynleri, gelişim farklılıklarını gözlemleyebilir ve bunların zamanla düzeleceğini umabilirler. Ancak, otizmle ilgili sorunlar devam ederse, profesyonel bir tanı almak gereklidir. Bu tanı, çocuğun ihtiyaçlarını belirlemeye yardımcı olur ve gelişimini artıracak özel destek sunar. Yetişkinler için otizm tanısı, yaşadıkları zorluklar hakkında netlik sağlar. Tanınmamış otizm, ilişkilerde ve sosyal ortamlarda sorunlara yol açabilir. Resmi bir tanı, bu zorlukları anlamayı ve iyileştirecek desteklere erişmeyi sağlar. Her iki durumda da tanı, bireylerin karşılaştığı zorlukları anlamalarına yardımcı olur ve uygun destek ve stratejilere erişim sağlar. Bu süreç, otizmi yönetmede daha etkili ve destekleyici bir yaklaşım sunar."
      cardsTitle="Otizm ve DEHB Hizmet Kapsamı"
      cards={[
        {
          title: 'Otizm ve DEHB Taraması',
          text: 'Otizm ve DEHB Ön Taraması ile\nYolculuğunuza netlik kazandırın',
          readMoreText:
            'Otizm ve DEHB ön taraması, çocuklarınızın ihtiyaçlarını ve deneyimlerini anlamaya yönelik destekleyici bir ilk adımdır. Bu süreç, çocuğunuzun tam bir değerlendirmeye ihtiyaç duyup duymadığını belirlemeye yardımcı olur ve rehberlik sağlar.\nTarama süreci yaklaşık 3 saat sürer ve şunları içerir:\n- Ayrıntılı klinik görüşme\n- Gelişimsel öykü\n- Kısa değerlendirme ölçekleri\nTarama sonucunda, çocuğunuzun OSD veya DEHB riski hakkında bilgi verilir ve gerekirse daha kapsamlı bir nörogelişimsel değerlendirme için yönlendirme sağlanır. Bu sayede aileler, hızlı bir şekilde bilgi alabilir ve sonraki adımları planlayabilir.',
        },
        {
          title: 'Nörogelişimsel Değerlendirme ve Tanı Raporlama (Birleşik Krallık Standartlarında)',
          text: 'Birleşik Krallık klinik standartlarına ve NICE rehberlerine uygun olarak, çocuklar ve yetişkinler için Otizm Spektrum Durumu (OSD) ve Dikkat Eksikliği ve Hiperaktivite Bozukluğu (DEHB) alanlarında kapsamlı tanısal değerlendirme ve detaylı klinik raporlama hizmeti sunuyorum.',
          readMoreText:
            'Nörogelişimsel değerlendirme, bireyin gelişimsel, bilişsel ve davranışsal profilini ayrıntılı şekilde anlamaya yönelik kapsamlı bir süreçtir. Bu süreç, OSD ve/veya DEHB açısından derinlemesine analiz sağlar ve genellikle 6–8 hafta içerisinde tamamlanan kapsamlı bir rapor ile sonuçlanır.\nDeğerlendirme süreci şunları içerir:\n- Ayrıntılı klinik görüşme ve gelişimsel öykü alma\n- Aile ve eğitimcilerden çoklu bilgi kaynaklarının toplanması\n- Altın standart değerlendirme araçlarının uygulanması (örneğin ADOS-2)\n- Bilişsel, sosyal, duygusal ve yürütücü işlevlerin kapsamlı değerlendirilmesi\nDeğerlendirme sonunda, bireyin güçlü yönleri, destek ihtiyaçları ve önerilen müdahale alanları ayrıntılı bir klinik rapor ile sunulur.',
        },
        {
          title: 'Attentioner – Dikkatimi Topluyorum',
          text: 'Attentioner - Dikkatimi Topluyorum Programı: Almanya Bremen Üniversitesi\'nde nöropsikolojik temelli olarak geliştirilmiştir.',
          readMoreText:
            'Dikkat Eksikliği ve Hiperaktivite Bozukluğu (DEHB) tanısı almış veya dikkatle ilgili güçlükler yaşayan çocuklar için tasarlanmış bir bireysel ve grup eğitim programıdır. Program, 7-18 yaş bireylerin dikkat ve yürütücü işlevlerini etkili bir biçimde geliştirmeyi hedefler.\nProgram, iki temel ilkeye dayanır:\n- Öğrenme Psikolojisi\n- Nöropsikolojik Temeller\nDikkatimi Topluyorum\'un bütün oturumlarında, kolaydan zora doğru uyaranlar, şifreler ve etkinliklerle çocuğun:\n- Seçici Dikkat\n- Bölünmüş Dikkat\n- Odaklanma\n- Zamanlama\nişlevleri etkili biçimde iyileştirilir. Program, çocukluk çağına uygun eğlenceli elementlerle desteklenmiştir',
        },
      ]}
      splitA={{
        title: 'Kapsamlı Nörogelişimsel Değerlendirme',
        text: 'Değerlendirme raporunda, Psiko-eğitim, eğitim ve sosyal ortamlarda uygun desteğe erişimi artıracak öneriler ve yönlendirmeleri içermektedir.',
        image: stockImages.otizmSplitA,
      }}
      splitB={{
        title: 'Attentioner (Dikkatimi Topluyorum Programı)',
        text: 'Dikkat Eksikliği ve Hiperaktivite (DEHB) olan 7-18 yaş arası çocuklarla, bilimsel temelli Attentioner – Dikkatimi Topluyorum Programı ile çalışıyorum. Program; dikkati sürdürme, dürtüsellik yönetimi ve günlük işlevselliği güçlendirmeye destek olur.',
        image: stockImages.otizmSplitB,
      }}
      currentPath="/otizm-dehb"
    />
  )
}

function IletisimPage() {
  return (
    <main>
      <Hero title="İletişim" subtitle="Terapi, Otizm ve DEHB Uzman Danışmanlığı ve Tanı servisleri" image={heroIletisim} />
      <section className="section contact-layout" id="icerik">
        <article>
          <h2>İletişim Bilgileri</h2>
          <p>Terapi, Otizm ve DEHB Uzman Danışmanlığı ve Tanı servisleri için bugün iletişime geçebilirsiniz.</p>
          <p>Adres: 97-99 Whitechapel Rd, London E1 1DT</p>
          <p>Adres 2: N14, Barnet, London</p>
          <p>
            Telefon: <a className="contact-link" href={`tel:${CONTACT_PHONE_TR}`}>+905536121546</a> (Türkiye), <a className="contact-link" href={`tel:${CONTACT_PHONE_UK}`}>+447541434812</a> (Birleşik Krallık)
          </p>
          <p>
            E-posta: <a className="contact-link" href={`mailto:${CONTACT_DISPLAY_EMAIL}`}>{CONTACT_DISPLAY_EMAIL}</a>
          </p>
          <SocialLinks className="contact-actions" />
        </article>
        <article className="map-box">
          <iframe
            title="Klinik Konumu"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=97-99%20Whitechapel%20Rd%2C%20London%20E1%201DT&output=embed"
          />
        </article>
      </section>
      <MockForm title="İletişim Kutusu" />
    </main>
  )
}

function HomePage() {
  return (
    <main>
      <Hero
        title={
          <>
            Terapi Hizmetleri ve
            <br />
            Otizm & DEHB Değerlendirme
          </>
        }
        subtitle="Uzman Klinik Psikolog Açelya Sarıoğlu"
        image={homeCarouselImages[0]}
        images={homeCarouselImages}
        homeStyle
        homeCtaLabel="İletişim"
        homeCtaTo="/iletisim"
      />
      <section className="section" id="icerik">
        <div className="home-intro-grid">
          <figure className="home-intro-image-wrap">
            <img src={mainHomeImage} alt="Uzman Klinik Psikolog Açelya Sarıoğlu" className="home-intro-image" loading="lazy" />
          </figure>
          <article className="home-intro-copy">
            <div className="section-head centered">
              <h2>Uzmanlık ve Danışmanlık</h2>
            </div>
            <p className="meta-line">Uzman Klinik Psikolog Açelya Sarıoğlu</p>
            <p className="meta-line">MSc GMBPsS</p>
            <p>
              Uzman Klinik Psikolog Açelya Sarıoğlu, Lisans eğitimlerini Yeditepe Üniversitesi Psikoloji ve İşletme bölümlerinde %100 burslu olarak tamamlamıştır. İngiltere'de bulunan Bournemouth Üniversitesi'nde Klinik Psikoloji yüksek lisans programını başarıyla tamamlamış olup şu anda British Psychology Society ve Türk Psikologlar Derneği'ne kayıtlı bir psikologdur.
            </p>
            <p>
              2021 yılında Almanya'da yürütülen, bebeklerde güvenli bağlanmayı hipotezleyen psikolojik bir araştırmada araştırma asistanı olarak görev almıştır. İngiltere'de Otizm ve Dikkat Eksikliği ve Hiperaktivite Bozukluğu alanlarında çeşitli kurum ve kuruluşlarda Psikolog olarak çalışmış olup, şu anda Londra'da My Health and Wellbeing Klinikte çocuk/ergen ve yetişkin danışanlarıyla yüz yüze seanslar gerçekleştirmektedir.
            </p>
            <p>
              Bilişsel Davranışçı Terapi, Şema Terapi, Mindfulness, Kısa Süreli Çözüm Odaklı Terapi ve Oyun Terapisi gibi uluslararası akreditasyona sahip eğitimleriyle danışanlarına hizmet sunmaktadır. Beden ve ruh sağlığının birbirinden ayrılmaz olduğu inancıyla psikoterapi çalışmalarını bütüncül bir bakış açısıyla sürdürmektedir.
            </p>
            <Link to="/iletisim" className="btn-primary dark-cta">
              Şimdi İletişime Geçin
            </Link>
          </article>
        </div>
      </section>
      <CardGrid
        title="Çalışma Alanlarım"
        items={[
          { title: 'Yetişkin Psikoterapi', text: 'Kaygı, depresyon, panik atak, travma sonrası stres ve ilişki zorlukları gibi alanlarda kişiye özel terapi süreci.' },
          { title: 'Çocuk ve Ergen', text: 'Duygusal ve davranışsal zorluklarda çocuğun gelişim dönemine uygun yapılandırılmış psikolojik destek.' },
          { title: 'Otizm ve DEHB', text: 'Tarama, değerlendirme, raporlama ve ihtiyaçlara uygun yönlendirmeyi içeren nörogelişimsel destek modeli.' },
        ]}
      />
      <HomeChelseaSplit
        title="Özenle Uyarlanmış Terapi"
        text="Günlük kaygılardan daha karmaşık psikolojik zorluklara kadar, ihtiyaçlarınıza uygun terapi ve tedavi yöntemlerini birlikte belirliyoruz. Süreç boyunca hedef; semptomlarda kısa sürede rahatlama ve kalıcı iyilik halidir."
        image={stockImages.homeSplitA}
      />
      <HomeChelseaSplit
        title="En İyi Tedavi Sonuçları"
        text="Terapi seanslarımda bilimsel etkinliği kanıtlanmış yöntemleri kullanıyorum. Yapılandırılmış ve her danışanın ihtiyaçlarına göre kişiselleştirilen bu süreç, danışanların işlevselliğini artırmayı ve yaşam kalitesini güçlendirmeyi hedefler. Bu çerçevede en sık kullandığım yaklaşımlardan biri Bilişsel ve Davranışçı Terapi (BDT)'dir. BDT, günümüzde en çok araştırılmış ve etkinliği güçlü bilimsel kanıtlarla desteklenen psikoterapi yaklaşımlarından biridir. Birçok ruhsal zorluk ve psikiyatrik durumda, ulusal ve uluslararası klinik kılavuzlarda ilk seçenek tedavi yaklaşımları arasında yer almaktadır. Bunun yanı sıra, bir diğer etkili yaklaşım olan Şema Terapi ile süreci destekleyerek, daha derin ve tekrarlayan yaşam örüntülerini de bütüncül bir şekilde ele alıyorum. Şema Terapi, özellikle erken dönem yaşantılara bağlı gelişen kalıcı düşünce ve ilişki kalıplarına odaklanan, etkinliği klinik çalışmalarla desteklenmiş bir yaklaşımdır."
        image={stockImages.homeSplitB}
        reverse
        stretchRight
      />
      <ServicePreviewSection />
      <TherapyMethodsSection />
      <TestimonialsSection />
      <AffiliationsSection />
      <MockForm title="İletişim Kutusu" />
      <PlatformReferencesSection />
      <InstagramWidgetSection />
    </main>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h3>Klinik Psikolog Açelya Sarıoğlu</h3>
        <p>Yetişkin, çocuk ve ergen psikoterapi hizmetleri ile otizm ve DEHB değerlendirme danışmanlığı.</p>
      </div>
      <div>
        <h4>Hızlı Linkler</h4>
        <ul>
          <li>
            <Link to="/">Anasayfa</Link>
          </li>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Bizi Takip Edin</h4>
        <SocialLinks className="footer-social" />
      </div>
    </footer>
  )
}

function AppShell() {
  return (
    <>
      <SeoManager />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/yetiskin" element={<YetiskinPage />} />
        <Route path="/cocuk-ergen" element={<CocukPage />} />
        <Route path="/terapi" element={<TerapiPage />} />
        <Route path="/otizm-dehb" element={<OtizmPage />} />
        <Route path="/iletisim" element={<IletisimPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <FloatingScrollArrows />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
