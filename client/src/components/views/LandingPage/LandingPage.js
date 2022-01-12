import React, { useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL,API_KEY} from '../../Config';

function LandingPage() {
    useEffect(()=>{
      const endpoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US%page=1`;
        fetch(endpoint)
        .then(response => response.json())
        .then(result =>console.log(result));
    },[])

    return (
       <div style={{ width : '100%', margin: '0'}}>
           {/* main image */}

           <div style={{ width : '85%', margin: '1rem auto'}}>
            <h2>Movies by latest</h2>
            <hr/>

            {/*Movie Grid Card */}

           </div>
            <div style={{display :'flex', justifyContent: 'center'}}>
                <button>Load more</button> 
            </div>
       </div>
    )
}

export default LandingPage;

