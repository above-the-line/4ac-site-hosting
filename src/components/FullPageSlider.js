import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";
// import SubmissionForm from "./SubmissionForm";

const Fullpage = () => (
  <ReactFullpage
    //fullpage options
    licenseKey={"YOUR_KEY_HERE"}
    scrollingSpeed={1000} /* Options here */
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section text-center backgroundImage image1">
            {/* <SubmissionForm /> */}
            <div className="headline flex flex-col justify-center text-4xl p-4 text-white font-bold">
              Let's stop advertising alcohol to children
            </div>
            <button onClick={() => fullpageApi.moveSectionDown()}></button>
          </div>
          <div className="section text-center backgroundImage image2">
            <div className="headline flex flex-col justify-center items-center text-4xl p-4 text-white font-bold">
              <div className="max-w-[700px]">
                Millions of kids watch sports on TV, <br /> the government
                doesn't protect them.
              </div>
            </div>
          </div>
          <div className="section text-center bg-cover bg-no-repeat image3">
            <div className="headline flex flex-col justify-center items-center p-4 text-white">
              <div className="max-w-[700px] bg-black bg-opacity-25 p-9 rounded-xl">
                <div className="text-2xl font-bold uppercase text-left">
                  For years parents have asked for alcohol ads to be banned
                  during sport.
                </div>
                <br />
                <br />
                <div className="text text-3xl text-left pl-6 ">
                  This year William Spaul took the{" "}
                  <a
                    className="text-sky-200"
                    href="https://www.acma.gov.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ACMA
                  </a>{" "}
                  to court and demanded they stop discriminating against
                  children.
                </div>
                <br />
                <br />
                <div className="text text-3xl text-left pl-6 ">
                  William's a working dad who can't afford to keep covering the
                  costs as the case goes before the Federal Court.
                </div>
                <br />
                <br />
                <div className="text text-3xl text-left pl-6 ">
                  If you would like to help with the cost of litigation please
                  donate to William's campaign on{" "}
                  <a
                    className="text-sky-200 font-bold"
                    href="https://chuffed.org/project/pz85-stop-alcohol-ads-being-shown-to-children"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    chuffed.org
                  </a>
                  .{" "}
                </div>
                <br />
                <br />
                <div className="text text-3xl text-left pl-6 ">
                  If you would like to help in a non monetary way, or you have
                  any comments, please{" "}
                  <a
                    className="text-sky-200 font-bold"
                    href="https://chuffed.org/project/pz85-stop-alcohol-ads-being-shown-to-children"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    get in touch
                  </a>
                  .{" "}
                </div>
              </div>
            </div>
            {/* <SubmissionForm /> */}
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default Fullpage;
