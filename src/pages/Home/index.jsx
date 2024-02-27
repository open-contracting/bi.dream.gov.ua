import { useEffect } from "react";
import QlikCard from "components/QlikCard";
import QlikObject from "components/QlikObject";

export default function HomePage({ title , appDisclaimer , pageTitle, ExportChartFootnote, menuItemsStrings}) {
  useEffect(() => {
    document.title = `${pageTitle} - ${title}`;
  }, [pageTitle,title]);
  console.log(process.env.REACT_APP_PUBLIC_URL);
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
                        id="PGppnd"
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
                        id="tbCaXJP"
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
                        id="epRmEQA"
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
                        id="tjJjzu" //tjJjzu
                        height="90px"
                        showHeader={false}
                        showMaximize={false}
                        showExport={false}
                        showOverlayer={false}
                      />
                    </div>

              </div>


              <div className="row justify-content-left">
                {/* Charts Row */}

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-5">
                  {/* barchart column */}
                  <div className="row justify-content-center">
                    <div className="col-12">
                      {/* barchart */}
                      <QlikCard
                        id="AvjgfP"
                        // height="352px"
                        height="max(calc(100vh - 420px), 280px)"
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
                            id="qsPECB"
                            height="32px"
                            showHeader={false}
                            showMaximize={false}
                            showExport={false}
                          />
                      </div>
                  </div>

                </div>

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-7">
                  {/* container column */}
                  <div className="row justify-content-center">
                    {/* container tab selection */}
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      {/* container tab: map */}
                      <QlikCard
                        id="CkBs"
                        height="48px"
                        showHeader={false}
                        showMaximize={false}
                        showExport={false}
                        showOverlayer={false}
                      />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      {/* container tab: dynamics */}
                      <QlikCard
                        id="bWjpKV"
                        height="48px"
                        showHeader={false}
                        showMaximize={false}
                        showExport={false}
                        showOverlayer={false}
                      />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      {/* container tab: treemap */}
                      <QlikCard
                        id="ALLx"
                        height="48px"
                        showHeader={false}
                        showMaximize={false}
                        showExport={false}
                        showOverlayer={false}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      {/* chart container */}
                      <QlikCard
                        id="avVcA"
                        // height="294px"
                        height="max(calc(100vh - 478px), 130px)"
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
                          // if(exportType in { pdf: true, image: true} && vis)
                          //   await vis.setOptions({ showTitles: true, footnote: `${ExportChartFootnote}` });
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
                      <div className="col-12 col-xl-6">
                        {/* indicator selection for chart container */}
                        <QlikObject
                          id="cZWRP"
                          height="32px"
                          showHeader={false}
                          showMaximize={false}
                          showExport={false}
                        />
                      </div>
                  </div>

                  

                </div>

              </div>

            </div>


            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 filterpane-sheet">
                  {/* FilterPane */}
                  <QlikCard
                    id="GhVZpW"
                    // height="485px"
                    height="max(calc(100vh - 267px), 300px)"
                    showHeader={false}
                    showMaximize={false}
                    showExport={false}
                    showOverlayer={false}
                  />

            </div>

          </div>

          <div className="row">
            <div className="col-12">
              <QlikObject
                id="AQtTDP"
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
