// Redireciona http e www para https://pizzariacabanas.com.br (301) e serve o site estático de dist/.
const DOMINIO = 'pizzariacabanas.com.br';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // http -> https e www -> domínio principal, num único 301
    if (url.hostname.endsWith(DOMINIO) && (url.protocol === 'http:' || url.hostname === 'www.' + DOMINIO)) {
      url.protocol = 'https:';
      url.hostname = DOMINIO;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
