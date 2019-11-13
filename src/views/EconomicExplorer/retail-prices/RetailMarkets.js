import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { Container, Row, Col } from 'reactstrap';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ProductSelect } from '../components/ProductSelect';
import _ from 'lodash-es';
import * as moment from 'moment';
import '../style.scss';
import PricesChart from '../price-views/PricesChart';
import TabularData from '../food-prices/TabularData';
import ACTIONS from '../../../modules/action';

import t from '../../../i18n';

String.prototype.hashCode = function () {
  let hash = 0;
  let i;
  let chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

class RetailMarkets extends Component {
  constructor(props) {
    super(props);

    this.categoryRef = React.createRef();

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);

    this.state = {
      daterange: {
        startDate: this.props.retail.filter.startDate || startDate,
        endDate: this.props.retail.filter.endDate || new Date()
      }
    };
  }

  componentDidMount() {
    this.props.fetchRegions();
  }

  componentWillUnmount() {
    this.props.resetState();
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

    const categories = _.uniqBy(this.props.retail.products, 'category_code') || [];
    return (
      <LoadingOverlay
        active={this.props.loading && this.props.loading.length}
        spinner={loading()}
        styles={{
          overlay: (base) => ({
            ...base,
            background: 'rgba(0, 0, 0, 0)'
          })
        }}
      >
        <div style={{ paddingLeft: 10 }}>
          <Row>
            <Col xs={3} md={4}>
              <DropDownListComponent
                ref={(scope) => { this.regionSelect = scope; }}
                locale='es'
                id="regions"
                dataSource={this.props.retail.regions}
                fields={{ text: 'dsc_ubigeo', value: 'cod_region' }}
                placeholder={t('economic_explorer.label.select.region', {lang: this.props.language})}
                change={(arg) => {
                  this.props.fetchProducts(arg.itemData.cod_region);
                  const dropdown = this.categoryRef.current;
                  if (dropdown) {
                    dropdown.value = null;
                    dropdown.text = null;
                    dropdown.index = null;
                  }
                }}
              />
            </Col>
            <Col xs={3} md={4}>
              {this.props.retail.products && (
                <ProductSelect dataSource={ this.props.retail.products }
                               onChange={ evt => {
                                 this.filters = {
                                   region: this.props.retail.filter.region,
                                   products: evt.value,
                                   startDate: this.state.daterange.startDate,
                                   endDate: this.state.daterange.endDate
                                 };
                                 this.props.fetchPrices(this.props.retail.filter.region, evt.value, this.state.daterange.startDate,
                                   this.state.daterange.endDate);
                                 this.props.fetchPricesTable(this.props.retail.filter.region, evt.value, this.state.daterange.startDate,
                                   this.state.daterange.endDate);
                               }}
                />
              )}
            </Col>
            <Col xs="2" md="3">
              { this.props.retail.products && (
                <DateRangePickerComponent
                  locale={this.props.language}
                  id="datepicker"
                  format="dd/MM/yyyy"
                  startDate={this.state.daterange.startDate}
                  endDate={this.state.daterange.endDate}
                  change={(evt) => {
                    this.setState({ ...this.state, daterange: { startDate: evt.startDate, endDate: evt.endDate } });
                    if (this.props.retail.filter.products && this.props.retail.filter.region) {
                      this.filters = {
                        region: this.props.retail.filter.region,
                        products: this.props.retail.filter.products,
                        startDate: evt.startDate,
                        endDate: evt.endDate
                      };

                      this.props.fetchPrices(
                        this.props.retail.filter.region,
                        this.props.retail.filter.products,
                        evt.startDate,
                        evt.endDate
                      );
                      this.props.fetchPricesTable(
                        this.props.retail.filter.region,
                        this.props.retail.filter.products,
                        evt.startDate,
                        evt.endDate
                      );
                    }
                  }}
                />
              )}
            </Col>
          </Row>
          <Container fluid style={{ height: '100%' }}>
            {this.props.retail.prices && (
              <PricesChart
                title={`Andamento de Precios - ${this.regionSelect.text}`}
                type={'retail'}
                filters={this.filters}
                values={this.props.retail.prices.values}
                keys={this.props.retail.prices.keys}
                uom={this.props.retail.prices.uom}
                colors={this.props.retail.colors}
              />
            )}
            {this.props.retail.prices && this.props.retail.table && (
              <TabularData
                locale={this.props.language}
                firstColumn="product_name"
                data={this.props.retail.table.data}
                columns={this.props.retail.table.columns}
              />
            )}
          </Container>
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language,
  retail: state.economic.prices.retail,
  loading: state.economic.prices.loading
});

const mapDispatchToProps = (dispatch) => ({
  resetState: () => dispatch(ACTIONS.ECONOMICEXPLORER.RETAIL.resetState()),
  fetchRegions: () => dispatch(ACTIONS.ECONOMICEXPLORER.RETAIL.fetchRegions()),
  fetchProducts: (regionCode) => dispatch(ACTIONS.ECONOMICEXPLORER.RETAIL.fetchProducts(regionCode)),
  fetchPrices: (regionCode, products, startDate, endDate) =>
    dispatch(ACTIONS.ECONOMICEXPLORER.RETAIL.fetchPrices(regionCode, products, startDate, endDate)),
  fetchPricesTable: (regionCode, products, startDate, endDate) =>
    dispatch(ACTIONS.ECONOMICEXPLORER.RETAIL.fetchPricesTable(regionCode, products, startDate, endDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailMarkets);
