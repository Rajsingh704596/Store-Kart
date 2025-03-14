import { useState } from 'react';
import Rating from '../ratings/Ratings';

const Filter = () => {

  const[filter, setFilters]= useState({
    price:'',
    ratings:5,
  })

  console.log(filter);
  return (
    <div className="min-h-screen w-full max-w-[20rem] border-r border-r-white/10 p-6">
      {/* radio ascending or descending */}
      <div>
        <div className="form-control">
          <label className="label cursor-pointer gap-30">
            <span className="label-text w-20">Ascending</span>
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
            <span className="label-text w-20">Descending</span>
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
            <span className="label-text w-20">Include Out of Stock</span>
            <input type="checkbox" defaultChecked className="checkbox checkbox-primary checkbox-sm" />
          </label>
        </div>

      <div className="form-control">
          <label className="label cursor-pointer gap-30">
            <span className="label-text w-20">Fast Delivery Only</span>
            <input type="checkbox" defaultChecked className="checkbox checkbox-primary checkbox-sm" />
          </label>
        </div>
      </div>

      {/* Rating */}
      <div className='my-6'>
      <Rating defaultRating={filter?.ratings} isEditable={true} onRatingChange={(Rating)=>setFilters((prev)=>({...prev, ratings:Rating}))}/>
      {/* here Rating basically get from child component and with help of setFun rating update setFilters({...filter, ratings:Rating}) */}
      <br />
      {/* <Rating/> */}   {/* this Rating only for show (Read-Only) */}
      </div>

    </div>
  );
};

export default Filter;
