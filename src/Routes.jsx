import { Switch, Route, Redirect } from "react-router-dom";
//import usePageViews from "hooks/usePageViews";

// Pages
import Home from "pages/Home";
import Projects from "pages/Projects";
import ProjectDetails from "pages/ProjectDetails";
import Financing from "pages/Financing";
import FinancingDetails from "pages/FinancingDetails";
import Budget from "pages/Budget";
import DataAvailability from "pages/DataAvailability";
// import IndicatorDynamic from "pages/IndicatorDynamic";
// import PeriodMonitoring from "pages/PeriodMonitoring";
// import PeriodMonitoringSSP from "pages/PeriodMonitoringSSP";
// import Participants from "pages/Participants";
// import ParticipantsCard from "pages/ParticipantsCard";
// import Contracts from "pages/Contracts";
// import Questions from "pages/Questions";
// import Sites from "pages/Sites";
// import Organizers from "pages/Organizers";
// import OrganizerCard from "pages/OrganizerCard";
// import Geography from "pages/Geography";
// import BestResults from "pages/BestResults";
// import Selections from "pages/Selections";
// import Assets from "pages/Assets";
// import AssetItems from "pages/AssetItems";
// import AssetsSSP from "pages/AssetsSSP";
// import IncomeDynamics from "pages/IncomeDynamics";
// import LeaseRegistry from "pages/LeaseRegistry";
// import LeaseContracts from "pages/LeaseContracts";
// import ProcedureType from "pages/ProcedureType";
// import DirectionAnalysis from "pages/DirectionAnalysis";
// import AnalyticTotal from "pages/AnalyticTotal";
// import OrganizerResults from "pages/OrganizerResults";


export default function Routes({ menuLayout }) {
  //usePageViews();

  return (
    <Switch>
      <Route exact path="/">
        <Home title={menuLayout.MenuItem1} appDisclaimer={menuLayout.appDisclaimer} pageTitle={menuLayout.HeaderTitle} ExportChartFootnote={menuLayout.ExportChartFootnote} menuItemsStrings={menuLayout}/>
      </Route>
      <Route path="/projects">
        <Projects title={menuLayout.MenuItem2} appDisclaimer={menuLayout.appDisclaimer} pageTitle={menuLayout.HeaderTitle} ExportChartFootnote={menuLayout.ExportChartFootnote} menuItemsStrings={menuLayout} />
      </Route>
      <Route path="/projectDetails">
        <ProjectDetails title={menuLayout.MenuItem3} appDisclaimer={menuLayout.appDisclaimer} pageTitle={menuLayout.HeaderTitle} ExportChartFootnote={menuLayout.ExportChartFootnote} menuItemsStrings={menuLayout}/>
      </Route>
      <Route path="/financing">
        <Financing title={menuLayout.MenuItem4} appDisclaimer={menuLayout.appDisclaimer} pageTitle={menuLayout.HeaderTitle} ExportChartFootnote={menuLayout.ExportChartFootnote} menuItemsStrings={menuLayout}/>
      </Route>
      <Route path="/financingDetails">
        <FinancingDetails title={menuLayout.MenuItem5} appDisclaimer={menuLayout.appDisclaimer} pageTitle={menuLayout.HeaderTitle} ExportChartFootnote={menuLayout.ExportChartFootnote} menuItemsStrings={menuLayout}/>
      </Route>
      <Route path="/budget">
        <Budget title={menuLayout.MenuItem7} appDisclaimer={menuLayout.appDisclaimer} pageTitle={menuLayout.HeaderTitle} ExportChartFootnote={menuLayout.ExportChartFootnote} menuItemsStrings={menuLayout}/>
      </Route>
      <Route path="/dataAvailability">
        <DataAvailability title={menuLayout.MenuItem6} appDisclaimer={menuLayout.appDisclaimer} pageTitle={menuLayout.HeaderTitle} ExportChartFootnote={menuLayout.ExportChartFootnote} menuItemsStrings={menuLayout}/>
      </Route>
      <Redirect to="/" />
      
    </Switch>
  );
}
