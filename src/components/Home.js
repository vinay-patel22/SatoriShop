import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Body />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
