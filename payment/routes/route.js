import { Router } from 'express'
import * as controller from '../controllers/controller.js'
// import { mailing } from '../controllers/mailer.js';

const router = Router();

router.route('/checkout-credit-card')
.post(controller.checkoutCreditCard)

router.route('/checkout-internet-banking')
.post(controller.checkoutInternetBanking)

router.route('/checkout-mobile-banking')
.post(controller.checkoutMobileBanking)

router.route('/checkout-qr-promtpay')
.post(controller.checkoutQRpromtpay)

router.route('/omise-hooks')
.post(controller.omiseHooks)

// router.route('/mailing')
// .post(mailing)

// router.route('/omise-charges')
// .get(controller.omiseHooks)

// router.route('/checkout-other-payment')
// .post(controller.checkoutOtherPayment)


router.route('/generate-qr-payment')
.post(controller.generateQRpayment)

export default router;
