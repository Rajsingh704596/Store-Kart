import { useState } from 'react';
import Ratings from '../ratings/Ratings';

const Filter = () => {

  const[filters, setFilters]= useState({
    price:5000,          //initial state 
    ratings:3,
  })

  // console.log(filter);

  // fun that handle all input which is change
  const handleInputChange=(e)=>{
    const {name,value} =e.target
    setFilters((prev)=>({...prev,[name]:value }))
  }


  return (
    <div className="min-w-[15rem] border-r border-r-white/10 p-6 sticky top-[4rem]">

      {/* radio ascending or descending */}
      <div>
        <div className="form-control">
          <label className="label cursor-pointer gap-30">
            <span className="label-text w-30 my-2">Ascending</span>
            <input
              type="radio"
              name="radio-1"
              className="radio radio-info w-5 h-5"
              defaultChecked
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer gap-30">
            <span className="label-text w-30">Descending</span>
            <input
              type="radio"
              name="radio-1"
              className="radio radio-info w-5 h-5"
              defaultChecked
            />
          </label>
        </div>
      </div>

       <div className="w-full h-[1px] bg-white/20 my-5 "></div>

      {/* checkbox for out of stock and fast delivery*/}
      <div>
      <div className="form-control">
          <label className="label cursor-pointer gap-30">
            <span className="label-text w-30 my-2">Include Out of Stock</span>
            <input type="checkbox" defaultChecked className="checkbox checkbox-primary checkbox-sm" />
          </label>
        </div>

      <div className="form-control">
          <label className="label cursor-pointer gap-30">
            <span className="label-text w-30">Fast Delivery Only</span>
            <input type="checkbox" defaultChecked className="checkbox checkbox-primary checkbox-sm" />
          </label>
        </div>
      </div>

      {/* Rating */}
      <div className='my-6'>
      {/* Rating component which is editable */}
      <Ratings defaultRating={filters?.ratings} isEditable={true} onRatingChange={(Rating)=>setFilters((prev)=>({...prev, ratings:Rating}))}/>
      {/* here Rating basically get from child component and with help of setFun rating update setFilters({...filter, ratings:Rating}) */}
      <br />
      {/* <Ratings/> */}   {/* this Rating component only for show (Read-Only) */}
      </div>


      {/* Price Range */}
      <div className='my-8'>
      <p className='my-4'>Price: <strong>{filters?.price}</strong> Rs</p>
      <input name="price" type="range" min={100} max={5000} value={filters?.price} onChange={handleInputChange} className="range range-info range-xs" />
      </div>

       {/* clear filter Button */}
       <div className='mt-[50px]'>
        <button className='btn btn-neutral w-full'>Clear Filters</button>
       </div>
    </div>
  );
};


export default Filter;
