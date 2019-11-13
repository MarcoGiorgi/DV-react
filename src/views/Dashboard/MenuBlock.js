import React, { Component } from 'react';

export class MenuBlock extends Component {
  renderTitle() {
    if (this.props.subtitle) {
      return (
        <div className="block-title">
          {this.props.title}
          <br />
          {this.props.subtitle}
        </div>
      );
    }
    return <div className="block-title">{this.props.title}</div>;
  }

  render() {
    return (
      <a className="block-link" href={this.props.href}>
        <div
          className="menu-block"
          style={{ background: `url(${this.props.image}) no-repeat center center`, backgroundSize: 'cover' }}
        >
          <div style={{position: 'absolute', left: 0, top: 0, height: '55%', width:'100%', background: 'linear-gradient(to bottom, black, transparent)', opacity: 0.7}} />
          {this.renderTitle()}
        </div>
      </a>
    );
  }
}

export default MenuBlock;
