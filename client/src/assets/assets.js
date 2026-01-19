import shoes_1 from "./shoes_1.png";
import shoes_2 from "./shoes_2.png";
import shoes_3 from "./shoes_3.png";
import hot_deal from "./icon_images/hot-deal.png";
import best_seller from "./icon_images/best-seller.png";
import new_arrival from "./icon_images/new-arrival.png";
// offer poster
import offer_image from "./offer-poster/offer_image.webp";
import women_offer from "./women_offer.png";
import men_offer from "./men_offer.jpg";
import kids_offer from "./kids_offer.png";

const offerPoster = [
  {
    img: kids_offer,
    link: "/",
  },
  {
    img: men_offer,
    link: "/",
  },
  {
    img: women_offer,
    link: "/",
  },
];

import addidas from "./companies_logo/addidas.png";
import gucci from "./companies_logo/gucci.png";
import louis_vuitton from "./companies_logo/louis_vuitton.png";
import puma from "./companies_logo/puma.png";
import rolex from "./companies_logo/rolex.png";
import zara from "./companies_logo/zara.png";

const category_items = [
  {
    category_url: "/fashion-hub",
    category_name: "Fashion Hub",
  },
  {
    category_url: "/beauty-grooming",
    category_name: "Beauty & Grooming",
  },
  {
    category_url: "/premium-fragrances",
    category_name: "Premium Fragrances",
  },
  {
    category_url: "/designer-accessories",
    category_name: "Accessories",
  },
  {
    category_url: "/footwear-zone",
    category_name: "Footwear Zone",
  },
  {
    category_url: "/luxury-watches",
    category_name: "Luxury Watches",
  },
  {
    category_url: "/kids-kingdom",
    category_name: "Kids Kingdom",
  },
  {
    category_url: "/sports-fitness",
    category_name: "Sports & Fitness",
  },
  {
    category_url: "/travel-essentials",
    category_name: "Travel Essentials",
  },
  {
    category_url: "/lifestyle",
    category_name: "Lifestyle Store",
  },
];

const companiesLogo = [
  {
    name: "Addidas",
    logo: addidas,
  },
  {
    name: "Gucci",
    logo: gucci,
  },
  {
    name: "Louis Vuitton",
    logo: louis_vuitton,
  },
  {
    name: "Puma",
    logo: puma,
  },
  {
    name: "Rolex",
    logo: rolex,
  },
  {
    name: "Zara",
    logo: zara,
  },
];

const footerData = [
  // section 1
  {
    title: "HELP",
    links_data: [
      { link_name: "Live Chat", link_url: "" },
      { link_name: "Call Us", link_url: "" },
      { link_name: "Text Us", link_url: "" },
      { link_name: "help@luxoraa_avenue.com", link_url: "" },
      { link_name: "FAQ/Contact Us", link_url: "" },
      { link_name: "Returns/Exchanges", link_url: "" },
    ],
  },

  // section 2
  {
    title: "SHOP",
    links_data: [
      { link_name: "Men's Shoes", link_url: "" },
      { link_name: "Women's Shoes", link_url: "" },
      { link_name: "Men's Apparel", link_url: "" },
      { link_name: "Women's Apparel", link_url: "" },
      { link_name: "Socks", link_url: "" },
      { link_name: "Gift Cards", link_url: "" },
      { link_name: "Refer a Friend", link_url: "" },
    ],
  },

  // section 3
  {
    title: "COMPANY",
    links_data: [
      { link_name: "Our Stores", link_url: "" },
      { link_name: "Our Story", link_url: "" },
      { link_name: "Our Materials", link_url: "" },
      { link_name: "Sustainability", link_url: "" },
      { link_name: "Investors", link_url: "" },
      { link_name: "Shoe Care", link_url: "" },
      { link_name: "Affiliates", link_url: "" },
      { link_name: "Bulk Orders", link_url: "" },
      { link_name: "Careers", link_url: "" },
      { link_name: "Press", link_url: "" },
      { link_name: "Responsible Disclosure Program", link_url: "" },
      { link_name: "California Transparency Act", link_url: "" },
      { link_name: "Community Offers", link_url: "" },
      { link_name: "Our Blog", link_url: "" },
    ],
  },

  // section 4
  {
    links_data: [
      {
        link_name: "@2025 Luxora Avenue, inc.All Rights Reserved",
        link_url: "",
      },
      { link_name: "Refund policy", link_url: "" },
      { link_name: "Privacy policy", link_url: "" },
      { link_name: "Do Not Sell My Personal Information", link_url: "" },
      { link_name: "Terms of service", link_url: "" },
    ],
  },
];

