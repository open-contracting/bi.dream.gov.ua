import { useEffect, useContext, useState } from "react";
import QlikCard from "components/QlikCard";
import QlikObject from "components/QlikObject";
import GlobalContext from "GlobalContext";


export default function ProjectDetails({ title , appDisclaimer , pageTitle, menuItemsStrings}) {
  useEffect(() => {
    document.title = `${pageTitle} - ${title}`;
  }, [pageTitle,title]);

  const { app } = useContext(GlobalContext);
  const [err, setError] = useState(null);

  return (
    <section className="content">
      <div className="content-header">
        <div className="row mb-2">
          <div className="col-md-10 col-sm-9 col-10">
            <h5 className="page-title"> {title} </h5>
            <h6 className="page-disclaimer"> {appDisclaimer} </h6>
            {/* <QlikObject
              className="page-title"
              id="ANJWBAj"
              height="35px"
              showLoader={false}
            /> */}
          </div>
          {/* <div className="col-md-2 col-sm-3 col-4">
            <QlikObject id="GqNcZ" height="35px" showLoader={false} />
          </div> */}
          {/* <div className="col-md-2 col-sm-3 col-2">
            <QlikObject
              id="YSuJJJY"
              height="30px"
              showLoader={false}
            />
          </div> */}
        </div>
      </div>
          
      {/* <div className="row justify-content-start">
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <QlikObject
              id="a49c567e-5174-4fbc-8463-a0e7a6a4ce20"
              height="30px"
              showLoader={false}
            />
          </div>
          <div className="col-xs-13 col-sm-6 col-md-4 col-lg-4">
            <QlikObject
              id="NYxkAp"
              height="40px"
              showLoader={false}
            />
          </div>
      </div> */}

      <div className="container-fluid">

        <div className="row justify-content-start">

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">

                {/* Table Row */}

                  {/* Table column */}
                      {/* Table */}
                      <QlikCard
                        id="rAajTDh"
                        // height="483px"
                        height="max(calc(100vh - 307px), 300px)"
                        showHeader={true}
                        showMaximize={false}
                        showExport={true}
                        onBeforeExportHandler={async ({  }) => {
                          //console.log(data);
                            await app.variable.setStringValue('export_link', '1');
                        }}
                        onAfterExportHandler={async ({  }) => {
                            app.variable.setStringValue('export_link', '0');
                        }}
                        exportText = {menuItemsStrings.exportText}
                        exportCompletedText = {menuItemsStrings.exportCompletedText}
                        closeBtnText = {menuItemsStrings.closeBtnText}
                      />
            </div>


            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
                  {/* FilterPane */}
                  <QlikCard
                    id="FKymsum"
                    // height="485px"
                    height="max(calc(100vh - 287px), 300px)"
                    showHeader={false}
                    showMaximize={false}
                    showExport={false}
                    showOverlayer={false}
                  />

            </div>

          </div>

          {/* <div className="row mb-2">
            <div className="col-md-2 col-sm-3 col-2">
              <QlikObject
                id="JMqrBrm"
                height="0px"
                showLoader={false}
              />
            </div>
          </div> */}
          
        </div>
    </section>
  );
}
