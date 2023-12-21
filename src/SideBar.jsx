import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "components/Loader";
//import HomeFilters from "pages/Home/filters";

// const YearMonthFilters = lazy(() =>
//   import("pages/FiltersSidebar/YearMonthFilters")
// );

const HomeFilters = lazy(() => import("pages/Home/filters"));
const ProjectsFilters = lazy(() => import("pages/Projects/filters"));
const ProjectDetailsFilters = lazy(() => import("pages/ProjectDetails/filters"));
const FinancingFilters = lazy(() => import("pages/Financing/filters"));
const FinancingDetailsFilters = lazy(() => import("pages/FinancingDetails/filters"));

const HomeFiltersPopups = lazy(() => import("pages/Home/filterspopups"));
const ProjectsFiltersPopups = lazy(() => import("pages/Projects/filterspopups"));
const ProjectDetailsFiltersPopups = lazy(() => import("pages/ProjectDetails/filterspopups"));
const FinancingFiltersPopups = lazy(() => import("pages/Financing/filterspopups"));
const FinancingDetailsFiltersPopups = lazy(() => import("pages/FinancingDetails/filterspopups"));

export default function SideBar() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="p-2">

      <Switch>
          <Route exact path="/">
            <HomeFiltersPopups />
          </Route>
          <Route path="/projects">
            <HomeFiltersPopups /> {/* ProjectsFiltersPopups */}
          </Route>
          <Route path="/projectDetails">
            <HomeFiltersPopups /> {/* ProjectDetailsFiltersPopups */}
          </Route>
          <Route path="/financing">
            <HomeFiltersPopups /> {/* FinancingFiltersPopups */}
          </Route>
          <Route path="/financingDetails">
            <HomeFiltersPopups  /> {/* FinancingDetailsFiltersPopups */}
          </Route>
          <Route path="/budget">
            <HomeFiltersPopups  /> {/* BudgetFiltersPopups */}
          </Route>
          <Route path="/dataAvailability">
            <HomeFiltersPopups  /> {/* DataAvailabilityFiltersPopups */}
          </Route>
        </Switch>    

        {/* <YearMonthFilters /> */}
        
        <Switch>
          <Route exact path="/">
            <HomeFilters />
          </Route>
          <Route path="/projects">
            <HomeFilters /> {/* ProjectsFilters */}
          </Route>
          <Route path="/projectDetails">
            <HomeFilters /> {/* ProjectDetailsFilters */}
          </Route>
          <Route path="/financing">
            <HomeFilters /> {/* FinancingFilters */}
          </Route>
          <Route path="/financingDetails">
            <HomeFilters /> {/* FinancingDetailsFilters */}
          </Route>
          <Route path="/budget">
            <HomeFilters /> {/* BudgetFilters */}
          </Route>
          <Route path="/dataAvailability">
            <HomeFilters /> {/* FinancingDetailsFilters */}
          </Route>
        </Switch>
      </div>
    </Suspense>
  );
}
