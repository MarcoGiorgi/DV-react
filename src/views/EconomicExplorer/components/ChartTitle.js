import React, { PureComponent } from 'react';
import { MenuButton, ListItem } from "react-md";
import * as ReactDOM from "react-dom";
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import _ from 'lodash-es';

export class Title extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { style: {} }
  }

  async exportChart(chart, filename) {
    domtoimage.toPng(ReactDOM.findDOMNode(chart))
      .then(bl => {
        FileSaver.saveAs(bl, filename);
        this.setState( { style: {} });
      });
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{flex: '99%'}}>
          <div style={{width:'90%', fontWeight:'bold', paddingLeft: 60}}>
            {this.props.text}
            <br/>
            {this.props.subtitle}
          </div>
        </div>
        <div style={{flex: '1%', marginRight: 30}}>
          <MenuButton
            id="menu-button-2"
            icon
            position={MenuButton.Positions.TOP_RIGHT}
            menuItems={[
              <ListItem key={1} primaryText="Embed" onClick={ this.props.embed }/>,
              <ListItem key={2} primaryText="Export" onClick={ _.isFunction(this.props.export) ? this.props.export : () => { this.props.export && this.exportChart(this.props.export, this.props.exportFileName) }}/>,
            ]}
            centered
            anchor={{
              x: MenuButton.HorizontalAnchors.LEFT,
              y: MenuButton.VerticalAnchors.BOTTOM,
            }}
          >
            <div style={this.state.style}>
            more_vert
            </div>
          </MenuButton>
        </div>
      </div>
    );
  }
}