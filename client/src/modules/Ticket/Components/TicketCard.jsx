import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
// import qr from "../../../assets/qr.png";
import { GetTicket } from "../../../helper/handling/data-handling";
import { Skeleton } from "@chakra-ui/react";
import {MdSaveAlt} from 'react-icons/md'

const TicketCard = ({ value}) => {
  const ticket_ref = value;
  // const ticket_qr = qr;
  // console.log(ticket_ref)
  const [data, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });
  const { isLoading, apiData, status } = data;

  useEffect(() => {
    fetchData(ticket_ref);
  }, [ticket_ref]);

  const fetchData = async (ticket_ref) => {
    try {
      setData((prev) => ({ ...prev, isLoading: true }));
      GetTicket(ticket_ref);
      let { data, status } = await GetTicket(ticket_ref);
      console.log(data)
      if (status == 200) {
        setData((prev) => ({ ...prev, apiData: data, status: status }));
      }
      setData((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
    }
  };
  console.log(apiData)
  return (
    <div className="flex flex-col gap-12 pt-10 py-32 items-center">
      {isLoading ? (
        <>
          <Skeleton>

          <div className="rounded-md overflow-hidden border border-slate-400 min-w-max">
            <div className="header flex items-center justify-between bg-blue-300 px-2 py-1">
              <div className="logo">
                <h1 className="text-xl font-bold text-white px-2">Natrans</h1>
              </div>
              <div className="refcode text-white text-center">
                <p>Reference ID</p>
                {/* <h1 className="font-semibold">{apiData.ref_id}</h1> */}
              </div>
            </div>
            <div className="topic"></div>
            <div className="py-2 flex border-b border-dashed">
              <div className="w-full px-2">
                <div className="border-b pb-1 flex gap-4 items-center">
                  {/* <h1 className="text-md font-semibold">{apiData.from} {apiData.start_time}</h1> */}
                  <FaArrowRightLong size={20} />
                  <h1 className="text-md font-semibold">Chaweang 17:00,</h1>
                  <h1 className="text-md font-semibold">12 October 2023</h1>
                </div>
                <div className="">
                  <div className="p-2 pb-0 flex justify-between gap-1">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-sm font-semibold">
                        Name:
                        <span className="pl-2 font-normal">Mr.John Migel</span>
                      </h1>
                      <h1 className="text-sm font-semibold ">
                        Seat:
                        <span className="pl-2 font-normal">3 seats</span>
                      </h1>
                      <h1 className="text-sm font-semibold ">
                        Email:
                        <span className="pl-2 font-normal">
                          Michael@gmail.com
                        </span>
                      </h1>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-sm font-semibold ">
                        Passport/ID:
                        <span className="pl-2 font-normal">12AC2412</span>
                      </h1>
                      <h1 className="text-sm font-semibold ">
                        Duration:
                        <span className="pl-2 font-normal">30 min</span>
                      </h1>
                      <h1 className="text-sm font-semibold ">
                        Phone:
                        <span className="pl-2 font-normal">0987654345</span>
                      </h1>
                    </div>
                  </div>
                  <div className="px-2 flex flex-wrap text-sm mt-1">
                    <h1 className="font-semibold ">Note:</h1>
                    <span className="pl-2 font-normal">
                      Drop me at W samui hotel
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-max flex flex-col items-center justify-center px-2">
                <img src="" alt="" className="w-20" />
                <span className="text-xs">Scan</span>
              </div>
            </div>

            <div className="p-1 text-center">
              <p className="text-xs text-slate-400">
                Transaction date:2023-10-12
              </p>
            </div>
          </div>
          </Skeleton>

        </>
      ) : (
        <>
            {apiData? (<>
            {apiData.ref_id === false? (<>
            <h1>No anyticket please check your ref id</h1>
            </>):(<>
                <div className="rounded-md overflow-hidden border border-slate-400 min-w-max">
              <div className="header flex items-center justify-between bg-blue-300 px-2 py-1">
                <div className="logo">
                  <h1 className="text-xl font-bold text-white px-2">Natrans</h1>
                </div>
                <div className="refcode text-white text-center">
                  <p>Reference ID</p>
                  <h1 className="font-semibold">{apiData.ref_id}</h1>
                </div>
              </div>
              <div className="topic"></div>
              <div className="py-2 flex border-b border-dashed">
                <div className="w-full px-2">
                  <div className="border-b pb-1 flex gap-4 items-center">
                    <h1 className="text-md font-semibold">{apiData.from} {apiData.start_time}</h1>
                    <FaArrowRightLong size={20} />
                    <h1 className="text-md font-semibold">{apiData.to} {apiData.end_time},</h1>
                    <h1 className="text-md font-semibold">{apiData.depart_date}</h1>
                  </div>
                  <div className="">
                    <div className="p-2 pb-0 flex justify-between gap-1">
                      <div className="flex flex-col gap-1">
                        <h1 className="text-sm font-semibold">
                          Name:
                          <span className="pl-2 font-normal">
                            {apiData.p_name}
                          </span>
                        </h1>
                        <h1 className="text-sm font-semibold ">
                          Seat:
                          <span className="pl-2 font-normal">{apiData.seat}</span>
                        </h1>
                        <h1 className="text-sm font-semibold ">
                          Email:
                          <span className="pl-2 font-normal">
                            {apiData.email}
                          </span>
                        </h1>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="text-sm font-semibold ">
                          Passport/ID:
                          <span className="pl-2 font-normal ">
                            {apiData.identnumber}
                          </span>
                        </h1>
                        <h1 className="text-sm font-semibold ">
                          Duration:
                          <span className="pl-2 font-normal ">
                            {apiData.duration}
                          </span>
                        </h1>
                        <h1 className="text-sm font-semibold ">
                          Phone:
                          <span className="pl-2 font-normal">{apiData.phone}</span>
                        </h1>
                      </div>
                    </div>
                    <div className="px-2 flex flex-wrap text-sm mt-1">
                      <h1 className="font-semibold ">Note:</h1>
                      <span className="pl-2 font-normal ">
                        {apiData.note}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-max flex flex-col items-center justify-center px-2">
                  {apiData.qr_code? 
                  <img src={apiData.qr_code} alt="" className="w-20 " />
                  :   
                  <img src='gibbresh.png' fallbackSrc='https://via.placeholder.com/150' className="w-20"/>
                  }
                  <span className="text-xs">Scan</span>
                </div>
              </div>

              <div className="p-1 text-center">
                <p className="text-xs text-slate-400">
                  Transaction date: {apiData.transaction_date}
                </p>
              </div>



            </div>
            <div className="bg-slate-300 rounded-full w-10 h-10 flex items-center justify-center">
      <MdSaveAlt size={20}/>
</div>
            </>)
            }
            </>)
            :(<>
            <h1>Database connection false contact support 404 not found ticket</h1>
            </>)}
            
        </>
      )}
    </div>
  );
};

export default TicketCard;
