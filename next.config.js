const withPWA = require('next-pwa');

const isProd = process.env.NODE_ENV === 'production';

module.exports = withPWA({
    assetPrefix: isProd ? 'https://cdn.tiagofssampaio.com' : '',
    pwa: {
        dest: 'public',
        disable: !isProd,
        register: true,
        scope: '/',
        sw: 'service-worker.js',
    },
    i18n: {
        locales: ['pt', 'pt-BR'],
        defaultLocale: 'pt'
    },
    env: {
        BASE_URL: 'https://tiagofssampaio.com',
        GRAPHQL_URL: 'https://staging.ncultura.pt/graphql',
        WEBSITE: {
            name: 'ncultura',
            title: 'Ncultura.pt | O Seu Portal Cultural | Histórias do Mundo',
            description: 'Conheça as Histórias de Portugal e do Mundo da cultura Portuguesa à culinária, do Turismo à História. Tudo Sobre Viagens, Cultura, Pessoas e Tradições.',
            titleTemplate: '%s | ncultura',
            robots: 'nofollow, noindex',
            twitter: {
                card: 'summary_large_image',
                site: '@nculturamag',
                creator: '@nculturamag' 
            }
        }
    },
});
