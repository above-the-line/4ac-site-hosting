import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SubmissionFormProps {
  onClose: () => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col items-center min-w-[300px] md:min-w-[500px]">
      <div className="p-12 bg-slate-100 bg-opacity-85 shadow-md rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              className="input input-ghost w-full max-w-xs"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              className="input input-ghost w-full max-w-xs"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="textarea textarea-ghost textarea-lg w-full max-w-xs min-h-[250px]"
              placeholder="Message"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button className="btn btn-wide btn-active btn-ghost text-xl font-bold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
