import { ethers } from "ethers";
import './App.css';
import BalanceReader from "./BalanceReader";
import BlockExplorer from "./BlockExplorer";
import VendingMachine from "./VendingMachine";
import CustomContract from "./CustomContract";


const providerUrl = 'https://sepolia.infura.io/v3/1e11ac60be7f4c6591794cd621239347';
const provider = new ethers.JsonRpcProvider(providerUrl);

async function getNetwork() {
  const network = await provider.getNetwork();
  console.log(network);
}

getNetwork();

function App() {
  return (
    <>
      <h1>Block Explorer</h1>
      <BalanceReader provider={provider} />
      <BlockExplorer provider={provider} />
      <VendingMachine provider={provider} />
      <CustomContract provider={provider} />
    </>
  );
}

export default App;