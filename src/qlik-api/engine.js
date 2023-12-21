// import { useEffect, useState } from 'react';
import enigma from "enigma.js";
import schema from "enigma.js/schemas/12.612.0.json";

// const responseInterceptors = [
//   // {
//   //   // We only want to handle failed responses from QIX Engine:
//   //   onRejected: function retryAbortedError(sessionReference, request, error) {
//   //     console.warn(
//   //       "Captured Request: Rejected",
//   //       `Error Code: ${error.code} : ${error}`
//   //     );
//   //   }
//   // }
// ];

export async function getTicket() {
  let ticket = "";
  if (process.env.NODE_ENV === "development") {
    // Retrieve the requestTicket
    console.log("Get ticket");
    const url = "/dev-api/getTicket";
    try {
      const res = await fetch(url);
      const data = await res.json();
      ticket = `?QlikTicket=${data.Ticket}`;
    } catch (e) {
      console.error(e);
    }
  }
  return ticket;
}

export async function createSession() {
  let ticket = "";
  if (process.env.NODE_ENV === "development") {
    // Retrieve the requestTicket
    console.log("Get ticket");
    const url = "/dev-api/getTicket";
    try {
      const res = await fetch(url);
      const data = await res.json();
      ticket = `?QlikTicket=${data.Ticket}`;
    } catch (e) {
      console.error(e);
    }
  }

  // Create a enigma session
  const session = enigma.create({
    schema,
    url: `wss://${process.env.REACT_APP_QLIK_SERVER}/${process.env.REACT_APP_QLIK_PROXY}app/${process.env.REACT_APP_QLIK_APP}${ticket}`,
    createSocket: (url) => new WebSocket(url),
    // responseInterceptors,
  });

  return session;
}

// export function useEnigma() {
//   const [session, setSession] = useState();

//   useEffect(() => {
//     (async () => {
//       const s = await createSession();
//       setSession(s);
//     })();
//   }, []);

//   return session
// }
