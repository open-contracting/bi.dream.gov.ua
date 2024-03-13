import { useContext, useEffect, useState, useCallback, useRef } from "react";
// BrowserRouter
import { Link, useHistory } from "react-router-dom";
import "./App.css";
import GlobalContext from "GlobalContext";
import QlikObject from "components/QlikObject";
import ConnectionLostModal from "components/ConnectionLostModal";
import ControlSideBar from "components/ControlSideBar";
import BookmarkListMenu from "components/BookmarkListMenu";
import UserLoginLink from "components/UserLogin";
import UserLogoutLink from "components/UserLogout";
import Footer from "components/Footer";
import useAuthenticatedUser from "hooks/useAuthenticatedUser"; 
import GoogleAnalytics from "components/GoogleAnalytics";
import Routes from "./Routes";
import MainMenu from "./MainMenu";
import SideBar from "./SideBar";
import applyURLSelections from "utils/selectionsSupport";

// import "components/Overlayer/index.css";



// import { createSession } from "./qlik-api/engine";

function App() {
  // const [qlikLib, setQlik] = useState(null);
  const { qlik, app, /*translations*/ } = useContext(GlobalContext);
  const [sessionClosed, setSessionClosed] = useState(false);
  const [siderBarOpened, setSideBarOpened] = useState(false);
  const authUser = useAuthenticatedUser();
  const history = useHistory();
  const [menuLayout, setMenuLayout] = useState({
    HeaderTitle: "DREAM Аналітика",
    FeedbackText: "Зворотній зв'язок",
    appDisclaimer:"На етапі пілотного проєкту результати аналізу не є офіційною статистикою і можуть бути не точними.",
    // RequestAnalyticsText: "Замовити аналітику",
    MenuItem1: "Показники",
    MenuItem2: "Проєкти / Об'єкти",
    MenuItem3: "Деталі проєктів",
    MenuItem4: "Фінансування",
    MenuItem5: "Деталі фінансування",
    MenuItem6: "Наповнення",
    MenuItem7: "Бюджетування",
    // MenuItem6: "Динамiка показникiв",
    // MenuItem7: "Монiторiнг перiодiв",
    // MenuItem8: "Монiторiнг перiодiв приватизації",
    // MenuItem9: "Учасники",
    // MenuItem10: "Картка Учасника",
    // MenuItem11: "Контракти",
    // MenuItem12: "Питання",
    // MenuItem13: "Майданчики",
    // MenuItem14: "Організатори",
    // MenuItem15: "Картка Організатора",
    // MenuItem16: "Географiя",
    // MenuItem17: "Найкращі результати",
    // MenuItem18: "Відбори",
    // MenuItem19: "Активи",
    // MenuItem20: "Предмети продажу активiв",
    // MenuItem21: "Об'єкти продажу приватизації",
    // MenuItem22: "Динамiка торгiв",
    // MenuItem24: "Перелік майна (оренда)",
    // MenuItem25: "Договори оренди",
    // MenuItem28: "Тип аукціону",
    // MenuItem29: "Аналіз напрямків",
    // MenuItem26: "Процедури землi",
    // MenuItem27: "Втрати росії",
    // MenuItem23: "Процедури дерева",
    // MenuItem31: "Аналітика",
    // MenuItem32: "Процедури оренди",
    // MenuItem33: "Результати організатора",
    // MenuItem34: "Процедури приватизації",
    // MenuItem35: "NPS учасників аукціонів",
    ConnectionLostTitle: "Підключення втрачено",
    ConnectionLostMessage:
      "Ваше підключення до Qlik Sense сервера втрачено, оновіть сторінку для продовження роботи.",
    ConnectionLostRefresh: "Оновити",
    Filters: "Фiльтри",
    Login: " ",
  });

  const sidebarOverlayEl = useRef(null);
  // console.log("App", app);

  const menuHandler = useCallback((e) => {
    e && e.preventDefault();
    if (document.body.classList.contains("sidebar-open")) {
      document.body.classList.remove("sidebar-open");
      document.body.classList.add("sidebar-closed");
    } else {
      document.body.classList.remove("sidebar-closed");
      document.body.classList.add("sidebar-open");
    } 
    document.body.classList.toggle("sidebar-collapse");
  }, []);

  // const selectionsHandler = useCallback((e) => {
  //   e && e.preventDefault();
  //   if (document.body.classList.contains("qv-global-selections-enabled")) {
  //     document.body.classList.remove("sidebar");
  //     document.body.classList.add("sidebar-mini");
  //   } 
  //   document.body.classList.add("sidebar");
  // }, []);

  const closeMenuHandler = useCallback(
    (e) => {
      if (sidebarOverlayEl.current) {
        // console.log(sidebarOverlayEl.current);
        const overlayVisible =
          window.getComputedStyle(sidebarOverlayEl.current).display !== "none";
        if (overlayVisible) {
          // close menu when navigate (!)
          menuHandler(e);
        }
      }
    },
    [menuHandler]
  );

  useEffect(() => {
    // applyURLSelections here to be able to navigate bookmark's page
    (async () => {
      await applyURLSelections(app, history);
    })();    
    qlik.on("error", function (error) {
      // console.error(error.method);
      if (
        error.method === "OnSessionClosed" ||
        error.method === "OnSessionTimedOut" ||
        error.message === "ProxyError.OnSessionTimedOut" ||
        error.message === "ProxyError.OnSessionClosed"
      ) {
        setSessionClosed(true);
      }
    });
  }, [qlik, app, history]);

  useEffect(() => {
    let menuItems;
    const createGeneric = async () => {
      menuItems = app.createGenericObject(
        {
          HeaderTitle: {
            qStringExpression: "=$(T(mshp_Header))",
          },
          FeedbackText: {
            qStringExpression: "=$(T(mshp_FeedbackForm))",
          },
          RequestAnalyticsText: {
            qStringExpression: "=$(T(mshButtonRequestAnalytics))",
          },
          ExportChartFootnote: {
            qStringExpression: "=$(T(mshp_Header)) & '. ' & $(T(mshp_LastReloadTime)) & ' ' & date( last_load_time )",
          },
          // appDisclaimer: {
          //   qStringExpression: "='На етапі пілотного проєкту результати аналізу не є офіційною статистикою і можуть бути не точними.'",
          // },
          appDisclaimer: {
            qStringExpression: "=$(T(mshp_appDisclaimer))",
          },
          // FeedbackURL: {
          //   qStringExpression: "='https://docs.google.com/forms/d/e/1FAIpQLSdQlvTdWKP5q5im5DpIV2IV9Pb74WannZNSXwR2z2-Gu7eRJA/viewform'",
          // },
          FeedbackURL: {
            qStringExpression: "=$(T(mshp_FeedbackForm_URL))",
          },
          KPIsAsOfDate: {
            qStringExpression: "=$(T(mshp_LastReloadTime)) & ' ' & ( last_load_time )",
          },
          MenuItem1: {
            qStringExpression: "=$(T(Показники))",
          },
          MenuItem2: {
            qStringExpression: "=$(T(Проекти))",
          },
          MenuItem3: {
            qStringExpression: "=$(T(ProjectDetails))",
          },
          MenuItem4: {
            qStringExpression: "=$(T(Фінансування))",
          },
          MenuItem5: {
            qStringExpression: "=$(T(ДеталіФінансування))",
          },
          MenuItem6: {
            qStringExpression: "=$(T(Наповнення))",
          },
          MenuItem7: {
            qStringExpression: "=$(T(Бюджетування))",
          },
          ConnectionLostTitle: {
            qStringExpression: "=$(T(mshp_ConnectionLostTitle))",
          },
          ConnectionLostMessage: {
            qStringExpression: "=$(T(mshp_ConnectionLostMessage))",
          },
          ConnectionLostRefresh: {
            qStringExpression: "=$(T(mshp_ConnectionLostRefresh))",
          },
          Filters: {
            qStringExpression: "=$(T(mshp_Filters))",
          },
          Login: {
            qStringExpression: "=Coalesce($(T(ttlLogin)), ' ')",
          },
          exportText: {
            qStringExpression: "=$(T(mshp_export_inProgress))",
          },
          exportCompletedText: {
            qStringExpression: "=$(T(mshp_export_complete))",
          },
          closeBtnText: {
            qStringExpression: "=$(T(mshp_export_close))",
          }

        },
        (reply) => {
          setMenuLayout({ ...reply });
        }
      );
    };
    createGeneric();
    return () => {
      if (menuItems && menuItems.qInfo)
        app.destroySessionObject(menuItems.qInfo.qId);
    };
  }, [app]);

  const sideBarOpenHandler = (e) => {
    e.preventDefault();
    setSideBarOpened(!siderBarOpened);
  };

  return (
    <>
      {sessionClosed && (
        <ConnectionLostModal
          title={menuLayout.ConnectionLostTitle}
          text={menuLayout.ConnectionLostMessage}
          refreshText={menuLayout.ConnectionLostRefresh}
        />
      )}
      {/* <Router> */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link pushmenu-btn"
                data-widget="pushmenu"
                href="/"
                role="button"
                onClick={menuHandler}
              >
                <i className="lui-icon lui-icon--menu"></i>
              </a>
            </li>
          </ul>
          <div className="form-inline">
            <h4 className="mb-0 prz-sale">{menuLayout.HeaderTitle}</h4>
          </div>

          <ul className="navbar-nav ml-auto d-flex align-items-center">

            {/* <li className="nav-item jumpappfeedback">
              <a
                className="nav-link nav-link-black"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfABoOsWy4wdAZ1m3wiCWwMAc12aDy3VFo3jIwxCcqvwRE89g/viewform"
                target="_blank"
                rel="noopener noreferrer"
                >
                📈 {menuLayout.RequestAnalyticsText}
              </a>
            </li>

            <li className="nav-item jumpappfeedback-mobile">
              <a
                className="nav-link nav-link-black"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfABoOsWy4wdAZ1m3wiCWwMAc12aDy3VFo3jIwxCcqvwRE89g/viewform"
                target="_blank"
                rel="noopener noreferrer"
                >
                📈
              </a>
            </li> */}

            <li className="nav-item jumpappfeedback">
              <a
                className="nav-link nav-link-black"
                // href="https://google.com.ua/"
                href={menuLayout.FeedbackURL}
                target="_blank"
                rel="noopener noreferrer"
                >
                🔗 {menuLayout.FeedbackText}
              </a>
            </li>

            <li className="nav-item jumpappfeedback-mobile">
              <a
                className="nav-link nav-link-black"
                href={menuLayout.FeedbackURL}
                target="_blank"
                rel="noopener noreferrer"
                >
                🔗
              </a>
            </li>

            <li className="nav-item lang-btns">
              <QlikObject id="7252e2f6-cf00-477a-b9a7-e17d82102ae5" height="29px" showLoader={false} />
            </li>
            <li className="nav-item w-lang-mobile lang-btns-mobile">
              <QlikObject id="d74900ec-bf2b-4d6d-a776-aba5bacb21bf" height="29px" showLoader={false} />
            </li>   
   
         
            <li className="nav-item ">
              <a
                className={`nav-link  ${
                  siderBarOpened ? "active filterpane-active" : "filterpane-incative"
                }`}
                href="/"
                role="button"
                onClick={sideBarOpenHandler}
              >
                <i className="lui-icon lui-icon--filterpane " />
                <span className="filters-txt">{menuLayout.Filters}</span>
                {/* fas fa-th-large */}
              </a>
            </li>

            <li className="nav-item appHelp">
                <QlikObject
                  id="LTMED"
                  height="29px"
                  showLoader={false}
                />           
            </li>



            {/* {!authUser.User || authUser.isAnonymous || sessionClosed ?
              <>
                <UserLoginLink loginText={menuLayout.Login} />
              </>
              :
              <>
                <BookmarkListMenu
                  app={app}
                  showBookmarkDetails={false}
                  user={authUser}
                />

                <UserLogoutLink user={authUser} />
              </>
              } */}
          </ul>
        </nav>

        <div className="main-header current-selections">
          <QlikObject id="CurrentSelections" height="38px" showLoader={false} />
        </div>

        {/* sidebar-light-primary | sidebar-dark-secondary */}
        <aside className="main-sidebar sidebar-light-primary elevation-1">
          <Link to="/" className="brand-link">
            <img
              src={`${process.env.PUBLIC_URL}dream_logo_2.png`}
              alt="Logo"
              className="brand-image"
            />
            {/* <span className="brand-text font-weight-light">Dashboard</span> */}
          </Link>

          <div className="sidebar">
            <nav className="pt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column nav-child-indent"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <MainMenu
                  menuLayout={menuLayout}
                  closeMenuHandler={closeMenuHandler}
                />
              </ul>
            </nav>
              <div className="as-of-date-disclaimer">
                <p>
                {menuLayout.KPIsAsOfDate}
                </p>
              </div>
          </div>
        </aside>

        <div className="content-wrapper">
          {/*<GoogleAnalytics id="UA-96492028-2">
            <Routes menuLayout={menuLayout} />
            </GoogleAnalytics>*/}
          <GoogleAnalytics id="G-B5WMEQ6H8V"> {/*G-B5WMEQ6H8V -for prod OR X -for test*/}
            <Routes menuLayout={menuLayout} />
          </GoogleAnalytics>
        </div>

        {/* Right sidebar */}
        <ControlSideBar opened={siderBarOpened}>
          {siderBarOpened && <SideBar />}
        </ControlSideBar>

        {/* <footer className="main-footer"></footer> */}
      {/* </Router> */}
      <Footer />
      <div id="sidebar-overlay" ref={sidebarOverlayEl} onClick={menuHandler} />
    </>
  );
}

export default App;
