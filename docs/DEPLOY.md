# Cómo publicar en Cloudflare

El sitio se publica como archivos estáticos en Cloudflare Workers. No tiene código de servidor. La configuración está en `wrangler.jsonc`.

## Primera publicación

1. Inicia sesión en Cloudflare. Se abre el navegador para que autorices el acceso:

```bash
npx wrangler login
```

2. Comprueba que `.env` tenga los datos de EmailJS. Se incorporan al sitio al compilar, por lo que deben estar antes del build.
3. Publica:

```bash
npm run deploy
```

Wrangler muestra la URL final. La actual es `https://fsucatti-portfolio.fsucatti-portfolio.workers.dev`.

La primera vez que se usa un subdominio `workers.dev`, la URL puede tardar unos minutos en funcionar mientras se emite el certificado. Mientras tanto, `curl` falla en el handshake TLS.

`npm run deploy` sin `SITE_URL` publica el sitio sin enlaces canónicos ni URLs de Open Graph. Para las publicaciones siguientes, usa siempre:

```bash
SITE_URL=https://fsucatti-portfolio.fsucatti-portfolio.workers.dev npm run deploy
```

## Después de publicar

- **Prueba el formulario** enviándote un mensaje real.
- **Autoriza el dominio en EmailJS:** si limitaste los orígenes permitidos, agrega la URL nueva. Es la causa más probable de un formulario que falla solo en producción.
- **Si la consola muestra `Gmail_API: Invalid grant`:** EmailJS perdió el acceso a Gmail. En **Email Services**, desconecta y vuelve a conectar la cuenta. No hace falta publicar de nuevo, salvo que cambie el Service ID.
- **Activa los enlaces canónicos y Open Graph:** vuelve a publicar indicando la URL definitiva:

```bash
SITE_URL=https://tu-dominio.com npm run deploy
```

## Dominio propio

En el panel de Cloudflare: **Workers & Pages > fsucatti-portfolio > Settings > Domains & Routes > Add**. El dominio tiene que estar administrado en tu cuenta de Cloudflare.

## Cabeceras de seguridad

`public/_headers` define la política de contenido (CSP). Si agregas un servicio externo, permítelo ahí o el navegador lo bloqueará:

- Llamadas a una API: `connect-src`.
- Contenido embebido: `frame-src`.
- Imágenes de otro sitio: `img-src`.

## Volver a una versión anterior

```bash
npx wrangler deployments list
```

```bash
npx wrangler rollback
```

## Salir de Vercel

No borres el proyecto de Vercel hasta confirmar que el sitio nuevo funciona. Cuando lo elimines, la URL `fsucatti-portfolio.vercel.app` dejará de responder, así que actualiza antes los enlaces que hayas compartido, como LinkedIn o tu CV.
