import React, { useState, useEffect, useRef, useCallback } from "react";
import Modal from "./Modal";
import SubmissionForm from "./SubmissionForm";

interface FullPageSliderProps {}

const FullPageSlider: React.FC<FullPageSliderProps> = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
  const handleScroll = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? "down" : "up";
    scrollToSection(direction);
  }, []);

  // Initialize sectionRefs on component mount
  useEffect(() => {
    sectionRefs.current = Array.from(
      document.querySelectorAll(".section")
    ) as HTMLDivElement[];
  }, []);

  // Add wheel event listener on component mount
  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <div className="section" ref={(el) => (sectionRefs.current[0] = el)}>
        <div className="flex flex-col justify-center text-center backgroundImage image1">
          <div className="headline text-3xl md:text-4xl p-4 text-white font-bold">
            Let's stop advertising alcohol to children
          </div>
        </div>
      </div>
      <div className="section" ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="flex flex-col justify-center text-center backgroundImage image2">
          <div className="headline text-3xl md:text-4xl p-4 text-white font-bold">
            <div className="max-w-[700px]">
              Millions of kids watch TV sports, <br /> the government doesn't
              protect them.
            </div>
          </div>
        </div>
      </div>
      <div className="section" ref={(el) => (sectionRefs.current[2] = el)}>
        {/* <div className="text-center bg-cover bg-no-repeat image3"> */}
        <div className=" flex flex-col justify-center items-center backgroundImage image3">
          <div className="items-center p-4 text-white">
            <div className="max-w-[700px] bg-black bg-opacity-25 p-9 rounded-xl">
              <div className="text-md md:text-2xl font-bold uppercase text-left pb-4 md:pb-8">
                For years parents have asked for alcohol ads to be banned during
                sport.
              </div>
              <div className="text-md md:text-3xl text-left pl-6 pb-2 md:pb-4">
                This year William Spaul took the{" "}
                <a
                  className="text-sky-200 font-bold"
                  href="https://www.acma.gov.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ACMA
                </a>{" "}
                to court and demanded they stop discriminating against children.
              </div>
              <div className="text-md md:text-3xl text-left pl-6 pb-2 md:pb-4">
                William's a working dad who can't afford to keep covering the
                costs as the case goes before the Federal Court.
              </div>
              <div className="text-md md:text-3xl text-left pl-6 pb-2 md:pb-4">
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
    </div>
  );
};

export default FullPageSlider;
