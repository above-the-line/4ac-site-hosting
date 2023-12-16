import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

const RECAPTCHA_KEY_ID = "6LfYRvYoAAAAABmg77n1QQtyIr3t77KXqr4gxOYM";
// const ENDPOINT = "http://localhost:8080/";
const ENDPOINT = "https://assess-zn6a4a7xfq-ts.a.run.app/";
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SubmissionFormProps {
  onClose: () => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onClose }) => {
  //@ts-ignore
  let grecaptcha = window.grecaptcha;

  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (recaptchaResponse == null) {
      console.log("attempting to get token automatically");
      grecaptcha.enterprise.ready(async () => {
        let token = await grecaptcha.enterprise.execute(RECAPTCHA_KEY_ID, {
          action: "LOGIN",
        });
        if (
          recaptchaResponse == null &&
          token !== undefined &&
          token !== null
        ) {
          setRecaptchaResponse(token);
          return null;
        } else return null;
      });
    }
  }, [grecaptcha, recaptchaResponse]);

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

  // Form submit and RECAPTCHA check
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("handle submit fired");

    if (recaptchaResponse !== null) {
      console.log("using existing token");
      // Prepare the data to be sent to the server
      const data = {
        ...formData,
        token: recaptchaResponse,
      };

      let assessment = await getRecpatchaAssessment(data);

      console.log(data);
    } else {
      console.log("attempting to get new token");
      // Handle reCAPTCHA verification failure
      // console.log("reCAPTCHA verification failed, attempting login");
      let token = await grecaptcha.enterprise.ready(() => {
        return grecaptcha.enterprise.execute(RECAPTCHA_KEY_ID, {
          action: "LOGIN",
        });
      });

      let data = { ...formData, token };

      getRecpatchaAssessment(data);
    }
  };

  function getRecpatchaAssessment(data: any) {
    // Make an API request to your server to handle form submission
    return new Promise(async () => {
      try {
        const recaptcha_action = "LOGIN";
        const project_id = RECAPTCHA_KEY_ID;
        const token = data.token;

        const baseUrl = ENDPOINT;

        const response = await fetch(
          `${baseUrl}?token=${token}&action=${recaptcha_action}&project_id=${project_id}&name=${data.name}`,
          // `${baseUrl}?action=${recaptcha_action}&project_id=${project_id}&name=${data.name}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let assessment = null;

        if (response.ok) {
          console.log("Form submitted successfully");
          assessment = await response.json();
          console.log(assessment);
          return assessment;
          // console.log(response);
          // Optionally, reset the form or perform any other actions
        }
      } catch (error) {
        console.log("An error occurred while submitting the form:", error);
      }
    });
  }

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
