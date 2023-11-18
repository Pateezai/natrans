import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Booking from './modules/Booking/Booking'
import Checkout from './modules/Checkout/Checkout'
// import GenerateQR from './modules/Checkout/PaymentMethod/QR/GenerateQR'
import Ticket from './modules/Ticket/Ticket'

function App() {
  // console.log(localStorage.getItem('route-detail'))

  // const ProtectedRoute = ({children}) =>{
  //   if(!currentUser){
  //     return <Navigate to='/login'/>
  //   }
  //   return children
  // }



  const router = createBrowserRouter([
    {
      path:'',
      element:(<Home/>
      ),children:[
        {
          path:'',
          element:<Booking/>
        },
        {
          path:'checkout',
          element:(
              <Checkout/>
          ),
          // children:[
          //   {
          //     path:'promtpayqr',
          //     element:<GenerateQR/>
          //   }
          // ]
        },
        {
          path:'ticket',
          element:<Ticket/>
        }
      ]
    },
    // {
    //   path:'admin',
    //   element:(<Admin/>)
    // },
  ])

  return (
    <>
      <RouterProvider router={router}/>

    </>
  )
}

export default App
