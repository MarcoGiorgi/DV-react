import t from '../../i18n';

export default {
  items: [
    {
      name: t('economic_explorer.menu.food_prices'),
      url: '/economic-explorer/food-prices',
      icon: 'fa fa-cloud',
      children: [
        {
          name: t('economic_explorer.menu.food_prices.wholesales'),
          url: '/economic-explorer/food-prices/wholesale-markets',
          icon: 'fa fa-circle-o'
        },
        {
          name: t('economic_explorer.menu.food_prices.retail'),
          url: '/economic-explorer/food-prices/retail-markets',
          icon: 'fa fa-circle-o'
        }
      ]
    },
    {
      name: 'Abastecimiento',
      url: '/economic-explorer/food-supply',
      icon: 'fa fa-cloud',
      children: [
        {
          name: t('economic_explorer.menu.food_prices.dashboard'),
          url: '/economic-explorer/food-supply/dashboard',
          icon: 'fa fa-circle-o'
        },
      ]
    }
  ]
};
