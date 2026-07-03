const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${basePath}${path}`;

export const assets = {
  avatar: "https://www.figma.com/api/mcp/asset/6b3f8a16-f7f4-47c2-9db8-db5391ad7d6b",
  telegramWhite: "https://www.figma.com/api/mcp/asset/6afedb02-3da7-4a7d-88b3-475d01588ed9",
  telegramIcon: "https://www.figma.com/api/mcp/asset/b7c57178-9275-4c11-aeff-ad565ec92763",
  vkIcon: "https://www.figma.com/api/mcp/asset/fdd2c062-f6f4-4401-9504-cc6a3c662753",
  logoKurt: publicAsset("/cases/Cases/Company_Logo/Logo_Case_1.svg"),
  logoFlow: publicAsset("/cases/Cases/Company_Logo/Logo_Case_2.svg"),
  logoCentr: publicAsset("/cases/Cases/Company_Logo/Logo_Case_3.svg"),
  project1: [
    publicAsset("/cases/Cases/Case_1/1.png"),
    publicAsset("/cases/Cases/Case_1/2.png"),
    publicAsset("/cases/Cases/Case_1/3.png"),
    publicAsset("/cases/Cases/Case_1/4.png")
  ],
  project2: [
    publicAsset("/cases/Cases/Case_2/1.png"),
    publicAsset("/cases/Cases/Case_2/2.png"),
    publicAsset("/cases/Cases/Case_2/3.png"),
    publicAsset("/cases/Cases/Case_2/4.png")
  ],
  project3: [
    publicAsset("/cases/Cases/Case_3/1.png"),
    publicAsset("/cases/Cases/Case_3/2.png"),
    publicAsset("/cases/Cases/Case_3/3.png")
  ]
} as const;
