// Redireciona www.pizzariacabanas.com.br -> pizzariacabanas.com.br (301) e serve o site estático de dist/.
const DOMINIO = 'pizzariacabanas.com.br';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.' + DOMINIO) {
      url.hostname = DOMINIO;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
