import { useEffect, useContext, useState } from "react";
import QlikCard from "components/QlikCard";
import QlikObject from "components/QlikObject";
import GlobalContext from "GlobalContext";


export default function Budget({ title , appDisclaimer , pageTitle, ExportChartFootnote}) {
  useEffect(() => {
    document.title = `${pageTitle} - ${title}`;
  }, [pageTitle,title]);
  console.log(process.env.REACT_APP_PUBLIC_URL);

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
              id="MDkpaL"
              height="30px"
              showLoader={false}
              showOverlayer={false}
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

              <div className="row justify-content-left">
                {/* KPIs Row */}

                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
                      {/* KPI: number of projects */}
                      <QlikCard
                        id="3c1cfc37-f824-4c07-8ad8-e3445a475f55"
                        height="90px"
                        showHeader={false}
                        showMaximize={false}
                        showExport={false}
                        showOverlayer={false}
                      />
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
                      {/* KPI: Overall estimated budget */}
                      <QlikCard
                        id="b03b8569-109a-4252-9f05-df1fc8631088"
                        height="90px"
                        showHeader={false}
                        showMaximize={false}
                        showExport={false}
                        showOverlayer={false}
                      />
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
                      {/* KPI: Confirmed funding */}
                      <QlikCard
                        id="dd350d4e-71e1-4eef-917b-382a0554d8ed"
                        height="90px"
                        showHeader={false}
                        showMaximize={false}
                        showExport={false}
                        showOverlayer={false}
                      />
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
                      {/* KPI: Financial coverage */}
                      <QlikCard
                        id="0bfc785b-38ef-4446-83af-18571561df6c" //tjJjzu
                        height="90px"
                        showHeader={false}
                        showMaximize={false}
                        showExport={false}
                        showOverlayer={false}
                      />
                    </div>

              </div>

              <div className="row justify-content-center">

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                    {/* Bar Charts Column */}

                      <div className="row justify-content-center">
                        <div className="col-12">
                          {/* barchart top*/}
                          <QlikCard
                            id="RARAH"
                            // height="352px"
                            height="max(calc((100vh - 420px)/2), 100px)"
                            showHeader={true}
                            showMaximize={false}
                            showExport={false}
                            showPdfExport
                            showImageExport={true}
                            exportImageWidth={1280}
                            exportImageHeight={720}
                            onBeforeExportHandler={async ({ vis, exportType }) => {
                              //console.log(data);
                              console.log(vis);
                              if(exportType in { pdf: true, image: true} && vis)
                                await vis.setOptions({ showTitles: true, footnote: `${ExportChartFootnote}` });
                            }}
                            onAfterExportHandler={async ({ vis, exportType }) => {
                              console.log('Export type: ', exportType);
                              if(exportType in { pdf: true, image: true})
                                vis.setOptions({ showTitles: false, footnote:"" });
                            }}
                          />
                        </div>
                      </div>

                      <div className="row justify-content-center">
                        <div className="col-12">
                          {/* barchart bottom*/}
                          <QlikCard
                            id="898043d2-f5d7-46aa-a0d0-eed458f67b0a"
                            // height="352px"
                            height="max(calc((100vh - 420px)/2), 100px)"
                            showHeader={true}
                            showMaximize={false}
                            showExport={false}
                            showPdfExport
                            showImageExport={true}
                            exportImageWidth={1280}
                            exportImageHeight={720}
                            onBeforeExportHandler={async ({ vis, exportType }) => {
                              //console.log(data);
                              console.log(vis);
                              if(exportType in { pdf: true, image: true} && vis)
                                await vis.setOptions({ showTitles: true, footnote: `${ExportChartFootnote}` });
                            }}
                            onAfterExportHandler={async ({ vis, exportType }) => {
                              console.log('Export type: ', exportType);
                              if(exportType in { pdf: true, image: true})
                                vis.setOptions({ showTitles: false, footnote:"" });
                            }}
                          />
                        </div>
                      </div>

                  </div>    

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
                    {/* Table Column */}
                        <div className="row justify-content-center">
                            <div className="col-12">
                              {/* chart container */}
                              <QlikCard
                                id="AErBzzu"
                                // height="294px"
                                height="max(calc(100vh - 426px + 48*2px - 46px), 200px)"
                                showHeader={true}
                                showMaximize={true}
                                showExport={true}
                                onBeforeExportHandler={async ({  }) => {
                                  //console.log(data);
                                    await app.variable.setStringValue('export_link', '1');
                                }}
                                onAfterExportHandler={async ({  }) => {
                                    app.variable.setStringValue('export_link', '0');
                                }}
        
                              />
                            </div>
                        </div>

                  </div>
              </div>
            </div>




            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
              <div className="row">
                <div className="col-12">
                  {/* FilterPane */}
                  <QlikCard
                    id="415c04bb-3bc8-44f4-adf3-8420b7f21ec7"
                    // height="485px"
                    height="max(calc(100vh - 477px), 100px)"
                    showHeader={false}
                    showMaximize={false}
                    showExport={false}
                    showOverlayer={false}
                  />
                  </div>
                </div>
              <div className="row">
                <div className="col-12">
                  {/* FilterPane */}
                  <QlikCard
                    id="6be31d9b-70a4-4528-ac55-2f6ddced29d7"
                    // height="485px"
                    height="200px"
                    showHeader={false}
                    showMaximize={false}
                    showExport={false}
                    showOverlayer={false}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-12">
              <QlikObject
                id="AQtTDP"
                height="0px"
                showLoader={false}
                showOverlayer={false}
                showHeader={false}
              />
            </div>
          </div>
          
        </div>
    </section>
  );
}
