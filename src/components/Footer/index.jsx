const Footer = () => (
  <footer className="main-footer p-1">
    {/* <div className="float-left ">
      <a>
        <span className="ml5" >
          UK International Development is financing DREAM development, but is not responsible for its contents or for any errors
        </span>
      </a>
    </div>
    <div className="float-right ">
          <a
            // href="https://mtu.gov.ua/"
            // target="_blank"
            // rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}dream_Ministry_for_restoration_2.png`}
              alt="Ministry for Restoration"
              height="24"
            />
          </a>
          <a
            // href="https://restoration.gov.ua//"
            // target="_blank"
            // rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}dream_Restoration_agency_2.png`}
              alt="Restoration Agency"
              height="24"
            />
          </a>
          <a
            // href="https://restoration.gov.ua//"
            // target="_blank"
            // rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}dream_logo.png`}
              alt="DREAM"
              height="24"
            />
          </a>
          <a
            // href="https://www.open-contracting.org/"
            // target="_blank"
            // rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}dream_OCP.png`}
              alt="Open Contracting Partnership"
              height="24"
            />
          </a>
          <a
            // href="https://www.gov.uk/government/organisations/department-for-international-development"
            // target="_blank"
            // rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}dream_UK_international_development_3.png`}
              alt="UK International Development"
              height="24"
            />
          </a>
          <a
            // href="https://www.rbcgrp.com/"
            // target="_blank"
            // rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}RBCGroup_logo_resize.png`}
              alt="RBC Group"
              height="24"
            />
          </a>
          <a 
            // href="https://www.qlik.com/" 
            // target="_blank" 
            // rel="noopener noreferrer"
            >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}logo---powered-by-Qlik.png`}
              alt="Qlik"
              height="24"
            />
          </a>
    </div> */}

    <div className="row ml5">
      <div className="col-xs-12 col-sm-12 col-lg-12 col-xl-5">
        <div className="row justify-content-left">
          {/* <span className="ml5" > */}
            UK International Development is financing DREAM development, but is not responsible for its contents or for any errors
          {/* </span> */}
        </div>
      </div>

      <div className="col-xs-12 col-sm-12 col-lg-12 col-xl-7">
        <div className="row justify-content-right float-right md-justify-content-left-manual">
        <div className="float-right md-justify-content-left-manual">
          <a
            href="https://mtu.gov.ua/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}dream_Ministry_for_restoration_2.png`}
              alt="Ministry for Restoration"
              height="24"
            />
          </a>
          <a
            href="https://restoration.gov.ua/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}dream_Restoration_agency_2.png`}
              alt="Restoration Agency"
              height="24"
            />
          </a>
          <a
            href="https://restoration.gov.ua/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}dream_logo.png`}
              alt="DREAM"
              height="24"
            />
          </a>
          <a
            href="https://www.open-contracting.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}dream_OCP.png`}
              alt="Open Contracting Partnership"
              height="24"
            />
          </a>
          <a
            href="https://www.gov.uk/government/organisations/department-for-international-development"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}dream_UK_international_development_3.png`}
              alt="UK International Development"
              height="24"
            />
          </a>
          <a
            href="https://www.rbcgrp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}RBCGroup_logo_resize.png`}
              alt="RBC Group"
              height="24"
            />
          </a>
          <a 
            href="https://www.qlik.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            >
            <img
              className="pr-4"
              src={`${process.env.PUBLIC_URL}logo---powered-by-Qlik.png`}
              alt="Qlik"
              height="24"
            />
          </a>
        </div>
      </div>
      </div>

    </div>

  </footer>
);

export default Footer;