import poster_1 from "./poster_1.png";
import poster_2 from "./poster_2.png";
import poster_3 from "./poster_3.png";
import poster_4 from "./poster_4.png";
import poster_5 from "./poster_5.png";
import poster_6 from "./poster_6.png";

const advertisement_poster = [
  poster_1,
  poster_2,
  poster_3,
  poster_4,
  poster_5,
  poster_6,
];

import offer_image1 from "../assets/men_offer_images/offer_image.webp";
import offer_image2 from "../assets/women_offer_images/offer_image.webp";
import offer_image3 from "../assets/kids_offer_images/offer_image.webp";
import offer_image4 from "../assets/home_offer_images/offer_image.webp";
import offer_image5 from "../assets/beauty_offer_images/offer_image.webp";
import offer_image6 from "../assets/genz_offer_images/offer_image.webp";

const menPagePoster = [offer_image1];
const womenPagePoster = [offer_image2];
const kidsPagePoster = [offer_image3];
const homePagePoster = [offer_image4];
const beautyPagePoster = [offer_image5];
const genzPagePoster = [offer_image6];

// offerPosterMap.js (ya same component ke upar)
const pageData = [
  {
    name: "men",
    img: [menPagePoster, menPagePoster],
  },
  {
    name: "women",
    img: [womenPagePoster],
  },
  {
    name: "kids",
    img: [kidsPagePoster],
  },
  {
    name: "home",
    img: [homePagePoster],
  },
  {
    name: "beauty",
    img: [beautyPagePoster],
  },
  {
    name: "genz",
    img: [genzPagePoster],
  },
];

export const navigationBarLink = [
  {
    name: "MEN",
    link: "/men",
  },
  {
    name: "WOMEN",
    link: "/women",
  },
  {
    name: "KIDS",
    link: "/kids",
  },
  {
    name: "HOME",
    link: "/home",
  },
  {
    name: "BEAUTY",
    link: "/beauty",
  },
  {
    name: "STUDIO",
    link: "/studio",
  },
];

const wishListPageOfferImages = [
  {
    image: "https://res.cloudinary.com/dosbhrvcz/image/upload/v1768197847/featured_1_1_v0t6mb.jpg",
    link: "https://res.cloudinary.com/dosbhrvcz/image/upload/v1768197847/featured_1_1_v0t6mb.jpg"
  },
  {
    image: "https://res.cloudinary.com/dosbhrvcz/image/upload/v1768197847/featured_2_1_ygb282.jpg",
    link: "https://res.cloudinary.com/dosbhrvcz/image/upload/v1768197847/featured_2_1_ygb282.jpg"
  }
]

const cartPageOfferImages = [
  {
    image: "https://res.cloudinary.com/dosbhrvcz/image/upload/v1768197847/featured_1_1_v0t6mb.jpg",
    link: "https://res.cloudinary.com/dosbhrvcz/image/upload/v1768197847/featured_1_1_v0t6mb.jpg"
  },
  {
    image: "https://res.cloudinary.com/dosbhrvcz/image/upload/v1768197847/featured_2_1_ygb282.jpg",
    link: "https://res.cloudinary.com/dosbhrvcz/image/upload/v1768197847/featured_2_1_ygb282.jpg"
  }
]

const assets = {
  hot_deal,
  best_seller,
  offer_image,
  new_arrival,
  women_offer,
  men_offer,
  kids_offer,
  offerPoster,
  category_items,
  companiesLogo,
  footerData,
  advertisement_poster,
  pageData,
  navigationBarLink,
  wishListPageOfferImages,
  cartPageOfferImages
};

export default assets;
