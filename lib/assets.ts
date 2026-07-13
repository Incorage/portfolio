const publicAsset = (path: string) => path.replace(/^\//, "");

export const assets = {
  avatar: publicAsset("/avatar.webp"),
  telegramWhite: publicAsset("/icons/button-tg-icon.svg"),
  telegramIcon: publicAsset("/icons/icon-button-social-telegram.svg"),
  vkIcon: publicAsset("/icons/icon-button-social-vk.svg"),
  copyIcon: publicAsset("/icons/email-copy-button.svg"),
  geolocationIcon: publicAsset("/icons/geolocation-icon.svg"),
  menuIcon: publicAsset("/icons/menu-button-icon.svg"),
  downloadIcon: publicAsset("/icons/resume-button-icon-download.svg"),
  logoKurt: publicAsset("/cases/Cases/Company_Logo/Logo_Case_1.svg"),
  logoFlow: publicAsset("/cases/Cases/Company_Logo/Logo_Case_2.svg"),
  logoCentr: publicAsset("/cases/Cases/Company_Logo/Logo_Case_3.svg"),
  project1: [
    publicAsset("/cases/Cases/Case_1/1.webp"),
    publicAsset("/cases/Cases/Case_1/2.webp"),
    publicAsset("/cases/Cases/Case_1/3.webp"),
    publicAsset("/cases/Cases/Case_1/4.webp")
  ],
  project2: [
    publicAsset("/cases/Cases/Case_2/1.webp"),
    publicAsset("/cases/Cases/Case_2/2.webp"),
    publicAsset("/cases/Cases/Case_2/3.webp"),
    publicAsset("/cases/Cases/Case_2/4.webp")
  ],
  project3: [
    publicAsset("/cases/Cases/Case_3/1.webp"),
    publicAsset("/cases/Cases/Case_3/2.webp"),
    publicAsset("/cases/Cases/Case_3/3.webp")
  ]
} as const;
