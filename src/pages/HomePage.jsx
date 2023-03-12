// ORIGINAL


import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Components


function HomePage() {
return (
  
  <div className="homepage-container">
    <div className="homepage-col-1">

    </div>
    <div className="homepage-col-2">
      {/* <img className="homepage-slogan-l1" src="src\assets\Images\ScrubHubLogoLine1.JPG" alt="The ScrubHub Logan"/>
      <img className="homepage-slogan-l2" src="src\assets\Images\ScrubHubLogoLine2.JPG" alt="The ScrubHub Logan"/>
       */}
      <img  className="" src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20202/5e7cd08e2cfac26ef7093890_Person+sleeping+on+sidewalk/Person+sleeping+on+sidewalk_9da14baf-c6c4-4ad5-baa2-55aa0fcf9da8-prv.jpg" alt="Homeless Man"/>
      <div className="homepage-logo">
      <img className="img-logo" src="src\assets\Images\ScrubHubLogoLg.JPG" alt="The ScrubHub Logan"/></div>
    {/* <div><p>Bringing dignity one shower at a time...</p></div> */}
    </div>
    <div className="homepage-col-3">       
    </div>
  </div>
  );
}



export default HomePage;

{/* // Layering images https://www.wisdomjobs.com/e-university/css-advanced-tutorial-1199/css-layers-15449.html */}