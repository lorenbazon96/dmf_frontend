# DMF frontend

Vue 3 / Vue CLI klijent za DMF, objavljen na Vercelu. Aplikacija komunicira s backendom objavljenim na Railwayu i za autentikaciju koristi Bearer JWT token.

## Lokalno pokretanje

Instalacija ovisnosti:

```
npm ci
```

Pokretanje razvojnog poslužitelja:

```
npm run serve
```

## Produkcijska izgradnja

```
npm run build
```

Vercel pri objavi automatski izrađuje produkcijsku verziju frontenda.

## Provjera koda

```
npm run lint
```

## Konfiguracija API-ja

Varijabla `VUE_APP_API_URL` mora sadržavati adresu API-ja sa završnim `/api`. U produkcijskom Vercel okruženju postavljena je na javnu adresu Railway backenda. Lokalni razvoj bez te varijable koristi `http://localhost:3000/api`.

Datoteka `.env.example` služi kao predložak. Za lokalnu promjenu API adrese može se izraditi `.env.local`, koja se ne sprema u Git.

## Navigacija i reset lozinke

Aplikacija koristi hash URL-ove radi kompatibilnosti sa statičkim hostingom. Primjer reset
linka je `/#/reset-password?token=...`. Zaštićene rute vraćaju neprijavljenog korisnika na
login; browser back/forward ostaje sinkroniziran s postojećim pogledima aplikacije.

Za provjeru prije objave pokreću se `npm run lint` i `npm run build`.
