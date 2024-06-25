import React, {useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    let time= new Date()
    const [orderData, setOrderData] = useState("");

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        //await fetch("http://localhost:5000/api/myOrderData", {
        await fetch("https://gofoodback-ma9i.onrender.com/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setOrderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div className='bg-black' style={{height:'100vh',overflowX:'hidden'}}>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData.length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div className='text-white'>
                                                    {arrayData.Order_date ? <div className='m-auto mt-5 fs-3'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card border mt-4 bg-black text-white" style={{ width: "20.5rem", maxHeight: "220px" }}>
                                                                <img src={arrayData.img} className="card-img-top " alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "65px" }}>
                                                                        <span className='m-1 fs-5'>{arrayData.qty}</span>
                                                                        <span className='m-1 fs-5'>{arrayData.size}</span>
                                                                        <span className='m-1 '>{time.toLocaleTimeString()}</span>

                                                                        <span className='m-1 '>{time.toLocaleTimeString()}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }) :

                                <div>
                                   <div className='text-white text-center fs-1'>Please Order Something!</div>
                                </div>
                        )
                        }):
                        []

                        }
                </div>
            </div >
            <Footer/>
        </div>
    )
}
