import { useEffect, useContext, useState } from "react";
import QlikCard from "components/QlikCard";
import QlikObject from "components/QlikObject";
import GlobalContext from "GlobalContext";


export default function DataAvailability({ title , appDisclaimer , pageTitle, ExportChartFootnote, menuItemsStrings}) {
  useEffect(() => {
    document.title = `${pageTitle} - ${title}`;
  }, [pageTitle,title]);

  const { app } = useContext(GlobalContext);
  const [err, setError] = useState(null);
  const [FilterHeight, setFilterHeight] = useState(388);

  useEffect(() => {
    app.model.waitForOpen.promise.then(() => {
      setTimeout(async () => {
        app.model.enigmaModel.evaluate("$(=count({1}distinct [$(=$(T(fldProp_choice)))]))").then(async (reply) => {
          const DataAvailabilityNumberOfFilterRows = reply*29+40;
          console.log('DataAvailability/Number of rows: ', DataAvailabilityNumberOfFilterRows);
          setFilterHeight(DataAvailabilityNumberOfFilterRows);
        }).catch(err => {
          if(!err) setError(err);
        });
      }, 500);
    });
  }, [app, err])

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
              id="VXWetj"
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

              <div className="row justify-content-left">
                {/* Top charts Row */}

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">

                      <div className="row">
                        <div className="col-12 col-xl-12">
                          {/* Barchart: Project data availability */}
                          <QlikCard
                            id="fNhQvq"
                            height="max(calc(50vh - 205px), 110px)"
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
                            exportText = {menuItemsStrings.exportText}
                            exportCompletedText = {menuItemsStrings.exportCompletedText}
                            closeBtnText = {menuItemsStrings.closeBtnText}
                          />
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        {/* indicator selection for barchart */}
                        <div className="col-12 col-xl-6">
                            <QlikObject
                              id="ghWmKw"
                              height="32px"
                              showHeader={false}
                              showMaximize={false}
                              showExport={false}
                            />
                        </div>
                      </div>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                      {/* Barchart: property data availability */}
                      <QlikCard
                        id="wfxvhWq"
                        height="max(calc(50vh - 173px), 120px)"
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
                        exportText = {menuItemsStrings.exportText}
                        exportCompletedText = {menuItemsStrings.exportCompletedText}
                        closeBtnText = {menuItemsStrings.closeBtnText}
                      />
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                      {/* Barchart: distribution of projects */}
                      <QlikCard
                        id="HJHDc"
                        height="max(calc(50vh - 173px), 120px)"
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
                        exportText = {menuItemsStrings.exportText}
                        exportCompletedText = {menuItemsStrings.exportCompletedText}
                        closeBtnText = {menuItemsStrings.closeBtnText}
                      />
                    </div>

              </div>


              <div className="row justify-content-left">
                {/* Table Row */}
                    <div className="col-12">
                      {/* table */}
                      <QlikCard
                        id="ad0460f4-1da6-4efe-8664-23ccfac64c3d"
                        // height="383px"
                        height="max(calc(50vh - 142px), 150px)"
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
                        exportText = {menuItemsStrings.exportText}
                        exportCompletedText = {menuItemsStrings.exportCompletedText}
                        closeBtnText = {menuItemsStrings.closeBtnText}
                      />
                    </div>
               
              </div>

            </div>


            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
            <div className="row">
                <div className="col-12">
                  {/* Data Availiablity % slider */}
                  <QlikCard
                    id="zHXvh"
                    // height="388px"
                    height="75px"
                    showHeader={false}
                    showMaximize={false}
                    showExport={false}
                    showOverlayer={false}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {/* Data Availiablity % Selector */}
                  <QlikCard
                    id="ueBBxA"
                    // height="388px"
                    height="38px"
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
                    id="mjUsR"
                    // height="388px"
                    height={`min(min(${FilterHeight}px, calc(100vh - max(calc(100vh - ${FilterHeight}px) - 410px, 50px)), calc(100vh - 410px - 50px)`}
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
                    id="dCvpLK"
                    height={`max(calc(100vh - ${FilterHeight}px) - 410px, 50px)`}
                    // height="250px"
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
                id="5c60045d-6334-4b9c-aeb4-cd67221615cb"
                height="0px"
                showLoader={false}
                showOverlayer={false}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <QlikObject
                id="NMpWSe"
                height="0px"
                showLoader={false}
                showOverlayer={false}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <QlikObject
                id="NMpWSe"
                height="0px"
                showLoader={false}
                showOverlayer={false}
              />
            </div>
          </div>
          
        </div>
    </section>
  );
}
