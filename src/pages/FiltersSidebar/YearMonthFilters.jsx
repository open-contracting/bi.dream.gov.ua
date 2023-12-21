import QlikCard from "components/QlikCard";
// import QlikObject from "components/QlikObject";

export default function YearMonthFilters() {
  return (
    <>
      {/* <div className="row mb-2">
        <div className="col-12">
            <QlikObject
              id="tHJEbV"
              height="35px"
              showLoader={false}
            />
        </div>
      </div> */}

      {/* <div className="row lang-btns-mobile">
        <div className="col-lg-12 col-12">
          <QlikObject id="4a315040-e33f-4385-990e-c3d7bd9b7606" height="29px" showLoader={false} />
        </div>
      </div> */}

      <div className="row">
        <div className="col-lg-12 col-12">
          {/* vizDateType = Planned auction date */}
          <QlikCard
            id="YnVGW"
            height="39px"
            showLoader={true}
            showHeader={false}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-12">
          {/* vizYearFilter */}
          <QlikCard
            id="1f04c354-742d-49f8-b803-10859687626e"
            height="84px"
            showLoader={true}
            showHeader={false}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-12">
          {/* vizMonthFilter */}
          <QlikCard
            id="42aefee9-2423-4bdc-8de2-7b1e53e08827"
            height="112px"
            showLoader={true}
            showHeader={false}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-12">
          {/* vizCalendar */}
          <QlikCard
            id="pFqqU"
            height="30px"
            showLoader={true}
            showHeader={false}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-12 top-divider">
          {/* vizDateType = Procedure date created */}
          <QlikCard
            id="MfvZp"
            height="39px"
            showLoader={true}
            showHeader={false}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-12 bottom-divider">
          {/* vizCalendar */}
          <QlikCard
            id="YjZfu"
            height="30px"
            showLoader={true}
            showHeader={false}
          />
        </div>
      </div>
    </>
  );
}