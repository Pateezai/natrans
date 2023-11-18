import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTicketStore } from '../../store/store';
import TicketCard from './Components/TicketCard';



const Ticket = () => {

  const isInitialRender = useRef(true);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const idFromQuery = useQuery().get("id");

  console.log(idFromQuery, 'idfromquery')
  const TicketDetail = useTicketStore(state => state.TicketDetail)
  console.log(TicketDetail.ticket, 'idfromticket')
  // console.log(TicketDetail.qr, 'idfromticket')
  // const [ refID, setRefID ] = useState(idFromQuery)
  // const {ref} = location.state || {}
  // console.log(ref)


  useEffect( ()=>{
    if (!isInitialRender.current) {
        if(idFromQuery == null){
          console.log('yse null')
          if(TicketDetail.ticket){
            const newURL = `${window.location.origin}${window.location.pathname}?id=${TicketDetail.ticket}`;
            window.history.pushState({}, '', newURL);
          }
            
        }else{
          console.log('not null')
          if(idFromQuery){
              // console.log(idFromQuery, 'its quer')
              const newURL = `${window.location.origin}${window.location.pathname}?id=${idFromQuery}`;
              window.history.pushState({}, '', newURL);
          }
        }

      } else {
          isInitialRender.current = false; 
      }
    }, [idFromQuery])
// useEffect(()=>{

// }, [])

  let query = useQuery()



  return (
    <>
        <div className='min-h-screen min-w-[270px] max-w-[1200px] flex flex-col justify-evenly items-center m-auto p-10 gap-6'>
           


<TicketCard value={query.get("id") || TicketDetail.ticket}/>





            {/* <Link to={'../'} className='px-4 py-2 rounded underline bg-slate-900 text-white'>Back to Home</Link> */}
        </div>
    </>
  )
}

export default Ticket