import * as yup from 'yup'

export const passengerInfo = yup.object().shape({
    identnumber:yup.string().required(""),
    prefix:yup.string().required(""),
    fname:yup.string().required(""),
    lname:yup.string().required(""),
    email:yup.string().email("Invalid Email").required(""),
    phone:yup.number().required(""),
    accept:yup.boolean().oneOf([true], '').required("")
})