import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from "moment";
import ACTIONS from "../../modules/action";
import PricesChart from "../../views/EconomicExplorer/price-views/PricesChart";
import {Container} from "reactstrap";

class EmbeddableRetailPriceChart extends Component {
  componentDidMount() {
    const {market, products, startDate, endDate} = this.props.match.params;
    const parsedStartDate = moment(startDate, 'DD-MM-YYYY').toDate();
    const parsedEndDate = moment(endDate, 'DD-MM-YYYY').toDate();
    this.props.fetchPrices(market, products.split(','), parsedStartDate, parsedEndDate);
  }

  render() {
    const {market, products, startDate, endDate} = this.props.match.params;
    const parsedStartDate = moment(startDate, 'DD-MM-YYYY').toDate();
    const parsedEndDate = moment(endDate, 'DD-MM-YYYY').toDate();

    return (
      <Container fluid style={{ height: '100%' }}>
        {this.props.wholesale.prices && (
          <PricesChart
            type={'wholesale'}
            filters={{
              market,
              products,
              startDate: parsedStartDate,
              endDate: parsedEndDate
            }}
            values={this.props.wholesale.prices.values}
            keys={this.props.wholesale.prices.keys}
            uom={this.props.wholesale.prices.uom}
            colors={this.props.wholesale.colors}
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  wholesale: state.economic.prices.wholesale,
  loading: state.economic.prices.loading,
  error: state.economic.prices.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrices: (marketCode, products, startDate, endDate) =>
    dispatch(ACTIONS.ECONOMICEXPLORER.WHOLESALES.fetchPrices2(marketCode, products, startDate, endDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbeddableRetailPriceChart);