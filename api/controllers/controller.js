import dotenv from "dotenv";
// import fs from 'fs'
// import QRCode, { create } from "qrcode";
import { PrismaClient } from '@prisma/client'
// import { getFromS3 } from "../config/Cloud/S3/S3-api-handling.js";
import { GenerateTicketQR } from "../config/ticket/QR/QR-handling.js";
import { getObjectURL, uploadToS3 } from "../config/Cloud/S3/S3-api-handling.js";

const prisma = new PrismaClient()
dotenv.config();

//// Routes ---------------------------------------------------------------------------

//Create Route
export const createRoute = async (req, res) => {
  const {
    startLocation,
    duration,
    endLocation,
    range,
    rangeStart,
    rangeEnd,
    rangeDates,
    periods,
    fare,
  } = req.body;
  // console.log(req.body)

  try {
    for (const date of rangeDates) {
      await prisma.route.create({
        data: {
          date: new Date(date.date),
          start_location: startLocation,
          end_location: endLocation,
          duration: duration,
          fare: parseInt(fare),
          periods: {
            create: periods.map((period) => ({
              desc: period.name,
              start_time: period.startTime,
              end_time: period.endTime,
              available_seat:parseInt(period.availableSeat),
              reserved_seat:parseInt(period.reservedSeat),
            })),
          },
        },
      });
    }
    res.status(200).send({ message: "create success" });
  } catch (error) {
    console.error("Error creating route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve all routes
export const getAllRoutes = async (req, res) => {
  try {
    const data = await prisma.route.findMany({
      include: {
        periods: true, // Include the associated periods
      },
    });

    // Format the date and transform the data
    const formattedData = data.map((route) => ({
      id: route.id,
      date: new Date(route.date).toISOString().slice(0, 10),
      duration: route.duration,
      // available_seat: route.available_seat,
      fare: route.fare,
      start_location: route.start_location,
      end_location: route.end_location,
      periods: route.periods.map((period) => ({
        desc: period.desc,
        start_time: period.start_time,
        end_time: period.end_time,
      })),
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

//// Locations ------------------------------------------------------------------

export const createLocation = async (req, res) => {
  try {
    const { location, label } = req.body;
    // console.log(location, label)

    const createLocation = await prisma.location.create({
      data: {
        name: location,
        label: label,
      },
    });
    res.status(201).json({ success: true, location: createLocation });
  } catch (error) {
    console.error("Error creating route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLocation = async (req, res) => {
  try {
    const locations = await prisma.location.findMany(); // Retrieve all locations

    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching locations" });
  }
};

///// Test --------------------------------------------------------------------

export const postTest = async (req, res) => {
  const { from, to, date, passenger } = req.body;

  try {
    const routes = await prisma.route.findMany({
      where: {
        start_location: from,
        end_location: to,
        date: new Date(date),
      },
      include: {
        periods: true,
      },
    });

    const validRoutes = routes.map((route) => {
      const filteredPeriods = route.periods.filter((period) => {
        return period.available_seat - period.reserved_seat >= passenger;
      });

      return {
        ...route,
        periods: filteredPeriods,
      };
    });

    // Filter routes that have at least one valid period
    const routesWithValidPeriods = validRoutes.filter((route) => route.periods.length > 0);

    // console.log(routesWithValidPeriods, 'period')
    // console.log(routes, 'routes')
    // console.log(routes)
    res.status(200).json(routesWithValidPeriods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const getTest = async (req, res) => {
//   // const { username } = req.method == "GET" ? req.query : req.body;
  
//   console.log(req.ticket, 'gettest req ticket')
//   // console.log(req.body, 'gettest req body')
//   // console.log(req.query, 'gettest req query')
// };

//// Ticket --------------------------------------------------------------

export const createTicket = async (req, res, next) => {
  const values = req.body;
  const {
    routeId,
    periodId,
    // issue_date,
    fare,
    duration,
    identnumber,
    note,
    // charges,
    date,
    email,
    end_time,
    from,
    passenger,
    phone,
    pname,
    start_time,
    to,
    payment_value,
    return_uri,
  } = values;

  // console.log(payment_value)

  const {
    payment_method,
    transaction_id,
    transaction_date,
    transaction_name,
    transaction_status,
    name_oncard,
    amount,
    net,
    fee,
    fee_vat,
    fee_rate,
    vat_rate,
    currency,
    country,
    card_brand,
    bank,
  } = payment_value;
  // console.log(payment_value)
  try {
    // variable handling ///////////////////////////////////////////////////
    //-------Date Time------------------//
    const req_date = new Date(date);
    const transDate = new Date(transaction_date);
    const pres_date = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formatDate = req_date.toLocaleDateString("en-US", options);
    // console.log(formatDate)
    const transcationStamp = pres_date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    const transFormat = transDate
      .toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "");
    //-------Date Time------------------//

    let pay_id;
    //save payment data then get it's id for ref

    const payment = await prisma.payment.create({
      data: {
        payment_method,
        transaction_id,
        transaction_date: transcationStamp,
        transaction_name,
        transaction_status,
        name_oncard,
        amount,
        net,
        fee,
        fee_vat,
        fee_rate: parseFloat(fee_rate),
        vat_rate: parseFloat(vat_rate),
        currency,
        country,
        card_brand,
        bank,
      },
    });
    pay_id = payment.id;

    //save ticket then get it's id for

    // try {
    //   const ticket = await prisma.ticket.create({
    //     data:{

    //     }
    //   })
    // } catch (error) {

    // }
    const get_period = await prisma.period.findUnique({
      where:{
        id:periodId
      }
    })
    // console.log(get_period.reserved_seat)


    const seat = await prisma.period.update({
      where:{
        id: periodId
      },
      data:{
        reserved_seat: parseInt(get_period.reserved_seat) + parseInt(passenger)
      }
    })


    // console.log(seat, 'seat')

    const ref_id = `${transFormat}${routeId}-${periodId}-${pay_id}`;
    // console.log(ref_id)
  //   const qr = await GenerateTicketQR({
  //     ref_id:ref_id,
  //     return_uri:return_uri,
  // })
    const qr = await GenerateTicketQR({
      ref_id:ref_id,
      return_uri:return_uri,
    })

    const ticket_qr = await uploadToS3({
      BodyBuffer:qr,
      key:`ticket-qr-img/${ref_id}.png`,
      // S3_BUCKET_FOLDER:"ticket-qr-img",
      // ref_id
    })

    // variable handling ///////////////////////////////////////////////////
    const ticket = await prisma.ticket.create({
      data: {
        ref_id: ref_id,
        identnumber,
        fare,
        note,
        duration,
        from,
        to,
        p_name: pname,
        email,
        phone,
        depart_date: formatDate,
        start_time,
        end_time,
        seat: parseInt(passenger),
        transaction_date: transcationStamp,
        qr_code:`ticket-qr-img/${ref_id}.png`,
        payment: { connect: { id: pay_id } },
        period: { connect: { id: periodId } },
      },
    });

    const value = {
      ref_id:ref_id,
      return_uri:return_uri,
    }

    const ticket_data = {
      ref_id:ref_id,
      from:from,
      to:to,
      identnumber:identnumber,
      fare:fare,
      note:note,
      duration:duration,
      p_name: pname,
      email:email,
      phone:phone,
      depart_date: formatDate,
      start_time: start_time,
      end_time:end_time,
      seat: parseInt(passenger),
      transaction_date: transcationStamp,
      return_uri:return_uri,
      qr_code:`ticket-qr-img/${ref_id}.png`,
    };


    console.log(ticket_data.email, 'ticket data email')
    req.ticket_data = ticket_data;
    next();
    //save the sequence
    //save the ticket
  } catch (error) {
    console.error(error);
  }
};

export const getTicket = async (req, res) => {
  // const { ticket_ref } = req.method == "GET" ? req.query : req.body;
  const ticket_ref = req.query.id;
  // console.log(ticket_ref)
  try {
    let ticket_detail = await prisma.ticket.findUnique({
      where: {
        ref_id: ticket_ref,
      },
    });
    if (!ticket_detail) {
      // Set a default value if ticket is null
      const defaultValue = {
        // Define your default values here
        // For example:
        ref_id: false,
        // Add other properties as needed
      };
      // Assign the default value to ticket
      ticket_detail = defaultValue;

      console.log("not found, using default value on localstorage");
    }
    console.log(ticket_detail.qr_code, 'ticlqr qweq')
    const qr = await getObjectURL({
      key:ticket_detail.qr_code
    })

    const ticket = {
        ref_id: ticket_detail.ref_id,
        identnumber: ticket_detail.identnumber,
        fare: ticket_detail.fare,
        note: ticket_detail.note,
        duration: ticket_detail.duration,
        from: ticket_detail.from,
        to: ticket_detail.to,
        p_name: ticket_detail.p_name,
        email: ticket_detail.email,
        phone: ticket_detail.phone,
        depart_date: ticket_detail.depart_date,
        start_time: ticket_detail.start_time,
        end_time: ticket_detail.end_time,
        seat: ticket_detail.seat,
        transaction_date: ticket_detail.transaction_date,
        qr_code: qr,
    }
    // console.log(ticket)

    // console.log(routes)
    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error Fail get Ticket" });
  }
  // const ticket_ref = req.body
  // console.log(ticket_ref, 'getTicket')
};

// export const getTicketById = async (req, res) => {
//   // // const ticket = req.params
//   // try {
//   //   // const {ref_id} = req.params
//   //   const {ref_id} = req.params
//   //   // console.log(req.body, 'get ticket body')
//   //   // console.log(req.params, 'get ticket params')

//   //   const s3Object = await getFromS3({
//   //     S3_BUCKET_FOLDER: 'ticket-img',
//   //     ref_id:ref_id,
//   //   });
//   //   s3Object.Body.pipe(res);
//   //   // console.log(
//   //   //   s3Object.Body.pipe(res)
//   //   // )
//   //   return s3Object.Body.pipe(res)
//   // } catch (error) {
//   //   console.error(error)
//   // }


// }
