import { db } from "@/db";
import { EmailOTP } from "@/db/schemas";
import { eq, InferSelectModel } from "drizzle-orm";

export class EmailOTPService {
  async markAsUsed(otpId: string) {
    await db
      .update(EmailOTP)
      .set({ isUsed: true })
      .where(eq(EmailOTP.id, otpId));
  }

  async getEmailOtpByUserUuid(
    userUuid: string
  ): Promise<InferSelectModel<typeof EmailOTP> | null> {
    const result = await db.query.EmailOTP.findFirst({
      where: eq(EmailOTP.userUuid, userUuid),
    });

    return result || null;
  }

  async getEmailOtpByEmail(
    email: string
  ): Promise<InferSelectModel<typeof EmailOTP> | null> {
    const result = await db.query.EmailOTP.findFirst({
      where: eq(EmailOTP.email, email),
    });
    return result || null;
  }

  async createEmailOtp(email: string, userUuid: string) {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const existingOtp = await this.getEmailOtpByEmail(email);
    if (existingOtp) {
      const nbTries = existingOtp?.nbTries || 0;
      const result = await db
        .update(EmailOTP)
        .set({
          otpCode,
          isUsed: false,
          nbTries: nbTries + 1,
        })
        .where(eq(EmailOTP.id, existingOtp.id))
        .returning();
      return result[0];
    }

    const result = await db
      .insert(EmailOTP)
      .values({
        email,
        otpCode,
        isUsed: false,
        nbTries: 1,
        id: crypto.randomUUID(),
        userUuid,
      })
      .returning();

    return result[0];
  }
}
