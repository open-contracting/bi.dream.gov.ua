/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga4";

class GoogleAnalytics extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired, // Google Analytics Tracking ID
    basename: PropTypes.string,
    debug: PropTypes.bool,
    trackPathnameOnly: PropTypes.bool,
    children: PropTypes.node, //React.Node,
    location: PropTypes.object,
    history: PropTypes.object,
  };

  static defaultProps = {
    debug: false,
  };

  constructor(props) {
    super(props);

    this.sendPageView = this.sendPageView.bind(this);
    // this.initialize = this.initialize.bind(this);

    // this.initialize(props.id);
    ReactGA.initialize(props.id);
  }

  componentDidMount() {
    this.sendPageView(this.props.location);
    this.props.history.listen(this.sendPageView);
  }

  // initialize(gaId) {
  //   if (!gaId) {
  //     console.error("[ga] Tracking ID is required.");
  //     return;
  //   }

  //   // Check if window exists for static compiling
  //   if (typeof window === "undefined") {
  //     return;
  //   }

  //   // Load Google Analytics
  //   // see more at https://developers.google.com/analytics/devguides/collection/analyticsjs?hl=ru
  //   (function (i, s, o, g, r, a, m) {
  //     i["GoogleAnalyticsObject"] = r;
  //     (i[r] =
  //       i[r] ||
  //       function () {
  //         (i[r].q = i[r].q || []).push(arguments);
  //       }),
  //       (i[r].l = 1 * new Date());
  //     (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  //     a.async = 1;
  //     a.src = g;
  //     m.parentNode.insertBefore(a, m);
  //   })(
  //     window,
  //     document,
  //     "script",
  //     "https://www.google-analytics.com/analytics.js",
  //     "ga"
  //   );

  //   // Initialize Google Analytics
  //   window.ga("create", gaId, "auto");
  // }

  sendPageView(location) {
    // // Do nothing if GA was not initialized due to a missing tracking ID.
    // if (!window.ga) {
    //   return;
    // }

    // // Do nothing if trackPathnameOnly is enabled and the pathname didn't change.
    // if (
    //   this.props.trackPathnameOnly &&
    //   location.pathname === this.lastPathname
    // ) {
    //   return;
    // }

    this.lastPathname = location.pathname;

    // Sets the page value on the tracker. If a basename is provided, then it is prepended to the pathname.
    const page = this.props.basename
      ? `${this.props.basename}${location.pathname}`
      : location.pathname;

    // window.ga("set", "page", page);

    // // Sending the pageview no longer requires passing the page
    // // value since it's now stored on the tracker object.
    // window.ga("send", "pageview");

    ReactGA.send({ hitType: "pageview", page  }); //, title: "Custom Title"

    if (this.props.debug) {
      console.info(`[ga] Page view: ${page}`);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(GoogleAnalytics);
