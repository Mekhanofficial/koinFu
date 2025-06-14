import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SideImg from "./components/ContactImg.jsx";
import ContactUs from "./components/ContactIndex.jsx";
import TradingViewChart from "./components/Tradingview.jsx";
import CryptocurrencyMarketWidget from "./components/trading-view-widgets/CryptocurrencyMarketWidget.jsx";
import LoginPage from "./app/(auth)/login/LoginPage.jsx";
import SignUpPage from "./components/auth/sign-up/Form.jsx";
import TransactionPage from "./pages/Transactions.jsx";
import PaymentProofPage from "./pages/PaymentProof.jsx";
import WithdrawalPage from "./pages/Withdrawal.jsx";
import MiningPage from "./pages/Mining.jsx";
import DepositPage from "./pages/Deposits.jsx";
import MyTraderPage from "./components/MyTraders.jsx";
import BuyCrypto from "./pages/BuyCrypto.jsx";
import TradesRoiPage from "./pages/TradesRoi.jsx";
import BuyBotPage from "./pages/BuyBots.jsx";
import StakePage from "./pages/Stake.jsx";
import SubscriptionPage from "./pages/Subscription.jsx";
import VerifyAccountPage from "./pages/VerifyAccount.jsx";
import AccountPage from "./pages/Account.jsx";
import AccountSetPage from "./pages/AccountSettings.jsx";
import EmailUpdatePage from "./pages/EmailUpdate.jsx";
import UpdatePhotoPage from "./pages/UpdatePhotoPage.jsx";
import ReferralsPage from "./pages/Referrals.jsx";
import DailySignalPage from "./pages/DailySignal.jsx";
import RealestPage from "./pages/RealEstate.jsx";
import Modal from "./pages/Modal.jsx";
import ProjectDetail from "./components/RealEstatedetails.jsx";
import PlaceTradePage from "./pages/PlaceTrade.jsx";
import AssetPage from "./pages/Assets.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import Layout from "./components/Layout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./app/admin/AdminDashboard.jsx";
import AdminSignup from "./app/admin/AdminSignup.jsx";
import AdminLogin from "./app/admin/AdminLogin.jsx";
import ProtectedAdminRoute from "../src/app/admin/ProtectedAdminRoute.jsx";
import ForgotPassword from "./app/(auth)/login/ForgotPassword";
import AboutPage from "./pages/about/Hero";
import ServicePage from "./pages/services/Hero";
import ContactPage from "./pages/contact/Hero";
import HomePage from "./pages/home/Home";
import PasswordUpdate from "./pages/PasswordUpdate.jsx";
import { MyCopyTradersPage } from "./pages/MyCopytraders";
import DashPage from "./pages/dashboard/Hero";

const root = ReactDOM.createRoot(document.getElementById("root"));

const proRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/services",
    element: <ServicePage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/LoginPage",
    element: <LoginPage />,
  },
  {
    path: "/SignUpPage",
    element: <SignUpPage />,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
  },
  // Protected routes
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/Dashboard",
        element: (
          <Layout>
            <DashPage />
          </Layout>
        ),
      },
      {
        path: "/Assets",
        element: (
          <Layout>
            <AssetPage />
          </Layout>
        ),
      },
      {
        path: "/PlaceTrade",
        element: (
          <Layout>
            <PlaceTradePage />
          </Layout>
        ),
      },
      {
        path: "/Mining",
        element: (
          <Layout>
            <MiningPage />
          </Layout>
        ),
      },
      {
        path: "/Deposits",
        element: (
          <Layout>
            <DepositPage />
          </Layout>
        ),
      },
      {
        path: "/MyTraders",
        element: (
          <Layout>
            <MyTraderPage />
          </Layout>
        ),
      },
      {
        path: "/BuyCrypto",
        element: (
          <Layout>
            <BuyCrypto />
          </Layout>
        ),
      },
      {
        path: "/Account",
        element: (
          <Layout>
            <AccountPage />
          </Layout>
        ),
      },
      {
        path: "/PasswordUpdate",
        element: (
          <Layout>
            <PasswordUpdate />
          </Layout>
        ),
      },
      {
        path: "/Referrals",
        element: (
          <Layout>
            <ReferralsPage />
          </Layout>
        ),
      },
      {
        path: "/EmailUpdate",
        element: (
          <Layout>
            <EmailUpdatePage />
          </Layout>
        ),
      },
      {
        path: "/UpdatePhotoPage",
        element: <UpdatePhotoPage />,
      },
      {
        path: "/Transactions",
        element: (
          <Layout>
            <TransactionPage />
          </Layout>
        ),
      },
      {
        path: "/PaymentProof",
        element: (
          <Layout>
            <PaymentProofPage />
          </Layout>
        ),
      },
      {
        path: "/Withdrawal",
        element: (
          <Layout>
            <WithdrawalPage />
          </Layout>
        ),
      },
      {
        path: "/TradesRoi",
        element: (
          <Layout>
            <TradesRoiPage />
          </Layout>
        ),
      },
      {
        path: "/MyCopytraders",
        element: (
          <Layout>
            <MyCopyTradersPage />
          </Layout>
        ),
      },
      {
        path: "/BuyBots",
        element: (
          <Layout>
            <BuyBotPage />
          </Layout>
        ),
      },
      {
        path: "/Stake",
        element: (
          <Layout>
            <StakePage />
          </Layout>
        ),
      },
      {
        path: "/Subscription",
        element: (
          <Layout>
            <SubscriptionPage />
          </Layout>
        ),
      },
      {
        path: "/DailySignal",
        element: (
          <Layout>
            <DailySignalPage />
          </Layout>
        ),
      },
      {
        path: "/RealEstate",
        element: (
          <Layout>
            <RealestPage />
          </Layout>
        ),
      },
      {
        path: "/VerifyAccount",
        element: (
          <Layout>
            <VerifyAccountPage />
          </Layout>
        ),
      },
    ],
  },
  // Public routes (remain unchanged)
  {
    path: "/ContactIndex",
    element: <ContactUs />,
  },
  {
    path: "/RealEstateDetails",
    element: <ProjectDetail />,
  },
  {
    path: "/Modal",
    element: <Modal />,
  },

  {
    path: "/trading-view",
    element: <TradingViewChart />,
  },
  {
    path: "/CryptocurrencyMarketWidget",
    element: <CryptocurrencyMarketWidget />,
  },
  {
    path: "/ContactImg",
    element: <SideImg />,
  },
  //Admin URLS/route
  {
    path: "/AdminDashboard",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/AdminSignup",
    element: <AdminSignup />,
  },
  {
    path: "/AdminLogin",
    element: <AdminLogin />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={proRouter} />
    <ToastContainer /> {/* This enables react-toastify globally */}
  </React.StrictMode>
);
