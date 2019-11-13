import React, { Component } from 'react';
//import { Carousel, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';
import t from '../i18n'

import { Carousel } from 'react-responsive-carousel';

import './style.scss';

const items = [
  {
    src: 'assets/img/home/slide1.jpg',
    altText: t('dashboard.carousel.hunger.alt'),
    url: 'https://agrochatea.minagri.gob.pe/',
    header: null,
    text: null
  },
  {
    src: 'assets/img/home/slide2.jpg',
    altText: t('dashboard.carousel.seasonal_explorer.alt'),
    url: 'https://play.google.com/store/apps/details?id=minagri.micasera&hl=es_419',
    header: null,
    text: null
  },
  {
    src: 'assets/img/home/slide3.jpg',
    altText: t('dashboard.carousel.economic_explorer.alt'),
    url: 'http://sistemas.minagri.gob.pe/sisap/portal/',
    header: null,
    text: null
  }
];


class Carousels extends Component {

  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides2 = items.map((item) => {
      return (
        <a key={item.src}  href={item.url}><img src={item.src} alt={item.altText} /></a>
      );
    });

    return (
      <div className="animated fadeIn">
        <Carousel showStatus={false} showThumbs={false} infiniteLoop={true} autoPlay={true} showArrows={true} interval={5000}>
          {slides2}
        </Carousel>
      </div>
    );
  }
}

export default Carousels;
