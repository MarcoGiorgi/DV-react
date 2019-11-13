const strings = {
  is: (lang) => lang.substr(0, 2) === 'es',
  'breadcrumb.home': 'Inicio',
  'breadcrumb.dashboard': 'Visor',
  'breadcrumb.hunger': 'Visor de Seguridad Alimentaria',
  'breadcrumb.economic_explorer': 'Visor de precios y abastecimiento de mercados',
  'breadcrumb.seasonal_explorer': 'Visor de Precipitaciones y NDVI',
  'breadcrumb.food_prices': 'Precios de alimentos',
  'breadcrumb.retail_prices': 'Precios de alimentos',

  'breadcrumb.at-a-glance': undefined,
  'breadcrumb.inflation': undefined,
  'breadcrumb.exchange_rate': undefined,
  'breadcrumb.gdp': undefined,
  'breadcrumb.current_account': undefined,
  'breadcrump.visualizations': 'Visualizaciones',
  'breadcrump.how_it_works': 'Cómo funciona',
  'breadcrumb.food_prices.dashboard': 'Abastecimientos',
  'breadcrumb.food_prices.wholesale': 'Mayoristas',
  'breadcrumb.food_prices.retails': 'Minoristas',

  'home.menu.hunger_analytics.vulnerability_map': 'Mapa de Vulnerabilidad',
  'home.menu.hunger_analytics.vulnerability_map.admin1': 'Departamentos',
  'home.menu.hunger_analytics.vulnerability_map.admin2': 'Provincias',
  'home.menu.hunger_analytics.vulnerability_map.admin3': 'Distritos',

  'home.menu.hunger_analytics': 'Visor de Seguridad Alimentaria',
  'home.menu.seasonal_explorer': 'Visor de Precipitaciones y NDVI',
  'home.menu.economic_explorer': 'Visor de precios y abastecimiento de mercados',

  'dashboard.menu.hunger.title': 'Visor de Seguridad Alimentaria',
  'dashboard.menu.seasonal_explorer.title': 'Visor de Precipitaciones y NDVI',
  'dashboard.menu.economic_explorer.title': 'Visor de precios y Abastecimiento de mercados',

  'dashboard.carousel.hunger.alt': 'Visor de Seguridad Alimentaria',
  'dashboard.carousel.hunger.header': 'NEW: Integrated Platform for Hunger Analytics',
  'dashboard.carousel.hunger.text': '| Visor de Seguridad Alimentaria',

  'dashboard.carousel.seasonal_explorer.alt': 'River Basins',
  'dashboard.carousel.seasonal_explorer.header': 'River Basins',
  'dashboard.carousel.seasonal_explorer.text': '| Seasonal Explorer',

  'dashboard.carousel.economic_explorer.alt': 'Burkina Faso: Alert for Price Spikes',
  'dashboard.carousel.economic_explorer.header': 'Burkina Faso: Alert for Price Spikes',
  'dashboard.carousel.economic_explorer.text': '| Economic Explorer',

  'hunger.menu.vulnerability_map': 'Mapa de Vulnerabilidad',
  'hunger.menu.markets_and_economic': 'Economia y Mercado',
  'hunger.menu.markets_and_economic.markets': undefined,
  'hunger.menu.remote_sensing': 'Teledetección',
  'hunger.menu.remote_sensing.rainfall': 'Precipitación',
  'hunger.menu.remote_sensing.ndvi': 'Indice de Vegetación (NDVI)',
  'hunger.menu.population_density': 'Densidad de Población',
  'hunger.menu.population_density.admin_level1': 'Nivel Administrativo 1',
  'hunger.menu.population_density.admin_level2': 'Nivel Administrativo 2',
  'hunger.menu.logistics': 'Infraestructura de carreteras',
  'hunger.menu.logistics.road_networks': 'Mapa vial de carreteras',
  'hunger.menu.glossary': 'Glosario',
  'hunger.menu.contact_us': 'Contáctenos',

  'hunger.main.map.legend': 'Leyenda',
  'hunger.main.map.legend.rainfall.title': 'Rainfall',
  'hunger.main.map.legend.rainfall.text': 'Rainfall as a percent of average',
  'hunger.main.map.legend.ndvi.title': 'NDVI',
  'hunger.main.map.legend.ndvi.text': 'Porcentaje promedio de la cobertura vegetal',
  'hunger.main.map.legend.road_networks.title': undefined,
  'hunger.main.map.legend.last_update': 'Last update',

  'seasonal_explorer.menu.rev': 'Precipitación y vegetación',
  'seasonal_explorer.menu.rev.visualizations': 'Visualizaciones',
  'seasonal_explorer.menu.rev.howitworks': 'Cómo funciona',

  'seasonal_explorer.rev.visualizations.button.select_admin1': undefined,
  'seasonal_explorer.rev.visualizations.button.select_admin2': undefined,
  'seasonal_explorer.rev.visualizations.button.cropland': 'Tierra con cultivos',
  'seasonal_explorer.rev.visualizations.button.all': 'Todo',
  'seasonal_explorer.rev.visualizations.button.pasture': 'Tierra con pastos',

  'seasonal_explorer.rev.visualizations.chart.rainfall.title': 'Precipitación',
  'seasonal_explorer.rev.visualizations.chart.rainfall_anomalies.title': 'Comportamiento de las precipitaciones',
  'seasonal_explorer.rev.visualizations.chart.ndvi.title': 'Indice de Vegetación (NDVI)',
  'seasonal_explorer.rev.visualizations.chart.ndvi_anomalies.title': 'Comportamiento del NDVI',
  'seasonal_explorer.rev.visualizations.chart.rainfall_ndvi.title': undefined,
  'seasonal_explorer.rev.visualizations.chart.rainfall_ndvi_anomalies.title': undefined,

  'seasonal_explorer.rev.visualizations.chart.legend.average': undefined,
  'seasonal_explorer.rev.visualizations.chart.legend.normal': undefined,
  'seasonal_explorer.rev.visualizations.chart.legend.anomaly': 'Comportamiento',
  'seasonal_explorer.rev.visualizations.chart.legend.anomaly_1_month':
    'Comportamiento mensual / comportamiento del mes',
  'seasonal_explorer.rev.visualizations.chart.legend.anomaly_3_month':
    'Comportamiento trimestral / comportamiento del trimestre',
  'seasonal_explorer.rev.visualizations.chart.legend.ndvi': 'Indice de Vegetación (NDVI)',
  'seasonal_explorer.rev.visualizations.chart.legend.rainfall': 'Precipitación',
  'seasonal_explorer.rev.visualizations.chart.legend.ndvi_average': undefined,
  'seasonal_explorer.rev.visualizations.chart.legend.ndvi_anomaly': undefined,
  'seasonal_explorer.rev.visualizations.chart.legend.rainfall_1_month_anomaly': undefined,
  'seasonal_explorer.rev.visualizations.chart.legend.rainfall_3_month_anomaly': undefined,

  'seasonal_explorer.rev.visualizations.chart.axes.title.variation_from_average': 'Variación respecto al promedio',
  'seasonal_explorer.rev.visualizations.chart.axes.title.rainfall_mm': 'Precipitación (mm)',

  'seasonal_explorer.rev.howitworks.overview.title': undefined,
  'seasonal_explorer.rev.howitworks.overview.text.p1':
    'Es un placer anunciar el lanzamiento de la plataforma de visualización de datos PMA-VAM para monitorear el desempeño de las campañas agrícolas. Este sistema permitirá a los usuarios que evalúen el desempeño del comportamiento actual y pasada de lluvias, el tiempo y la gravedad de las condiciones más secas o más húmedas que el promedio y su impacto en el estado de vegetación a nivel subnacional para la mayoría de los países.',
  'seasonal_explorer.rev.howitworks.overview.text.p2':
    'Se puede descargar un conjunto de datos de series de tiempo para diversos sectores nacionales, desde 1981 para las precipitaciones y 2002 para la vegetación. Las principales fuentes de provienen de CHIRPS, los cuales fueron producidos por Climate Hazards Group de la Universidad de California, Santa Barbara y la data de MODIS NDVI CMG de la NOAA-NASA.',

  'seasonal_explorer.rev.howitworks.datacoverage.title': 'Cobertura de datos:',
  'seasonal_explorer.rev.howitworks.datacoverage.text': undefined,

  'seasonal_explorer.rev.howitworks.datasources.title': 'Fuentes de datos',
  'seasonal_explorer.rev.howitworks.datasources.section.rainfall.title': 'Precipitación:',
  'seasonal_explorer.rev.howitworks.datasources.section.rainfall.text.p1': `Los datos de precipitación provienen 
                        de CHIRPS producidos por Climate Hazards Group 
                        de la Universidad de California, Santa Barbara. 
                        CHIRPS significa Climate Hazards Group InfraRed 
                        Precipitation with Station. 
                        CHIRPS son un conjunto de datos cuasi globales de precipitación
                         de más de 35 años. CHIRPS es desde 1981 
                        hasta la fecha, incorpora imágenes satelitales de 0.05° de 
                        resolución con datos terrestres 
                        para crear series estacionales de precipitación con “cuadricula” para el análisis de tendencias y monitoreo estacional de sequía. 
                        Los datos de CHIRPS están disponibles 
                        en acumulaciones de 5 y 10 días. CHIRPS es de uso gratuito:`,
  'seasonal_explorer.rev.howitworks.datasources.section.rainfall.text.p2': `Los datos de precipitación provienen de CHIRPS producidos por Climate Hazards Group de la Universidad de California, Santa Barbara. CHIRPS significa Climate Hazards Group InfraRed Precipitation with Station. CHIRPS son un conjunto de datos cuasi globales de precipitación de más de 35 años. CHIRPS es desde 1981 hasta la fecha, incorpora imágenes satelitales de 0.05° de resolución con datos terrestres para crear series estacionales de precipitación con “cuadricula” para el análisis de tendencias y monitoreo estacional de sequía. Los datos de CHIRPS están disponibles en acumulaciones de 5 y 10 días. CHIRPS es de uso gratuito: http://chg.geog.ucsb.edu/data/chirps/
                        Los detalles completos sobre la metodología se pueden encontrar en: Funk, Chris, Pete Peterson, Martin Landsfeld, Diego Pedreros, James Verdin, Shraddhanand Shukla, Gregory Husak, James Rowland, Laura Harrison, Andrew Hoell & Joel Michaelsen. "The climate hazards infrared precipitation with stations—a new environmental record for monitoring extremes". Scientific Data 2, 150066. doi:10.1038/sdata.2015.66 2015.`,
  'seasonal_explorer.rev.howitworks.datasources.section.ndvi.title': 'NDVI:',
  'seasonal_explorer.rev.howitworks.datasources.section.ndvi.text':
    'La data del NDVI provienen de los satélites MODIS: Terra y Aqua, las cuales brindan información global desde el 2000 (Terra) y mediados de 2002 (Aqua) con una resolución de aproximadamente 5 km cada 8 días, a partir de datos superpuestos con una frecuencia de 16 días. Esta data proviene de',




  'economic_explorer.menu.food_prices': 'Precios',
  'economic_explorer.menu.food_prices.wholesales': 'Precios mayoristas',
  'economic_explorer.menu.food_prices.retail': 'Precios minoristas',
  'economic_explorer.menu.food_supply': 'Abastecimiento',
  'economic_explorer.menu.food_prices.dashboard': 'Abastecimiento en Lima M.',

  'economic_explorer.label.select.category': 'Seleccionar una categoría',
  'economic_explorer.label.select.region': 'Seleccionar una región',
  'economic_explorer.prices.wholesale.label.select.market': 'Seleccionar un mercado',
  'dropdown.norecordfound': 'Ningún Registro Encontrado',
  'daterangepicker.applyText': 'Aplicar',
  'daterangepicker.cancelText': 'Cancelar',
  'daterangepicker.days': 'Días',
  'daterangepicker.endLabel': 'Determinar la fecha de término',
  'daterangepicker.placeholder': 'Seleccionar un rango de tiempo',
  'daterangepicker.selectedDays': 'Seleccionar los días',
  'daterangepicker.startLabel': 'Determinar la fecha de inicio',
  'grid.excelexport': 'Exportar a Excel',


  'vulnerability.map.legend.low': 'Bajo',
  'vulnerability.map.legend.average': 'Medio',
  'vulnerability.map.legend.high': 'Alto',
  'vulnerability.map.legend.veryhigh': 'Muy Alto',
  'vulnerability.map.labels.indicators': 'Indicadores',
  'vulnerability.map.buttons.VIA': 'VIA',
  'vulnerability.map.buttons.FFNN': 'FFNN',
  'vulnerability.map.buttons.VIAFFNN': 'VIAFFNN',
  'vulnerability.map.buttons.VIA.tooltip': 'Vulnerabilidad a la Inseguridad Alimentaria',
  'vulnerability.map.buttons.FFNN.tooltip': 'Recurrencia de Fenómenos de Origen Natural',
  'vulnerability.map.buttons.VIAFFNN.tooltip':
    'Vulnerabilidad a la Inseguridad Alimentaria ante la recurrencia de fenómenos de Origen Natural',

  'vulnerability.map.indicators.via.description.title': 'Vulnerabilidad a la Inseguridad Alimentaria (VIA)',
  'vulnerability.map.indicators.via.description.text':
    'Es un índice que refleja el nivel de vulnerabilidad de los componentes importantes para la seguridad alimentaria, y se calcula mediante el promedio de cuatro indicadores: vulnerabilidad a la disponibilidad, vulnerabilidad al acceso, vulnerabilidad de la utilización y vulnerabilidad de la institucionalidad.',
  'vulnerability.map.indicators.ffnn.description.title': 'Recurrencia de fenómenos de origen natural (FFNN)',
  'vulnerability.map.indicators.ffnn.description.text':
    'Se obtiene este índice con la aplicación del análisis factorial a las dos variables del componente estabilidad (recurrencia de fenómenos naturales y población afectada). El índice de recurrencia de fenómenos, son promedios ponderados por la población. Fuente: Registro de Emergencias y Peligros, producidos por los fenómenos naturales y tecnológicos inducidos por el hombre – INDECI 2004-2014.',
  'vulnerability.map.indicators.viaffnn.description.title':
    'Vulnerabilidad a la Inseguridad Alimentaria ante la Recurrencia de Fenómenos de Origen Natural (VIAFFNN)',
  'vulnerability.map.indicators.viaffnn.description.text':
    'Es un índice que indica la probabilidad de que la población sufra de inseguridad alimentaria frente al impacto de una amenaza, debido a la recurrencia de fenómenos de origen natural. Este índice está en función del índice de recurrencia de fenómenos de origen natural y el índice de vulnerabilidad a la inseguridad alimentaria'
};

export default strings;
