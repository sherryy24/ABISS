import React, { Component } from 'react';
import { JSON_PROFILE } from '../common/profile';
class ShowDetails extends Component {
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
    
    const { detections, match } = this.state;
    let permissionStatusAlert = null;
    let visitors = Object.keys(JSON_PROFILE);
    let permissionStatus;
    let idnumber;
    let personName;
    let personPhone;
    let personEmail;
    
    
    if (!!detections) {
        permissionStatusAlert = detections.map((detection, i) => {
                  return (
            <div key={i} className="container">
            <div className="row" style={{margin:20}}>

              <div
                style={{
                  padding:30,
                  alignItems: 'center',
                  border: 'solid #3dfffc',
                  backgroundColor:"#001e31",
                  color:"#3dfffc",
                  marginTop:'30px'
                }}
              >
                {/* matching face in database: person's records are found*/}
                  {!!match && match[i] && match[i]._label !== 'unknown' ? (
                    
                      <p style={{fontSize:'15px'}}>

                        {!!visitors.map(visitor =>(JSON_PROFILE[visitor].rollno)===match[i]._label ?
                        (permissionStatus=JSON_PROFILE[visitor].permission,
                        idnumber=JSON_PROFILE[visitor].rollno,
                        personName=JSON_PROFILE[visitor].name,
                        personPhone=JSON_PROFILE[visitor].phone,
                        personEmail=JSON_PROFILE[visitor].email

                        ):null
                          )}
                            
                          Permission Status: {permissionStatus}
                          <br/>
                          <br/>
                          Roll Number: {idnumber}
                          <br/>
                          <br/>
                          Name: {personName}
                          <br/>
                          <br/>
                          Phone Number: {personPhone}
                          <br/>
                          <br/>
                          Email ID: {personEmail}
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
                        
                     
                      
                      </p>
                    ) : null}
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

export default ShowDetails;
