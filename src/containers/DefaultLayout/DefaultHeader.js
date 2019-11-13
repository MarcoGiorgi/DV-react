import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Nav } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/minagri.png';
import logoPMA from '../../assets/img/brand/LogoPMA.png';
import logoPMAsmall from '../../assets/img/brand/wfp-logo-vertical-blue-en.svg';
import ACTIONS from "../../modules/action";

import config from '../../config';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

const LANGUAGES = [
  {
    text: 'English',
    value: 'en'
  },
  {
    text: 'Espanol',
    value: 'es'
  }
];


class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <ContainerDimensions>
          {({ width, height }) => {
            const fullLogo = width > 600 ? { src: logo, width: 300 } : { src: sygnet, width: 60 };
            const style = width < 992 ? { left: 60 } : { left: 5 };
            const PMA = width > 600
                ? { src: logoPMA, width: 190, height: 43 }
                : {
 src: logoPMAsmall, width: 40, height: 40, padding: '2px 2px 2px 2px'
};
            return (
              <>
                <AppNavbarBrand
                  tag={NavLink}
                  to="/dashboard"
                  style={style}
                  full={{ ...fullLogo, alt: 'Food Security Analysis' }}
                  minimized={{
 src: sygnet, width: 30, height: 30, alt: 'Food Security Analysis'
}}
                />
                <Nav className="ml-auto" navbar style={{ marginRight: 5, padding: '1px 1px 1px 1px',display:'none' }}> 
                  <DropDownListComponent
                    style={{backgroundColor: 'white'}}
                    dataSource={LANGUAGES}
                    fields={{ text: 'text', value: 'value' }}
                    value={ this.props.state.language }
                    index={0}
                    change={evt => this.props.changeLanguage(evt.itemData.value)}
                  />
                </Nav>
              </>
            );
          }}
        </ContainerDimensions>
      </>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: newLang => dispatch(ACTIONS.SITEWIDE.changeLang(newLang)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultHeader);
