import React from "react";

const ShoesCard = (props) => {
  const { item } = props;
  return (
    <div className="card h-100">
      <div className="card-head" style={{width: '100%', backgroundColor: "#F8F8F8", boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
        <img src={item.image} className='w-100' alt="" />
      </div>
      <div className="card-body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-success">Buy now</button>
        <span className="mx-4">85$</span>
      </div>
    </div>
  );
};

export default ShoesCard;
