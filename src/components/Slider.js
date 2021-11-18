// /components/Header.js
import React, { Component } from 'react';
import Slider from 'react-slick';

import styles from 'styles/Slider.module.scss';

class ReactSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: i => props.afterChange ? props.afterChange(i) : ''
      }
    };
  }

  render() {
    const { settings } = this.state;
    const { sliderli } = this.props;
    return (
      <div className={`${styles.Slider} Slider-container`}>
        <Slider { ...settings }>{sliderli}</Slider>
      </div>  
    );
  }
}

export default ReactSlider;
