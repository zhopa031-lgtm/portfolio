# Верстак — портфолио

Статический сайт: HTML + CSS + JS, без сборки.

## Структура
- `index.html` — вся страница, включая три интерактивных демо
- `css/style.css`, `js/app.js`

## Запуск
Откройте `index.html` в браузере или выполните `python3 -m http.server 8000` и зайдите на http://localhost:8000.

## Перед публикацией замените
- `hello@example.com` (index.html и js/app.js) на вашу почту
- `https://t.me/your_username` на ваш Telegram
- Название «Верстак» — на своё, если нужно

## Публикация
Загрузите папку на любой статический хостинг: Netlify Drop (перетащить папку), GitHub Pages, Cloudflare Pages или обычный хостинг в `public_html`. Для формы с отправкой без почтового клиента подключите Formspree, Web3Forms или свой обработчик и замените `mailto` в `js/app.js`.

## Что можно развить
Демо Flowdesk, TenderTrace и Frameport сейчас встроены в главную страницу; их можно вынести на отдельные страницы.
