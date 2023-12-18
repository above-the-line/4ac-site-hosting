# Australians Against Advertising Alcohol to Children


npm i -D daisyui@latest


npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch


must change the homepage param to the registered domain name




# ReCaptcha Enterprise
<!-- ATTENTION: reCAPTCHA Example (Client Part 1 of 2) Starts -->
    <!-- See: https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages#page-load -->
    <script src="https://www.google.com/recaptcha/enterprise.js?render=6LfNRvYoAAAAAFnPWd0d5i_nMB4d4qOjW9MFsrIq"></script>
    <script type="text/javascript">
      grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute(
          "6LfNRvYoAAAAAFnPWd0d5i_nMB4d4qOjW9MFsrIq",
          {
            action: "home",
          }
        );
        await viewHomepage({ token });
      });


 async function viewHomepage({ token }) {
        // Include the token for server-side assessment.
        const body = {
          token,
        };
        // Code for fetching the assessment from server-side goes here.
        // Refer to demo app backend code for more information.
        // If you already use a library or framework for event handlers, you 
        // can handle events your usual way.
        const score = await fetchServerResponse({
          body,
          url: "on_homepage_load",
        });
        // In this demo, the assessment score is displayed in the client.
        // But, you should AVOID using the assessment response in the
        // client and handle it on the server-side.
        useAssessmentInClient(score);
 }


// This code is internal to the demo.
// It fetches responses from the demo endpoints.
function fetchServerResponse({ body, url }) {
  const serializedBody = JSON.stringify({
    ...body,
  });
  return fetch(url, {
    body: serializedBody,
    headers: new Headers({ "content-type": "application/json" }),
    method: "POST",
  })
    .then((response) => {
      const { ok, body: { data = {} } = {} } = response;
      if (ok) {
        return response.json();
      }
      throw new Error("Response was successful, but status was not 'ok'");
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

// This code is internal to the demo.
// It passes the score to the demo to display it.
function useAssessmentInClient(score) {
  if (score?.data?.score && score?.data?.label) {
    const demoElement = document.querySelector("recaptcha-demo");
    demoElement.setAttribute("score", score?.data?.score);
    demoElement.setAttribute("label", score?.data?.label);
    demoElement.setAttribute("reason", score?.data?.reason);
  }
}





## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
