import React, { Component } from 'react';
import * as moment from 'moment';
import '../style.scss';
import {Col, Row} from "reactstrap";
import TrendChart from "./TrendChart";

class EmbeddableTrendChart extends Component {
  render() {

    const { categoryName, categoryCode, width, startDate } = this.props.match.params;

    console.log({ categoryName, categoryCode, width, startDate });

    const parsedStartDate = moment(startDate, 'DD-MM-YYYY').toDate();
    return (
      <Row>
        <Col style={{ textAlign: "-webkit-center" }}>
          <TrendChart
            category={{name: categoryName, code: categoryCode}}
            startDate={parsedStartDate}
            width={ width ? parseInt(width) : 650 } />
        </Col>
      </Row>
    )
  }
}
export default EmbeddableTrendChart;
