import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "Durondil",
      subTitle: "Développeur passionné",
  brandTitle: "Durondil",

  description: "Blog personnel sur le développement, l’informatique, le hardware, Raspberry Pi, l’impression 3D, le DIY maison et l’open source.",

  site: "https://durondil.fr",

  locale: "fr", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },

    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/Lozweb",
    },
  ],

  username: "Durondil",
  sign: "Qa developer",
  avatarUrl: "https://durondil-blog.any-app.fr/storage/durondil_blog/profile.jpg",
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/Lozweb",
    },
  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "https://durondil-blog.any-app.fr/storage/durondil_blog/t1.jpg",
    "https://durondil-blog.any-app.fr/storage/durondil_blog/t2.jpg",
    "https://durondil-blog.any-app.fr/storage/durondil_blog/t3.jpg",
    "https://durondil-blog.any-app.fr/storage/durondil_blog/t4.jpg",
    "https://durondil-blog.any-app.fr/storage/durondil_blog/t5.jpg",
    "https://durondil-blog.any-app.fr/storage/durondil_blog/t6.jpg",
  ],

  slugMode: "HASH", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default YukinaConfig;
