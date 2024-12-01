import { OTP } from "../Domain/models/otp.js";

export async function otpCreate(otp) {
    return await OTP.create(otp);
}

export async function otpRead(condition) {
    return await OTP.findOne({where: condition});
}

export async function otpDelete(condition) {
    return await OTP.destroy({where: condition});
}