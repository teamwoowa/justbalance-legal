# JustBalance legal pages

GitHub Pages hosts the bilingual privacy policy and terms. The app links to
`privacy.html?lang=ko` / `terms.html?lang=en` using its active language code.
`language.js` applies that language on load, updates the document language/title,
and preserves the choice in the URL, language buttons and internal links.
Explicit `lang` takes precedence over browser language. Regional language tags
fall back to their base language; unavailable document languages fall back to
English. Policy text is not changed by the language selector.

To add a translation, add a `.section` with ID `sec-<language-code>` and a language
button with ID `btn-<language-code>` calling `setLang('<language-code>')`.
The shared script discovers supported document languages from those sections.
No app-side per-document language switch or separate URL is required.

Verify privacy/terms with `?lang=ko`, `?lang=en`, `?lang=ko-KR`, and an unsupported
language. Check exactly one section, document language/title, active button,
reload and internal links. Serve locally with `python -m http.server 8877`.
