import React,{useContext,useState,useEffect} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import {serverurl} from '../key'
import { Table, Tag, Space} from 'antd';
import Loading from './loading'
const Student=()=>{
    const {userid} =useParams()
    
  const history=useHistory();
    const [details,setdetails]=useState({})
    const [studetails,setstudetails]=useState([])
    const [simClg,setsimClg]=useState([])
    useEffect(()=>{
        fetch(`${serverurl}/college/id/${userid}`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            setdetails(result)
        }).catch(err=>console.log(err));
    },[])
    useEffect(()=>{
        fetch(`${serverurl}/college/similar/${userid}`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            setsimClg(result)
        }).catch(err=>console.log(err));
    },[])
    useEffect(()=>{
        fetch(`${serverurl}/student/clg/${userid}`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            setstudetails(result)
        }).catch(err=>console.log(err));
    },[])

   const columnsStudentList = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
      },
      {
          title: 'Branch',
          dataIndex: 'branch',
          key: 'branch',
        },
      {
        title: 'Skills',
        key: 'skills',
        dataIndex: 'skills',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      }
    ]
    const columnsSimilarClgList = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
      },
      {
          title: 'Year',
          dataIndex: 'year',
          key: 'year',
        },
        {
          title: 'Number of Students',
          dataIndex: 'year',
          key: 'year',
        }
    ]

    return (
        <div>
            <div>
              <h3>College Details</h3>
             
        {details.name?
        <div style={{display:'flex',justifyContent:'center'}}>
             <table className='table table-hover tb'>
                <tr><td>Name </td>  <td>{details.name}</td></tr>
                <tr><td>ID </td>  <td>{details.id}</td></tr>
                <tr><td>Number of Students </td>  <td>{details.numberStudents}</td></tr>
                <tr><td>Year of Establishment </td>  <td>{details.year}</td></tr>
                <tr><td>Courses </td>  <td>{details.courses?details.courses.map(item=><Tag style={{padding:'2%'}} color='#2b3235' key={item}>{item}</Tag>):""}</td></tr>
                <tr><td>Address </td>  <td>{details.city}, {details.state}, {details.country}</td></tr>

                
                </table></div>
            :<Loading />
            
        }</div>
       <h3>Similar Colleges</h3>
   
        {
            simClg.length?
            <div>
              <Table scroll={{ x: 1300 }} dataSource={simClg} onRow={(record, rowIndex) => {
                return {
                  onClick: event => {window.location.assign('/college/'+simClg[rowIndex].id)}
                };
              }} columns={columnsSimilarClgList} style={{padding:'4%',cursor:'pointer'}}/>;
            </div>
            :<Loading />

        }
        <h3>Students List</h3> 
        {
            studetails.length?
            <div>
                <Table scroll={{ x: 1300 }} dataSource={studetails} onRow={(record, rowIndex) => {
                return {
                  onClick: event => {history.push('/students/'+studetails[rowIndex].id);}
                };
              }} columns={columnsStudentList} style={{padding:'4%',cursor:'pointer'}}/>;
            </div>
            :<Loading />
        }
        </div>
    )
  }
  
  export default Student;