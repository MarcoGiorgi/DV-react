const strings = {
  is: (lang) => lang.substr(0, 2) === 'en',
  'breadcrumb.home': 'Home',
  'breadcrumb.dashboard': 'Dashboard',
  'breadcrumb.hunger': 'Hunger-Analytics-Hub',
  'breadcrumb.economic_explorer': 'Economic Explorer',
  'breadcrumb.seasonal_explorer': 'Seasonal Explorer',
  'breadcrumb.food_prices': 'Food Prices (wholesale)',
  'breadcrumb.retail_prices': 'Food Prices (retail)',
  'breadcrumb.at-a-glance': 'At a Glance',
  'breadcrumb.inflation': 'Inflation',
  'breadcrumb.exchange_rate': 'Exchange Rate',
  'breadcrumb.gdp': 'GDP',
  'breadcrumb.current_account': 'Current Account',
  'breadcrumb.visualizations': 'Visualizations',
  'breadcrumb.how_it_works': 'How it works',
  'breadcrumb.food_prices.dashboard': 'Supply',

  'breadcrumb.vulnerability_map': 'Vulnerability Map',

  'home.menu.hunger_analytics': 'Hunger Analytics Hub',
  'home.menu.hunger_analytics.vulnerability_map': 'Vulnerability Map',
  'home.menu.hunger_analytics.vulnerability_map.admin1': 'Admin1',
  'home.menu.hunger_analytics.vulnerability_map.admin2': 'Admin2',
  'home.menu.hunger_analytics.vulnerability_map.admin3': 'Admin3',

  'home.menu.seasonal_explorer': 'Seasonal Explorer',
  'home.menu.economic_explorer': 'Economic Explorer',

  'dashboard.menu.hunger.title': 'Hunger',
  'dashboard.menu.hunger.subtitle': 'Analytics Hub',
  'dashboard.menu.seasonal_explorer.title': 'Seasonal Explorer',
  'dashboard.menu.economic_explorer.title': 'Economic Explorer',

  'dashboard.carousel.hunger.alt': 'Hunger Analytics Hub',
  'dashboard.carousel.hunger.header': 'NEW: Integrated Platform for Hunger Analytics',
  'dashboard.carousel.hunger.text': '| Hunger Analytics Hub',

  'dashboard.carousel.seasonal_explorer.alt': 'River Basins',
  'dashboard.carousel.seasonal_explorer.header': 'River Basins',
  'dashboard.carousel.seasonal_explorer.text': '| Seasonal Explorer',

  'dashboard.carousel.economic_explorer.alt': 'Burkina Faso: Alert for Price Spikes',
  'dashboard.carousel.economic_explorer.header': 'Burkina Faso: Alert for Price Spikes',
  'dashboard.carousel.economic_explorer.text': '| Economic Explorer',

  'hunger.menu.vulnerability_map': 'Vulnerability Map',
  'hunger.menu.markets_and_economic': 'Markets and Economic',
  'hunger.menu.markets_and_economic.markets': 'Markets',
  'hunger.menu.remote_sensing': 'Remote Sensing',
  'hunger.menu.remote_sensing.rainfall': 'Rainfall',
  'hunger.menu.remote_sensing.ndvi': 'Vegetation Index (NDVI)',
  'hunger.menu.population_density': 'Population Density',
  'hunger.menu.population_density.admin_level1': 'Admin Level 1',
  'hunger.menu.population_density.admin_level2': 'Admin Level 2',
  'hunger.menu.logistics': 'Logistics',
  'hunger.menu.logistics.road_networks': 'Road Networks',
  'hunger.menu.glossary': 'Glossary',
  'hunger.menu.contact_us': 'Contact Us',

  'hunger.main.map.legend': 'Legend',
  'hunger.main.map.legend.rainfall.title': 'Rainfall',
  'hunger.main.map.legend.rainfall.text': 'Rainfall as a percent of average',
  'hunger.main.map.legend.ndvi.title': 'NDVI',
  'hunger.main.map.legend.ndvi.text': 'Vegetation cover as percent of average',
  'hunger.main.map.legend.road_networks.title': 'Road Networks',
  'hunger.main.map.legend.last_update': 'Last update',

  'seasonal_explorer.menu.rev': 'Rainfall and Vegetation',
  'seasonal_explorer.menu.rev.visualizations': 'Visualizations',
  'seasonal_explorer.menu.rev.howitworks': 'How it works',

  'seasonal_explorer.rev.visualizations.button.select_admin1': 'Please select admin1',
  'seasonal_explorer.rev.visualizations.button.select_admin2': 'Please select admin2',
  'seasonal_explorer.rev.visualizations.button.cropland': 'Cropland',
  'seasonal_explorer.rev.visualizations.button.all': 'All',
  'seasonal_explorer.rev.visualizations.button.pasture': 'Pasture',

  'seasonal_explorer.rev.visualizations.chart.rainfall.title': 'Rainfall',
  'seasonal_explorer.rev.visualizations.chart.rainfall_anomalies.title': 'Rainfall Anomalies',
  'seasonal_explorer.rev.visualizations.chart.ndvi.title': 'NDVI',
  'seasonal_explorer.rev.visualizations.chart.ndvi_anomalies.title': 'NDVI Anomaly',
  'seasonal_explorer.rev.visualizations.chart.rainfall_ndvi.title': 'Rainfall & NDVI',
  'seasonal_explorer.rev.visualizations.chart.rainfall_ndvi_anomalies.title': 'Rainfall & NDVI Anomalies',

  'seasonal_explorer.rev.visualizations.chart.legend.average': 'Average',
  'seasonal_explorer.rev.visualizations.chart.legend.normal': 'Normal',
  'seasonal_explorer.rev.visualizations.chart.legend.anomaly': 'Anomaly',
  'seasonal_explorer.rev.visualizations.chart.legend.anomaly_1_month': '1 Month Anomaly',
  'seasonal_explorer.rev.visualizations.chart.legend.anomaly_3_month': '3 Month Anomaly',
  'seasonal_explorer.rev.visualizations.chart.legend.ndvi': 'NDVI',
  'seasonal_explorer.rev.visualizations.chart.legend.rainfall': 'Rainfall',
  'seasonal_explorer.rev.visualizations.chart.legend.ndvi_average': 'NDVI Average',
  'seasonal_explorer.rev.visualizations.chart.legend.ndvi_anomaly': 'NDVI Anomaly',
  'seasonal_explorer.rev.visualizations.chart.legend.rainfall_1_month_anomaly': '1 Month Rainfall Anomaly',
  'seasonal_explorer.rev.visualizations.chart.legend.rainfall_3_month_anomaly': '3 Months Rainfall Anomaly',

  'seasonal_explorer.rev.visualizations.chart.axes.title.variation_from_average': 'Variation from Average',
  'seasonal_explorer.rev.visualizations.chart.axes.title.rainfall_mm': 'Rainfall (mm)',

  'seasonal_explorer.rev.howitworks.overview.title': 'Overview',
  'seasonal_explorer.rev.howitworks.overview.text.p1':
    'We are very pleased to announce the launch of the WFP-VAM Data Visualization platform for monitoring the performance of the agricultural seasons. This system will allow users to assess the performance of the current and past rainfall seasons, the timing and intensity of drier or wetter than average conditions and their impact on vegetation status at the subnational level for most countries.',
  'seasonal_explorer.rev.howitworks.overview.text.p2':
    'Users can download time series datasets for a near-global set of administrative divisions, going back to 1981 for rainfall and 2002 for vegetation. The primary data sources are CHIRPS gridded rainfall dataset produced by the Climate Hazards Group at the University of California, Santa Barbara and the MODIS NDVI CMG data made available by NOAA-NASA.',

  'seasonal_explorer.rev.howitworks.datacoverage.title': 'Data Coverage:',
  'seasonal_explorer.rev.howitworks.datacoverage.text':
    'Data coverage is limited to countries within 50N to 50S. Countries which extend beyond these geographical limits will be partially included up to those limits. Hence a rainfall plot for the Russian Federation will refer only to the part of the country south of 50N. At the subnational level, only the administrative divisions which are fully contained within those limits, have data to display.',

  'seasonal_explorer.rev.howitworks.datasources.title': 'Data Sources',
  'seasonal_explorer.rev.howitworks.datasources.section.rainfall.title': 'Rainfall:',
  'seasonal_explorer.rev.howitworks.datasources.section.rainfall.text.p1': `Rainfall data is derived from the CHIRPS rainfall estimate, produced by the Climate
                  Hazards Group, at the University of California, Santa Barbara. CHIRPS stands for
                  Climate Hazards Group InfraRed
                  Precipitation with Station data.
                  CHIRPS is a 35+ year quasi-global rainfall dataset. Spanning 50°S-50°N (and all
                  longitudes), starting in
                  1981 to near-present, CHIRPS incorporates 0.05° resolution satellite imagery with
                  in-situ station data
                  to create gridded rainfall time series for trend analysis and seasonal drought monitoring.
                  CHIRPS
                  data is available at 5 and 10 day accumulations. CHIRPS is free to use and easily
                  accessible at:`,
  'seasonal_explorer.rev.howitworks.datasources.section.rainfall.text.p2': `Full details on the underlying methodology can be found in: Funk, Chris, Pete Peterson, 
                  Martin Landsfeld, Diego Pedreros, James Verdin, Shraddhanand Shukla, Gregory Husak, James Rowland, Laura Harrison, Andrew Hoell & Joel Michaelsen. "The climate hazards infrared precipitation with stations—a new environmental record for monitoring extremes". Scientific Data 2, 150066. doi:10.1038/sdata.2015.66 2015.`,
  'seasonal_explorer.rev.howitworks.datasources.section.ndvi.title': 'NDVI:',
  'seasonal_explorer.rev.howitworks.datasources.section.ndvi.text':
    'The NDVI data in use is from the MODIS platforms Terra and Aqua, which provide global coverage since 2000 (Terra) and mid-2002 (Aqua) at about 5Km resolution with a temporal frequency of overlapping 16 day periods. The MODIS NDVI CMG data product was retrieved from REVERB, courtesy of:',

  'economic_explorer.menu.food_prices': 'Food Prices',
  'economic_explorer.menu.food_prices.wholesales': 'Wholesale markets',
  'economic_explorer.menu.food_prices.retail': 'Retail markets',
  'economic_explorer.menu.food_supply': 'Food supply',
  'economic_explorer.label.select.category': 'Select a category',

  'vulnerability.map.legend.low': 'Low',
  'vulnerability.map.legend.average': 'Average',
  'vulnerability.map.legend.high': 'High',
  'vulnerability.map.legend.veryhigh': 'Very High',
  'vulnerability.map.labels.indicators': 'Indicators',
  'vulnerability.map.buttons.VIA': 'VIA',
  'vulnerability.map.buttons.FFNN': 'FFNN',
  'vulnerability.map.buttons.VIAFFNN': 'VIAFFNN',
  'vulnerability.map.buttons.VIA.tooltip': 'Food Insecurity Vulnerability',
  'vulnerability.map.buttons.FFNN.tooltip': 'Frequency of Naturally Originated Phenomena',
  'vulnerability.map.buttons.VIAFFNN.tooltip':
    'Food Insecurity Vulnerability & Frequency of Naturally Originated Phenomena',

  'vulnerability.map.indicators.via.description.title': '(en) Vulnerabilidad a la Inseguridad Alimentaria (VIA)',
  'vulnerability.map.indicators.via.description.text':
    '(en) Es un índice que refleja el nivel de vulnerabilidad de los componentes importantes para la seguridad alimentaria, y se calcula mediante el promedio de cuatro indicadores: vulnerabilidad a la disponibilidad, vulnerabilidad al acceso, vulnerabilidad de la utilización y vulnerabilidad de la institucionalidad.',
  'vulnerability.map.indicators.ffnn.description.title': '(en) Recurrencia de fenómenos de origen natural (FFNN)',
  'vulnerability.map.indicators.ffnn.description.text':
    '(en) Se obtiene este índice con la aplicación del análisis factorial a las dos variables del componente estabilidad (recurrencia de fenómenos naturales y población afectada). El índice de recurrencia de fenómenos, son promedios ponderados por la población. Fuente: Registro de Emergencias y Peligros, producidos por los fenómenos naturales y tecnológicos inducidos por el hombre – INDECI 2004-2014.',
  'vulnerability.map.indicators.viaffnn.description.title':
    '(en) Vulnerabilidad a la Inseguridad Alimentaria ante la Recurrencia de Fenómenos de Origen Natural (VIAFFNN)',
  'vulnerability.map.indicators.viaffnn.description.text':
    '(en) Es un índice que indica la probabilidad de que la población sufra de inseguridad alimentaria frente al impacto de una amenaza, debido a la recurrencia de fenómenos de origen natural. Este índice está en función del índice de recurrencia de fenómenos de origen natural y el índice de vulnerabilidad a la inseguridad alimentaria'
};

export default strings;
