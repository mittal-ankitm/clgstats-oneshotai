import React,{useContext,useState,useEffect} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import {serverurl} from '../key'

import Loading from './loading'
import { Table, Tag, Space } from 'antd';
const Stats=()=>{
    const {userid} =useParams()
    const history=useHistory()
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
        let type;
        
        if(userid[0]=='s') type='state'
        else type='course'
        let query=userid.slice(1);
        console.log(type," ",query)
        fetch(`${serverurl}/college/${type}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({query})
        })
        .then(res=>res.json())
        .then(result=>{
            setdetails(result)
        }).catch(err=>console.log(err));
    },[])
    return (
        <div>

            <h1>College List {userid.slice(1)}</h1>
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
    )
  }
  
  export default Stats;