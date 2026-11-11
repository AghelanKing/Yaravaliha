import Login from "@/components/MYUI/Login";
import Logo from "@/components/MYUI/Logo";
import { TextAnimate } from "@/components/ui/text-animate";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-5">
      {/* Background Wave */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="#008053"
          fillOpacity="0.7"
          d="M0,192L21.8,186.7C43.6,181,87,171,131,165.3C174.5,160,218,160,262,170.7C305.5,181,349,203,393,192C436.4,181,480,139,524,138.7C567.3,139,611,181,655,186.7C698.2,192,742,160,785,149.3C829.1,139,873,149,916,138.7C960,128,1004,96,1047,106.7C1090.9,117,1135,171,1178,202.7C1221.8,235,1265,245,1309,234.7C1352.7,224,1396,192,1418,176L1440,160L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
        />
      </svg>

      {/* Login Content */}
      <section className="relative z-10 flex w-full max-w-md flex-col items-center mb-30">
        <div className="flex w-full items-center justify-center gap-3">
          <Logo width={85} height={95} />

          <TextAnimate as="h1" className="text-2xl font-bold">
            ورود به یار اولی‌ها
          </TextAnimate>
        </div>

        <div className="mt-6 w-full">
          <Login />
        </div>
      </section>
    </main>
  );
}
