import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import '../style.scss';
import ACTIONS from "../../../modules/action";
import {Col, Row} from "reactstrap";
import {DataVizBarChart} from "./DataVizBarChart";

class EmbeddableBarChart extends Component {

  componentDidMount() {
    const { startDate, categoryCode } = this.props.match.params;
    const parsedDate = moment(startDate, 'DD-MM-YYYY').toDate();
    this.props.fetchTrendByMonth(categoryCode, parsedDate);
  }

  render() {
    const { startDate, categoryCode, categoryName, width, height } = this.props.match.params;
    const parsedDate = moment(startDate, 'DD-MM-YYYY').toDate();

    return (
      <Row>
        <Col style={{ textAlign: "-webkit-center" }}>
          <DataVizBarChart
            title={`Lima M.: Ingreso mensual de ${categoryName} al Mercado de Productores de Santa Anita Toneladas`}
            filters={{
              category: {
                name: categoryName,
                code: categoryCode
              }, startDate: parsedDate
            }}
            width={ width ? parseInt(width) : 1000 }
            height={ height ? parseInt(height) : 400}
            dataSource={this.props.supply.trendByMonth}/>
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
  fetchTrendByMonth: (categoryCode, startDate) => dispatch(ACTIONS.ECONOMICEXPLORER.SUPPLY.fetchTrendByMonth(categoryCode, startDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbeddableBarChart);