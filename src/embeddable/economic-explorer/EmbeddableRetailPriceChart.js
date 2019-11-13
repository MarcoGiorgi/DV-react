import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from "moment";
import ACTIONS from "../../modules/action";
import PricesChart from "../../views/EconomicExplorer/price-views/PricesChart";
import {Container} from "reactstrap";

class EmbeddableRetailPriceChart extends Component {
  componentDidMount() {
    const {regionCode, products, startDate, endDate} = this.props.match.params;
    const parsedStartDate = moment(startDate, 'DD-MM-YYYY').toDate();
    const parsedEndDate = moment(endDate, 'DD-MM-YYYY').toDate();
    this.props.fetchPrices(regionCode, products.split(','), parsedStartDate, parsedEndDate);
  }

  render() {
    return (
      <Container fluid style={{ height: '100%' }}>
        {this.props.retail.prices && (
          <PricesChart
            values={this.props.retail.prices.values}
            keys={this.props.retail.prices.keys}
            uom={this.props.retail.prices.uom}
            colors={this.props.retail.colors}
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  retail: state.economic.prices.retail,
  loading: state.economic.prices.loading
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrices: (regionCode, products, startDate, endDate) =>
    dispatch(ACTIONS.ECONOMICEXPLORER.RETAIL.fetchPrices(regionCode, products, startDate, endDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbeddableRetailPriceChart);