# Pav It — флоу деплою (від локального проєкту до живого сайту)

Схема: **React на Vercel (безкоштовно) + WordPress на InfinityFree (безкоштовно)**,
з'єднані через rewrite на Vercel (без потреби в CORS-налаштуваннях на WP).

Якщо після перегляду вирішите брати платний хостинг замість InfinityFree —
міняється тільки Етап 2 (де саме лежить WP), решта флоу ідентична.

---

## Етап 0. Що має бути готово перед стартом

- [ ] Локальний WordPress (`pav-it-be`) з активним ACF, CPT UI, і нашим плагіном
      `pavit-acf-bootstrap` — контент уже засіяний і перевірений локально
      (`/wp-json/wp/v2/pav-faq` віддає реальний текст).
- [ ] React-проєкт (`company-web-app`) з `npm run dev` показує реальні дані з локального WP.
- [ ] Акаунт на GitHub (для Vercel — деплой іде з git-репозиторію).
- [ ] Акаунт на vercel.com (можна увійти напряму через GitHub).
- [ ] Акаунт на infinityfree.net.

---

## Етап 1. Готуємо WordPress до переїзду (локально, ще на XAMPP)

1. **Експорт бази**: XAMPP → `http://localhost/phpmyadmin` → база `pav-it-db` → вкладка **Export** → формат SQL → Go. Зберігаєте `pav-it-db.sql`.
2. **Архів файлів**: заходите в `C:\xampp\htdocs\pav-it-be` (або `/Applications/XAMPP/htdocs/pav-it-be` на Mac) → архівуєте всю папку в `pav-it-be.zip`.

Ці два файли (SQL + zip) — все, що потрібно для переїзду.

---

## Етап 2. Піднімаємо WordPress на InfinityFree

1. Реєстрація на infinityfree.net → **Create Account** → отримуєте:
   - тимчасовий домен виду `yourname.infinityfreeapp.com` (або підключаєте свій домен, якщо є),
   - дані FTP (хост, логін, пароль),
   - дані MySQL (хост, ім'я бази, користувач, пароль) — у панелі керування (**Client Area → MySQL Databases**).
2. **Заливка файлів**: FTP-клієнтом (FileZilla) або вбудованим File Manager у панелі — заливаєте вміст `pav-it-be.zip` у папку `htdocs/` вашого акаунта (це корінь домену на InfinityFree).
3. **Імпорт бази**: панель → **phpMyAdmin** → обираєте вашу нову базу → **Import** → обираєте `pav-it-db.sql` → Go.
4. **Правимо `wp-config.php`** (через File Manager, кнопка "Edit"):
   ```php
   define( 'DB_NAME', 'ваша_нова_назва_бази' );
   define( 'DB_USER', 'ваш_новий_користувач' );
   define( 'DB_PASSWORD', 'ваш_новий_пароль' );
   define( 'DB_HOST', 'той_хост_що_дала_панель' ); // на InfinityFree зазвичай НЕ localhost
   ```
5. **Заміна URL у базі** — встановіть плагін **Better Search Replace** (Plugins → Add New → пошук → Install → Activate), потім Tools → Better Search Replace:
   - Search: `http://localhost/pav-it-be`
   - Replace: `https://yourname.infinityfreeapp.com`
   - Відмітити всі таблиці → спершу **Dry Run**, перевірити кількість замін → потім реальний запуск.
6. Зайти в `https://yourname.infinityfreeapp.com/wp-admin/` — переконатись, що адмінка відкривається і логін працює.
7. **Permalinks**: Settings → Permalinks → "Назва запису" → Save (обов'язково перезберегти навіть якщо вже стояло так локально — правила рерайту прив'язані до конкретного сервера).
8. **Перевірка REST API**:
   ```
   https://yourname.infinityfreeapp.com/wp-json/wp/v2/pav-faq
   https://yourname.infinityfreeapp.com/wp-json/wp/v2/pav-settings
   ```
   Мають повернути JSON з вашим реальним контентом (не порожній масив).

---

## Етап 3. Готуємо React-проєкт до продакшн-білда

У `company-web-app/` створіть `vercel.json` (в корені проєкту, поруч з `package.json`):

```json
{
  "rewrites": [
    {
      "source": "/wp-json/:path*",
      "destination": "https://yourname.infinityfreeapp.com/wp-json/:path*"
    }
  ]
}
```

Підставте свій реальний домен InfinityFree замість `yourname.infinityfreeapp.com`.

> `.env`/`VITE_WP_API_URL` для продакшну можна НЕ задавати — код і так іде
> за відносним шляхом `/wp-json`, а rewrite вище непомітно для браузера
> перенаправляє ці запити на справжній WordPress. CORS не потрібен.

Локально перевірте, що проєкт все ще збирається:

```bash
npm install
npm run build
```

---

## Етап 4. Заливаємо React на Vercel

1. Запуште проєкт у GitHub-репозиторій (якщо ще не там):
   ```bash
   git init
   git add .
   git commit -m "Initial deploy"
   git remote add origin https://github.com/ваш-акаунт/company-web-app.git
   git push -u origin main
   ```
2. vercel.com → **Add New → Project** → **Import Git Repository** → обираєте цей репозиторій.
3. Vercel сам розпізнає Vite-проєкт. Перевірте поля:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy**. Через хвилину-дві отримуєте адресу типу `company-web-app.vercel.app`.

---

## Етап 5. Фінальна перевірка (і БЕ, і ФЕ разом)

- [ ] `https://company-web-app.vercel.app/` відкривається, показує **реальний контент** з WP (не fallback-текст типу "Новий редактор компонентів вже доступний" — хоча в даному разі текст співпадає, тому раджу тимчасово змінити щось в WP-адмінці й перевірити, що на сайті теж зміниться).
- [ ] DevTools → Network → запит на `/wp-json/wp/v2/pav-faq` — статус 200, у відповіді JSON.
- [ ] Прямий перехід на `https://company-web-app.vercel.app/about-us` (вставити в адресний рядок, не переходом по кліку) — не 404.
- [ ] Форма на `/contact-us` — сабміт хоча б показує екран "Повідомлення надіслано" (сама відправка на пошту — окрема тема, наразі форма локально імітує успіх).
- [ ] `https://yourname.infinityfreeapp.com/wp-admin/` — можна зайти і відредагувати, наприклад, один FAQ, і побачити зміну на живому React-сайті після оновлення сторінки.

---

## Якщо щось не збіглось

| Симптом                                               | Де шукати причину                                                                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| React показує fallback-текст, а не реальний з WP      | DevTools → Network → запит на `/wp-json/...` — дивитись статус і тіло відповіді                                                |
| 404 на `/wp-json/...`                                 | Permalinks на InfinityFree не пересзбережені (Етап 2, крок 7)                                                                  |
| Порожній `[]` замість контенту                        | ACF/плагін `pavit-acf-bootstrap` не активний на новому сайті, або дані не перенеслись при імпорті SQL                          |
| Адмінка WP редиректить на старий localhost            | Крок 5 (Better Search Replace) не пройшов повністю — перевірте Dry Run знову                                                   |
| React білдиться локально, але Vercel падає з помилкою | Дивитись Vercel → Deployments → відкрити білд-лог, зазвичай там точна причина (частіше — забута залежність чи змінна оточення) |

---

Дайте знати, чи цей флоу підходить — і чи хочете, щоб я одразу згенерував `vercel.json` з вашим реальним доменом (якщо він уже є), чи почнемо з реєстрації на InfinityFree.
