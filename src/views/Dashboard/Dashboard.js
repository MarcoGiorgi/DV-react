import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import { Timeline } from 'react-twitter-widgets';
import Carousels from '../../components/Carousel';

import hungerhub from '../../assets/img/home/1_hungerhub.jpg';
import seasonal from '../../assets/img/home/2_seasonal.jpg';
import economic from '../../assets/img/home/3_Economic.jpg';

import ContainerDimensions from 'react-container-dimensions';

import MenuBlock from './MenuBlock';
import t from '../../i18n';

import '../../scss/home.scss';
import ACTIONS from "../../modules/action";

class Dashboard extends Component {
  render() {
    return (
      <Container fluid style={{ marginLeft: 15, marginRight: 15 }}>
        <Row>
          <Col>
            <Row>
              <Col>
                <Carousels />
              </Col>
            </Row>
            <Container fluid={true} style={{ marginTop: '25px', padding: '0' }}>
              <Row>
                <Col xs="12" sm="12" lg="4" style={{ marginBottom: 15 }}>
                  <MenuBlock
                    title={t('dashboard.menu.hunger.title', { lang: this.props.state.language })}
                    image={hungerhub}
                    href="/#/Hunger-Analytics-Hub/main"
                  />
                </Col>
                <Col xs="12" sm="12" lg="4" style={{ marginBottom: 15 }}>
                  <MenuBlock
                    title={t('dashboard.menu.seasonal_explorer.title', { lang: this.props.state.language })}
                    image={seasonal}
                    href="/#/seasonal-explorer/rainfall-and-vegetation/visualizations"
                  />
                </Col>
                <Col xs="12" sm="12" lg="4" style={{ marginBottom: 15 }}>
                  <MenuBlock
                    title={t('dashboard.menu.economic_explorer.title', { lang: this.props.state.language })}
                    image={economic}
                    href="/#/economic-explorer/food-prices/wholesale-markets"
                  />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col lg="3">
              {/* <FacebookProvider appId="480580252049577"> */}
              {/* <Page href="https://www.facebook.com/minagriperu" tabs="timeline" /> */}
              {/* </FacebookProvider> */}
              <ContainerDimensions>
                  {
                      ( {width, height} ) => (
                          <div key={height} style={{ width, height: height - 13, paddingRight: 30 }}>
                          <Timeline dataSource={{sourceType:"profile", screenName:"minagriperu"}}
                                    options={{username:"minagriperu", height:height - 13, width:'90%', theme:"dark"}}/>
                          </div>
                      )
                  }
              </ContainerDimensions>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: newLang => dispatch(ACTIONS.SITEWIDE.changeLang(newLang)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
