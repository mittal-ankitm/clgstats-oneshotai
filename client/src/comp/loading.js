import React from 'react'
import ReactLoading from 'react-loading';
const Loading=()=> {

    return (
        <div style={{display:'flex',justifyContent:'center',padding:'3%'}}>
            <ReactLoading type='spinningBubbles' color='#0176d2' height={200} width={200} />
        </div>
    );

  }
  
  export default Loading;