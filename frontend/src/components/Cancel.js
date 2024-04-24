import React from 'react'
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <div className='bg-black d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
        <Link to="/" className='m-3 btn-lg btn-danger' style={{textDecoration:'none'}}>Go to Home Page</Link>
    </div>
  )

}
