"use client";

import { useActionState } from "react";
import { Button } from "../ui/button";
import Input from "./Input";
import { FaAngleLeft } from "react-icons/fa6";
import { sendOtp } from "@/app/actions/auth";

const initialState = {
  error: "",
};

function Login() {
  const [state, formAction, isPending] = useActionState(sendOtp, initialState);

  return (
    <div className="mt-6 flex flex-col">
      <form action={formAction} className="flex flex-col">
        <label
          htmlFor="phoneNumber"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          شماره موبایلت رو وارد کن تا کد تأیید برات ارسال کنیم:
        </label>

        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          dir="ltr"
          autoComplete="tel"
          placeholder="مثلا 0000 000 0913"
          disabled={isPending}
          className="h-13 w-full rounded-xl border-gray-200 text-left text-lg tracking-wider placeholder:text-right placeholder:tracking-normal focus-visible:ring-[#008053]"
        />

        {state.error && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {state.error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#008053] text-base font-semibold hover:bg-[#006b46] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "در حال ارسال..." : "دریافت کد تأیید"}
          {!isPending && <FaAngleLeft />}
        </Button>
      </form>

      <p className="mt-5 text-center text-xs leading-6 text-gray-400">
        کد تأیید فقط برای احراز هویت شماره موبایل شما استفاده می‌شود.
      </p>
    </div>
  );
}

export default Login;
