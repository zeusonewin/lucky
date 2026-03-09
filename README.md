# lucky

Статический лендинг для домена `https://luckyjet.cash`.

## Что добавлено для корректного открытия домена

- `CNAME` с привязкой `luckyjet.cash` (для статических хостингов с поддержкой custom domain).
- Готовый Nginx-конфиг `deploy/nginx.luckyjet.cash.conf` для:
  - редиректа HTTP → HTTPS;
  - редиректа `www` → apex-домен `luckyjet.cash`;
  - раздачи статики и `index.html` fallback;
  - базовых security headers.

## Чеклист, чтобы сайт открывался из РФ

1. DNS:
   - у `A`-записи `luckyjet.cash` должен быть рабочий IPv4 сервера;
   - при использовании IPv6, `AAAA` должен указывать на реально доступный адрес;
   - `www` должен быть `CNAME` на `luckyjet.cash`.
2. Сервер:
   - должен слушать `80` и `443`;
   - сертификат TLS для `luckyjet.cash` и `www.luckyjet.cash`.
3. Сеть:
   - проверьте доступность домена из РФ через внешние мониторинги/прокси из RU-сегмента;
   - если используете CDN/WAF, убедитесь, что нет geo-блокировки трафика из RU.

## Проверка после деплоя

```bash
curl -I http://luckyjet.cash
curl -I https://luckyjet.cash
curl -I https://www.luckyjet.cash
```
