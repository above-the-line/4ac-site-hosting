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

  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(
    null
  );

  // Callback function for reCAPTCHA
  const onRecaptchaSubmit = () => {
    if (recaptchaResponse) {
      setRecaptchaResponse(recaptchaResponse);
    } else {
      // Handle reCAPTCHA verification failure
      console.error("reCAPTCHA verification failed");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("handle submit fired");

    if (!recaptchaResponse) {
      // reCAPTCHA verification is required
      console.error("Please complete the reCAPTCHA challenge");
      return;
    }

    // Prepare the data to be sent to the server
    const data = {
      ...formData,
      recaptchaResponse,
    };

    // Make an API request to your server to handle form submission
    try {
      const response = await fetch(
        `https://addmessage-zn6a4a7xfq-uc.a.run.app?text=${formData.name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully");
        // Optionally, reset the form or perform any other actions
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-w-[300px] md:min-w-[500px] justify-center pb-5">
      <div className="text-black text-2xl py-4">Get in touch</div>
      <div className="p-12 bg-slate-100 bg-opacity-85 shadow-md rounded-md md:min-w-[450px]">
        <form className="w-100" id="form-submission" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              className="input input-ghost w-full"
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
              className="input input-ghost w-full"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="textarea textarea-ghost textarea-lg w-full min-h-[250px]"
              placeholder="Message"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button className="g-recaptcha btn btn-wide w-full  bg-green-700 border-green-700 text-green-100 btn-active text-xl font-bold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
