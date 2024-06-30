import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Feedback app verification code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return { success: true, message: "Verification code sent successfully" };
    } catch (emailError) {  
        console.log("Error while verifying email", emailError);
        return { success: false, message: "Failed to send email verification code" };
    }
}
