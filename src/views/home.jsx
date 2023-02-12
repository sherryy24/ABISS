import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    const WIDTH = document.documentElement.clientWidth;
    return (
      <div className="container"
        style={{
          border: 'solid',
          borderRadius: 8,
          color: 'white',
          width: { WIDTH },
          margin: 10,
          padding: 5
        }}
      >
      
        <img src={require('../img/logo.svg')} alt='logo' style={{height:'20vh',width:'20wh',padding:'10px'}} />
        <h2 style={{textDecoration: 'underline'}}>ABISS: Advanced Biometric Identification Security System</h2>

        <div className="row"
          style={{
            display: 'flex',
            fontSize: '1.2rem',
            alignItems:'center',
            justifyContent:'center',
            margin: '30px 0px 30px 0px',
          }}
        >

        <div className="col-7">ABISS Web Application works on identifying and authorizing identify of people entering a building, making it a secured and monitored premises.
             Once recognised, visitor's id number will be displayed along with their permission status.
             People are already listed in the database in the following status categories:
             <p> 
                      <ul style={{listStyle:'none'}}>
                      <li>1. Students- Reguler visitors of premises</li>
                      <li>2. Guest- Occational visitors on official work</li>
                      <li>3. Blacklisted- Crminials or Banned people</li>
                      <li>4. Unknown- Unregistered people</li>
                                            
                    </ul> 
                    </p>
              </div>
        <div className="col-5"><img src={require('../img/homeimg1.svg')} alt='logo' style={{height:'40vh',width:'40wh',padding:'10px'}} /></div>

        </div>

        <div className="row"
          style={{
            display: 'flex',
            alignItems:'center',
            justifyContent:'center',
            margin: '30px 0px 30px 0px',
          }}
        >
        <div className="col-5"><img src={require('../img/homeimg2.svg')} alt='logo' style={{height:'40vh',width:'40wh',padding:'10px'}} /></div>

        <div className="col-7">

                    <p> 
                                        
                    <ul style={{listStyle:'none', fontSize: '1.2rem',}}>
              <h4>Photo Inputs</h4>
              <li>Input image can be image file or URL</li>
              <li>Image file must be jpg, jpeg, or png format</li>
              <li>
                The App will try to detect all faces</li>
                <li>which might take few
                seconds depend on how many faces are in the image.
              </li>
              <li>webcam Input works well with PC or Android phone's camera.</li>
              
            </ul>
                    

                    


                    </p>
        </div>

        </div>
        
      </div>
    );
  }
}
