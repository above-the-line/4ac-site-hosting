import React from "react";
import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";

const Fullpage = () => (
  <ReactFullpage
    //fullpage options
    licenseKey={"YOUR_KEY_HERE"}
    scrollingSpeed={1000} /* Options here */
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section text-center backgroundImage image1">
            <div className="flex flex-col justify-center text-4xl p-4 text-white font-bold text-shadow-md">
              Let's Stop Advertising Alcohol to Children
            </div>
            <button onClick={() => fullpageApi.moveSectionDown()}></button>
          </div>
          <div className="section text-center backgroundImage image2">
            <div className="flex flex-col justify-center text-4xl p-4 text-white font-bold text-shadow-md">
              Now you can do it
            </div>
          </div>
          <div className="section">
            <p>Section 2</p>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default Fullpage;
