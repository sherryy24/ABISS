import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  loadModels,
  getFullFaceDescription,
  createMatcher,
  isFaceDetectionModelLoaded
} from '../api/face';
import DrawBox from '../components/drawBox';
import ShowDescriptors from '../components/showDescriptors';
import { JSON_PROFILE } from '../common/profile';
import ShowDetails from '../components/showDetails';

const MaxWidth = 600;
const welcome = require('../img/login.svg');

const INIT_STATE = {
  url: null,
  imageURL: null,
  fullDiscription: null,
  imageDimension: null,
  error: null,
  loading: false
};

class FaceRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INIT_STATE,
      faceMatcher: null,
      showDescriptors: false,
      WIDTH: null,
      HEIGHT: 0,
      isModelLoaded: !!isFaceDetectionModelLoaded()
    };
  }

  componentWillMount() {
    this.resetState();
    let _W = document.documentElement.clientWidth;
    if (_W > MaxWidth) _W = MaxWidth;
    this.setState({ WIDTH: _W });
    this.mounting();
  }

  mounting = async () => {
    await loadModels();
    await this.matcher();
    await this.getImageDimension(welcome);
    await this.setState({ imageURL: welcome, loading: true });
    await this.handleImageChange(welcome);  //@ToDo- Add a pretty photo saying: Upload New Record
  };

  matcher = async () => {
    const faceMatcher = await createMatcher(JSON_PROFILE);
    this.setState({ faceMatcher });
  };

  handleFileChange = async event => {
    this.resetState();
    await this.setState({
      imageURL: URL.createObjectURL(event.target.files[0]),
      loading: true
    });
    this.handleImageChange();
  };

  handleURLChange = event => {
    this.setState({ url: event.target.value });
  };

  handleButtonClick = async () => {
    this.resetState();
    let blob = await fetch(this.state.url)
      .then(r => r.blob())
      .catch(error => this.setState({ error }));
    if (!!blob && blob.type.includes('image')) {
      this.setState({
        imageURL: URL.createObjectURL(blob),
        loading: true
      });
      this.handleImageChange();
    }
  };

  handleImageChange = async (image = this.state.imageURL) => {
    await this.getImageDimension(image);
    await getFullFaceDescription(image).then(fullDiscription => {
      this.setState({ fullDiscription, loading: false });
    });
  };

  getImageDimension = imageURL => {
    let img = new Image();
    img.onload = () => {
      let HEIGHT = (this.state.WIDTH * img.height) / img.width;
      this.setState({
        HEIGHT,
        imageDimension: {
          width: img.width,
          height: img.height
        }
      });
    };
    img.src = imageURL;
  };

  handleDescriptorsCheck = event => {
    this.setState({ showDescriptors: event.target.checked });
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };
  render() {
    const {
      WIDTH,
      HEIGHT,
      imageURL,
      fullDiscription,
      faceMatcher,
      showDescriptors,
      isModelLoaded,
      error,
      loading
    } = this.state;

    //Telling the face detection status for an uploaded image
    let status = <p>Status: Model Loaded = {isModelLoaded.toString()}</p>;
    if (!!error && error.toString() === 'TypeError: Failed to fetch') {
      status = (
        <p style={{ color: 'red' }}>Status: Error! Unable to fetch Image URL</p>
      );
    } else if (loading) {
      status = <p style={{ color: 'white' }}>Status: LOADING...</p>;
    } else if (!!fullDiscription && !!imageURL && !loading) {
      if (fullDiscription.length < 2)
        status = <p style={{ color: "#3dfffc" }}>Status: {fullDiscription.length} Face Detect</p>;
      if (fullDiscription.length > 1)
        status = <p style={{ color: "#3dfffc" }}>Status: {fullDiscription.length} Faces Detect</p>;
    }

    // Loading Sign
    let spinner = (
      <div
        style={{
          margin: 0,
          color: '#3dfffc',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          textShadow: '2px 2px 3px #fff'
        }}
      >
        <div className="loading" />
        <h3>Processing...</h3>
      </div>
    );
    console.log(faceMatcher);

    return (
      <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
        {status}
        <div className='row'> 



{/* upload photo here to check database*/}
        <div className='col-8'>
        <div style={{position: 'relative',width: WIDTH, height: HEIGHT}}>
          {!!imageURL ? (
            <div style={{position: 'relative'}}>
              <div style={{ position: 'absolute' }}>
                <img style={{ width: WIDTH}} src={imageURL} alt="imageURL" />
              </div>
              
              {!!fullDiscription ? (
                <DrawBox
                  fullDiscription={fullDiscription}
                  faceMatcher={faceMatcher}
                  imageWidth={WIDTH}
                />
              ) : null}
            </div>
          ) : null}
          {loading ? spinner : null}
        </div>
        <div
          style={{
            width: WIDTH,
            padding: 10,
            border: 'solid',
            borderColor:"#3dfffc",
            marginTop: 10,
            color: 'white'
          }}
        >
          <p>Input Image file or URL</p>
          <input
            id="myFileUpload"
            type="file"
            onChange={this.handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
          <br />
          <div className="URLInput">
            <input
              type="url"
              name="url"
              id="url"
              placeholder="Place your photo URL here (only .jpg, .jpeg, .png)"
              pattern="https://.*"
              size="30"
              onChange={this.handleURLChange}
            />
            <button onClick={this.handleButtonClick}>Upload</button>
          </div>
          <div>
            <input
              name="descriptors"
              type="checkbox"
              checked={this.state.showDescriptors}
              onChange={this.handleDescriptorsCheck}
            />
            <label>Show Descriptors</label>
          </div>
          {!!showDescriptors ? <ShowDescriptors fullDiscription={fullDiscription} /> : null}
        </div>
        </div>

        
{/* show full details here */}
        {!!fullDiscription ? (
        <div className='col-4'>
              <ShowDetails
                fullDiscription={fullDiscription}
                faceMatcher={faceMatcher}
              />
        </div>  
        ) : <p style={{color:'white'}}>"loading permission status..."</p>}
        
        


        </div>
      </div>
      
    );
  }
}

export default withRouter(FaceRecognition);
