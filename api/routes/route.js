import { Router } from 'express'
import * as controller from '../controllers/controller.js'
import { mailing } from '../../api/controllers/mailer.js';
import { TicketMailing } from '../config/ticket/Ticket-Manage.js';



const router = Router();


//for admin
router.route('/routes')
.post(controller.createRoute)
.get(controller.getAllRoutes)

router.route('/locations')
.post(controller.createLocation)
.get(controller.getLocation)

router.route('/test')
.post(controller.postTest)
// .get(controller.getTest)


router.route('/ticket')
// .post(controller.createTicket, TicketMailing)
.post(controller.createTicket, TicketMailing, mailing)
// .post(controller.createTicket, mailing)
// .post(controller.createTicket, controller.getTest)
.get(controller.getTicket)


// router.route(`/ticket/:ref_id`)
// .get(controller.getTicketById)


// router.route('/ticket')

// router.route('/mailing')
// .post(mailing)


export default router;
