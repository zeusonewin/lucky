# lucky

Статический лендинг для домена `https://luckyjet.cash`.

## Что сделано

- Добавлен `CNAME` с `luckyjet.cash`.
- Добавлен Nginx-конфиг `deploy/nginx.luckyjet.cash.conf`.
- Добавлены языковые версии:
  - русская: `/`
  - английская: `/en.html`
- В `sitemap.xml` добавлены обе версии.

## Оптимизация скорости/веса

- Убрана тяжёлая картинка `BUCK.jpg` (~2.9MB) из рендера страницы и заменена на лёгкий webp-ассет.
- Для некритичных изображений выставлены `loading="lazy"` и `decoding="async"`.
- Яндекс.Метрика запускается после `load` и в `requestIdleCallback`, чтобы не мешать первому рендеру.

## Чеклист доступности из РФ

1. DNS:
   - `A` для `luckyjet.cash` должен указывать на рабочий IPv4.
   - `AAAA` (если используется) должен указывать на доступный IPv6.
   - `www` должен быть `CNAME` на `luckyjet.cash`.
2. Сервер:
   - открыты порты `80` и `443`;
   - установлен TLS-сертификат для `luckyjet.cash` и `www.luckyjet.cash`.
3. CDN/WAF:
   - отключена geo-блокировка РФ, если нужна доступность в РФ.

## Проверка после деплоя

```bash
curl -I http://luckyjet.cash
curl -I https://luckyjet.cash
curl -I https://www.luckyjet.cash
curl -I https://luckyjet.cash/en.html
```
