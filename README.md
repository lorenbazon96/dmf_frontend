# DMF frontend

Vue 3 / Vue CLI klijent za DMF. Autentikacija zadržava postojeći Bearer token ugovor.

## Project setup
```
npm ci
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Tests
```
npm test
```

## API configuration

Kopirajte `.env.example` u `.env.local` samo kada trebate promijeniti API origin.
`VUE_APP_API_URL` mora uključiti `/api`. Bez varijable development koristi
`http://localhost:3000/api`, dok production sigurno koristi same-origin `/api` i nikada
ne pada natrag na localhost.

## Navigacija i reset lozinke

Aplikacija koristi hash URL-ove radi kompatibilnosti sa statičkim hostingom. Primjer reset
linka je `/#/reset-password?token=...`. Zaštićene rute vraćaju neprijavljenog korisnika na
login; browser back/forward ostaje sinkroniziran s postojećim pogledima aplikacije.

Za provjeru prije isporuke pokrenite `npm run lint`, `npm test` i `npm run build`.
