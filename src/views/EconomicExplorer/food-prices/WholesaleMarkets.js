import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import {Container, Row, Col} from 'reactstrap';
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns';
import {DateRangePickerComponent} from '@syncfusion/ej2-react-calendars';
import {ProductSelect} from '../components/ProductSelect';

import ACTIONS from '../../../modules/action';
import PricesChart from '../price-views/PricesChart';
import TabularData from './TabularData';
import t from '../../../i18n';
import '../style.scss';

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

class WholesaleMarkets extends Component {
  constructor(props) {
    super(props);

    this.categoryRef = React.createRef();

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);

    this.state = {
      daterange: {
        startDate,
        endDate: new Date()
      }
    };
  }

  componentDidMount() {
    this.props.fetchMarkets();
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const loading = () => (
      <div className="sk-circle">
        <div className="sk-circle1 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle2 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle3 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle4 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle5 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle6 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle7 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle8 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle9 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle10 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle11 sk-child" style={{zIndex: 5000}}/>
        <div className="sk-circle12 sk-child" style={{zIndex: 5000}}/>
      </div>
    );

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
        <div style={{paddingLeft: 10}}>
          <Row>
            <Col xs={3} md={4}>
              <DropDownListComponent
                ref={(scope) => { this.marketSelect = scope; }}
                locale="es"
                id="markets"
                dataSource={this.props.wholesale.markets}
                fields={{text: 'market_name', value: 'market_code'}}
                placeholder={t('economic_explorer.prices.wholesale.label.select.market', {lang: this.props.language})}
                change={(arg) => {
                  this.props.fetchProducts(arg.itemData.market_code);
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
              {this.props.wholesale.products && (
                <ProductSelect dataSource={this.props.wholesale.products}
                               onChange={evt => {
                                 this.filters = {
                                   market: this.props.wholesale.filter.market,
                                   products: evt.value,
                                   startDate: this.state.daterange.startDate,
                                   endDate: this.state.daterange.endDate
                                 };
                                 if (evt.value && evt.value.length > 0) {
                                   this.props.fetchPrice2(this.props.wholesale.filter.market, evt.value, this.state.daterange.startDate,
                                     this.state.daterange.endDate);
                                   this.props.fetchPricesTable2(this.props.wholesale.filter.market, evt.value, this.state.daterange.startDate,
                                     this.state.daterange.endDate);
                                 }
                               }}
                />
              )}
            </Col>
            <Col xs="2" md="3">
              {this.props.wholesale.products && (
                <DateRangePickerComponent
                  locale={this.props.language}
                  id="datepicker"
                  format="dd/MM/yyyy"
                  startDate={this.state.daterange.startDate}
                  endDate={this.state.daterange.endDate}
                  change={(evt) => {
                    this.setState({...this.state, daterange: {startDate: evt.startDate, endDate: evt.endDate}});
                    if (this.props.wholesale.filter.products && this.props.wholesale.filter.market) {
                      this.filters = {
                        market: this.props.wholesale.filter.market,
                        products: this.props.wholesale.filter.products,
                        startDate: evt.startDate,
                        endDate: evt.endDate
                      };

                      this.props.fetchPrice2(
                        this.props.wholesale.filter.market,
                        this.props.wholesale.filter.products,
                        evt.startDate,
                        evt.endDate
                      );
                      this.props.fetchPricesTable2(
                        this.props.wholesale.filter.market,
                        this.props.wholesale.filter.products,
                        evt.startDate,
                        evt.endDate
                      );
                    }
                  }}
                />
              )}
            </Col>
          </Row>
          <Container fluid style={{height: '100%'}}>
            {this.props.wholesale.prices && (
              <PricesChart
                title={`Andamento de Precios - ${this.marketSelect.text}`}
                type={'wholesale'}
                filters={this.filters}
                values={this.props.wholesale.prices.values}
                keys={this.props.wholesale.prices.keys}
                uom={this.props.wholesale.prices.uom}
                colors={this.props.wholesale.colors}
              />
            )}
            {this.props.wholesale.prices && this.props.wholesale.table && (
              <TabularData
                locale={this.props.language}
                firstColumn="product_name"
                data={this.props.wholesale.table.data}
                columns={this.props.wholesale.table.columns}
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
  wholesale: state.economic.prices.wholesale,
  loading: state.economic.prices.loading,
  error: state.economic.prices.error
});

const mapDispatchToProps = (dispatch) => ({
  resetState: () => dispatch(ACTIONS.ECONOMICEXPLORER.WHOLESALES.resetState()),
  fetchMarkets: () => dispatch(ACTIONS.ECONOMICEXPLORER.WHOLESALES.fetchMarkets()),
  fetchProducts: (marketCode) => dispatch(ACTIONS.ECONOMICEXPLORER.WHOLESALES.fetchProducts(marketCode)),
  fetchPrice2: (marketCode, products, startDate, endDate) =>
    dispatch(ACTIONS.ECONOMICEXPLORER.WHOLESALES.fetchPrices2(marketCode, products, startDate, endDate)),
  fetchPricesTable2: (marketCode, products, startDate, endDate) =>
    dispatch(ACTIONS.ECONOMICEXPLORER.WHOLESALES.fetchPricesTable2(marketCode, products, startDate, endDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WholesaleMarkets);
