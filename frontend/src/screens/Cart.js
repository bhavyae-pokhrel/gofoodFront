
import React from 'react'
import { useCart,useDispatchCart } from '../components/ContextReducer';
import trash from "../trash.svg"

// start
import {loadStripe} from '@stripe/stripe-js'
// end   
export default function Cart() {
  let data = useCart();
  console.log('data in cart.js',data);
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div >
        <div className='m-3 w-100 text-center fs-2'>The Cart is Empty!</div>
      </div>
    )
  }

  // start
  const makePayment=async()=>{
    const stripe=await loadStripe("pk_test_51P7b5USFN6I3Hid9jrUneQejFa50Rxt37O7eNhhG2JCawqIkpSJDWgngxHgMNkOm0RnpLjOp1ItIPK207FDTIgdG00lKiSde7N")

    const body={
      products:data
    }
    console.log('body in cart.js',body);
     
    const headers={
      "Content-Type":"application/json"
    }

    const response=await fetch("http://localhost:5000/api/create-checkout-session",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    });

    const session=await response.json();

    const result=stripe.redirectToCheckout({
      sessionId:session.id
    });

    if(result.error){
      console.log('cart in 60',result.error);
    }
  }
  // end
  const handleCheckOut= async()=>  {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch ("http://localhost:5000/api/orderData", {
    // let response = await fetch("https://gofoodback-ma9i.onrender.com/api/orderData", {
        method: 'POST',
         headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
  
       if (response.status === 200) {
        dispatch({ type: "DROP" })
      }
   }
   let totalPrice = data.reduce((total, food) => total + food.price, 0)
   
  return (   
   
    <div style={{background:"black",height:"100%",overflowY:"auto"}}> 
      <div className='container table-responsive table-responsive-sm table-responsive-md table-responsive-lg'>
        <table className='table'>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >No.</th>
              <th scope='col' >Name</th>
              <th scope='col' >Image</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' >Remove</th>
            </tr>
          </thead>
         <tbody>
            {data.map((food, index) => ( 
              <tr className="text-white fs-5">
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td><img src={food.img} style={{height:"40px",width:"80px"}} alt=""/></td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                 <td ><button type="button" className="btn p-0"><img src={trash} alt="delete" onClick={() => {dispatch({type:"REMOVE",index:index }) }} /></button> </td>    
              </tr>
            ))}
          </tbody> 
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
           {/* <button className='btn-lg bg-success  text-white' onClick={handleCheckOut}>Check Out</button>  */}
           <button className='btn-lg bg-success  m-3 text-white' onClick={()=>{ makePayment();handleCheckOut()}}>Payment</button>    
        </div>
      </div>
    </div>
  )
}