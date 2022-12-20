import React,{useState,useEffect} from 'react'
import Divider from '../Feed/Divider'
import Masonry from 'react-masonry-css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Articlepin from './Articlepin'
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
const Articlepage = ({user, pinId}) => {
    const [articles,setarticles]=useState(null)
   const navigate=useNavigate()
    let ID='Articles'
    if(pinId)
    {
        ID=`${pinId} Articles`;
    }
   
 
    useEffect(()=>{
        if(pinId)
        {
            axios.get(`http://localhost:3001/posts/article/${pinId}`).then((response)=>{
                setarticles(response.data)
                console.log(response)
            })
            

        
        }
        else
        {
            axios.get('http://localhost:3001/posts/article').then((response)=>{
                setarticles(response.data)
                
                console.log(response)
            })
        }
        
    },[pinId])
    const breakpointobj={
        default:4,
        3000:6,
        2000:4,
        1200:3,
        1000:2,
        500:1
    }
    const doubt=[{name:'upvote',value:'upvote'},{name:'likes',value:'likes'},{name:'Recent',value:'Date'}]
  return (
    <>
    <Divider value={ID}/>
   {articles?.length===0 && <div style={{justifyContent:'center',alignItems:'center',padding:'10px',display:'flex',flexDirection:'column'}}>
       <p style={{fontFamily:'comic sans ms',textAlign:'center'}} className='pr-5 text-md text-sky-500'> Contribute to the community by adding an Article...</p><br/>
       <Button onClick={()=>navigate('/create-article')} style={{color:'white',fontFamily:'comic sans ms'}} variant="outlined">Post Article</Button>
    </div>} 
    <Masonry  className='flex  animate-slide-fwd' breakpointCols={breakpointobj}>
       {articles && (articles?.map((pin)=><Articlepin user={user && user} key={pin._id} pin={pin}/>))}
   </Masonry>
   </>
    
  )
}

export default Articlepage