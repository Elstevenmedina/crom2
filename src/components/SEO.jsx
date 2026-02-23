import { useEffect } from 'react'

const SITE_NAME = 'CROM'
const BASE_URL = 'https://crompanama.com'
const DEFAULT_IMAGE = '/assets/Home/hero_image.png'

function setMeta(name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function SEO({ title, description, path = '/', image, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Mochilas, Bolsos y Loncheras Escolares en Panam\u00e1`
    const fullUrl = `${BASE_URL}${path}`
    const fullImage = image || DEFAULT_IMAGE

    document.title = fullTitle

    // Standard meta
    setMeta('description', description || '')
    setMeta('robots', 'index, follow')
    setCanonical(fullUrl)

    // Open Graph
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description || '', true)
    setMeta('og:url', fullUrl, true)
    setMeta('og:image', fullImage, true)
    setMeta('og:type', 'website', true)
    setMeta('og:site_name', SITE_NAME, true)
    setMeta('og:locale', 'es_PA', true)

    // Twitter
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description || '')
    setMeta('twitter:image', fullImage)
    setMeta('twitter:card', 'summary_large_image')

    // JSON-LD
    if (jsonLd) {
      setJsonLd('seo-jsonld', jsonLd)
    }

    return () => {
      const ldEl = document.getElementById('seo-jsonld')
      if (ldEl) ldEl.remove()
    }
  }, [title, description, path, image, jsonLd])

  return null
}
