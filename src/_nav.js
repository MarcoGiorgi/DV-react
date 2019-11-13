import t from './i18n';

export default lang => {
  console.log('menu', lang);
  return {
  items: [
    {
      name: t('home.menu.hunger_analytics', { lang }),
      url: '/Hunger-Analytics-Hub/main',
      icon: 'fa fa-globe'
    },
    {
      name: t('home.menu.seasonal_explorer', { lang }),
      url: '/seasonal-explorer/rainfall-and-vegetation/visualizations',
      icon: 'fa fa-cloud'
    },
    {
      name: t('home.menu.economic_explorer', { lang }),
      url: '/economic-explorer/food-prices/wholesale-markets',
      icon: 'fa fa-area-chart'
    }
  ]
}};