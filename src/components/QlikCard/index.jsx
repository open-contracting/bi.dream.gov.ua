import { useContext, useState, useCallback } from "react";
import Card from "components/Card";
import QlikObject from "components/QlikObject";
import ExportDataModal from "components/ExportDataModal";
import { ExportData, ExportImg, ExportPdf } from "qlik-api/qlikUtils";
import GlobalContext from "GlobalContext";
import { 
  dispatchTouchEvent, 
  dispatchPointerEvent } from "utils/utils";

export default function QlikCard({
  id,
  title,
  titleIcon,
  height = "300px",
  showMaximize = true,
  showOverlayer = true,
  showExport = true,
  showImageExport = false,
  showPdfExport = false,
  exportTitle = "", //Export
  exportImageTitle = "", //Export to image
  exportImageWidth = 1920,
  exportImageHeight = 1080,
  exportImageFormat = "png", // png | jpg
  exportPdfTitle = "", //Export to PDF
  exportPdfDocSize = 'a4', // a3, a4, a5, a6, a7
  exportPdfOrientation = 'landscape',
  exportText = "Exporting data...",
  exportCompletedText = "Export completed. Click here to download the data file.",
  closeBtnText = "Close",
  showToggleDataView = false,
  showHeader = true,
  onBeforeExportHandler = null,
  onAfterExportHandler = null,
  // showAllowInteractionButton = false,
  addClasses = "",
}) {
  const { app, onTouchDevice } = useContext(GlobalContext);
  const [showDataView, setShowDataView] = useState(false);
  const [showExportDataModal, setShowExportDataModal] = useState(false);
  const [exportLink, setExportLink] = useState(null);
  const [exportError, setExportError] = useState('');
  const [allowSelections, setAllowSelections] = useState(!onTouchDevice); // !showAllowInteractionButton && !onTouchDevice
  const actions = [];

  // On touch devices only
  const onTapChartHandler = useCallback(
    (e) => {
      setAllowSelections(!allowSelections);
      // dispatch event to start selections
      dispatchTouchEvent(e, "touchstart");
      // for some charts (BarChart, PieChart, etc) 
      dispatchPointerEvent(e, "pointerdown");
      setTimeout(() => dispatchPointerEvent(e, "pointerup"), 150);
    },
    [allowSelections]
  );

  const onExportStartedHandler = useCallback(async (data) => {
      setExportLink(null);
      setExportError(null);    
      setShowExportDataModal(true);
      if(onBeforeExportHandler)
        await onBeforeExportHandler(data);
    }, 
    [setShowExportDataModal, onBeforeExportHandler]
  );

  const onExportFinishedHandler = useCallback(async (data) => {
        const { link, error } = data;
        setShowExportDataModal(true);
        setExportLink(link);
        setExportError(error);
        if(onAfterExportHandler)
          await onAfterExportHandler(data);
      }, 
      [setExportLink, setShowExportDataModal, onAfterExportHandler]
  );

  // showAllowInteractionButton || onTouchDevice
  if (onTouchDevice) {
    actions.push({
      //title: "Interactivity",
      icon: "lui-icon lui-icon--touch",
      btnClasses: ({ maximized }) =>
        allowSelections || maximized ? "active bg-light" : "",
      action: () => setAllowSelections(!allowSelections),
    });
  }

  if (showToggleDataView) {
    actions.push({
      // title: "Toggle data view",
      icon: "lui-icon lui-icon--table",
      btnClasses: showDataView ? "active bg-light" : "",
      action: () => setShowDataView(!showDataView),
    });
  }

  if (showExport) {
    actions.push({
      // title: "Export data",
      title: exportTitle,
      icon: "lui-icon lui-icon--download",
      action: () => ExportData({ app, id
        ,format: "OOXML"
        ,state: "P"
        ,onExportStart: onExportStartedHandler
        ,onExportFinish: onExportFinishedHandler }),
    });
  }

  if (showImageExport) {
    actions.push({
      // title: "Export data",
      title: exportImageTitle,
      icon: "lui-icon lui-icon--image",
      action: () => {
        ExportImg({ app, id 
          ,width: exportImageWidth
          ,height: exportImageHeight
          ,format: exportImageFormat
          ,onExportStart: onExportStartedHandler
          ,onExportFinish: onExportFinishedHandler });
      }
    });
  }

  if (showPdfExport) {
    actions.push({
      // title: "Export data",
      title: exportPdfTitle,
      icon: "lui-icon lui-icon--book",
      action: async () => {
        //el.current.offsetWidth, el.current.offsetHeight
        // if(onBeforeExportHandler)
        //   await onBeforeExportHandler({ id });

        await ExportPdf({ app, id
          ,documentSize: exportPdfDocSize
          ,orientation: exportPdfOrientation
          ,onExportStart: onExportStartedHandler
          ,onExportFinish: onExportFinishedHandler });
      }
    });
  }

  return (
    <>
      {showExportDataModal && 
        <ExportDataModal 
          title={exportTitle}
          text={exportText}
          exportCompletedText={exportCompletedText}
          exportError={exportError}
          link={exportLink}
          closeBtnText={closeBtnText}
          onCloseHandler={() => setShowExportDataModal(false)}
        />
      }

      <Card
        title={title}
        titleIcon={titleIcon}
        showMaximize={showMaximize}
        actions={actions}
        addClasses={addClasses}
        showHeader={showHeader}
      >
        {({ maximized }) => {
          return (
            <QlikObject
              id={id}
              height={height} //maximized ? bodyHeight : height
              maximized={maximized}
              showOverlayer={showOverlayer}
              showDataView={showDataView}
              disableInteractivity={showOverlayer && (!allowSelections && !maximized)}
              onTapEvent={onTapChartHandler}
              // noSelections={!allowSelections}
              // noInteraction={!allowSelections}
            />
          );
        }}
      </Card>
    </>
  );
}
