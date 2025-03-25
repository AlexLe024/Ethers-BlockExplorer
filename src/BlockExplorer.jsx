import { useState, useEffect } from "react";
import Block from "./Block";

function BlockExplorer({ provider }) {
  const [blockNumber, setBlockNumber] = useState(0);

  useEffect(() => {
    async function getBlockNumber() {
      try {
        const latestBlockNum = await provider.getBlockNumber();
        console.log("Latest block:", latestBlockNum);
        setBlockNumber(latestBlockNum);
      } catch (error) {
        console.error("Error fetching block number:", error);
      }
    }
    
    getBlockNumber();
  }, [provider]);

  return (
    <div className="container">
      <h1>Block Explorer</h1>
      {blockNumber > 0 && (
        <>
          <Block blocknum={blockNumber} provider={provider} />
          <Block blocknum={blockNumber - 1} provider={provider} />
          <Block blocknum={blockNumber - 2} provider={provider} />
        </>
      )}
    </div>
  );
}

export default BlockExplorer;