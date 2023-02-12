import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';
import DrawBox from '../components/drawBox';
import PermissionCheck from '../components/permissionCheck';
import { JSON_PROFILE } from '../common/profile';

const WIDTH = 350;
const HEIGHT = 350;
const inputSize = 160;

class CameraFaceDetect extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.state = {
      fullDiscription: null,
      faceMatcher: null,
      facingMode: null
    };
  }

  componentWillMount() {
    loadModels();
    this.setInputDevice();
    this.matcher();
  }

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === 'videoinput'
      );
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: 'user'
        });
      } else {
        await this.setState({
          facingMode: { exact: 'environment' }
        });
      }
      this.startCapture();
    });
  };

  matcher = async () => {
    const faceMatcher = await createMatcher(JSON_PROFILE);
    this.setState({ faceMatcher });
  };

  //setting webcam face capture internval to 1 seconds
  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture();
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

//getting photo from webcam
  capture = async () => {
    if (!!this.webcam.current) {
      await getFullFaceDescription(
        this.webcam.current.getScreenshot(),
        inputSize
      ).then(fullDiscription => this.setState({ fullDiscription }));
    }
  };

  render() {
    const { fullDiscription, faceMatcher, facingMode } = this.state;
    let videoConstraints = null;
    let camera = '';
    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode
      };
      if (facingMode === 'user') {
        camera = 'Front';
      } else {
        camera = 'Back';
      }
    }

    return (
      
      <div
        className="Camera"
        style={{
          backgroundColor:'black',
          height:'100%',
          width:'100%',
          display: 'flex',
          margin:'auto',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <p style={{color:'white'}}>Camera: {camera}</p>
        
        {/* If person is detected by camera */}
              {!!fullDiscription ? (
              <PermissionCheck
                fullDiscription={fullDiscription}
                faceMatcher={faceMatcher}
                screenshot={this.webcam.current.getScreenshot()}
              />
            ) : <p style={{color:'white'}}>"loading permission status..."</p>}

        <div
          style={{
            width: WIDTH,
            height: HEIGHT,
            margin:20,
          }}
        >
          <div style={{ position: 'relative', width: WIDTH }}>
            {!!videoConstraints ? (
              <div style={{ position: 'absolute' }}>
                <Webcam
                  audio={false}
                  width={WIDTH}
                  height={HEIGHT}
                  ref={this.webcam}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            ) : null}
            {!!fullDiscription ? (
              <DrawBox
                fullDiscription={fullDiscription}
                faceMatcher={faceMatcher}
                imageWidth={WIDTH}
              />
            ) : <p style={{color:'white'}}>"loading webcam..."</p>}
          </div>
        </div>
      </div>
      
    );
  }
}

export default withRouter(CameraFaceDetect);
