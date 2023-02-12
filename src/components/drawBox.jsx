import React, { Component } from 'react';

class DrawBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptors: null,
      detections: null,
      match: null
    };
  }

  componentDidMount() {
    this.getDescription();
  }

  componentWillReceiveProps(newProps) {
    this.getDescription(newProps);
  }

  getDescription = async (props = this.props) => {
    const { fullDiscription, faceMatcher } = props;
    if (!!fullDiscription) {
      await this.setState({
        descriptors: fullDiscription.map(fd => fd.descriptor),
        detections: fullDiscription.map(fd => fd.detection)
      });
      if (!!this.state.descriptors && !!faceMatcher) {
        let match = await this.state.descriptors.map(descriptor =>
          faceMatcher.findBestMatch(descriptor)
        );
        this.setState({ match });
      }
    }
  };

  render() {
    const { imageWidth} = this.props;
    const { detections, match } = this.state;
    let box = null;

    
    if (!!detections) {
      box = detections.map((detection, i) => {
        const relativeBox = detection.relativeBox;
        const dimension = detection._imageDims;
        let _X = imageWidth * relativeBox._x;
        let _Y =
          (relativeBox._y * imageWidth * dimension._height) / dimension._width;
        let _W = imageWidth * relativeBox.width;
        let _H =
          (relativeBox.height * imageWidth * dimension._height) /
          dimension._width;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: "#3dfffc",
                height: _H,
                width: _W,
                color:"#3dfffc",
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >

            
              {!!match && match[i] && match[i]._label !== 'unknown' ? (
                <p
                  style={{
                    backgroundColor: "#001e31",
                    border: 'solid',
                    borderColor: "#3dfffc",
                    width: _W,
                    marginTop: 0,
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  Roll no. {match[i]._label} Identified
                  
                </p>
              ) : null}
              
            
              {!!match && match[i] && match[i]._label === 'unknown' ? (
                <p
                  style={{
                    backgroundColor: "#480a0a",
                    border: 'solid',
                    borderColor: "#3dfffc",
                    width: _W,
                    marginTop: 0,
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}
                </p>
              ) : null}
            </div>
                      
          </div>



        );
      });
    }

    return <div>{box}</div>;
  }
}

export default DrawBox;
