import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRouteStore = create(
  persist(
    (set, get) => ({
      RouteDetail: {
        routeId:"",
        periodId:"",
        from: "",
        to: "",
        date: "",
        duration: "",
        fare: "",
        passenger: "",
        desc: "",
        start_time: "",
        end_time: "",
        timestamp: "",
        available_seat:"",
        reserved_seat:"",
      },
      setRouteDetail: ({
        routeId,
        periodId,
        from,
        to,
        date,
        duration,
        fare,
        passenger,
        desc,
        start_time,
        end_time,
        timestamp,
        available_seat,
        reserved_seat,
      }) =>
        set((state) => ({
          RouteDetail: {
            ...state.RouteDetail,
            routeId,
            periodId,
            from,
            to,
            date,
            duration,
            fare,
            passenger,
            desc,
            start_time,
            end_time,
            timestamp,
            available_seat,
            reserved_seat,
          },
        })),
    }),
    {
      name: "route-detail", // name of the item in the storage (must be unique)
    }
  )
);

export const useCheckoutStore = create(
    (set) => ({
      CheckoutDetail: {
        issue_date:"",
        identnumber:"",
        fname:"",
        lname:"",
        prefix:"",
        pname:"",
        email:"",
        phone:"",
        note:"",
        accept:"",
        timestamp:"",

      },
      setCheckoutDetail: ({
        issue_date,
        identnumber,
        fname,
        lname,
        prefix,
        pname,
        email,
        phone,
        note,
        accept,
        timestamp,

      }) =>
        set((state) => ({
          CheckoutDetail: {
            ...state.CheckoutDetail,
            issue_date,
            identnumber,
            fname,
            lname,
            prefix,
            pname,
            email,
            phone,
            note,
            accept,
            timestamp,
          },
        })),
    })
);

export const useTicketStore = create(
  persist(
    (set) => ({
      TicketDetail: {
        ticket:"",
        // qr:""
      },
      setTicket: ({
        ticket, 
        // qr
      }) =>
        set((state) => ({
          TicketDetail: {
            ...state.TicketDetail,
            ticket,
            // qr
          },
        })),
    }),
    {
      name: "ticket-detail", // name of the item in the storage (must be unique)
    }
  )
);

