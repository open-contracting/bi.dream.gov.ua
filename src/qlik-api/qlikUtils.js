/**
 * Export data to specified format
 * @param app - qlik app
 * @param id - qlik object id
 * @param format - OOXML, CSV_C, CSV_T see more docs
 * @param state - "A" (all values), "P" (possible values)
 */
/**
 * Export data to specified format
 * @param app - qlik app
 * @param id - qlik object id
 * @param format - OOXML, CSV_C, CSV_T see more docs
 * @param state - "A" (all values), "P" (possible values)
 */
export async function ExportData({ app, id, format = "OOXML", state = "P"
  , onExportStart = null, onExportFinish=null }) {
  const exportType = "data";
  let vis = await app.visualization.get(id);
  if(vis.model && 
    vis.model.layout &&
    vis.model.layout.qInfo &&
    vis.model.layout.qInfo.qType === 'container') {
    // get "active" tab object and export data (!)
    const activeTab = vis.model.layout.activeTab; // is actual object id
    vis = await app.visualization.get(activeTab);
  }
  //app.visualization.get(id).then(function (vis) {
  if(onExportStart)
    await onExportStart({ vis, exportType });

  vis.exportData({ format, state }).then(async function (link) {
    // console.log(link);
    // window.location.replace(link);      
    try {
      if(onExportFinish)
        await onExportFinish({ vis, link, error: null, exportType });
      else
        window.open(link, "_blank");
    } finally {
      vis.close();
    }
  }).catch(function (error) {
    vis && vis.close();
    onExportFinish && onExportFinish({ vis: null, link: null, error, exportType });
  });
  //});
}

/**
 * Export image
 * @param app - qlik app
 * @param id - qlik object id
 * @param width - width in pixels
 * @param height - height in pixels
 * @param format - png, jpg
 */
export function ExportImg({ app, id, width = 1920, height = 1080, format = "jpg",
  onExportStart = null, onExportFinish=null }) {
  const exportType = "image";
  app.visualization.get(id).then(async function (vis) {
    const settings = { format, height, width };
    if(onExportStart) 
      await onExportStart({ vis, settings, exportType });

    vis.exportImg(settings).then(async function (link) {
      // console.log(link);
      // window.location.replace(link);
      try {
        if(onExportFinish)
          await onExportFinish({ vis, link, error: null, exportType });
        else
          window.open(link, "_blank");
      } finally {
        vis.close();
      }
    }).catch(function (error) {
      onExportFinish && onExportFinish({ vis: null, link: null, error, exportType });
      vis && vis.close();
    });
    // onExportStart && onExportStart();
  });
}

/**
 * Export PDF
 * @param app - qlik app
 * @param id - qlik object id
 * @param documentSize - Page size of the output PDF: a3, a4, a5, a6, a7
 * @param orientation - portrait, landscape
 * @param aspectRatio - 0, 2
 */
export function ExportPdf({ app, id, documentSize = 'a4',
  orientation = 'landscape', aspectRatio = 2,
  onExportStart = null, onExportFinish=null }) {
  const exportType = "pdf";
  app.visualization.get(id).then(async function (vis) {
    const settings = { documentSize, orientation, aspectRatio };
    if(onExportStart) 
      await onExportStart({ vis, settings, exportType });

    vis.exportPdf(settings).then(async function (link) {
      // console.log(link);
      // window.location.replace(link);      
      try {
        if(onExportFinish)
          await onExportFinish({ vis, link, error: null, exportType });
        else
          window.open(link, "_blank");
      } finally {
        vis.close();
      }
    }).catch(function (error) {
      vis && vis.close();
      onExportFinish && onExportFinish({ vis: null, link: null, error, exportType });
    });
    // onExportStart && onExportStart();
  });
}

export function ApplyBookmark(app, id) {
  return app.bookmark.apply(id);
}

export async function CreateBookmark(app, title, description, sheetId) {
  //const b = await app.bookmark.create(title, description, sheetId);
  const b = await app.model.enigmaModel.createBookmarkEx(
    {
      qInfo: {
        qType: "bookmark"
      },
      qMetaDef: {
        title,
        description,
        isExtended: true,
        // approved: false,
        // published: false,
      },
      qIncludeVariables: true,
      // "qDistinctValues": false
    },
    [] // qObjectIdsToPatch
  );

  const props = await b.getProperties();
  props.page = `${window.location.pathname}${window.location.hash}`;

  if(props.qMetaDef && !props.qMetaDef.createdDate) {
    props.qMetaDef.createdDate = props.creationDate;
  }
  
  await b.setProperties(props);
  return b;
}

export function GetBookmark(app, id) {
  return app.model.enigmaModel.getBookmark(id);
}

export function RemoveBookmark(app, id) {
  return app.bookmark.remove(id);
}

function GetFullUserId(user) {
  return user ? `${user.UserDirectory}/${user.getFullUserId()}` : '';
}

export async function PublishBookmark(app, id, user) {
  const b = await app.model.enigmaModel.getBookmark(id);

  const userId = GetFullUserId(user);

  const props = await b.getProperties();
  props.qInfo.qType = `bookmark/${userId}`; // Makes published bookmark invisible to other users
  await b.setProperties(props);

  b.publish();
}

export async function UnpublishBookmark(app, id) {
  const b = await app.model.enigmaModel.getBookmark(id);
  await b.unPublish();

  const props = await b.getProperties();
  props.qInfo.qType = 'bookmark';
  await b.setProperties(props);  
}

export async function GetBookmarks(app, user) {
    const userId = GetFullUserId(user);
    const bookmarks = await app.model.enigmaModel.getBookmarks({
     qOptions: {
       qTypes: [
         'bookmark', `bookmark/${userId}` // bookmark's types to load
       ],
       qData: {
        //  qBookmark: "", // do not load - just remove to load info
       },
      //  qData: {
      //    title: "/qMetaDef/title",
      //    creationDate: "/creationDate",
      //    description: "/qMetaDef/description",
      //    // sheetId: "/sheetId"
      //    ///selectionFields
      //  },
       qIncludePatches: false,
     }});

     // const l = await app.getList("BookmarkList");
     // return l.layout.qBookmarkList.qItems);
    return bookmarks;
}