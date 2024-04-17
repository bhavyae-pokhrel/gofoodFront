import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
 let [foodCat, setFoodCat] = useState([])
 let [foodItem, setFoodItem] = useState([])
 let [search, setSearch] = useState('')

  const loadData = async () => {
    //let response = await fetch("http://localhost:5000/api/foodData", {
    let response = await fetch("https://gofood-fx59.onrender.com/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json()
    console.log(response[1][0].CategoryName)
    setFoodItem(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='bg-black' style={{overflowX:'hidden'}}>
      <div>
        <Navbar />
      </div>
      <div>
       <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div class=" carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">  
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?starter" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div> 
   
      <div className='container'>
        {
         
          foodCat.length !==0
            ? 
              foodCat.map ((data) => {
              return (

                <div className='row mb-3 text-white'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr/>
                  {
                 foodItem.length !==0 
                  ? 
                  foodItem.filter( (item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          <Card
                            foodItem={filterItems} options={filterItems.options[0]}
                          ></Card>
                        </div>
                      )
                    }
                    ) : <div> No Such Data </div>}
                </div>
              )
            }
            )
           : ""
           }
      </div>
      <Footer />
    </div>
  ) 
}

