import { hasUrlParameter, getAllUrlParameterValues, getUrlParameter } from "./utils";
import { GetBookmark } from "qlik-api/qlikUtils";
import parseStringData from "./parseStringData";

// eg: ?lang=ru&clearselections&bookmark=bid&select=Год/[2015,2016]&select=Год-Месяц/[201501,201502]
// select=Код КОАТУУ/[0111692913,0120755305]
// select=Адреса РО/["вул. Гагаріна, 40","вул. Гагаріна, 79"]#/participantsCard
// select=Дата аукціону/[17.11.2016,21.11.2016]
export default async function applyURLSelections(app, history) {

  const isClearAll = hasUrlParameter("clearselections");
  if(isClearAll)
    await app.clearAll(true);

    const bookmark = getUrlParameter("bookmark");
    if(bookmark) {
      if(await app.bookmark.apply(bookmark)) {
        const b = await GetBookmark(app, bookmark);
        const props = await b.getProperties();
        if(props.page && history)
          if(window.location.search)
            history.push(`${props.page}${window.location.search}`)
          else
          if(window.location.hash) {
            const splitted = window.location.hash.split('?', 2); 
            history.push(`${props.page}${splitted.length === 2 ? '?' + splitted[1] : ''}`);
          } else {
            history.push(props.page);
          }
          // window.history.pushState({}, '', `${props.page}${window.location.search}`);
        }
    }

  const values = getAllUrlParameterValues("select");

  if(values.length > 0) {
    const fieldsList = await app.getList("FieldList");
    const dimensionsList = await app.getList("DimensionList");
    values.forEach(async item => {
      const fieldParams = item.split("/");
      if(fieldParams.length > 1) {
        try {
          let [fieldName, ...values] = fieldParams;
          let fieldDesc = fieldsList.layout.qFieldList.qItems.find(f => f.qName === fieldName);
          if(!fieldDesc) {
            const masterItem = dimensionsList.layout.qDimensionList.qItems.find(item => item.qData.labelExpression === fieldName || item.qData.title === fieldName);
            if(masterItem && masterItem.qData.info.length > 0) {
              const qName = masterItem.qData.info[0].qName;
              if(qName.trim().match(/^=/))
                fieldName = await app.model.evaluateExpression(masterItem.qData.info[0].qName);
              else 
                fieldName = qName;

                fieldDesc = fieldsList.layout.qFieldList.qItems.find(f => f.qName === fieldName);
            }
          }

          const fVals = parseStringData(values.join("/")); //JSON.parse(fieldParams[1]);
          if(fVals) {
            if(fieldDesc && fieldDesc.qTags.some(tag => (tag === '$text'))) {
              //app.field(fieldName).selectValues(fVals, false, false);
              app.field(fieldName).selectMatch(`("${fVals.join('"|"')}")`);
            } else {
              app.field(fieldName).selectMatch(`(${fVals.join('|')})`);
            }
            // const isDateTimeField = fieldDesc 
            //   && fieldDesc.qTags.some((tag) => (tag === '$date' || tag === '$timestamp'));

            // if(isDateTimeField)
            //   app.field(fieldName).selectMatch(`(${fVals.join('|')})`);
            // else
            //   app.field(fieldName).selectValues(fVals, false, false);
          }
        } catch(err) {
          console.error(err);
        }
      }
    });
  }
}