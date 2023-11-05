let reCaptchaId = '6Lfgg_YoAAAAANQd-GgU5ZQ32ySDU7loCiWEtTYf'

window.grecaptcha.enterprise.ready(async () => {
  const token = await window.grecaptcha.enterprise.execute(
    "6Lfgg_YoAAAAANQd-GgU5ZQ32ySDU7loCiWEtTYf",
    {
      action: "home",
    }
  );
  await viewHomepage({ token });
});



const recaptchaResponse = window.grecaptcha.getResponse();

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
  console.log(score);
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
