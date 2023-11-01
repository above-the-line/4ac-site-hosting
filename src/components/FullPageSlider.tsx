import React, { useState, useEffect, useRef, useCallback } from "react";
import Modal from "./Modal";
import SubmissionForm from "./SubmissionForm";
import YouTube from "react-youtube";

interface FullPageSliderProps {}

const FullPageSlider: React.FC<FullPageSliderProps> = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [videoId, setVideoId] = useState("cV_fcvSOZN0");

  const opts = {
    height: "735",
    width: "415",
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      enablejsapi: 1,
      loop: 1,
    },
  };

  const onReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const isChrome = /Chrome/.test(navigator.userAgent);

  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Scroll to the next or previous section smoothly based on scroll direction
  const scrollToSection = (direction: "up" | "down") => {
    const currentIndex = sectionRefs.current.findIndex(
      (section) => section!.getBoundingClientRect().top >= 0
    );

    let nextIndex = currentIndex;

    if (direction === "up" && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    } else if (
      direction === "down" &&
      currentIndex < sectionRefs.current.length - 1
    ) {
      nextIndex = currentIndex + 1;
    }

    const nextSection = sectionRefs.current[nextIndex];
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Add wheel event listener for scrolling
  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (isChrome) {
        e.preventDefault();
        const direction = e.deltaY > 0 ? "down" : "up";
        scrollToSection(direction);
      }
    },
    [isChrome]
  );

  // Initialize sectionRefs on component mount
  useEffect(() => {
    sectionRefs.current = Array.from(
      document.querySelectorAll(".section")
    ) as HTMLDivElement[];
  }, []);

  // Add wheel event listener on component mount
  useEffect(() => {
    if (isChrome) {
      window.addEventListener("wheel", handleScroll, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleScroll);
      };
    }
  }, [handleScroll, isChrome]);

  return (
    <div>
      <div className="section" ref={(el) => (sectionRefs.current[0] = el)}>
        <div className="flex flex-col justify-end items-center text-center backgroundImage image1 pb-48">
          <div className="headline text-3xl md:text-4xl p-4 text-white font-bold">
            Let's stop alcohol ads being shown to children
          </div>
          <div className="pt-8">
            <a
              className="text-green-100 bg-green-700 shadow-emerald-900 shadow-lg text-3xl w-[300px] p-4 rounded-lg font-bold inline relative hover:shadow-emerald-700 focus-within:shadow-emerald-700"
              href="https://chuffed.org/project/pz85-stop-alcohol-ads-being-shown-to-children"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support the campaign
            </a>
          </div>
        </div>
      </div>
      <div className="section" ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="flex flex-col justify-end text-center backgroundImage image2 pb-48 md:72">
          <div className="headline text-3xl md:text-4xl p-4 text-white font-bold">
            Millions of kids watch TV sports. <br /> The Australian Government
            doesn't protect them from alcohol ads.
          </div>
        </div>
      </div>
      <div className="section" ref={(el) => (sectionRefs.current[2] = el)}>
        {/* <div className="text-center bg-cover bg-no-repeat image3"> */}
        <div className=" flex flex-col justify-center items-center backgroundImage image3">
          <div className="items-center p-4 text-white">
            <div className="max-w-[700px] bg-black bg-opacity-25 p-9 rounded-xl shadow-lg">
              <div className="text-md md:text-2xl font-bold uppercase text-left pb-4 md:pb-8">
                For decades parents have asked for alcohol ads to be banned
                during sports programs.
              </div>
              <div className="text-md md:text-3xl text-left pl-6 pb-2 md:pb-4">
                The{" "}
                <a
                  className="text-sky-200 font-bold"
                  href="https://www.acma.gov.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Australian Communications and Media Authority
                </a>{" "}
                has failed to act, so William Spaul has taken it to the Federal
                Court and demanded that it stop discriminating against children.
              </div>
              <div className="text-md md:text-3xl text-left pl-6 pb-2 md:pb-4">
                William's a working dad who needs help with legal costs for the
                Federal Court action.
              </div>
              <div className="text-md md:text-3xl text-left pl-6 pb-2 md:pb-4">
                If you would like to help, please donate to William's campaign
                at{" "}
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
              <div className="text-md md:text-3xl text-left pl-6 ">
                If you would like to help in a non monetary way, or if you have
                any comments, please{" "}
                <button
                  className="text-sky-200 font-bold inline relative"
                  onClick={openModal}
                >
                  get in touch
                </button>
                .{" "}
              </div>

              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <SubmissionForm onClose={closeModal} />
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div className="section" ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="flex flex-col justify-end text-center backgroundImage image4 pb-10 md:pb-24 3xl:pb-48">
          <div className="headline text-2xl md:text-4xl p-4 text-white font-bold flex flex-col items-center">
            <div className="max-w-[640px]">
              William believes that his son and all children deserve better than
              to be shown alcohol ads.
              <br />
              <br />
              Watch the{" "}
              <a
                className="text-sky-200 font-bold"
                href="https://chuffed.org/project/pz85-stop-alcohol-ads-being-shown-to-children"
                target="_blank"
                rel="noopener noreferrer"
              >
                ABC News Story
              </a>{" "}
              for more information.
            </div>
          </div>
        </div>
      </div>
      <div className="section" ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="flex flex-col justify-center text-center backgroundImage image5">
          <div className="headline text-2xl md:text-4xl p-4 text-white font-bold flex flex-col items-center">
            <div className="max-w-[640px]">
              <YouTube videoId={videoId} opts={opts} onReady={onReady} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageSlider;
