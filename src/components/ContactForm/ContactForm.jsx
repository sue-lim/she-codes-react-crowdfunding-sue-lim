import React, { useState } from "react";

// STYLES 
import "./ContactForm.css";

const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" 
            placeholder="Enter your name" 
            id="name" required />
          </div>
        

        <div className="mb-6">
          <label
          className="form-labels" 
          htmlFor="email">Email</label>
          <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email" 
          id="email" 
          required />
        </div>

      <div className="mb-6">
          <label 
          className="form-labels"
          htmlFor="message">
          Message</label>
          <textarea 
          className="shadow appearance-none border rounded h-30 min-h-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
          id="message" 
          required />
      </div>

      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">{status}</button>
      </form> 
    </div>
  </div>
  <div></div>
 


</div>
  );
};

export default ContactForm;