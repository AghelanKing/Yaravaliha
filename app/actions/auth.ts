"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AuthActionState = {
  error: string;
};

function normalizeIranPhone(value: string) {
  const digits = value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/\D/g, "");

  let phone = "";

  if (digits.startsWith("0098")) {
    phone = `+${digits.slice(2)}`;
  } else if (digits.startsWith("98")) {
    phone = `+${digits}`;
  } else if (digits.startsWith("0")) {
    phone = `+98${digits.slice(1)}`;
  } else if (digits.startsWith("9")) {
    phone = `+98${digits}`;
  }

  if (!/^\+989\d{9}$/.test(phone)) {
    return null;
  }

  return phone;
}

export async function sendOtp(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const rawPhone = formData.get("phoneNumber");

  if (typeof rawPhone !== "string") {
    return { error: "شماره موبایل معتبر نیست." };
  }

  const phone = normalizeIranPhone(rawPhone);

  if (!phone) {
    return {
      error: "لطفاً یک شماره موبایل معتبر وارد کنید.",
    };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithOtp({
    phone,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.log(error);
    return {
      error: "ارسال کد تأیید با مشکل مواجه شد. لطفاً دوباره تلاش کنید.",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("pending-phone", phone, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/login",
    maxAge: 10 * 60,
  });

  redirect("/login/confirm");
}
