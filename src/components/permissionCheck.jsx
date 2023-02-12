import React, { Component } from 'react';
import { JSON_PROFILE } from '../common/profile';
import emailjs from 'emailjs-com';
class PermissionCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptors: null,
      detections: null,
      prevId:null,
    };
  }

  componentDidMount() {
    this.getDescription();
  }


  componentWillReceiveProps(newProps) {
    this.getDescription(newProps);
  }

  

  //getting 128 number facial feature discriptor from webcam input
  getDescription = async (props = this.props) => {
    const { fullDiscription, faceMatcher} = props;
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

    //costom mail messages according to situation
    //mail messages when blacklisted person detected
    var blacklistedEmailParams={
        location:'Block 1, Security Gates',
        subject:'blacklisted person Detected',
        email: 'universityssteam1@gmail.com , universityssteam2@gmail.com',
        message: 'A Blacklisted Person recognised at Block 1 Security Gate, kindly report to the gate and contact the nearest police station asap!',
        submessage:'Convert the following Base64-encoded image of the suspect to png using: https://base64.guru/converter/decode/image/png',
        screenshot: this.props.screenshot
      };

      //mail messages when unknown person detected
      var unknownEmailParams={
        location:'Block 1, Security Gates',
        subject:'Unknown Person Detected',
        email: 'universityssteam1@gmail.com, universityssteam2@gmail.com',
        message: 'An Unlisted Person recognised at Block 1 Security Gate, kindly verify their identity and escort them.',
        submessage:'Convert the following Base64-encoded image of the unknown person to png using: https://base64.guru/converter/decode/image/png',
        screenshot: this.props.screenshot
      };

      //mail messages when guest detected
      var guestEmailParams={
        location:'Block 1, Security Gates',
        subject:'Guest Detected',
        email: 'universityssteam1@gmail.com, universityssteam2@gmail.com',
        message: 'A Guest recognised at Block 1 Security Gate, kindly escort them to the Engagement Team.',
        submessage:'Convert the following Base64-encoded image of the guest person to png using: https://base64.guru/converter/decode/image/png',
        screenshot: this.props.screenshot
      };
      

    //send alert email messages
    const sendMailAlert=(idnumber,permissionStatus)=>{
      if(idnumber!==this.state.prevId)
      {
          //sending message+snapshot to security team if blacklisted person/criminal is recognised
        if(permissionStatus==='blacklisted')
        {emailjs.send('service_i5k082k','template_aip0zcs',blacklistedEmailParams,'Z0DE67ZW8tdKVSfCj').then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
       }, function(error) {
          console.log('FAILED...', error);
       });
       
       this.setState({prevId: idnumber})}

       //sending message+snapshot to security team if unknown person is recognised
       else if(permissionStatus==='unknown')
       {emailjs.send('service_i5k082k','template_aip0zcs',unknownEmailParams,'Z0DE67ZW8tdKVSfCj').then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
     });
     
     this.setState({prevId: idnumber})}

     //sending message+snapshot to security team if guest person is recognised
     else 
       {emailjs.send('service_i5k082k','template_aip0zcs',guestEmailParams,'Z0DE67ZW8tdKVSfCj').then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
     });
  
     //storing id number of previously entered person
     this.setState({prevId: idnumber})}
        
      }
      else{ }
    }


    
    const { detections, match } = this.state;
    let permissionStatusAlert = null;
    let visitors = Object.keys(JSON_PROFILE);
    let permissionStatus;
    let idnumber;
    
    
    if (!!detections) {
        permissionStatusAlert = detections.map((detection, i) => {
                  return (
            <div key={i} className="container">
            <div className="row" style={{margin:20}}>

            <div className="row">
              <div className="col-9"
                style={{
                  paddingTop:30,
                  alignItems: 'center',
                  border: 'solid #3dfffc',
                  backgroundColor:"#001e31",
                  color:"#3dfffc"
                }}
              >
                {/* matching face in database: person's records are found*/}
                  {!!match && match[i] && match[i]._label !== 'unknown' ? (
                    
                      <p>

                        {!!visitors.map(visitor =>(JSON_PROFILE[visitor].rollno)===match[i]._label ?
                        (permissionStatus=JSON_PROFILE[visitor].permission,
                        idnumber=JSON_PROFILE[visitor].rollno
                        ):null
                          )}
                            
                          Permission Status: {permissionStatus}

                          {/* sending alert mail if guest or blacklisted person identified */}
                              {permissionStatus==='blacklisted' || permissionStatus==='guest' ?
                              (
                              sendMailAlert(idnumber,permissionStatus)
                              ): null}
                      </p>
                     
                  ) : null}
                
                  {/* matching face in database: no records of person are found*/}
                    {!!match && match[i] && match[i]._label === 'unknown' ? (
                      <p
                        style={{
                          backgroundColor:"#480a0a"
                        }}
                      >
                        Permission Status: {match[i]._label}
                        
                      {sendMailAlert(0,match[i]._label)}
                     
                      
                      </p>
                    ) : null}
              </div>
                      {permissionStatus==='student' || permissionStatus==='guest'?(

                        <div className="col-3">
                          <div style={{backgroundColor:'#66ff00', height:100, width:100, borderRadius:100, border: 'solid #3dfffc',}}></div>
                        </div>
                      ):(<div className="col-3">
                          <div style={{backgroundColor:'#E10600', height:100, width:100, borderRadius:100, border: 'solid #3dfffc',}}></div>
                        </div>)}
               
              
              </div>
              </div>   
            </div>
  
          );
        });

        
      }

     
      

    return( 
      
    <div>
    
    {permissionStatusAlert}</div>);
  }
}

export default PermissionCheck;
