import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../containers/DefaultLayout';

import nav from './_nav';

class SeasonalExplorerLayout extends Component {
  render() {
    return <DefaultLayout mainClass="internal" customSidebar={nav(this.props.language)} redirectFrom={'/seasonal-explorer'} redirectTo={'/seasonal-explorer/rainfall-and-vegetation/visualizations'} {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  language: state.language
});

export default connect(
  mapStateToProps,
)(SeasonalExplorerLayout);
