# SEO для pav-it.ct.ws — що змінено і що робити далі

Файли в архіві накладаються на проєкт зі збереженням шляхів (папка `company-web-app/`):
- `index.html` — title, description, canonical, hreflang (uk / en), Open Graph, Twitter, JSON-LD, `<noscript>`
- `public/robots.txt`, `public/sitemap.xml` (10 URL: uk + /en × 4 сторінки), `public/og-image.png`
- `src/seo/Seo.tsx` + `Layout.component.tsx` — окремі title/description/canonical для кожної сторінки й мови

## 1. Залити на сайт
git add . && git commit -m "Add SEO" && git push  → Actions → FTP.
Перевірити в браузері: https://pav-it.ct.ws/robots.txt та https://pav-it.ct.ws/sitemap.xml
(мають відкритись як текст/XML, а не головна сторінка React — якщо відкривається React, перевірте .htaccess:
має бути умова `RewriteCond %{REQUEST_FILENAME} !-f`).

## 2. Google Search Console (search.google.com/search-console)
1. Add property → "URL prefix" → https://pav-it.ct.ws/
2. Verification → "HTML tag" → скопіюйте `<meta name="google-site-verification" content="...">`,
   розкоментуйте/вставте в `index.html` (місце позначене коментарем) → push → Verify.
3. Sitemaps → додайте `sitemap.xml`.
4. URL inspection → вставте https://pav-it.ct.ws/ → "Test live URL" → "Request indexing".
   У результаті live test перегляньте "View tested page → Screenshot": має бути ваш сайт, а не сторінка-заглушка.
5. Те саме для https://pav-it.ct.ws/en
6. Bing: bing.com/webmasters → Import from Google Search Console.

## 3. Перевірка
Через кілька днів — пошук `site:pav-it.ct.ws` у Google. Перші результати зазвичай 3–14 днів.
