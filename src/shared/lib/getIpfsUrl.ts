export const ipfsToHttp = (url: string): string => {
  if (url.startsWith('ipfs://')) {
    return url.replace(/^ipfs:\/\//, 'https://gateway.pinata.cloud/ipfs/');
  }

  const cidMatch = url.match(/ipfs\/(bafy\w+|Qm\w+)/);
  if (cidMatch) {
    return `https://gateway.pinata.cloud/ipfs/${cidMatch[1]}`;
  }

  return url;
};
