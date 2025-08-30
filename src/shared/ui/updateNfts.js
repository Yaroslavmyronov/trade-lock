const store = {
  market: {
    nfts: [],
    page: 2,
    amountPerPage: 20,
    updateNfts: async () => {
      // Fetch and update NFTs in the store
      const url = `localhost:4004/api/nfts?page=${this.page}&pageAmount=${this.amountPerPage}`;
      const response = await fetch(url);

      // Response contains new NFTs based on pagination data
      // Example: [{id: 1, name: 'NFT1'}, {id: 2, name: 'NFT2'}]
      this.nfts = response;
    }
  }
}

// React component
const Trade = () => {
  // useSelector to get nfts from the store
  const [nfts, setNfts] = store.market.nfts;
}

const SellNfts = ({ nfts }) => {
  // After contract interaction return status success
  store.market.updateNfts();
}

