import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import Doubtpin from './Doubtpin'
import Doubtselect from './Doubtselect'
import Divider from '../Feed/Divider'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Doubtpage = ({user}) => {
   
    const [doubts,setdoubts]=useState(null)
    const [category,setcategory]=useState("");
    const navigate=useNavigate()
    useEffect(()=>{
        if(category.length===0)
        {
            

         axios.get('http://localhost:3001/posts/doubt').then((response)=>{
            setdoubts(response.data)
            console.log(category)
            console.log(response)
        })
        }
        else
        {
            console.log(typeof(category))
            axios.get(`http://localhost:3001/posts/doubt/categories/${category}`).then((response)=>{
                setdoubts(response.data);
                console.log(response)
                console.log(category)
            })
        }
    },[category])
    const breakpointobj={
        default:4,
        3000:6,
        2000:4,
        1200:3,
        1000:2,
        500:1
    }
    const doubt=[{name:'unresolved',value:'unresolved'},{name:'resolved',value:'resolved'},{name:'Recent',value:'Date'}]
  return (
    <>
    <Doubtselect title="Doubt" options={doubt} setcategory={setcategory}/><br/><br/>
    <Divider value='Doubts'/>
   {doubts?.length===0 &&
   <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px',flexDirection:'column'}}>
       <p style={{fontFamily:'comic sans ms',textAlign:'center'}} className='pr-5 text-md text-sky-500'> hey, u haven't Posted any doubt yet!!</p><br/>
       <Button onClick={()=>navigate('/doubt')} style={{color:'white',fontFamily:'comic sans ms'}} variant="outlined">Post Doubt</Button>
    </div>} 
   <Masonry  className='flex  animate-slide-fwd'  breakpointCols={breakpointobj}>
       {doubts && (doubts?.map((pin)=><Doubtpin user={user && user} key={pin?._id} pin={pin && pin}/>))}
   </Masonry>
   </>
   
  )
}

export default Doubtpage