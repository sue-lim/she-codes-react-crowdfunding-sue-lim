import React, { useState } from "react";

// STYLES 
import "./ContactForm.css";

const ContactForm = () => {

  // useState hook to declare a state variabe 'status'wth inital variable set to "Submit" 
  const [status, setStatus] = useState("Submit");

  // event handler for the form submission. 
  // it gets called when the user submits the form 
  const handleSubmit = async (e) => {

    // this prevents the default behavior of the form submission
    // which would cause the page to refresh. 
    e.preventDefault();
    setStatus("Sending...");

    // target value are the elements required then extracted to be posted 
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    // post data to the api / DRF in jsn format 
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });

    // once form is submitted the set status will be rest to it's orginal state 
    setStatus("Submit");

    // built-in method Response object in JS that reads response body tries to parse it as JSON data. It returns a promise that resolves with the parsed JSON data from the response.
    // await = waits for the promise before continuing 
    let result = await response.json();
    // alert on success or error of data submitted 
    alert(result.status);
  };

      // the below is related to handleSubmit and how it handles form submission when button is clicked 
  return (
      <div className="grid grid-cols-3 gap-5 mt-8">
        <div></div>
          <div>
            <div className="w-full max-w-xs">
              <form 
              onSubmit={handleSubmit}
              className="form-container">
              <h3> Contact Us </h3>
                <div className="mb-4">
                  <label
                  className="form-labels" 
                  htmlFor="name">Name</label>
                  <input 
                  className="input-field"
                  type="text" 
                  placeholder="Enter your name" 
                  id="name" required />
                </div>
              

              <div className="mb-6">
                <label
                className="form-labels" 
                htmlFor="email">Email</label>
                <input 
                className="input-field"
                type="email" 
                placeholder="Enter your your email"
                id="email" 
                required />
              </div>

            <div className="mb-6">
                <label 
                className="form-labels"
                htmlFor="message">
                Message</label>
                <textarea 
                className="input-field" 
                id="message" 
                placeholder="Send us a message"
                required />
            </div>

            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="submit">{status}</button>
            </form> 
          </div>
        </div>
        <div></div>
      


      </div>
  );
};


// Export provides permission for it to be reused elsewhere in the project
export default ContactForm;