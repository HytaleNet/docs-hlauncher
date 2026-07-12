---
title: Как создать пиратский сервер
description: Развёртывание сервера Hytale на ядре игры для домашнего ПК и VPS — без лицензионной авторизации.
---

::: warning
**Только для опытных пользователей.** Эта инструкция предполагает, что вы умеете работать с командной строкой, Java, файрволом и базовой настройкой VPS.
:::

::: tip
**Не хотите заморачиваться?** Если вам нужен просто сервер для игры с друзьями — создайте его на [Hosting-Hytale.pro](https://my.hosting-hytale.pro/aff.php?aff=1). Там уже используется наш auth-патч, можно поднять **пиратский сервер**, а также есть **бесплатный тариф**.
:::

Руководство основано на [официальной документации Hytale](https://hytale.com), но адаптировано для **пиратского сервера** — без `/auth login device` и аккаунта Hytale.

## Требования

| Ресурс | Минимум | Рекомендация |
| :--- | :--- | :--- |
| **RAM** | 4 ГБ | 8+ ГБ (зависит от онлайна и view distance) |
| **Java** | Java 25 | [Adoptium Temurin 25](https://adoptium.net/) |
| **CPU** | 2 ядра | 4+ ядра при большом онлайне |
| **Диск** | 10 ГБ | 20+ ГБ SSD |
| **Сеть** | UDP-порт **5520** | Открытый UDP (не TCP!) |

Проверьте Java:

```bash
java --version
```

Ожидаемый вывод: `openjdk 25.x.x`

::: tip
Java может находиться **где угодно** — главное указать полный путь к `java` / `java.exe` в команде запуска. Не обязательно ставить её в `Server/jre/`.
:::

---

## Структура файлов

Официальный layout сервера Hytale:

```
game/
├── Assets.zip
├── jvm.options          # опционально — свои JVM-аргументы (по одному на строку)
├── start.sh             # опционально (Linux)
├── start.bat            # опционально (Windows)
└── Server/
    ├── HytaleServer.jar
    ├── HytaleServer.aot # опционально — ускоряет первый запуск
    ├── earlyplugins/
    │   └── hytale-auth-patch.jar   ← патч для пиратского сервера
    ├── mods/
    ├── universe/        # миры и сохранения игроков
    ├── logs/
    ├── config.json
    ├── permissions.json
    ├── bans.json
    └── whitelist.json
```

**Важно:** сервер запускается **из папки `Server/`**, а `Assets.zip` лежит **на уровень выше** (`../Assets.zip`).

### Откуда взять файлы игры

1. Скопировать из установки лаунчера:
   - **Release:** `%appdata%\HLauncher\install\release\package\game\latest\Server`
   - **Pre-Release:** `%appdata%\HLauncher\install\pre-release\package\game\latest\Server`
   - **Assets.zip:** `%appdata%\HLauncher\install\release\package\game\latest`
2. Перенести файлы на VPS.

Нужны минимум: папка **`Server/`** (с `HytaleServer.jar`) и **`Assets.zip`**.

---

## Шаг 1. Скачайте пиратский патч

- **Скачать патч:** [Скачать](https://cdn.hlauncher.com/HytaleNet_Server_Patch.zip)
---

## Шаг 2. Установите патч

1. Создайте папку `earlyplugins` внутри `Server/`.
2. Положите файл и назовите **`hytale-auth-patch.jar`**.

```
game/Server/earlyplugins/hytale-auth-patch.jar
```


---

## Шаг 3. Запуск сервера

Перейдите в папку `Server/` и выполните команду. Замените пути на свои.

:::tabs

== Windows (домашний ПК)

```bat
cd C:\hytale\Server

"...\jdk-25\bin\java.exe" ^
  -Duser.home="C:\hytale\Server" ^
  -Dterminal.ansi=true ^
  -Xms2G -Xmx10G ^
  -XX:+UseG1GC -XX:+UnlockExperimentalVMOptions ^
  -XX:G1NewSizePercent=20 -XX:G1MaxNewSizePercent=40 ^
  -XX:G1ReservePercent=15 -XX:G1HeapWastePercent=5 ^
  -XX:G1MixedGCCountTarget=4 -XX:MaxGCPauseMillis=200 ^
  -XX:G1HeapRegionSize=8M -XX:InitiatingHeapOccupancyPercent=35 ^
  -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 ^
  -XX:+DisableExplicitGC -XX:+AlwaysPreTouch ^
  -XX:+ExtensiveErrorReports -XX:+UseStringDeduplication ^
  -XX:+PerfDisableSharedMem -XX:ParallelGCThreads=6 ^
  -XX:ConcGCThreads=2 -XX:+ParallelRefProcEnabled ^
  --enable-native-access=ALL-UNNAMED -Xshare:off ^
  -jar HytaleServer.jar ^
  --assets ..\Assets.zip ^
  --accept-early-plugins
```

== Linux (VPS)

```bash
cd /opt/hytale/Server

/usr/lib/jvm/temurin-25-jdk/bin/java \
  -Duser.home="/opt/hytale/Server" \
  -Dterminal.ansi=true \
  -Xms2G -Xmx10G \
  -XX:+UseG1GC -XX:+UnlockExperimentalVMOptions \
  -XX:G1NewSizePercent=20 -XX:G1MaxNewSizePercent=40 \
  -XX:G1ReservePercent=15 -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 -XX:MaxGCPauseMillis=200 \
  -XX:G1HeapRegionSize=8M -XX:InitiatingHeapOccupancyPercent=35 \
  -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:+DisableExplicitGC -XX:+AlwaysPreTouch \
  -XX:+ExtensiveErrorReports -XX:+UseStringDeduplication \
  -XX:+PerfDisableSharedMem -XX:ParallelGCThreads=6 \
  -XX:ConcGCThreads=2 -XX:+ParallelRefProcEnabled \
  --enable-native-access=ALL-UNNAMED -Xshare:off \
  -jar HytaleServer.jar \
  --assets ../Assets.zip \
  --accept-early-plugins
```

:::

**Фоновый запуск на VPS:**

```bash
screen -S hytale
# выполните команду запуска
# Ctrl+A, D — отсоединиться; screen -r hytale — вернуться
```

Дождитесь статуса **`Done`** в консоли.

::: tip
Если есть `HytaleServer.aot` в папке `Server/`, добавьте перед `-jar`: `-XX:AOTCache=HytaleServer.aot` — ускорит загрузку (как в официальной документации).
:::

---

## Шаг 4. Сеть и подключение

Hytale использует **QUIC поверх UDP**, не TCP.

| Параметр | Значение |
| :--- | :--- |
| Порт по умолчанию | **5520 UDP** |
| Смена порта | `--bind 0.0.0.0:3500` |

**Подключение игроков:** клиент → **Servers** → **Direct Connect** → IP сервера (например `123.45.67.89` или `123.45.67.89:5520`).

### Файрвол

**Windows:**

```powershell
New-NetFirewallRule -DisplayName "Hytale Server" -Direction Inbound -Protocol UDP -LocalPort 5520 -Action Allow
```

**Linux (ufw):**

```bash
sudo ufw allow 5520/udp
sudo ufw reload
```

На роутере пробросьте **UDP 5520**, не TCP.

---

## VPS: быстрая настройка

<ol class="vp-steps">
<li>
<strong>Подготовка</strong>

```bash
sudo mkdir -p /opt/hytale/Server/earlyplugins
sudo chown -R $USER:$USER /opt/hytale
```

Загрузите через SFTP: `Assets.zip`, `Server/HytaleServer.jar`, патч в `Server/earlyplugins/`.
</li>
<li>
<strong>Java 25</strong>

```bash
sudo apt update && sudo apt install -y temurin-25-jdk
java --version
```
</li>
<li>
<strong>Запуск</strong>

Выполните команду из вкладки **Linux** выше.
</li>
<li>
<strong>Автозапуск (опционально)</strong>

Создайте `/etc/systemd/system/hytale.service` — укажите полный путь к `java`, `WorkingDirectory=/opt/hytale/Server`, команду из шага 3 в `ExecStart`.
</li>
</ol>

---

## Windows: быстрая настройка

1. Создайте `C:\hytale\` и разложите файлы по структуре выше.
2. Установите [Java 25 (Adoptium)](https://adoptium.net/).
3. Положите патч в `C:\hytale\Server\earlyplugins\`.
4. Запустите команду из вкладки **Windows** (можно сохранить в `start-pirate.bat`).
5. Разрешите Java в брандмауэре Windows (UDP 5520).

---

## Полезно знать

**Память:** основной потребитель RAM — view distance. Официально рекомендуют не выше **12 чанков (384 блока)**. При нехватке памяти уменьшите `-Xmx10G` до `-Xmx4G`.

**Моды:** кладите `.jar` / `.zip` в `Server/mods/`.

**Конфиги:** `config.json`, `permissions.json` и др. перезаписываются сервером во время работы — не редактируйте их при запущенном сервере.

**Версии:** клиент и сервер должны быть на **одной версии протокола**, иначе подключение будет отклонено.
