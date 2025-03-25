import React, { useState, useEffect } from 'react';

function Block({ blocknum, provider }) {
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(null);

  function toggle() {
    setOpen(!open);
  }

  useEffect(() => {
    async function getBlock() {
      try {
        const blockInfo = await provider.getBlock(blocknum);
        console.log(blockInfo);
        setBlock(blockInfo);
      } catch (error) {
        console.error("Error fetching block:", error);
      }
    }

    if (!block) {
      getBlock();
    }
  }, [blocknum, provider, block]);

  return (
    <div>
      <hr />
      <button onClick={toggle}>Block # {blocknum}</button>
      {open && block && (
        <div>
          <p>Block hash: {block.hash}</p>
          <p>Parent hash: {block.parentHash}</p>
        </div>
      )}
    </div>
  );
}

export default Block;