import React, { Component } from 'react';

export default class TestImages extends Component {
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

                <img src={require('../img/logo.svg')} alt='logo' style={{ height: '20vh', width: '20wh', padding: '10px' }} className="img-fluid" />
               <h1>Test Images <br/>for <br/></h1>
                <h2 style={{ textDecoration: 'underline' }}> ABISS: Advanced Biometric Identification Security System</h2>

                <div className="row"
                    style={{
                        display: 'flex',
                        fontSize: '1.2rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '30px 0px 30px 0px',
                    }}
                >

                    <div className="testimage-heading">
                        <h3>1. Student</h3>
                        
                    </div>
                    <div className="col-5">
                    <p className='d-flex justify-content-center'>
                                <img src={require('../img/TestImages/David-student/david1.jpg')} alt='logo' className="img-fluid" style={{ maxHeight: '40vh', padding: '1px' }} />
                                <img src={require('../img/TestImages/David-student/John+Varvatos+8th+Annual+Stuart+House+Benefit+rIgrTm5M3q6x.jpg')} alt='logo' className="img-fluid" style={{ maxHeight: '40vh', padding: '1px' }} />
                                <img src={require('../img/TestImages/David-student/rs_600x600-200721041428-600-David-Schwimmer-LT-072120-GettyImages-908307.jpg')} alt='logo' className="img-fluid" style={{ maxHeight: '40vh', padding: '1px' }} />
                        </p>
                    </div>

                </div>

                <div className="row"
                    style={{
                        display: 'flex',
                        fontSize: '1.2rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '30px 0px 30px 0px',
                    }}
                >

                    <div className="testimage-heading">
                        <h3>2. Guest</h3>
                        
                    </div>
                    <div className="col-5">
                    <p className='d-flex justify-content-center'>
                                <img src={require('../img/TestImages/Bill Gates-guest/bill_gates.jpg_1544913167347.jpg')} alt='logo' className="img-fluid" style={{ maxHeight: '40vh', padding: '1px' }} />
                                <img src={require('../img/TestImages/Bill Gates-guest/merlin_183135423_1167fa8a-7940-427e-b690-68876010d286-superJumbo.jpg')} alt='logo' className="img-fluid" style={{ maxHeight: '40vh', padding: '1px' }} />
                        </p>
                    </div>

                </div>

                <div className="row"
                    style={{
                        display: 'flex',
                        fontSize: '1.2rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '30px 0px 30px 0px',
                    }}
                >

                    <div className="testimage-heading">
                        <h3>3. Blacklisted</h3>
                        
                    </div>
                    <div className="col-5">
                    <p className='d-flex justify-content-center'>
                                <img src={require('../img/TestImages/Milli Bobby Brown-blacklisted/BBO4OF5GLRHEFBEIONGSQK6R2Q.jpg')} alt='logo' className="img-fluid" style={{ maxHeight: '40vh', padding: '1px' }} />
                                <img src={require('../img/TestImages/Milli Bobby Brown-blacklisted/milli1.jpg')} alt='logo' className="img-fluid" style={{ maxHeight: '40vh', padding: '1px' }} />
                                <img src={require('../img/TestImages/Milli Bobby Brown-blacklisted/millie-bobby-brown-2000-10b978bacf3141eb83f0897a6939e580.jpg')} alt='logo' className="img-fluid" style={{ maxHeight: '40vh', padding: '1px' }} />
                        </p>
                    </div>

                </div>

                <div className="row"
                    style={{
                        display: 'flex',
                        fontSize: '1.2rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '30px 0px 30px 0px',
                    }}
                >

                    <div className="testimage-heading">
                        <h3>4. Unknown</h3>
                        
                    </div>
                    <div className="col-5">
                    <p className='d-flex justify-content-center'>
                                <img src={require('../img/TestImages/Dwayne Johnson-unknown/dwayne_J2.jpg_1544912537681.jpg')} alt='logo' className="img-fluid" style={{ maxHeight: '40vh', padding: '1px' }} />
                                <img src={require('../img/TestImages/Dwayne Johnson-unknown/dwayne_J3.jpg_1544912576416.jpg')} alt='logo' className="img-fluid" style={{ maxHeight: '40vh', padding: '1px' }} />
                        </p>
                    </div>

                </div>

               

            </div>
        );
    }
}
