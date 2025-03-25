import { ethers } from "ethers";
import { useState } from 'react';

function BalanceReader({ provider }) {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  async function onChange(evt) {
    const address = evt.target.value;
    console.log("Address:", address);
    setAddress(address);

    try {
      const balance = await provider.getBalance(address);
      console.log("Balance:", balance);
      setBalance(ethers.formatEther(balance));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container wallet">
      <h1>Balance Reader</h1>
      <label>
        Address:
        <input placeholder="Type any address" value={address} onChange={onChange} />
      </label>
      <div className="balance">Balance: {balance} ETH</div>
    </div>
  );
}

export default BalanceReader;