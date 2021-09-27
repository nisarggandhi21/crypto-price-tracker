import React from "react";

const Transactions = ({ list }) => {
  return (
    <div className="list-container">
      <h5>Transaction</h5>
      <ul className="list-group">
        {list.length ? (
          list.map((item) => (
            <li key={item.id} className="list-group-item">
              <span>
                <strong style={{backgroundColor: '#fff', color: '#000'}}>{item.name}</strong>
              </span>
              {": "}
              <span style={{backgroundColor: '#fff', color: '#000'}}>{item.converted}</span>
            </li>
          ))
        ) : (
          <div> No Purchases</div>
        )}
      </ul>
    </div>
  );
};

export default Transactions;
