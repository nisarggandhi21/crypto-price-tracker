import React from "react";

const Cryptotile = ({ data, selected, onClick }) => {
  const { name, rate, icon } = data;

  const handleClick = () => onClick(data);

  return (
    <div>
      <div className={`card ${selected && "selected"}`} onClick={handleClick}>
        <div className="card-body">
          <img className="cryptocoin-icon" src={icon} alt="icon" />
          <div>{name}</div>
          <div>{rate}</div>
        </div>
      </div>
    </div>
  );
};

export default Cryptotile;
