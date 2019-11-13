import t from '../../i18n';

export default (lang = 'es') => ({
  items: [
    {
      name: t('seasonal_explorer.menu.rev', {lang}),
      url: '/seasonal-explorer/rainfall-and-vegetation',
      icon: 'fa fa-cloud',
      children: [
        {
          name: t('seasonal_explorer.menu.rev.visualizations', {lang}),
          url: '/seasonal-explorer/rainfall-and-vegetation/visualizations',
          icon: 'fa fa-circle-o'
        },
        {
          name: t('seasonal_explorer.menu.rev.howitworks', {lang}),
          url: '/seasonal-explorer/rainfall-and-vegetation/how-it-works',
          icon: 'fa fa-circle-o'
        }
      ]
    }
  ]
});
