import React,{useContext,useState,useEffect,useParams} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {serverurl} from '../key'
import { PieChart } from 'react-minimal-pie-chart';
import { Chart } from "react-google-charts";
import Loading from './loading'

import { Table, Tag, Space } from 'antd';
const Dashboard=()=>{
      const history=useHistory()
      const [statecollege,setstatecollege]=useState([]);
      const [statestudents,setstatestudents]=useState([]);
      const [coursecollege,setcoursecollege]=useState([]);
      const [coursestudent,setcoursestudent]=useState([]);
      const [details,setdetails]=useState([])
  
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
              dataIndex: 'numberStudents',
              key: 'num',
            },
            {
              title: 'Courses',
              key: 'courses',
              dataIndex: 'courses',
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
    
  
      useEffect(()=>{
          fetch(`${serverurl}/college/list`,{
              method:"get"
          })
          .then(res=>res.json())
          .then(result=>{
              setdetails(result)
          }).catch(err=>console.log(err));
      },[])
      useEffect(()=>{
        fetch(`${serverurl}/collegestate`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
          result.unshift(['state','count'])
          setstatecollege(result)
        }).catch(err=>console.log(err));
      },[])
      useEffect(()=>{
        fetch(`${serverurl}/collegecourse`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
          result.unshift(['state','No. of Colleges'])
          setcoursecollege(result)
        }).catch(err=>console.log(err));
      },[])
      useEffect(()=>{
        fetch(`${serverurl}/studentstate`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
          result.unshift(['state','count'])
          setstatestudents(result)
        }).catch(err=>console.log(err));
      },[])
      useEffect(()=>{
        fetch(`${serverurl}/studentcourse`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
          result.unshift(['state','count'])
          setcoursestudent(result)
        }).catch(err=>console.log(err));
      },[])



    return (
      <div>
        <h1 style={{padding:'2%'}}>DashBoard</h1>
<div className='container'>
<div className='row'>
        <div className='col-sm-10 col-md-6 col-lg-6 col-xl-6'>
          <h6>State College Statistics</h6>
          {statecollege.length?
<Chart
  chartType="PieChart"
  data={statecollege}
  chartEvents={[
    {
      eventName: "select",
      callback({ chartWrapper }) {
        history.push('/collegestats/s'+statecollege[chartWrapper.getChart().getSelection()[0].row+1][0]);
      }
    }
  ]} width={"100%"}
  height={"400px"} legendToggle
/>:<Loading />}
        </div>
        <div className='col-sm-10 col-md-6 col-lg-6 col-xl-6'>
        <h6>Courses College Statistics</h6>
          {coursecollege.length?
<Chart
  chartType="BarChart"
  data={coursecollege}
  chartEvents={[
    {
      eventName: "select",
      callback({ chartWrapper }) {
        history.push('/collegestats/c'+coursecollege[chartWrapper.getChart().getSelection()[0].row+1][0]);
        console.log(chartWrapper.getChart().getSelection()[0].row)
      }
    }
  ]} width={"100%"}
  height={"400px"} legendToggle
/>:<Loading />}
        </div>
        <div className='col-sm-10 col-md-6 col-lg-6 col-xl-6'>
        <h6>State Student Statistics</h6>
          {statestudents.length?
<Chart
  chartType="PieChart"
  data={statestudents}
  chartEvents={[
    {
      eventName: "select",
      callback({ chartWrapper }) {
        history.push('/studentstats/s'+statestudents[chartWrapper.getChart().getSelection()[0].row+1][0]);
        console.log(chartWrapper.getChart().getSelection()[0].row)
      }
    }
  ]} width={"100%"}
  height={"400px"} legendToggle
/>:<Loading />}
        </div>
        <div className='col-sm-10 col-md-6 col-lg-6 col-xl-6'>
        <h6>Courses Student Statistics</h6>
          {coursestudent.length?
<Chart
  chartType="PieChart"
  data={coursestudent}
  chartEvents={[
    {
      eventName: "select",
      callback({ chartWrapper }) {
        history.push('/studentstats/c'+coursestudent[chartWrapper.getChart().getSelection()[0].row+1][0]);
        console.log(chartWrapper.getChart().getSelection()[0].row)
      }
    }
  ]} width={"100%"}
  height={"400px"} legendToggle
/>:<Loading />}
        </div>
        </div>
        </div>
        <div>

            <h1>College List</h1>
{
            details.length?
            <div><Table scroll={{ x: 700 }} dataSource={details} onRow={(record, rowIndex) => {
                return {
                  onClick: event => {history.push('/college/'+details[rowIndex].id)}
                };
              }} columns={columnsSimilarClgList} style={{padding:'4%',cursor:'pointer'}}/>;
            </div>
            :<Loading />

        }
        </div>
        </div>
    )
  }
  
  export default Dashboard;