import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";

export const routes = [
  {
    exact: true,
    path: "/login",
    component: lazy(() =>
      import("src/views/pages/ConnectWallet/ConnectedWallet")
    ),
  },
  {
    exact: true,
    path: "/create-account",
    component: lazy(() =>
      import("src/views/pages/ConnectWallet/CreateAccount")
    ),
  },

  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/Main")),
  },
  {
    exact: true,
    path: "/user-list",
    layout: HomeLayout,
    component: lazy(() => import("src/component/UsersList")),
  },
 
  {
    exact: true,
    path: "/chat",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/Chat/index")),
  },

  {
    exact: true,
    path: "/profile",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/Profile/index")),
  },
  {
    exact: true,
    path: "/bundles",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/AllBundles")),
  },
  {
    exact: true,
    path: "/bundles-details",
    layout: HomeLayout,
    guard: true,
    component: lazy(() =>
      import("src/views/pages/Profile/Bundles/BundleDetails")
    ),
  },
  {
    exact: true,
    path: "/auctions",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/Actions")),
  },
  {
    exact: true,
    path: "/share-audience",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/Profile/ShareAudience")),
  },
  {
    exact: true,
    path: "/creators",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Users/Searchresult")),
  },
  {
    exact: true,
    path: "/NFT-detail",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/NFTDetail/index")),
  },
  {
    exact: true,
    path: "/company",

    component: lazy(() => import("src/views/pages/StaticPages/Company")),
  },
  {
    exact: true,
    path: "/career",

    component: lazy(() => import("src/views/pages/StaticPages/Career")),
  },
  {
    exact: true,
    path: "/affiliate-program",

    component: lazy(() => import("src/views/pages/StaticPages/Affiliate")),
  },
  {
    exact: true,
    path: "/partnership",

    component: lazy(() => import("src/views/pages/StaticPages/Partnership")),
  },
  {
    exact: true,
    path: "/refferal",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/UserSignUp/Refferal")),
  },
  {
    exact: true,
    path: "/basicinfo",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/UserSignUp/BasicInfo")),
  },
  {
    exact: true,
    path: "/socialaccounts",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/UserSignUp/SocialAccounts")),
  },
  {
    exact: true,
    path: "/profilesettings",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/Profile/ProfileSetting")),
  },

  {
    exact: true,
    path: "/home",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/Home/index")),
  },
  {
    exact: true,
    path: "/user-profile",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/Users/UserProfile")),
  },
  {
    exact: true,
    path: "/favorite",
    layout: HomeLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/Home/Favorite")),
  },
 
  {
    exact: true,
    path: "/reset-password",
    component: lazy(() =>
      import("src/views/pages/ConnectWallet/ResetPassword")
    ),
  },
  {
    exact: true,
    path: "/terms-conditions",
    component: lazy(() => import("src/views/pages/StaticPages/TermsCondition")),
  },
  {
    exact: true,
    path: "/privacy-policy",
    component: lazy(() => import("src/views/pages/StaticPages/PrivacyPolicy")),
  },
  {
    exact: true,
    path: "/metaverse",
    component: lazy(() => import("src/views/pages/Metavers")),
  },
  {
    exact: true,
    path: "/risk-statment",

    component: lazy(() => import("src/views/pages/StaticPages/RiskDisclosure")),
  },
  {
    exact: true,
    path: "/kyc-program",

    component: lazy(() => import("src/views/pages/StaticPages/KYCProgram")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
