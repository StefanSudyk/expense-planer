# Expense Tracker - System Zarządzania Wydatkami

Projekt na przedmiot Wykład Monograficzny

##  Technologie

* **Next.js 16** (App Router & Server Actions)
* **React 19** (Concurrent Rendering)
* **Prisma 7** (ORM & Database Management)
* **Język:** TypeScript
* **Stylizacja:** Tailwind CSS
* **Baza danych:** SQLite (lokalnie)

##  Uruchomienie za pomocą Docker Compose

Najszybszy sposób na postawienie projektu bez konieczności instalowania Node.js lokalnie:

1.  Upewnij się, że masz zainstalowany **Docker** i **Docker Compose**.
2.  Uruchom komendę:
    ```bash
    docker-compose up --build
    ```
3.  Aplikacja będzie dostępna pod adresem: [http://localhost:3000](http://localhost:3000).

##  Uruchomienie lokalne (bez Dockera)

1.  Sklonuj repozytorium:
    ```bash
    git clone https://github.com/StefanSudyk/expense-planer.git
    ```
2.  Zainstaluj zależności:
    ```bash
    npm install
    ```
3.  Uruchom serwer deweloperski:
    ```bash
    npm run dev
    ```
4.  Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.