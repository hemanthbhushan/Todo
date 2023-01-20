import React from "react";
import { useSelector } from "react-redux";

import "./Table.css";
import { useDispatch } from "react-redux";

const TxTableCard = () => {
    // const txList = useSelector((state)=>state.txArr)
     const txList = props.txArr;

  return (
    <div className="App">
      <table>
        <tr>
          <th>From address</th>
          <th>To Address</th>
          <th>Amount</th>
          <th>Tx Hash</th>
        </tr>
        {txList && txList.length
          ? txList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.from}</td>
                  {/* <td>{val.to}</td>
                  <td>{val.amount}</td>
                  <td>{val.txHash}</td> */}
                  
                </tr>
              );
            })
          : ""}
      </table>
    </div>
  );
};

export default TxTableCard;
