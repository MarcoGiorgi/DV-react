import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import '../style.scss';
import ACTIONS from "../../../modules/action";
import {PieChart} from "./PieChart";
import {Col, Row} from "reactstrap";

class EmbeddableDonutChart extends Component {

  componentDidMount() {
    const { startDate, categoryCode } = this.props.match.params;
    const parsedDate = moment(startDate, 'DD-MM-YYYY').toDate();
    this.props.fetchVarieties(categoryCode, parsedDate);
  }

  render() {
    const { startDate, categoryCode, categoryName } = this.props.match.params;
    const parsedDate = moment(startDate, 'DD-MM-YYYY').toDate();

    return (
      <Row>
        <Col style={{ textAlign: "-webkit-center" }}>
      <PieChart
        title={`Lima M.: Ingreso de ${categoryName} según tipo al Mercado de Productores de Santa Anita durante ${moment().format('MMMM')} del ${moment().format('YYYY')}`}
        filters={{
          category: {
            name: categoryName,
            code: categoryCode
          }, startDate: parsedDate
        }}
        type={'donut'}
        dataSource={this.props.supply.varieties}
        xName='name'
        yName='volume'
        innerRadius='50%'
        nodata='No hay variedades disponibles para el producto seleccionado' />
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
  fetchVarieties: (categoryCode, startDate) =>
    dispatch(ACTIONS.ECONOMICEXPLORER.SUPPLY.fetchVarieties(categoryCode, startDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbeddableDonutChart);