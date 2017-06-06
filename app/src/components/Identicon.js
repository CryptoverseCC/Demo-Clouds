import React, { Component, PropTypes } from 'react';
import Auth from "App/components/Auth";


class Identicon extends Component {

  constructor(props) {
    super(props);

    this.state = {
      seed: props.seed,
      size: props.size,
      scale: props.scale,
      grayscale: props.grayscale
    };

    // The random number is a js implementation of the Xorshift PRNG
    this.randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values
  }

  seedrand (seed) {
    for (let i = 0; i < this.randseed.length; i++) {
      this.randseed[i] = 0;
    }
    for (let i = 0; i < seed.length; i++) {
      this.randseed[i % 4] = ((this.randseed[i % 4] << 5) - this.randseed[i % 4]) + seed.charCodeAt(i);
    }
  }

  rand () {
    // based on Java's String.hashCode(), expanded to 4 32bit values
    var t = this.randseed[0] ^ (this.randseed[0] << 11);

    this.randseed[0] = this.randseed[1];
    this.randseed[1] = this.randseed[2];
    this.randseed[2] = this.randseed[3];
    this.randseed[3] = (this.randseed[3] ^ (this.randseed[3] >> 19) ^ t ^ (t >> 8));

    return (this.randseed[3] >>> 0) / ((1 << 31) >>> 0);
  }

  createColor () {
    //saturation is the whole color spectrum
    var h = Math.floor(this.rand() * 360);
    //saturation goes from 40 to 100, it avoids greyish colors
    var s = ((this.rand() * 60) + 40) + '%';
    //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
    var l = ((this.rand() + this.rand() + this.rand() + this.rand()) * 25) + '%';

    var color = 'hsl(' + h + ',' + s + ',' + l + ')';
    return color;
  }

  createImageData (size) {
    var width = size; // Only support square icons for now
    var height = size;

    var dataWidth = Math.ceil(width / 2);
    var mirrorWidth = width - dataWidth;

    var data = [];
    for(var y = 0; y < height; y++) {
      var row = [];
      for(var x = 0; x < dataWidth; x++) {
        // this makes foreground and background color to have a 43% (1/2.3) probability
        // spot color has 13% chance
        row[x] = Math.floor(this.rand() * 2.3);
      }
      var r = row.slice(0, mirrorWidth);
      r.reverse();
      row = row.concat(r);

      for(var i = 0; i < row.length; i++) {
        data.push(row[i]);
      }
    }

    return data;
  }

  updateCanvas (imageData, color, scale, bgcolor, spotcolor, grayscale) {
    var c = this.refs.canvas;
    var width = Math.sqrt(imageData.length);
    c.width = c.height = width * scale;

    var cc = c.getContext('2d');
    cc.fillStyle = bgcolor;
    cc.fillRect(0, 0, c.width, c.height);
    cc.fillStyle = color;

    for(var i = 0; i < imageData.length; i++) {
      var row = Math.floor(i / width);
      var col = i % width;
      // if data is 2, choose spot color, if 1 choose foreground
      cc.fillStyle = (imageData[i] === 1) ? color : spotcolor;

      // if data is 0, leave the background
      if(imageData[i]) {
        cc.fillRect(col * scale, row * scale, scale, scale);
      }
    }

    if (grayscale) {
      var imgData = cc.getImageData(0, 0, c.width, c.height);

      for (let a = 0; a < imgData.height; a++)
      {
        for (let b = 0; b < imgData.width; b++)
        {
          var index = (a * 4) * imgData.width + (b * 4);
          var red = imgData.data[index];
          var green = imgData.data[index + 1];
          var blue = imgData.data[index + 2];
          var alpha = imgData.data[index + 3];
          var average = (red + green + blue) / 3;
          imgData.data[index] = average;
          imgData.data[index + 1] = average;
          imgData.data[index + 2] = average;
          imgData.data[index + 3] = alpha;
        }
      }

      cc.putImageData(imgData, 0, 0, 0, 0, imgData.width, imgData.height);
    }

    return c;
  }

  updateIcon (opts) {
    opts = opts || {};
    var size = opts.size || 8;
    var scale = opts.scale || 4;
    var seed = opts.seed || Math.floor((Math.random() * Math.pow(10, 16))).toString(16);
    var grayscale = opts.grayscale;

    this.seedrand(seed);

    var color = opts.color || this.createColor();
    var bgcolor = opts.bgcolor || this.createColor();
    var spotcolor = opts.spotcolor || this.createColor();
    var imageData = this.createImageData(size);
    this.updateCanvas(imageData, color, scale, bgcolor, spotcolor, grayscale);
  }

  componentDidMount () {
    this.updateIcon(this.state);
  }

  componentDidUpdate () {
    this.updateIcon(this.state);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      seed: nextProps.seed,
      size: nextProps.size,
      scale: nextProps.scale,
      grayscale: nextProps.grayscale
    });
  }

  render () {
    return <div><canvas ref="canvas" style={this.props.style} /><Auth/></div>;
  }
}


Identicon.propTypes = {
  seed: PropTypes.string,
  size: PropTypes.number,
  scale: PropTypes.number,
  grayscale: PropTypes.bool,
  style: PropTypes.object
}

export default Identicon;
