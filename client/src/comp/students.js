import React,{useContext,useState,useEffect} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import {serverurl} from '../key'
import Loading from './loading'

import { Tag} from 'antd';
const Student=()=>{
    const {userid} =useParams()
    const [details,setdetails]=useState({})
    useEffect(()=>{
        fetch(`${serverurl}/student/id/${userid}`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            setdetails(result)
        }).catch(err=>console.log(err));
    },[])
    return (
        <div>
            <h1>Student Details</h1>
        {details.name?
        <div>
             <div style={{display:'flex',justifyContent:'center'}}>
             <table className='table table-hover tb'>

               <tr><td>Name</td> <td>{details.name}</td> </tr>
               <tr><td>ID</td> <td>{details.id}</td> </tr>
               <tr><td>Year</td> <td>{details.year}</td> </tr>
               <tr><td>Branch</td> <td>{details.branch}</td> </tr>
               <tr><td>Skills</td> <td> {details.skills?details.skills.map(item=><Tag style={{padding:'2%'}} color='#2b3235' key={item}>{item}</Tag>):""}</td> </tr>
               </table>
               </div>
               <h3>  College Details</h3>
                  {details.collegeid?
                 <div style={{display:'flex',justifyContent:'center'}}>
                 <table className='table table-hover tb'>
                     <Link to={`/college/${details.collegeid.id}`}>
          <tr>     <td>  College Name</td><td>{details.collegeid.name}</td></tr>
          <tr>    <td>   College ID</td><td>{details.collegeid.id}</td></tr>
             <tr>  <td>   College Address </td><td> {details.collegeid.city},{details.collegeid.state},{details.collegeid.country}</td></tr>
             </Link>
                      </table></div>:<Loading />
                }
            </div>
            :<Loading />
            
        }
        </div>
    )
  }
  
  export default Student;