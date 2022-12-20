import React from 'react'
import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from '../navbar/Navbar'

import Doubt from '../Doubt/Doubt'
import Feed from '../Feed/Feed'
import Articlepage from '../pages/Articlepage'
// import Pindetails from '../pindetails/Pindetails'
// import CreatePin from '../createpin/CreatePin'
// import Feed from '../imagefeed/Feed'
// import Search from '../search/Search'
import Article from '../createArticle/Article'
import Addimages from '../AddImages/Addimages'
import Addvideo from '../Addvideo/Addvideo'
import Pindetails from '../pindetails/Pindetails'
import Popup from '../Popup/Popup'
const Pins = ({user}) => {
    console.log(user)
    const [searchitem,setsearchitem]=useState('')
   
      return (
    <div className='px-2 md:px-5'>

        <div style={{backgroundColor:'#31708E'}}  className='bg-gray-50'>
            <Navbar searchitem={searchitem} setsearchitem={setsearchitem} user={user&& user}/>
           
            
        </div>
        <div className='h-full'>
            <Routes>
            <Route  path="/pin-detail/:pinId" exact element={<Pindetails user={user && user}/>}/> 
            <Route path="/create-article" exact element={<Article user={user && user}  />} />
            <Route path="/create-images" exact element={<Addimages user={user && user}  />} />
            <Route path="/upload-video" exact element={<Addvideo user={user && user}  />} />
            <Route path="/doubt" exact element={<Doubt user={user && user}  />} />
            <Route  path='/*' exact element={<Feed user={user&&user}/>}/> 
            <Route  path="/category/:pinId" exact element={<Feed user={user && user}/>}/>
            <Route path='/broadcast-message'  exact element={<Popup user={user && user}/>}/>
            </Routes>

        </div>
    </div>
  )
}

export default Pins