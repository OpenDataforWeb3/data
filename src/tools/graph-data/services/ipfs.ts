export async function get_ipfs_data(pointer: string) {
  const url = `https://cloudflare-ipfs.com/ipfs/${pointer}`;
  const res = await fetch(url);

  if (res.status >= 400) {
    throw new Error("Bad response from server");
  }

  return await res.json();
}
