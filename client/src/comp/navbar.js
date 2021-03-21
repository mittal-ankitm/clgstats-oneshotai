import React,{useContext,useState,useEffect,useParams} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {serverurl} from '../key'
const NavBar=()=> {
    const [query,setquery]=useState("")
    const [details,setdetails]=useState([])
    const history=useHistory()
const search=()=>{
fetch(serverurl+'/search',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({query})
        }).then(res=>res.json())
        .then(result=>{
            setdetails(result);
        }).catch(err=>console.log(err))
}

const open=()=>{
    for(let i in details.clgdata){
        if(details.clgdata[i].id==query) return window.location.assign('/college/'+query);
    }
    for(let i in details.studata){
        if(details.studata[i].id==query) return window.location.assign('/students/'+query);
    }
    setquery("");
}

    return (
        <div class='text-center fixed-top' style={{padding:'1%'}}>
            
        <div class="input-group rounded">
            <Link to='/dashboard'>
        <span class="input-group-text border-0 db" id="search-addon" style={{cursor:'pointer'}}>
            Dashboard
    <i class="fas"></i>
  </span></Link>
  <input type="search" onPress list='userslist' class="form-control rounded" placeholder="Search" aria-label="Search" onChange={(e)=>{setquery(e.target.value);search();}}
    aria-describedby="search-addon" /><span class="input-group-text border-0 db" id="search-addon" style={{cursor:'pointer'}} onClick={()=>open()}>
    
<i class="fas fa-search"></i>
</span>
  
</div>
<div>
                        <datalist id='userslist' onChange={(e)=>open(e)}>

                            {details.clgdata?
                                details.clgdata.map(userdata=>{
                                    return(
                                        
                                    <option value={userdata.id} >COLLEGE  ::  {userdata.name}</option>
                                    
                                    )
                                })
                                :""
                            }
                            {
                                details.studata?
                                details.studata.map(userdata=>{
                                    return(
                                        <Link to={`/students/${userdata.id}`}>
                                    <option value={userdata.id} > STUDENT  ::  {userdata.name}</option>
                                    </Link>
                                    )
                                })
                                :""
                            }

                        </datalist>
                    </div>
      </div>
    );
  }
  
  export default NavBar;