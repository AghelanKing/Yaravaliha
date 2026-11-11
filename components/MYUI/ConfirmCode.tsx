"use client";

import { Button } from "../ui/button";
import OtpInput from "../ui/InputOTP";

function ConfirmCode() {
  return (
    <div className="flex flex-col mt-6">
      <form className="flex flex-col">
        <label
          htmlFor="phoneNumber"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          کد تایید فرستاده شده رو وارد کن
        </label>

        <OtpInput
          length={6}
          mode="numeric"
          autoFocus
          onComplete={(value) => {
            console.log(value);
          }}
          className="w-full"
        />

        <Button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#008053] text-base font-semibold hover:bg-[#006b46]">
          ورود
        </Button>
      </form>

      <p className="mt-5 text-center text-xs leading-6 text-gray-400">
        کد تأیید فقط برای احراز هویت شماره موبایل شما استفاده می‌شود.
      </p>
    </div>
  );
}

export default ConfirmCode;
