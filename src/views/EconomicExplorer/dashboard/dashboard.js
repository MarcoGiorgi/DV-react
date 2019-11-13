import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import _ from 'lodash-es';
import { SizeMe } from 'react-sizeme'
import { DataVizBarChart } from "./DataVizBarChart";
import * as moment from 'moment';

import { PieChart } from "./PieChart";
import MapChart from "./MapChart";
import TrendChart from "./TrendChart";

import ACTIONS from '../../../modules/action';

import '../style.scss';
import LoadingOverlay from "react-loading-overlay";

import t from '../../../i18n';

import configuration, { DEVELOPMENT } from "../../../config";

export class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectionDone: false
    }
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  componentDidUpdate() {
    //this.donutChart && this.donutChart.refresh();
    //this.pieChart && this.pieChart.refresh();
  }

  render() {

    const loading = () => (
      <div className="sk-circle">
        <div className="sk-circle1 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle2 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle3 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle4 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle5 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle6 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle7 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle8 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle9 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle10 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle11 sk-child" style={{ zIndex: 5000 }} />
        <div className="sk-circle12 sk-child" style={{ zIndex: 5000 }} />
      </div>
    );

    this.products = _.uniqBy(this.props.supply.products, 'category_code').map(item => { item.full_category_code = `${item.group_code}${item.category_code}`; return item });

    const last30days = configuration.is(DEVELOPMENT)
      ? moment().subtract(30, 'days').subtract(1, 'year').hour(0).minute(0).second(0).millisecond(0).toDate()
      : moment().subtract(30, 'days').hour(0).minute(0).second(0).millisecond(0).toDate()
    const lastYear = moment().subtract(1, 'year').month(0).date(1).millisecond(0).toDate();
    const yearToDate = moment().subtract(1, 'year').hour(0).minute(0).second(0).millisecond(0).toDate();

    return (
      <LoadingOverlay
        active={!!(this.props.loading && this.props.loading.length)}
        spinner={loading()}
        styles={{
          overlay: (base) => ({
            ...base,
            background: 'rgba(0, 0, 0, 0)'
          })
        }}
      >
        <Container fluid style={{ marginLeft: 15, marginRight: 15 }}>
          <Row>
            <Col xs="12" sm="12" lg="3" style={{ marginBottom: 15 }}>
              <DropDownListComponent
                ref={(scope) => { this.categorySelect = scope; }}
                id="products"
                dataSource={this.products}
                fields={{ text: 'category_name', value: 'full_category_code', groupBy: 'group_name' }}
                placeholder={t('economic_explorer.label.select.category', {lang: this.props.language})}
                change={(arg) => {
                  const categoryCode = arg.itemData.full_category_code;
                  this.props.fetchVarieties(categoryCode, last30days);
                  this.props.fetchSupplyByRegion(categoryCode, last30days);
                  this.props.fetchTrendByMonth(categoryCode, lastYear);
                  this.props.fetchTrend(categoryCode, yearToDate);
                  this.setState({selectionDone: true, category: arg.itemData.category_name});
                }}
              />
            </Col>
          </Row>

          {
            this.state.selectionDone && (
              <>
                <Row>
                  <Col xs="12" sm="12" lg="6" style={{ textAlign: "-webkit-center" }}>
                    <SizeMe>
                      {({size}) =>
                        <MapChart
                          title={`Lima M.: Regiones que abastecen de ${this.state.category} al Mercado del Productores de Santa Anita`}
                          subtitle={'Últimos 30 dias  - Toneladas'}
                          category={ { code: this.categorySelect.value, name: this.state.category }}
                          startDate={last30days}
                          width={size.width}
                          height={ 400 }/>}
                    </SizeMe>
                  </Col>
                  <Col xs="12" sm="12" lg="6" style={{ marginBottom: 15, textAlign: "-webkit-center" }}>
                    <SizeMe>
                      {({ size }) => (
                        <TrendChart
                          title={`Lima M.: Ingreso mensual de ${this.state.category} al Mercado de Productores de Santa Anita según regiones`}
                          subtitle={'Últimos 12 meses - Toneladas'}
                          category={{name: this.state.category, code: this.categorySelect.value}}
                          startDate={yearToDate}
                          dataSource={this.props.supply.trend}
                          width={size.width - 60} />
                      )}
                    </SizeMe>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="12" lg="6" style={{ marginBottom: 15, textAlign: "-webkit-center"  }}>
                    <PieChart
                      title={`Lima M.: Ingreso de ${this.state.category} según tipo al Mercado de Productores de Santa Anita durante ${moment().format('MMMM')} del ${moment().format('YYYY')}`}
                      filters={{
                        category: {
                          name: this.state.category,
                          code: this.categorySelect.value
                        }, startDate: last30days
                      }}
                      type={'donut'}
                      dataSource={this.props.supply.varieties}
                      xName='name'
                      yName='volume'
                      innerRadius='50%'
                      nodata='No hay variedades disponibles para el producto seleccionado' />
                  </Col>
                  <Col xs="12" sm="12" lg="6" style={{ marginBottom: 15, textAlign: "-webkit-center" }}>
                    <PieChart
                      title={`Lima M.: Regiones que abastecen de ${this.state.category} al Mercado de Productores de Santa Anita`}
                      filters={{
                        category: {
                          name: this.state.category,
                          code: this.categorySelect.value
                        }, startDate: last30days
                      }}
                      type={'pie'}
                      dataSource={ this.props.supply.byRegion && this.props.supply.byRegion.data }
                      xName='dsc_ubigeo'
                                        yName='volume'
                                        nodata='No hay data disponibles para el producto seleccionado' />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} style={{ textAlign: "-webkit-center" }}>
                    <SizeMe>
                      {({size}) => (
                        <Col xs="12" sm="12" lg="12" style={{marginBottom: 15}}>
                          <DataVizBarChart
                            title={`Lima M.: Ingreso mensual de ${this.state.category} al Mercado de Productores de Santa Anita`}
                            subtitle={`${moment().subtract(1, 'years').format('YYYY')} y ${moment().format('YYYY')} - Toneladas`}
                            filters={{
                              category: {
                                name: this.state.category,
                                code: this.categorySelect.value
                              }, startDate: lastYear
                            }}
                            width={size.width - 60}
                            height={400}
                            dataSource={this.props.supply.trendByMonth}/>
                        </Col>
                      )
                      }
                    </SizeMe>
                  </Col>
                </Row>
              </>
            )
          }
        </Container>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language,
  supply: state.economic.prices.supply,
  loading: state.economic.prices.loading,
  error: state.economic.prices.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchSupplyByRegion: (categoryCode, startDate) => dispatch(ACTIONS.ECONOMICEXPLORER.SUPPLY.fetchSupplyByRegion(categoryCode, startDate)),
  fetchProducts: () => dispatch(ACTIONS.ECONOMICEXPLORER.SUPPLY.fetchProducts()),
  fetchTrend: (productCode, startDate) => dispatch(ACTIONS.ECONOMICEXPLORER.SUPPLY.fetchTrend(productCode, startDate)),
  fetchTrendByMonth: (categoryCode, startDate) => dispatch(ACTIONS.ECONOMICEXPLORER.SUPPLY.fetchTrendByMonth(categoryCode, startDate)),
  fetchVarieties: (categoryCode, startDate) =>
    dispatch(ACTIONS.ECONOMICEXPLORER.SUPPLY.fetchVarieties(categoryCode, startDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
