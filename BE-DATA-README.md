# Інтеграція Pav It: WordPress (ACF + CPT UI) ↔ React

Ця інструкція описує **фактично обраний вами шлях** — контент організовано через
Custom Post Type UI + ACF (без жодного кастомного PHP-коду), на базі вашого
проєкту `pav-it-be` (WordPress у підпапці `/pav-it-be/`, ACF 6.8.5, CPT UI 1.19.2).

> Файл `README-WORDPRESS-INTEGRATION.md` в цій же папці описує **альтернативний**
> варіант — готовий кодовий плагін (`pavit-content-wp-plugin.zip`). Він не потрібен,
> якщо йдете шляхом ACF/CPT UI, залиште його просто про запас.

---

## 1. Custom Post Type UI — типи записів

CPT UI → Add/Edit Post Types. Для кожного: **Show in REST API = увімкнено**,
REST API base slug — точно як у таблиці (React звертається саме за цими адресами).

| Slug              | REST base         | Plural            | Supports                       |
| ----------------- | ----------------- | ----------------- | ------------------------------ |
| `pav_faq`         | `pav-faq`         | Питання (FAQ)     | Title, Editor, Page Attributes |
| `pav_team`        | `pav-team`        | Команда           | Title, Page Attributes         |
| `pav_pricing`     | `pav-pricing`     | Тарифи            | Title, Page Attributes         |
| `pav_feature`     | `pav-feature`     | Картки-можливості | Title, Editor, Page Attributes |
| `pav_stat`        | `pav-stat`        | Статистика        | Title, Page Attributes         |
| `pav_logo`        | `pav-logo`        | Клієнти           | Title, Page Attributes         |
| `pav_testimonial` | `pav-testimonial` | Відгуки           | Title, Editor, Page Attributes |

**"Page Attributes"** обов'язково — дає поле "Порядок", за яким сортуються блоки на сайті.

## 2. ACF — поля

Кожна група полів: Location → Post Type = потрібний тип, Settings → **Show in REST API = увімкнено**.

- **pav_team**: `role` (Text), `color` (Select: `#8A5A2B`, `#10B981`, `#EF4444`, `#F59E0B`)
- **pav_pricing**: `price` (Text), `price_period` (Text), `short_desc` (Text), `features` (Textarea, **New Lines = No Formatting**), `popular` (True/False), `cta_text` (Text), `cta_style` (Select: `primary`/`secondary`)
- **pav_feature**: `icon` (Select: `grid`/`cube`/`shield`/`clock`/`lock`/`heart`/`chart`), `page` (Select: `dashboard`/`services`/`about`), `features_list` (Textarea, **No Formatting**)
- **pav_stat**: `stat_label` (Text)
- **pav_testimonial**: `author_role` (Text)
- **pav_faq**, **pav_logo** — без ACF-полів (все в Title/Editor)

Для всіх Select-полів: **Return Format = Value**.

## 3. Одиничні тексти сайту

1. Pages → Add New → назва "Налаштування сайту" (slug автоматично стане `site-settings`) → **Publish** (обов'язково опублікована, не чернетка й не приватна — інакше публічний REST-запит її не побачить).
2. Одна ACF-група, Location = "Post is equal to" ця сторінка, Show in REST API = увімкнено.
3. Текстові поля (Tab-поля лише для зручності в адмінці, на REST не впливають):

```
hero_badge, hero_title, hero_subtitle, hero_cta_primary, hero_cta_secondary,
hero_benefit_1, hero_benefit_2, hero_mock_url, hero_mock_status, hero_mock_build_time,
logos_title, steps_title, steps_subtitle, features_title, features_subtitle,
cta_title, cta_subtitle, cta_button,

about_badge, about_title, about_intro, story_title, story_p1, story_p2, story_p3,
principles_title, principles_subtitle, team_title, team_subtitle,
join_title, join_subtitle, join_button,

services_title, services_subtitle, pricing_title, pricing_subtitle, faq_title,

contact_title, contact_subtitle, contact_email, contact_support_hours,
contact_office_city, contact_office_note, contact_social_twitter,
contact_social_linkedin, contact_social_github, contact_consent_text,
contact_success_title, contact_success_text,

site_name, footer_tagline, footer_copyright
```

Усі — тип **Text**, крім `hero_title`, `hero_subtitle`, `about_title`, `about_intro`,
`story_p1-3`, `contact_title`, `contact_subtitle`, `contact_consent_text`,
`contact_success_text`, `footer_tagline` — їх краще зробити **Textarea**
(New Lines = No Formatting), бо це довші тексти.

## 4. Permalinks

Settings → Permalinks → "Назва запису" → Зберегти (щоб `/wp-json/...` працював без `?rest_route=`).

## 5. Підключення React (вже налаштовано в коді)

- `vite.config.ts` — проксує `/wp-json` на `http://localhost/pav-it-be` під час розробки
  (змініть константу `WP_DEV_TARGET`, якщо адреса інша). Завдяки цьому CORS
  на боці WordPress налаштовувати не треба взагалі.
- `src/service/wp.ts` — вже вміє читати саме ACF-формат (`post.acf.<field>`),
  сам сортує за "Порядком" і сам фільтрує картки-можливості за сторінкою
  (без потреби в кастомних PHP-фільтрах на бекенді).
- Компоненти (`Dashboard`, `Services`, `About-us`, `Contact-Us`, `Footer`) не змінювались —
  вони й раніше не знали, звідки саме беруться дані.

**Порядок запуску:** підніміть `pav-it-be` (WP) → налаштуйте CPT UI/ACF за таблицями вище →
`npm install && npm run dev` у `company-web-app/` → відкрийте сайт, дані вже мають підтягнутись.

## 6. Типові причини "не працює"

| Симптом                                              | Причина                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Пусто замість тексту Hero/About/Contact              | Сторінка "Налаштування сайту" не опублікована                                        |
| У списку є HTML-теги (`<br>`) замість переносу рядка | Textarea-поле без "New Lines = No Formatting"                                        |
| Замість `#10B981` приходить "Зелений"                | Select-поле з Return Format = Label замість Value                                    |
| Порядок карток "випадковий"                          | Тип не має Support "Page Attributes", або в записі не вписано число в полі "Порядок" |
| 404 на `/wp-json/...`                                | Permalinks не переключені на "Назва запису"                                          |
