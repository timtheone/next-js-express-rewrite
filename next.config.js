module.exports = {
    pageExtensions: ['page.js'],

    async rewrites() {
      return [
        {
          source: '/:slug',
          has: [
            {
              type: 'header',
              key: 'x-page-type',
              value: 'event'
            }
          ],
          destination: '/test'
        },
        {
          source: '/:slug',
          has: [
            {
              type: 'header',
              key: 'x-page-type',
              value: 'category'
            }
          ],
          destination: '/test2'
        }
      ];
    },
}