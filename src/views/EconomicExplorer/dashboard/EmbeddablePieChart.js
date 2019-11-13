import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import '../style.scss';
import ACTIONS from "../../../modules/action";
import {PieChart} from "./PieChart";
import {Col, Row} from "reactstrap";

class EmbeddablePieChart extends Component {

  componentDidMount() {
    const { startDate, categoryCode } = this.props.match.params;
    const parsedDate = moment(startDate, 'DD-MM-YYYY').toDate();
    this.props.fetchSupplyByRegion(categoryCode, parsedDate);
  }

  render() {
    const { startDate, categoryCode, categoryName } = this.props.match.params;
    const parsedDate = moment(startDate, 'DD-MM-YYYY').toDate();

    return (
      <Row>
        <Col style={{ textAlign: "-webkit-center" }}>
      <PieChart
        title={`Lima M.: Regiones que abastecen de ${categoryName} al Mercado de Productores de Santa Anita`}
        filters={{
          category: {
            name: categoryName,
            code: categoryCode
          }, startDate: parsedDate
        }}
        type={'pie'}
        dataSource={ this.props.supply.byRegion && this.props.supply.byRegion.data }
        xName='dsc_ubigeo'
        yName='volume' />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  supply: state.economic.prices.supply,
  loading: state.economic.prices.loading,
  error: state.economic.prices.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchSupplyByRegion: (categoryCode, startDate) => dispatch(ACTIONS.ECONOMICEXPLORER.SUPPLY.fetchSupplyByRegion(categoryCode, startDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbeddablePieChart);