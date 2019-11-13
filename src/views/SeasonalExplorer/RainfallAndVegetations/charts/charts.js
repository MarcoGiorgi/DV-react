import $ from 'jquery';
import kendo from '@progress/kendo-ui';
import * as moment from 'moment';
import t from '../../../../i18n/index';
import COVERAGE from './CoverageNames';
let year = 0;
let coverageID = 0;
const coverageName = '';

/*
AgroClimatic Charts Script
Version: 2.1.0 (2016-12-18)
Author: Marco Giorgi (Brains Engineering)
*/
//const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const months = [
  moment('01/01/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/02/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/03/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/04/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/05/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/06/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/07/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/08/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/09/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/10/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/11/2001', 'DD/MM/YYYY').format('MMM'),
  moment('01/12/2001', 'DD/MM/YYYY').format('MMM'),
];
let decades3y = [];
let months3y = [];
let cat = [];

let rfhSeries = null;
let rfhAnomSeries = null;
let vimSeries = null;
let vimAnomSeries = null;
let mixSeries = null;
let xResolution;

export class Charts {
  reInit(newData) {
    year = newData.year;
    coverageID = newData.coverageID;
    geoNavigation.set_coverage(COVERAGE[newData.coverageID]);
    geoNavigation.set_adm1Code(newData.admin1 ? newData.admin1.code : 0);
    geoNavigation.set_adm1Name(newData.admin1 ? newData.admin1.name : '');
    geoNavigation.set_adm2Code(newData.admin2 ? newData.admin2.code : 0);
    geoNavigation.set_adm2Name(newData.admin2 ? newData.admin2.name : '');
    refreshData();
  }

  changeYear(newYear) {
    // if (newYear === year) {
    //   return;
    // }
    year = newYear;
    refreshData();
  }

  setCoverageID(newID, name) {
    // if (newID === coverageID) {
    //   return;
    // }
    coverageID = newID;
    geoNavigation.set_coverage(name);
    refreshData();
  }

  getCoverageID() {
    return coverageID;
  }

  changeAdm1(adm1) {
    geoNavigation.set_adm1Code(adm1.code);
    geoNavigation.set_adm1Name(adm1.name);
    geoNavigation.set_adm2Code(0);
    geoNavigation.set_adm2Name('');
    refreshData();
  }

  changeAdm2(adm2) {
    geoNavigation.set_adm2Code(adm2.code);
    geoNavigation.set_adm2Name(adm2.name);
    refreshData();
  }
}

function Get100PercentSeries(value, len) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

function initChartVars() {
  xResolution = 72;
  const currentYear = new Date().getFullYear();
  cat = [];
  for (let i = 0; i < 72; i++) {
    cat.push(`${i}`);
  }
  months3y = [];
  for (let i = 0; i < 12; i++) {
    // months3y.push(months[i] + "'\n" + (year - 1).toString().substr(2, 2));
    months3y.push(`${months[i]}\n${(parseInt(year) - 1).toString()}`);
  }
  for (let i = 0; i < 12; i++) {
    // months3y.push(months[i] + "'\n" + (year).toString().substr(2, 2));
    months3y.push(`${months[i]}\n${year.toString()}`);
  }

  decades3y = [];
  for (let i = 0; i < 24; i++) {
    decades3y.push(1);
    decades3y.push(2);
    decades3y.push(3);
  }

  if (currentYear !== year) {
    for (let i = 0; i < 12; i++) {
      // months3y.push(months[i] + "'" + (year + 1).toString().substr(2, 2));
      months3y.push(`${months[i]}\n${(parseInt(year) + 1).toString()}`);
      decades3y.push(1);
      decades3y.push(2);
      decades3y.push(3);
    }
    for (let i = 72; i < 108; i++) {
      cat.push(`${i}`);
    }
    xResolution = 108;
  }
  // hide the charts container
  // $('.chart-box').hide();
}

class Template {
  constructor() {
    this.index = 0;
  }

  replace() {
    this.index++;
    if (this.index > 3) {
      this.index = 1;
    }
    return this.index.toString();
  }
}

const template1 = new Template();
const template2 = new Template();
const template3 = new Template();
const template4 = new Template();
const template5 = new Template();
const template6 = new Template();

function showRainfallChart() {
  if (rfhSeries !== null) {
    // Rainfall Chart
    $('#rfh-chart').kendoChart({
      title: {
        text: `${geoNavigation.get_areaName()} - ${coverageName}${year}`
      },
      legend: {
        position: 'bottom'
      },
      series: [
        {
          type: 'column',
          data: rfhSeries[1].data,
          name: t('seasonal_explorer.rev.visualizations.chart.legend.average'),
          color: '#93F1DF',
          axis: 'rain'
        },
        {
          type: 'column',
          data: rfhSeries[0].data,
          name: `${t('seasonal_explorer.rev.visualizations.chart.legend.rainfall')} `, // + year,
          color: '#1F4E79',
          axis: 'rain'
        }
      ],
      pannable: {
        lock: 'y'
      },
      valueAxes: [
        {
          name: 'rain',
          title: {
            text: t('seasonal_explorer.rev.visualizations.chart.axes.title.rainfall_mm'),
            visible: true,
            font: '12px Arial,Helvetica,sans-serif'
          },
          min: 0
        }
      ],
      categoryAxis: [
        {
          categories: cat,
          axisCrossingValues: [0, xResolution],
          justified: true,
          labels: {
            template: template1.replace.bind(template1)
          },
          crosshair: {
            visible: true,
            dashType: 'dash'
          },
          min: 36,
          max: 72
        },
        {
          categories: months3y,
          // labels: { rotation: 0, padding: { right: 1 } },
          justified: false,
          min: 12,
          max: 24
        }
      ],

      valueAxis: {
        axisCrossingValues: [0, 12]
      },
      tooltip: {
        visible: true,
        format: '{0}',
        template: (chartData) => getExTooltip(chartData, 'rfh-chart', ' mm') // getExTooltipRFH // "  #= getExTooltip(category,'rfh-chart', ' mm') # "
      },
      render(e) {
        const draw = kendo.drawing;
        const text = new draw.Text('© WFP-VAM, CHIRPS/UCSB', [0, 0], {
          font: '11px Arial,sans-serif',
          opacity: 0.6
        });

        const { element } = this;
        const rect = new kendo.geometry.Rect([0, 0], [element.width() - 10, element.height()]);

        draw.align([text], rect, 'end');
        draw.vAlign([text], rect, 'end');

        e.sender.surface.draw(text);
      },
      drag: onDrag,
      dragEnd: onDragEnd
    });
    // End Build Chart

    $('#rfh-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .fadeIn(2000);
  } else {
    $('#rfh-chart').html('No Data Available');
    $('#rfh-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .css('display', 'none');
  }
}
function showNdviChart() {
  if (vimSeries !== null) {
    // NDVI Chart
    $('#vim-chart').kendoChart({
      title: {
        text: `${geoNavigation.get_areaName()} - ${coverageName}${year}`
      },
      legend: {
        position: 'bottom'
      },
      series: [
        {
          type: 'line',
          data: vimSeries[1].data,
          name: t('seasonal_explorer.rev.visualizations.chart.legend.average'),
          color: '#03FB32',
          axis: 'vim',
          markers: {
            size: 0
          }
        },
        {
          type: 'line',
          data: vimSeries[0].data,
          name: `${t('seasonal_explorer.rev.visualizations.chart.legend.ndvi')} `, // + year,
          color: '#00B050',
          axis: 'vim',
          markers: {
            size: 3
          }
        }
      ],
      pannable: {
        lock: 'y'
      },
      valueAxes: [
        {
          name: 'vim',
          title: {
            text: `${t('seasonal_explorer.rev.visualizations.chart.legend.ndvi')} `,
            visible: true,
            font: '12px Arial,Helvetica,sans-serif'
          },
          min: 0,
          max: 1
        }
      ],
      categoryAxis: [
        {
          categories: cat,
          axisCrossingValues: [0, xResolution],
          justified: true,
          labels: {
            template: template2.replace.bind(template2)
          },
          crosshair: {
            visible: true,
            dashType: 'dash'
          },
          min: 36,
          max: 72
        },
        {
          categories: months3y,
          // labels: { rotation: -40, padding: { right: 1 } },
          justified: false,
          min: 12,
          max: 24
        }
      ],

      valueAxis: {
        axisCrossingValues: [0, 12]
      },
      tooltip: {
        visible: true,
        format: '{0}',
        template: (chartData) => getTooltip(chartData, 'vim-chart', ' ') // "  #= getTooltip(category,vimSeries, ' ') # "
      },
      render(e) {
        const draw = kendo.drawing;
        const text = new draw.Text('© WFP-VAM, MODIS/NASA', [0, 0], {
          font: '11px Arial,sans-serif',
          opacity: 0.6
        });

        const { element } = this;
        const rect = new kendo.geometry.Rect([0, 0], [element.width() - 10, element.height()]);

        draw.align([text], rect, 'end');
        draw.vAlign([text], rect, 'end');
        e.sender.surface.draw(text);
      },
      drag: onDrag,
      dragEnd: onDragEnd
    });
    // End NDVI Chart

    $('#vim-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .fadeIn(2000);
  } else {
    $('#vim-chart').html('No Data Available');
    $('#vim-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .css('display', 'none');
  }
}
function showRainfallAnomaliesChart() {
  if (rfhAnomSeries !== null) {
    // Build Anomaly Chart
    $('#rfhAnomaly-chart').kendoChart({
      title: {
        text: `${geoNavigation.get_areaName()} - ${coverageName}${year}`
      },
      legend: {
        position: 'bottom'
      },
      series: [
        {
          type: 'line',
          data: Get100PercentSeries(100, xResolution),
          name: t('seasonal_explorer.rev.visualizations.chart.legend.normal'),
          color: '#FF0000',
          axis: 'rain',
          width: 1,
          markers: {
            size: 0
          }
        },
        {
          type: 'line',
          data: rfhAnomSeries[0].data,
          name: t('seasonal_explorer.rev.visualizations.chart.legend.anomaly_1_month'),
          color: '#2F5597',
          axis: 'rain',
          markers: {
            size: 2
          }
        },
        {
          type: 'line',
          data: rfhAnomSeries[1].data,
          name: t('seasonal_explorer.rev.visualizations.chart.legend.anomaly_3_month'),
          color: '#CF13CF',
          axis: 'rain',
          markers: {
            size: 2
          }
        }
      ],
      pannable: {
        lock: 'y'
      },
      valueAxes: [
        {
          name: 'rain',
          title: {
            text: t('seasonal_explorer.rev.visualizations.chart.axes.title.variation_from_average'),
            visible: true,
            font: '12px Arial,Helvetica,sans-serif'
          },
          min: 0,
          // max: 200,
          labels: {
            format: '{0}%'
          }
          // axisCrossingValues: [-100],
        }
      ],
      categoryAxis: [
        {
          categories: cat,
          axisCrossingValues: [0, xResolution],
          justified: true,
          labels: {
            template: template3.replace.bind(template3)
          },
          crosshair: {
            visible: true,
            dashType: 'dash'
          },
          min: 36,
          max: 72
        },
        {
          categories: months3y,
          // labels: { rotation: -40, padding: { right: 1 } },
          justified: false,
          min: 12,
          max: 24
        }
      ],

      valueAxis: {
        axisCrossingValues: [0, 12]
      },
      tooltip: {
        visible: true,
        format: '{0}', // function getExTooltip(chartData, chartId, valUnit) {
        template: (chartData) => getExTooltip(chartData, 'rfhAnomaly-chart', ' ') // "  #= getExTooltip(category,'rfhAnomaly-chart', ' ') # "
      },
      render(e) {
        const draw = kendo.drawing;
        const text = new draw.Text('© WFP-VAM, CHIRPS/UCSB', [0, 0], {
          font: '11px Arial,sans-serif',
          opacity: 0.6
        });

        const { element } = this;
        const rect = new kendo.geometry.Rect([0, 0], [element.width() - 10, element.height()]);

        draw.align([text], rect, 'end');
        draw.vAlign([text], rect, 'end');
        e.sender.surface.draw(text);
      },
      drag: onDrag,
      dragEnd: onDragEnd
    });
    // End Build Chart

    $('#rfhAnomaly-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .fadeIn(2000);
  } else {
    $('#rfhAnomaly-chart').html('No Data Available');
    $('#rfhAnomaly-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .css('display', 'none');
  }
}
function showNdviAnomaliesChart() {
  if (vimAnomSeries !== null) {
    // NDVI Anomaly Chart
    $('#vimAnomaly-chart').kendoChart({
      title: {
        text: `${geoNavigation.get_areaName()} - ${coverageName}${year}`
      },
      legend: {
        position: 'bottom'
      },
      series: [
        {
          type: 'line',
          data: Get100PercentSeries(100, xResolution),
          name: t('seasonal_explorer.rev.visualizations.chart.legend.normal'),
          color: '#FF0000',
          width: 1,
          axis: 'vim',
          markers: {
            size: 0
          }
        },
        {
          type: 'line',
          data: vimAnomSeries[0].data,
          name: t('seasonal_explorer.rev.visualizations.chart.legend.anomaly'),
          color: '#548235',
          axis: 'vim',
          markers: {
            size: 2,
            color: '#00B050'
          }
        }
      ],
      valueAxes: [
        {
          name: 'vim',
          title: {
            text: t('seasonal_explorer.rev.visualizations.chart.axes.title.variation_from_average'),
            visible: true,
            font: '12px Arial,Helvetica,sans-serif'
          },
          min: 50,
          max: 150,
          labels: {
            format: '{0}%'
          }
          // axisCrossingValues: [-100],
        }
      ],
      categoryAxis: [
        {
          categories: cat,
          axisCrossingValues: [0, xResolution],
          justified: true,
          labels: {
            template: template4.replace.bind(template4)
          },
          crosshair: {
            visible: true,
            dashType: 'dash'
          },
          min: 36,
          max: 72
        },
        {
          categories: months3y,
          // labels: { rotation: -40, padding: { right: 1 } },
          justified: false,
          min: 12,
          max: 24
        }
      ],
      pannable: {
        lock: 'y'
      },

      valueAxis: {
        axisCrossingValues: [0, 12]
      },
      tooltip: {
        visible: true,
        format: '{0}',
        template: (chartData) => getExTooltip(chartData, 'vimAnomaly-chart', ' ') // "  #= getExTooltip(category,'vimAnomaly-chart', ' ') # "
      },
      render(e) {
        const draw = kendo.drawing;
        const text = new draw.Text('© WFP-VAM, MODIS/NASA', [0, 0], {
          font: '11px Arial,sans-serif',
          opacity: 0.6
        });

        const { element } = this;
        const rect = new kendo.geometry.Rect([0, 0], [element.width() - 10, element.height()]);

        draw.align([text], rect, 'end');
        draw.vAlign([text], rect, 'end');
        e.sender.surface.draw(text);
      },
      drag: onDrag,
      dragEnd: onDragEnd
    });
    // End Build Chart

    $('#vimAnomaly-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .fadeIn(2000);
  } else {
    $('#vimAnomaly-chart').html('No Data Available');
    $('#vimAnomaly-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .css('display', 'none');
  }
}
function showMixedRainfallNdviChart() {
  if (mixSeries !== null) {
    // Mix Chart
    $('#mix-chart').kendoChart({
      title: {
        text: `${geoNavigation.get_areaName()} - ${coverageName}${year}`
      },
      legend: {
        position: 'bottom'
      },
      series: [
        {
          type: 'column',
          data: mixSeries[3].data,
          name: t('seasonal_explorer.rev.visualizations.chart.legend.average'),
          color: '#93F1DF',
          axis: 'rain'
        },
        {
          type: 'column',
          data: mixSeries[2].data,
          name: `${t('seasonal_explorer.rev.visualizations.chart.legend.rainfall')} `, // + year,
          color: '#1F4E79',
          axis: 'rain'
        },
        {
          type: 'line',
          data: vimSeries[1].data,
          name: t('seasonal_explorer.rev.visualizations.chart.legend.ndvi_average'),
          color: '#03FB32',
          axis: 'vim',
          markers: {
            size: 1
          }
        },
        {
          type: 'line',
          data: vimSeries[0].data,
          name: `${t('seasonal_explorer.rev.visualizations.chart.legend.ndvi')} `, // + year,
          color: '#00B050',
          axis: 'vim',
          markers: {
            size: 3
          }
        }
      ],
      pannable: {
        lock: 'y'
      },
      valueAxes: [
        {
          name: 'rain',
          title: {
            text: t('seasonal_explorer.rev.visualizations.chart.axes.title.rainfall_mm'),
            visible: true,
            font: '12px Arial,Helvetica,sans-serif'
          },
          min: 0
          // max: 120
        },
        {
          name: 'vim',
          title: {
            text: t('seasonal_explorer.rev.visualizations.chart.legend.ndvi'),
            visible: true,
            font: '12px Arial,Helvetica,sans-serif'
          },
          min: 0,
          max: 1
        }
      ],
      categoryAxis: [
        {
          categories: cat,
          axisCrossingValues: [0, xResolution],
          justified: true,
          labels: {
            template: template5.replace.bind(template5)
          },
          crosshair: {
            visible: true,
            dashType: 'dash'
          },
          min: 36,
          max: 72
        },
        {
          categories: months3y,
          // labels: { rotation: -40, padding: { right: 1 } },
          justified: false,
          min: 12,
          max: 24
        }
      ],

      valueAxis: {
        axisCrossingValues: [0, 12]
      },
      tooltip: {
        visible: true,
        format: '{0}',
        template: (chartData) => getExTooltip(chartData, 'mix-chart', ' ') // "  #= getExTooltip(category,'mix-chart', ' ') # "
      },
      render(e) {
        const draw = kendo.drawing;
        const text = new draw.Text('© WFP-VAM, CHIRPS/MODIS', [0, 0], {
          font: '11px Arial,sans-serif',
          opacity: 0.6
        });

        const { element } = this;
        const rect = new kendo.geometry.Rect([0, 0], [element.width() - 10, element.height()]);

        draw.align([text], rect, 'end');
        draw.vAlign([text], rect, 'end');
        e.sender.surface.draw(text);
      },
      drag: onDrag,
      dragEnd: onDragEnd
    });
    // End Build Chart

    $('#mix-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .fadeIn(2000);
  } else {
    $('#mix-chart').html('No Data Available');
    $('#mix-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .css('display', 'none');
  }
}
function showMixedAnomaliesChart() {
  if (mixSeries !== null) {
    // Mix Chart
    $('#mixAnomalies-chart').kendoChart({
      title: {
        text: `${geoNavigation.get_areaName()} - ${coverageName}${year}`
      },
      legend: {
        position: 'bottom'
      },
      series: [
        {
          type: 'line',
          data: Get100PercentSeries(100, xResolution),
          name: 'Normal',
          color: '#FF0000',
          width: 1,
          axis: 'var',
          markers: {
            size: 0
          }
        },
        {
          type: 'line',
          data: vimAnomSeries[0].data,
          name: t('seasonal_explorer.rev.visualizations.chart.legend.ndvi_anomaly'),
          color: '#548235',
          axis: 'var',
          markers: {
            size: 2,
            color: '#00B050'
          }
        },
        {
          type: 'line',
          data: rfhAnomSeries[0].data,
          name: t('seasonal_explorer.rev.visualizations.chart.legend.rainfall_1_month_anomaly'),
          color: '#2F5597',
          axis: 'var',
          markers: {
            size: 2
          },
          visible: false
        },
        {
          type: 'line',
          data: rfhAnomSeries[1].data,
          name: t('seasonal_explorer.rev.visualizations.chart.legend.rainfall_3_month_anomaly'),
          color: '#CF13CF',
          axis: 'var',
          markers: {
            size: 2
          }
        }
      ],
      pannable: {
        lock: 'y'
      },
      valueAxes: [
        {
          name: 'var',
          title: {
            text: t('seasonal_explorer.rev.visualizations.chart.axes.title.variation_from_average'),
            visible: true,
            font: '12px Arial,Helvetica,sans-serif'
          },
          min: 0,
          // max: 200,
          labels: {
            format: '{0}%'
          }
        }
      ],
      categoryAxis: [
        {
          categories: cat,
          axisCrossingValues: [0, xResolution],
          justified: true,
          labels: {
            template: template6.replace.bind(template6)
          },
          crosshair: {
            visible: true,
            dashType: 'dash'
          },
          min: 36,
          max: 72
        },
        {
          categories: months3y,
          // labels: { rotation: -40, padding: { right: 1 } },
          justified: false,
          min: 12,
          max: 24
        }
      ],

      valueAxis: {
        axisCrossingValues: [0, 12]
      },
      tooltip: {
        visible: true,
        format: '{0}',
        template: (chartData) => getExTooltip(chartData, 'mixAnomalies-chart', ' ') // "  #= getExTooltip(category,'mixAnomalies-chart', ' ') # "
      },
      render(e) {
        const draw = kendo.drawing;
        const text = new draw.Text('© WFP-VAM, CHIRPS/UCSB', [0, 0], {
          font: '11px Arial,sans-serif',
          opacity: 0.6
        });

        const { element } = this;
        const rect = new kendo.geometry.Rect([0, 0], [element.width() - 10, element.height()]);

        draw.align([text], rect, 'end');
        draw.vAlign([text], rect, 'end');
        e.sender.surface.draw(text);
      },
      drag: onDrag,
      dragEnd: onDragEnd
    });
    // End Build Chart

    $('#mixAnomalies-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .fadeIn(2000);
  } else {
    $('#mixAnomalies-chart').html('No Data Available for ');
    $('#mixAnomalies-chart')
      .parent()
      .parent()
      .children('.box-header')
      .children('.box-tools')
      .css('display', 'none');
  }
}

function getTooltip(chartData, chartId, valUnit) {
  const cat = chartData.category;
  const chart = $(`#${chartId}`).data('kendoChart');

  const ds = chart.options.series;

  let tbl = `<div class="chartTooltip"><span>Dekad ${decades3y[cat]} of ${months3y[Math.floor(cat / 3)]}</span><table>`;
  for (let i = 0; i < ds.length; i++) {
    tbl = `${tbl}<tr><td><div class="series-color" style="background-color:${ds[i].color}">&nbsp;</div>${ds[i].name}</td><td class="val">${ds[i].data[cat]}${valUnit}</td></tr>`;
  }
  return `${tbl}</table></div>`;
}

function getExTooltip(chartData, chartId, valUnit) {
  const cat = chartData.category;

  let tbl = `<div class="chartTooltip"><span>Dekad ${decades3y[cat]} of ${months3y[Math.floor(cat / 3)]}</span><table>`;
  // var tbl = `<div class="chartTooltip"><span>Dekad ${decades3y[cat]} of ${months3y[Math.floor(cat / 3)]} </span><table>`;
  const chart = $(`#${chartId}`).data('kendoChart');
  const { series } = chart.options;

  for (let i = 0; i < series.length; i++) {
    if (series[i].name !== 'Normal' && series[i].visible) {
      tbl = `${tbl}<tr><td><div class="series-color" style="background-color:${series[i].color}">&nbsp;</div>${series[i].name}</td><td class="val">${series[i].data[cat]}${valUnit}</td></tr>`;
    }
  }
  return `${tbl}</table></div>`;
}

// Minimum distance in px to start dragging
const DRAG_THR = 23;

// State variables
let viewStart = 36;
let newStart;

// Drag handler
function onDrag(e) {
  const delta = Math.round(e.originalEvent.x.initialDelta / DRAG_THR);
  // console.log('delta:'+ delta);
  if (delta !== 0) {
    newStart = Math.max(0, viewStart - delta);
    // console.log('newStart:'+ newStart);
    // newStart = Math.min(36, newStart);
    // console.log('newStart2:'+ newStart);
  }
  // panCharts(e);
}

function onDragEnd(e) {
  viewStart = newStart;
  // console.log('viewStart:'+viewStart);
  // console.log(e.sender.wrapper.attr("id"));
  const senderChartId = e.sender.wrapper.attr('id');

  const chart1 = $(`#${senderChartId}`).data('kendoChart');
  // console.log(chart1.options.categoryAxis[0].min);

  const maxPos = Math.round(chart1.options.categoryAxis[1].max);
  if (maxPos > 35) {
    chart1.options.title.text = `${geoNavigation.get_areaName()} - ${coverageName}${parseInt(year) + 1}`;
  } else if (maxPos < 13) {
    chart1.options.title.text = `${geoNavigation.get_areaName()} - ${coverageName}${parseInt(year) - 1}`;
  } else if (maxPos === 24) {
    chart1.options.title.text = `${geoNavigation.get_areaName()} - ${coverageName}${year}`;
  } else if (maxPos > 12 && maxPos < 24) {
    chart1.options.title.text = `${geoNavigation.get_areaName()} - ${coverageName}${parseInt(year) - 1}/${year}`;
  } else if (maxPos > 24 && maxPos < 36) {
    chart1.options.title.text = `${geoNavigation.get_areaName()} - ${coverageName}${year}/${parseInt(year) + 1}`;
  }

  $('.chart').each(function (i, obj) {
    // console.log(this.id);
    if (this.id !== senderChartId) {
      const chart2 = $(`#${this.id}`).data('kendoChart');
      if (chart2 !== null) {
        chart2.options.categoryAxis[0].min = chart1.options.categoryAxis[0].min;
        chart2.options.categoryAxis[0].max = chart1.options.categoryAxis[0].max;
        chart2.options.categoryAxis[1].min = chart1.options.categoryAxis[1].min;
        chart2.options.categoryAxis[1].max = chart1.options.categoryAxis[1].max;
        chart2.options.title.text = chart1.options.title.text;

        // console.log('max:' + chart1.options.categoryAxis[1].max + ' min:' + chart1.options.categoryAxis[1].min)
        chart2.redraw();
      }
    }
  });
  e.sender._suppressHover = false;
  chart1.redraw();
}

function refreshData() {
  if (geoNavigation.get_adm0Name() != null) {
    $('.chart-box').show();
    showAgroClimaData();
  }
}

function showAgroClimaData() {
  let admCode = 195;

  if (geoNavigation.get_adm0Code() > 0) admCode = geoNavigation.get_adm0Code();
  if (geoNavigation.get_adm1Code() > 0) admCode = geoNavigation.get_adm1Code();
  if (geoNavigation.get_adm2Code() > 0) admCode = geoNavigation.get_adm2Code();

  // set server side variable, needed for data export as CSV
  $('#HdnYearSelected').val(year);
  $('#HdnAdminCode').val(admCode);
  $('#HdnAreaName').val(geoNavigation.get_areaName());
  $('#HdnCoverageID').val(coverageID);
  // ga('send', 'event', 'Geo Navigation', geoNavigation.get_areaName() + ' ' + year );

  kendo.ui.progress($('.chart'), true);
  $.ajax({
    type: 'get',
    url: `https://dataviz.vam.wfp.org/API/GetAgroClimaticData?ac=${admCode}&y=${year}&dc=${coverageID}`,
    dataType: 'json',
    contentType: 'application/json;',
    success(response) {
      rfhSeries = response.rfhSeries;
      rfhAnomSeries = response.rfhAnomalies;
      vimSeries = response.ndviSeries;
      vimAnomSeries = response.ndviAnomalies;
      mixSeries = response.mixedNdviRfh;

      initChartVars();
      showRainfallChart();
      showNdviChart();

      setTimeout(() => {
        showRainfallAnomaliesChart();
        showNdviAnomaliesChart();
      }, 500);
      setTimeout(() => {
        showMixedRainfallNdviChart();
        showMixedAnomaliesChart();
      }, 1500);

      kendo.ui.progress($('.chart'), false);
    },
    failure(response) {
      alert('Error retrieving data. Please try again in few minutes.');
    }
  });
}

function showLoadingTxt(adminLevel) {
  $(`#admin${adminLevel}Selector`).text('Loading data...');
}

function hideLoadingTxt(adminLevel) {
  $(`#admin${adminLevel}Selector`).text(' ');
  if (adminLevel === 1 && geoNavigation.get_adm1Code() > 0) {
    $('#admin1Selector').html('<small>Click here to view country data</small>');
  }
}

var geoNavigation = (function () {
  let _maxAdminLevel;
  let _adm0Code;
  let _adm1Code;
  let _adm2Code;
  let _adm1Name = [];
  let _adm2Name = [];
  let _coverage = '';
  let _callbackForAdmin0Change;
  const _adminCodes = [];
  const _set_maxAdminLevel = function (value) {
    _maxAdminLevel = value;
  };
  const _set_coverage = name => _coverage = name;
  const _set_adm0Code = function (value) {
    _adm0Code = value;
  };
  const _set_adm1Code = function (value) {
    _adm1Code = value;
  };
  const _set_adm1Name = function (value) {
    _adm1Name = value;
  };
  const _set_adm2Code = function (value) {
    _adm2Code = value;
  };
  const _set_adm2Name = function (value) {
    _adm2Name = value;
  };
  const _get_maxAdminLevel = function () {
    return _maxAdminLevel;
  };
  const _get_adm0Code = function () {
    return _adm0Code;
  };
  const _get_adm0Name = function () {
    return 'Peru';
  };
  const _get_adm1Code = function () {
    return _adm1Code;
  };
  const _get_adm1Name = function () {
    return _adm1Name;
  };
  const _get_adm2Code = function () {
    return _adm2Code;
  };
  const _get_adm2Name = function () {
    return _adm2Name;
  };
  const _get_coverage = () => _coverage;

  const _get_areaName = function () {
    let areaName;
    areaName = _get_adm0Name();
    if (_get_adm1Name().length > 0) areaName += ` - ${_get_adm1Name()}`;
    if (_get_adm2Name().length > 0) areaName += ` - ${_get_adm2Name()}`;
    if (_get_coverage().length > 0) areaName += ` - ${_get_coverage()}`;
    return areaName;
  };
  const _set_callbackForAdmin0Change = function (value) {
    _callbackForAdmin0Change = value;
  };
  const _exec_callbackForAdmin0Change = function () {
    return _callbackForAdmin0Change();
  };

  return {
    initGeoNavigation(callbackForAdmin0Change) {
      geoNavigation.set_callbackForAdmin0Change(callbackForAdmin0Change);

      $(document).mouseup((e) => {
        const container = $('#geoNavMenu');
        if (
          !container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0
          && $('#geoNavMenu').is(':visible')
        ) {
          // ... nor a descendant of the container
          container.fadeOut(999);
          console.log(`closeContainer ${e.target}`);
          console.log(`test: ${$('#admin1Selector').is(e.target)}`);
          console.log($('#admin1Selector').html());
          if (
            $('#admin1Selector small').is(e.target)
            && $('#admin1Selector').html() === '<small>Click here to view country data</small>'
          ) {
            geoNavigation.set_adm1Code(0);
            geoNavigation.set_adm1Name('');
            geoNavigation.exec_callbackForAdmin0Change();
          }
        }
      });
      // $(document).on("click", function (e) {
      //    if ($('.mCSB_dragger_bar').is(e.target) || $('.mCSB_buttonDown').is(e.target) || $('.mCSB_buttonUp').is(e.target)) {
      //        console.log('clicked scroll bar');
      //        e.stopImmediatePropagation();
      //        e.preventDefault();
      //        //$('[data-id=Site_CountryMapNavMenu_DdlAdmin0]').trigger('click');
      //    }
      // });

      $('body').on('click', (e) => {
        const selectorContainer = $('#admin0Selector button').parent();
        if (
          !$(selectorContainer).is(e.target)
          && $(selectorContainer).has(e.target).length === 0
          && $('.open').has(e.target).length === 0
        ) {
          $(selectorContainer).removeClass('open');
        }
      });

      $('.selectpicker').selectpicker({
        size: 10
      });
      $('.selectpicker').on('show.bs.select', (e) => {
        $('.selectpicker').selectpicker('deselectAll');
      });

      $('#admin0Selector button').removeAttr('data-toggle');
      $('#admin0Selector button').on('click', function (e) {
        $(this)
          .parent()
          .toggleClass('open');
      });
      $('#admin0Selector .dropdown-menu li a').on('click', (e) => {
        $('#admin0Selector button')
          .parent()
          .toggleClass('open');
      });

      $('#adminListContainer').mCustomScrollbar({
        theme: 'rounded-dots',
        setWidth: false,
        autoHideScrollbar: true,
        scrollButtons: { enable: true }
      });
      $('ul.dropdown-menu').mCustomScrollbar({
        theme: 'rounded-dots',
        setWidth: false,
        autoHideScrollbar: true,
        scrollButtons: { enable: true }
      });
      $('#admin1Selector').click((event) => {
        if (
          geoNavigation.get_adm0Code() !== null
          && geoNavigation.get_adm0Code() > 0
          && !$('#geoNavMenu').is(':visible')
        ) {
          showLoadingTxt(1);
          geoNavigation.loadList(1, geoNavigation.get_adm0Code());
          geoNavigation.clearMap();
          if ($(window).width() < 992) {
            $('#geoNavMenu').css('left', $('#admin1Selector').position().left + 15);
          }

          $('#geoNavMenu').slideDown(900, () => {
            if (
              $('#mapContainer')
                .parent()
                .is(':visible')
            ) {
              geoNavigation.loadMap(1, geoNavigation.get_adm0Code(), geoNavigation.get_adm0Code());
            }
          });

          geoNavigation.set_adm2Code(0);
          geoNavigation.set_adm2Name('');
          $('#admin2Selector').fadeOut();
          $('#admin2Selector').text('Please Select Admin 2'); // cancel the previous selection
        } else {
          showLoadingTxt(1);
          geoNavigation.loadList(1, geoNavigation.get_adm0Code());

          if ($(window).width() < 992) {
            $('#geoNavMenu').css('left', $('#admin1Selector').position().left + 15);
          }
          if (
            $('#mapContainer')
              .parent()
              .is(':visible')
          ) {
            geoNavigation.loadMap(1, geoNavigation.get_adm0Code(), geoNavigation.get_adm0Code());
          }
          geoNavigation.set_adm2Code(0);
          geoNavigation.set_adm2Name('');
          $('#admin2Selector').fadeOut();
          $('#admin2Selector').text('Please Select Admin 2'); // cancel the previous selection
        }
      });
      $('#admin2Selector').click(() => {
        if (
          geoNavigation.get_adm0Code() !== null
          && geoNavigation.get_adm0Code() > 0
          && !$('#geoNavMenu').is(':visible')
        ) {
          showLoadingTxt(2);
          geoNavigation.loadList(2, geoNavigation.get_adm1Code());
          geoNavigation.clearMap();

          if ($(window).width() < 992) {
            $('#geoNavMenu').css('left', $('#admin2Selector').position().left + 15);
          }
          $('#geoNavMenu').slideDown(900, () => {
            if (
              $('#mapContainer')
                .parent()
                .is(':visible')
            ) {
              geoNavigation.loadMap(2, geoNavigation.get_adm0Code(), geoNavigation.get_adm1Code());
            }
          });
          geoNavigation.showGeoNavMenu();
        }
      });

      $('#admin0Selector select').off('click');
      $('#admin0Selector select').change(function () {
        geoNavigation.ddlAdmin0_change(this);
      });
    },
    clearMap() {
      $('#mapContainer').highcharts('Map', {
        chart: {
          backgroundColor: null
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        series: []
      });
    },
    loadMap(adminLevel, adm0, adminCode) {
      // console.log('LoadMap:'+adminCode);
      $.ajax({
        url: `/API/GetGeoAdmins?adm0=${adm0}&admcode=${adminCode}`,
        dataType: 'json',
        async: true // ,
        // beforeSend: kendo.ui.progress($('#mapContainer'), true)
      })
        .always(() => {
          kendo.ui.progress($('#mapContainer'), false);
        })
        .fail(() => {
          // handle request failures
          console.log('loadMap fail');
        })
        .done((geojson) => {
          // Initiate the chart

          geoNavigation.clearMap();
          console.log('render the map 1');
          $('#mapContainer').highcharts('Map', {
            chart: {
              backgroundColor: null
              // ,
              // animation: {
              //    duration: 2000
              // }
            },
            title: {
              text: ''
            },
            credits: {
              enabled: false
            },
            mapNavigation: {
              enabled: true,
              buttonOptions: {
                verticalAlign: 'bottom'
              }
            },
            plotOptions: {
              series: {
                point: {
                  events: {
                    click() {
                      this.zoomTo();
                      // var mapChart = $('#container').highcharts(); //get map chart object from DOM
                      $(`#admin${adminLevel}Selector`).text($(`#${this.Code}`).text());
                      if (adminLevel === 1) {
                        geoNavigation.set_adm1Code(this.Code);
                        geoNavigation.set_adm1Name($(`#${this.Code}`).text());
                      } else if (adminLevel === 2) {
                        geoNavigation.set_adm2Code(this.Code);
                        geoNavigation.set_adm2Name($(`#${this.Code}`).text());
                      }
                      $('#geoNavMenu').fadeOut('1500');
                      if (geoNavigation.get_maxAdminLevel() > 1) {
                        $('#admin2Selector')
                          .fadeIn()
                          .css('display', 'inline-block');
                      }
                      refreshData();
                    },
                    mouseOver() {
                      // $('#adminListContainer').stop();
                      $('#adminListContainer').mCustomScrollbar('stop');
                      $('#adminList > li > a').css('text-decoration', 'none');
                      $('#adminList > li > a').css('color', '#7CB5EC');
                      $(`#${this.Code}`).css('text-decoration', 'underline');
                      $(`#${this.Code}`).css('color', '#AFE8FF');
                      // $('#adminListContainer').scrollTo($('#' + this.Code), 400);
                      $('#adminListContainer').mCustomScrollbar('scrollTo', `#${this.Code}`, {
                        scrollInertia: 1000
                      });
                    },
                    mouseOut() {
                      const chart = $('#mapContainer').highcharts();
                      const selPoint = chart.getSelectedPoints();
                      for (let i = 0; i < selPoint.length; i++) {
                        chart.series[0].data[selPoint[i].index].select(false, false);
                      }
                      $('#adminList > li > a').css('text-decoration', 'none');
                      $('#adminList > li > a').css('color', '#7CB5EC');
                    }
                  }
                }
              }
            },
            legend: {
              enabled: false
            },

            xAxis: {
              minRange: 0.1
            },

            yAxis: {
              minRange: 0.1
            },
            series: [
              {
                animation: false,
                data: _adminCodes,
                mapData: geojson,
                joinBy: ['Code', 'Code'],
                name: 'Random data',
                allowPointSelect: true,
                cursor: 'pointer',
                states: {
                  hover: {
                    color: '#AFE8FF',
                    borderColor: '#2A93FC'
                  },
                  select: {
                    color: '#AFE8FF'
                  }
                },
                color: '#7CB5EC',
                dataLabels: {
                  enabled: true,
                  formatter() {
                    try {
                      return this.point.properties.Name;
                    } catch (e) {
                      console.log(e);
                      // console.log(this);
                    }
                  }
                }
              }
            ],
            tooltip: {
              enabled: false,
              formatter() {
                return `The value for <b>${this.point.properties.Name}</b>`;
              }
            }
          });

          hideLoadingTxt(adminLevel);
        });
    },
    loadList(adminLevel, adminCode) {
      $.ajax({
        url: `/api/getadmins?al=${adminLevel}&ac=${adminCode}`,
        dataType: 'json',
        async: false,
        beforeSend: showLoadingTxt(adminLevel)
      })
        .always(() => {
          // remove loading image
        })
        .fail(() => {
          // handle request failures
        })
        .done((data) => {
          let n = 0;
          $('#adminList').empty();
          _adminCodes.splice(0, data.length);
          $.each(data, (i, item) => {
            $('#adminList').append(`<li><a id="${item.admincode}" href="#">${item.name}</a></li>`);
            const adm = { Code: item.admincode, value: n };
            _adminCodes.push(adm);
            n++;
          });

          const hiConfig = {
            sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
            interval: 100, // number = milliseconds for onMouseOver polling interval
            timeout: 100, // number = milliseconds delay before onMouseOut
            over() {
              const chart = $('#mapContainer').highcharts();
              for (let i = 0; i < chart.series[0].data.length; i++) {
                if (chart.series[0].data[i].Code === $(this).attr('id')) {
                  // console.log(chart.series[0].data[i]);
                  chart.series[0].data[i].select(true, false);
                  // chart.series[0].data[i].zoomTo();
                  // chart.mapZoom(3.5);
                  break;
                }
              }
              $('#adminList > li > a').css('text-decoration', 'none');
              $('#adminList > li > a').css('color', '#7CB5EC');
              $(this).css('text-decoration', 'underline');
              $(this).css('color', '#AFE8FF');
            }, // function = onMouseOver callback (REQUIRED)
            out() {
              const chart = $('#mapContainer').highcharts();
              const selPoint = chart.getSelectedPoints();
              for (let i = 0; i < selPoint.length; i++) {
                chart.series[0].data[selPoint[i].index].select(false, false);
              }
              $(this).css('text-decoration', 'none');
              $(this).css('color', '#7CB5EC');
            } // function = onMouseOut callback (REQUIRED)
          };
          $('#adminList > li > a').hoverIntent(hiConfig);

          $('#adminList > li > a').click(function () {
            // console.log($(this).attr('id'));
            // admin area selected from the list
            // var mapChart = $('#mapContainer').highcharts();
            $(`#admin${adminLevel}Selector`).text($(this).text());
            if (adminLevel === 1) {
              geoNavigation.set_adm1Code($(this).attr('id'));
              geoNavigation.set_adm1Name($(this).text());
              if (geoNavigation.get_maxAdminLevel() > 1) {
                $('#admin2Selector')
                  .fadeIn()
                  .css('display', 'inline-block');
              }
            } else if (adminLevel === 2) {
              geoNavigation.set_adm2Code($(this).attr('id'));
              geoNavigation.set_adm2Name($(this).text());
            }
            $('#geoNavMenu').fadeOut('1000');
            refreshData();
          });

          hideLoadingTxt(adminLevel);
        });
    },
    showGeoNavMenu() {
      $('#geoNavMenu').slideDown(900);
    },
    ddlAdmin0_change(e) {
      if (e.options[e.selectedIndex].value !== null && e.options[e.selectedIndex].value > 0) {
        geoNavigation.set_adm0Code(e.options[e.selectedIndex].value);
        geoNavigation.set_adm0Name(e.options[e.selectedIndex].text);
        geoNavigation.set_adm1Code(0);
        geoNavigation.set_adm1Name('');
        geoNavigation.set_adm2Code(0);
        geoNavigation.set_adm2Name('');
        if (
          geoNavigation.get_adm0Code() !== null
          && geoNavigation.get_adm0Code() > 0
          && !$('#admin1Selector').is(':visible')
        ) {
          $('#admin1Selector')
            .fadeIn()
            .css('display', 'inline-block');
        } else if (
          geoNavigation.get_adm0Code() !== null
          && geoNavigation.get_adm0Code() > 0
          && $('#geoNavMenu').is(':visible')
        ) {
          $('#geoNavMenu').fadeOut();
        }

        $('#admin1Selector').text('Please Select Admin 1'); // cancel the previous selection
        $('#admin2Selector').text('Please Select Admin 2'); // cancel the previous selection
        $('#admin2Selector').fadeOut();

        geoNavigation.exec_callbackForAdmin0Change();
      }
    },

    set_adm0Code: _set_adm0Code,
    set_adm1Code: _set_adm1Code,
    set_adm1Name: _set_adm1Name,
    set_adm2Code: _set_adm2Code,
    set_adm2Name: _set_adm2Name,
    set_maxAdminLevel: _set_maxAdminLevel,
    get_adm0Code: _get_adm0Code,
    get_adm0Name: _get_adm0Name,
    get_adm1Code: _get_adm1Code,
    get_adm1Name: _get_adm1Name,
    get_adm2Code: _get_adm2Code,
    get_adm2Name: _get_adm2Name,
    get_areaName: _get_areaName,
    set_coverage: _set_coverage,
    get_maxAdminLevel: _get_maxAdminLevel,
    exec_callbackForAdmin0Change: _exec_callbackForAdmin0Change,
    set_callbackForAdmin0Change: _set_callbackForAdmin0Change
  };
}());

export { refreshData, geoNavigation, getExTooltip };
