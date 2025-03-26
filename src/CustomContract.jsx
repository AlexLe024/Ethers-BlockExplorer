import { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";

const abi = [
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "dst", "type": "address" },
      { "internalType": "uint256", "name": "wad", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

function CustomContract({ provider }) {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  async function getBalance() {
    if (!address) {
      setStatus("Enter an address");
      return;
    }

    try {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const balance = await contract.balanceOf(address);
      setBalance(ethers.formatEther(balance));
      setStatus("Balance fetched successfully");
    } catch (error) {
      console.error("Error fetching balance:", error);
      setStatus("Error fetching balance");
    }
  }

  async function sendTokens() {
    if (!recipient || !amount) {
      setStatus("Enter recipient and amount");
      return;
    }

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.transfer(recipient, ethers.parseUnits(amount, "ether"));
      await tx.wait();
      setStatus("Transaction successful");
    } catch (error) {
      console.error("Error sending tokens:", error);
      setStatus("Error sending tokens");
    }
  }

  return (
    <div className="container">
      <h1>Custom Contract</h1>
      
      <label>
        Address:
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
      </label>
      <button onClick={getBalance}>Get Balance</button>
      {balance && <p>Balance: {balance} ETH</p>}

      <hr />

      <label>
        Recipient:
        <input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Enter recipient address" />
      </label>
      <label>
        Amount:
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
      </label>
      <button onClick={sendTokens}>Send Tokens</button>

      {status && <p>{status}</p>}
    </div>
  );
}

export default CustomContract;