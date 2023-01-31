const networks = [
  {
    name: "fantom",
    label: "Fantom",
    endpoint:
      "https://api.thegraph.com/subgraphs/name/gitcoinco/grants-round-fantom-mainnet",
  },
  {
    name: "optimism",
    label: "Optimism",
    endpoint:
      "https://api.thegraph.com/subgraphs/name/gitcoinco/grants-round-optimism-mainnet",
  },
  {
    name: "fantom-testnet",
    label: "Fantom Testnet",
    endpoint:
      "https://api.thegraph.com/subgraphs/name/gitcoinco/grants-round-fantom-testnet",
  },
  {
    name: "goerli",
    label: "Goerli testnet",
    endpoint:
      "https://api.thegraph.com/subgraphs/name/gitcoinco/grants-round-goerli-testnet",
  },
  {
    name: "main",
    label: "Ethereum main",
    endpoint: `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_THEGRAPH_API_KEY}/subgraphs/id/BQXTJRLZi7NWGq5AXzQQxvYNa5i1HmqALEJwy3gGJHCr`,
  },
];

export const hide_list = {
  fantom: [
    "0xdbcef2c1112fe1b42103098ca88db45f16ae7f19",
    "0x0c6e6feaf4ec09d58ed6fdedd871047ac8b6793f",
    "0x32a6720d703ac7e5cc1a81e3fefde11aa4e3aab6",
    "0x9a5506164e28848b7571176d8c7bf48938093206",
    "0xb2f4e824037ebd3f4ad2656b009bed01d153ad6f",
    "0xef34aac71002b68fcdf16778ab7c3d48a1e90452",
    "0xc9c01f4d2595691f0f3c34c9ff565231d2fcac05",
    "0xdda2a1827ca45a0ce010b57d574a607dbd21be6e",
    "0x365634f5d7e995ee04358e576f442a35df05dd67",
    "0xbd81499fd6c579271db45d3445569d1d7e96080c",
    "0xec421c11f80f589deb5ee9c323049f7792bc2fb0",
    "0xfa83062221f599b170e4957cebebbc5d7f20d1a4",
    "0x07785f5a0ccff8ff7965c3cdeb7c40109b7f4757",
    "0xc672fd6e6a42b40b85a570efd98e315102774d7d",
  ],
  optimism: [
    "0xe0883e6f3113fc4c2d9539b9ee1659e59531e312",
    "0x7a70ded456302e66a26a4c205d13cd67349143b1",
    "0x6a509b5c2b56302295b1291115f920941a6b98b5",
    "0xc4f85aa3387d7baf58d82b193aca7e4b718f57d4",
    "0xe079286365d1248890aff2e130f8a0cef77c736e",
    "0x4824b16428dae4963764575185e4f1e3d96b2020",
    "0x568a17a8de88cc5f3f443aa4f4e3b67ccaa80505",
    "0xba0e6af66d385b8ec0f9cb911f53146cc7240bc7",
  ],
  "fantom-testnet": [],
  goerli: [],
  main: [
    "0x156066581776f65ce9434fb7dde723b87b9c2e89",
    "0x28d4164c6df015a79e1f6f7a3b1675791cddd545",
    "0x3172a6cce26529e7dd2b533e7c3622a0b544f349",
    "0x350e2257548df38c6b2009245332d73f5919834e",
    "0x8e420122de3b3792abcc69921433a48868bcfac2",
    "0xdf75054cd67217aee44b4f9e4ebc651c00330938",
    "0xff519cf66c0ef800dcd32c92be89841859348fd6",
  ],
};

export { networks };
