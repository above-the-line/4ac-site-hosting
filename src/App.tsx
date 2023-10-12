import React, { useState } from "react";
import Modal from "./components/Modal";
import "./App.css";
import Fullpage from "./components/FullPageSlider";
import SubmissionForm from "./components/SubmissionForm";

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <Fullpage />
      <div className="container mx-auto mt-8">
        <button className="btn btn-primary" onClick={openModal}>
          Open Modal
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <SubmissionForm onClose={closeModal} />
        </Modal>
      </div>
    </div>
  );
};

export default App;
