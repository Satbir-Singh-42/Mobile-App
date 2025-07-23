import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";

export const Frame = (): JSX.Element => {
  // Onboarding screens data
  const onboardingScreens = [
    {
      id: 1,
      title: "Master Your Money",
      description:
        "Learn budgeting, saving, and investment — one step at a time.",
      image: "/figmaAssets/2.png",
      isActive: true,
    },
    {
      id: 2,
      title: "Learn Your Way",
      description:
        "Get personalized tips based on your age, income, and goals.",
      image: "/figmaAssets/1.png",
      isActive: false,
    },
    {
      id: 3,
      title: "Stay Safe Online",
      description: "Detect and avoid frauds like OTP scams and phishing traps.",
      image: "/figmaAssets/3.png",
      isActive: false,
    },
  ];

  // Age options for questionnaire
  const ageGroups = [
    "From 13 to 17 years old",
    "18 to 24 years old",
    "25 to 34 years old",
    "35 to 44 years old",
    "45 to 54 years old",
    "55 to 64 years old",
    "65+",
  ];

  // Practice time options
  const practiceTimeOptions = [
    {
      time: "5 min",
      color: "bg-[#b4ffb2]",
      secondColor: "bg-[#a4efa2]",
      thirdColor: "bg-[#8edb8d]",
    },
    {
      time: "10 min",
      color: "bg-[#b2e3ff]",
      secondColor: "bg-[#a2caef]",
      thirdColor: "bg-[#8dacdb]",
    },
    {
      time: "15 min",
      color: "bg-[#c6b2ff]",
      secondColor: "bg-[#ada2ef]",
      thirdColor: "bg-[#ab8ddb]",
    },
    {
      time: "20 min",
      color: "bg-[#ffb2db]",
      secondColor: "bg-[#efa2d0]",
      thirdColor: "bg-[#d675b0]",
    },
  ];

  // Language options
  const languageOptions = ["हद", "Punjabi", "English"];

  // Financial knowledge levels
  const knowledgeLevels = [
    {
      level: "I'm a total beginner",
      bars: [
        { height: "h-[29px]", bg: "bg-[#5589f433]" },
        { height: "h-[52px]", bg: "bg-[#5589f433]" },
        { height: "h-[65px]", bg: "bg-[#5589f433]" },
      ],
    },
    {
      level: "I'm a total beginner",
      bars: [
        { height: "h-[29px]", bg: "bg-[#5589f4]" },
        { height: "h-[52px]", bg: "bg-[#5589f433]" },
        { height: "h-[65px]", bg: "bg-[#5589f433]" },
      ],
    },
    {
      level: "I'm a total beginner",
      bars: [
        { height: "h-[29px]", bg: "bg-[#5589f4]" },
        { height: "h-[52px]", bg: "bg-[#5589f4]" },
        { height: "h-[65px]", bg: "bg-[#5589f433]" },
      ],
    },
    {
      level: "I'm a total beginner",
      bars: [
        { height: "h-[29px]", bg: "bg-[#5589f4]" },
        { height: "h-[52px]", bg: "bg-[#5589f4]" },
        { height: "h-[65px]", bg: "bg-[#5589f4]" },
      ],
    },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full h-full relative">
        {/* Splash Screen */}
        <section className="relative w-full max-w-[1169px] mx-auto">
          <img
            className="w-full h-auto"
            alt="Splash"
            src="/figmaAssets/splash.png"
          />
        </section>

        {/* Onboarding Screen 1 */}
        <section className="relative w-full max-w-[1162px] h-[2516px] mx-auto bg-white overflow-hidden">
          <div className="absolute h-[55px] top-48 right-12 font-['Overpass'] text-[#090f4773] text-[43.4px]">
            Skip
          </div>

          <div className="absolute h-[55px] bottom-[167px] right-12 font-['Overpass'] font-bold text-[#4157ff] text-[43.4px]">
            Next
          </div>

          <div className="absolute w-[124px] h-3 bottom-[134px] left-1/2 -translate-x-1/2 flex space-x-[37px]">
            {[0, 1, 2, 3].map((dot, index) => (
              <div
                key={`dot-${index}`}
                className={`w-3 h-3 rounded-[6.19px] ${index === 0 ? "bg-[#4157ff]" : "bg-[#c4c4c4]"}`}
              />
            ))}
          </div>

          <div className="absolute w-[774px] h-[784px] top-[554px] left-1/2 -translate-x-1/2">
            <div className="absolute w-[767px] h-[767px] top-0 left-0 bg-[#4157ff0f] rounded-[383.61px]" />
            <img
              className="absolute w-[767px] h-[767px] top-[17px] left-[7px] object-cover"
              alt="Financial education illustration"
              src="/figmaAssets/2.png"
            />
          </div>

          <div className="absolute w-[793px] h-[284px] top-[1447px] left-1/2 -translate-x-1/2 text-center">
            <h2 className="font-['Overpass'] font-bold text-[#090f47] text-[74.2px] leading-[99.0px]">
              {onboardingScreens[0].title}
            </h2>
            <p className="font-['Overpass'] font-light text-[#090f4773] text-[49.5px] leading-[74.2px] mt-[35px]">
              {onboardingScreens[0].description}
            </p>
          </div>

          <h1 className="absolute w-[779px] top-[312px] left-48 font-['Anta'] text-[#242424] text-[121px] tracking-[-4.17px]">
            Face2Finance
          </h1>
        </section>

        {/* Onboarding Screen 2 */}
        <section className="relative w-full max-w-[1162px] h-[2516px] mx-auto bg-white overflow-hidden">
          <div className="absolute h-[55px] top-48 right-12 font-['Overpass'] text-[#090f4773] text-[43.4px]">
            Skip
          </div>

          <div className="absolute h-[55px] bottom-[167px] left-[124px] font-['Overpass'] font-bold text-[#4157ff] text-[43.4px]">
            Back
          </div>

          <div className="absolute h-[55px] bottom-[167px] right-12 font-['Overpass'] font-bold text-[#4157ff] text-[43.4px]">
            Next
          </div>

          <div className="absolute w-[124px] h-3 bottom-[134px] left-1/2 -translate-x-1/2 flex space-x-[37px]">
            {[0, 1, 2, 3].map((dot, index) => (
              <div
                key={`dot-${index}`}
                className={`w-3 h-3 rounded-[6.19px] ${index === 1 ? "bg-[#4157ff]" : "bg-[#c4c4c4]"}`}
              />
            ))}
          </div>

          <div className="absolute w-[767px] h-[767px] top-[554px] left-[191px] bg-[#4157ff0f] rounded-[383.61px]">
            <img
              className="absolute w-[669px] h-[669px] top-[68px] left-14 object-cover"
              alt="Financial education illustration"
              src="/figmaAssets/1.png"
            />
          </div>

          <div className="absolute w-[793px] h-[284px] top-[1447px] left-[186px] text-center">
            <h2 className="font-['Overpass'] font-bold text-[#090f47] text-[74.2px] leading-[99.0px]">
              {onboardingScreens[1].title}
            </h2>
            <p className="font-['Overpass'] font-light text-[#090f4773] text-[49.5px] leading-[74.2px] mt-[35px]">
              {onboardingScreens[1].description}
            </p>
          </div>

          <h1 className="absolute w-[779px] top-[312px] left-48 font-['Anta'] text-[#242424] text-[121px] tracking-[-4.17px]">
            Face2Finance
          </h1>
        </section>

        {/* Onboarding Screen 3 */}
        <section className="relative w-full max-w-[1162px] h-[2516px] mx-auto bg-white overflow-hidden">
          <div className="absolute h-[55px] top-48 right-12 font-['Overpass'] text-[#090f4773] text-[43.4px]">
            Skip
          </div>

          <div className="absolute h-[55px] bottom-[167px] left-[124px] font-['Overpass'] font-bold text-[#4157ff] text-[43.4px]">
            Back
          </div>

          <div className="absolute h-[55px] bottom-[167px] right-12 font-['Overpass'] font-bold text-[#4157ff] text-[43.4px]">
            Next
          </div>

          <div className="absolute w-[124px] h-3 bottom-[134px] left-1/2 -translate-x-1/2 flex space-x-[37px]">
            {[0, 1, 2, 3].map((dot, index) => (
              <div
                key={`dot-${index}`}
                className={`w-3 h-3 rounded-[6.19px] ${index === 2 ? "bg-[#4157ff]" : "bg-[#c4c4c4]"}`}
              />
            ))}
          </div>

          <div className="absolute w-[767px] h-[767px] top-[554px] left-[191px] bg-[#4157ff0f] rounded-[383.61px]">
            <img
              className="absolute w-[702px] h-[702px] top-[17px] left-[33px] object-cover"
              alt="Financial education illustration"
              src="/figmaAssets/3.png"
            />
          </div>

          <div className="absolute w-[793px] h-[284px] top-[1447px] left-[186px] text-center">
            <h2 className="font-['Overpass'] font-bold text-[#090f47] text-[74.2px] leading-[99.0px]">
              {onboardingScreens[2].title}
            </h2>
            <p className="font-['Overpass'] font-light text-[#090f4773] text-[49.5px] leading-[74.2px] mt-[35px]">
              {onboardingScreens[2].description}
            </p>
          </div>

          <h1 className="absolute w-[779px] top-[312px] left-48 font-['Anta'] text-[#242424] text-[121px] tracking-[-4.17px]">
            Face2Finance
          </h1>
        </section>

        {/* Login Screen */}
        <section className="relative w-full max-w-[1162px] h-[2516px] mx-auto bg-prima-1 overflow-hidden">
          <div className="flex flex-col items-center gap-[154.93px] pt-[328px] px-[50px]">
            <div className="flex flex-col items-center gap-[88px]">
              <div className="relative w-[899.47px] h-[562.53px]">
                <div className="absolute h-[189px] top-[374px] left-[233px] font-['Poppins'] text-[#4157ff] text-center">
                  <span className="font-bold text-[55.8px] leading-[93.0px]">
                    Welcome Back
                    <br />
                  </span>
                  <span className="font-medium text-[49.6px]">
                    Login to continue
                  </span>
                </div>

                <h1 className="absolute w-[895px] h-[148px] top-[165px] left-0 font-['Anta'] text-[#242424] text-[121px] text-center tracking-[-4.17px]">
                  Face2Finance
                </h1>
              </div>

              <div className="flex flex-col items-end justify-end gap-[49.58px]">
                <div className="flex flex-col items-start gap-[68.17px]">
                  <div className="relative w-[1062.84px] h-[260.74px]">
                    <div className="flex flex-col gap-[12.39px]">
                      <label className="font-['Poppins'] font-medium text-[#4157ff] text-[49.6px] leading-[111.6px]">
                        Enter your username or phone number
                      </label>
                      <Input
                        className="h-[136.34px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#a0a0a0] text-[43.4px] px-[59px] py-6"
                        defaultValue="designwithdesi"
                      />
                    </div>
                  </div>

                  <div className="relative w-[1062.84px] h-[260.74px]">
                    <div className="flex flex-col gap-[12.39px]">
                      <label className="font-['Poppins'] font-medium text-[#4157ff] text-[49.6px] leading-[111.6px]">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          type="password"
                          className="h-[136.34px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#a0a0a0] text-[43.4px] px-[59px] py-6"
                          defaultValue="DesignWITHdesigners12345"
                        />
                        <div className="absolute right-[74.37px] top-1/2 -translate-y-1/2 w-[74.37px] h-[74.37px]">
                          <div className="relative w-[63px] h-14 top-[9px] left-1.5 bg-[url(/figmaAssets/vector-1.svg)] bg-[100%_100%]">
                            <img
                              className="absolute w-[17px] h-[17px] top-6 left-[27px]"
                              alt="Vector"
                              src="/figmaAssets/vector-4.svg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="font-['Poppins'] font-medium text-[#4157ff] text-[43.4px] leading-[73.7px]">
                  Forgot Password?
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[74.37px]">
              <Button className="w-[1064.84px] h-[154.93px] bg-[#4157ff] rounded-[30.99px] font-['Poppins'] font-semibold text-prima-1 text-[55.8px]">
                LOG IN
              </Button>

              <div className="font-['Poppins'] font-medium text-[43.4px] leading-[111.6px]">
                <span className="text-[#000000]">
                  Don&apos;t have an account?{" "}
                </span>
                <span className="text-[#4157ff] cursor-pointer">
                  Sign up now
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Signup Screen */}
        <section className="relative w-full max-w-[1162px] h-[2569px] mx-auto bg-prima-1 overflow-hidden">
          <div className="w-[1063px] h-[2312px] mx-auto pt-[154.93px]">
            <div className="flex flex-col items-center gap-5">
              <div className="relative w-[899.47px] h-[424.97px]">
                <h2 className="absolute h-28 top-[313px] left-[178px] font-['Poppins'] font-bold text-[#4157ff] text-[55.8px] leading-[111.6px]">
                  Create An Account
                </h2>

                <h1 className="absolute w-[895px] h-[148px] top-[138px] left-0 font-['Anta'] text-[#242424] text-[121px] text-center tracking-[-4.17px]">
                  Face2Finance
                </h1>
              </div>

              <div className="flex flex-col gap-[49.58px] w-full">
                <div className="flex flex-col gap-[12.39px]">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-[49.6px] leading-[111.6px]">
                    Name
                  </label>
                  <div className="relative">
                    <Input
                      className="w-[1064.84px] h-[136.34px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#a0a0a0] text-[43.4px] pl-[161px]"
                      defaultValue="Design Withdesigners"
                    />
                    <img
                      className="absolute w-[69px] h-[61px] top-[34px] left-[66px]"
                      alt="User icon"
                      src="/figmaAssets/vector-3.svg"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[12.39px]">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-[49.6px] leading-[111.6px]">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Input
                      className="w-[1062.84px] h-[136.34px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#a0a0a0] text-[43.4px] pl-[152px]"
                      defaultValue="+9871629355"
                    />
                    <img
                      className="absolute w-[71.14px] h-[71.66px] top-[32px] left-[59px]"
                      alt="Phone icon"
                      src="/figmaAssets/vector-2.svg"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[12.39px]">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-[49.6px] leading-[111.6px]">
                    Password
                  </label>
                  <img
                    className="w-[1062.84px] h-[136.34px]"
                    alt="Password field"
                    src="/figmaAssets/group-90.png"
                  />
                </div>

                <div className="flex flex-col gap-[12.39px]">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-[49.6px] leading-[111.6px]">
                    Confirm Password
                  </label>
                  <img
                    className="w-[1062.84px] h-[136.34px]"
                    alt="Confirm password field"
                    src="/figmaAssets/group-90-1.png"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[14px] mt-[49.58px] ml-0">
              <Checkbox id="terms" className="w-14 h-[55px]" />
              <label
                htmlFor="terms"
                className="font-['Poppins'] font-medium text-[43.4px] leading-[111.6px]"
              >
                <span className="text-[#000000]">Agree with </span>
                <span className="text-[#6d57fc]">terms &amp; conditions</span>
              </label>
            </div>

            <div className="flex flex-col items-center gap-[74.37px] mt-[154.93px]">
              <Button className="w-[1064.84px] h-[154.93px] bg-[#4157ff] rounded-[30.99px] font-['Poppins'] font-semibold text-prima-1 text-[55.8px]">
                SIGN UP
              </Button>

              <div className="font-['Poppins'] font-medium text-[43.4px] leading-[111.6px]">
                <span className="text-[#000000]">
                  Have an account already?{" "}
                </span>
                <span className="text-[#4157ff] cursor-pointer">Log in</span>
              </div>
            </div>
          </div>
        </section>

        {/* Forgot Password Screen */}
        <section className="relative w-full max-w-[1162px] h-[2516px] mx-auto bg-prima-1 rounded-[74.37px_74.37px_0px_0px]">
          <div className="flex flex-col gap-[123.95px] pt-[592px] px-[50px]">
            <Card className="w-[1064.84px] h-[136.34px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-solid border-[#4157ff]">
              <CardContent className="p-0">
                <Input
                  className="w-full h-[136px] bg-transparent border-none font-['Poppins'] font-normal text-secona-1 text-[55.8px] px-[83px] py-[25px]"
                  placeholder="Enter your contact number"
                />
              </CardContent>
            </Card>

            <Button className="w-[1062.84px] h-[154.93px] bg-[#4157ff] rounded-[30.99px] font-['Poppins'] font-semibold text-prima-1 text-[55.8px] flex items-center gap-[27.89px] justify-center">
              <div className="relative w-[55.78px] h-[48.13px] bg-[url(/figmaAssets/vector.svg)] bg-[100%_100%]" />
              Send
            </Button>
          </div>

          <p className="absolute w-[1044px] top-[304px] left-[59px] font-['Poppins'] font-normal text-secona-1 text-[49.6px] text-center leading-normal">
            Enter your Phone number and we will share a OTP to create a new
            password.
          </p>

          <h2 className="absolute top-[180px] left-[186px] font-['Poppins'] font-semibold text-prima-2 text-[68.2px]">
            Forgot your Password?
          </h2>

          <div className="absolute w-[102px] h-[102px] top-[68px] right-[84px] bg-secona-3 rounded-[51.13px] flex items-center justify-center">
            <div className="relative w-[50px] h-[51px] bg-[url(/figmaAssets/line-8.svg)] bg-[100%_100%]">
              <img
                className="absolute w-[50px] h-[51px] top-0 left-0"
                alt="Close icon"
                src="/figmaAssets/line-9.svg"
              />
            </div>
          </div>
        </section>

        {/* Reset Password Screen */}
        <section className="relative w-full max-w-[1162px] h-[2516px] mx-auto bg-prima-1 overflow-hidden">
          <Button
            variant="ghost"
            className="absolute w-7 h-14 top-[201px] left-[70px]"
          >
            <ArrowLeftIcon className="w-[34px] h-[62px]" />
          </Button>

          <h2 className="absolute w-[499px] top-[238px] left-[378px] font-['Poppins'] font-semibold text-prima-2 text-[55.8px] text-center">
            Reset password
          </h2>

          <div className="flex flex-col gap-[61.97px] absolute top-[502px] left-[59px]">
            <div className="flex flex-col gap-[46.48px]">
              <label className="font-['Poppins'] font-medium text-[#4157ff] text-[49.6px] leading-[111.6px]">
                New Password
              </label>
              <div className="relative w-[1041.59px] h-[136.34px] rounded-[30.99px] border-[3.1px] border-solid border-[#4157ff] flex items-center">
                <span className="absolute w-[375px] h-[65px] top-[34px] left-[62px] font-['Poppins'] font-normal text-secona-1 text-[43.4px]">
                  **************
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-[46.48px]">
              <label className="font-['Poppins'] font-medium text-[#4157ff] text-[49.6px] leading-[111.6px]">
                Confirm New Password
              </label>
              <div className="relative w-[1041.59px] h-[136.34px] rounded-[30.99px] border-[3.1px] border-solid border-[#4157ff] flex items-center">
                <span className="absolute w-[375px] h-[65px] top-[34px] left-[62px] font-['Poppins'] font-normal text-secona-1 text-[43.4px]">
                  **************
                </span>
              </div>
            </div>
          </div>

          <Button className="absolute w-[1065px] h-[155px] bottom-[1022px] left-[50px] bg-[#4157ff] rounded-[30.99px] font-['Poppins'] font-semibold text-prima-1 text-[55.8px]">
            Submit
          </Button>
        </section>

        {/* Password Reset Success Screen */}
        <section className="relative w-full max-w-[1162px] h-[1100px] mx-auto bg-prima-1 rounded-[74.37px_74.37px_0px_0px]">
          <Button className="absolute w-[1065px] h-[155px] top-[734px] left-[50px] bg-[#4157ff] rounded-[30.99px] font-['Poppins'] font-semibold text-prima-1 text-[55.8px]">
            Proceed
          </Button>

          <p className="absolute w-[744px] top-[344px] left-52 font-['Poppins'] font-normal text-secona-1 text-[49.6px] text-center">
            You can now login with your new password.
          </p>

          <h2 className="absolute top-[235px] left-[198px] font-['Poppins'] font-semibold text-prima-2 text-[55.8px] text-center">
            Password reset successfull
          </h2>

          <div
            className="absolute w-[102px] h-[102px]
 top-[74px] right-[68px] bg-secona-3 rounded-[51.13px] flex items-center justify-center"
          >
            <div className="relative w-[50px] h-[51px] bg-[url(/figmaAssets/line-8.svg)] bg-[100%_100%]">
              <img
                className="absolute w-[50px] h-[51px] top-0 left-0"
                alt="Close icon"
                src="/figmaAssets/line-9.svg"
              />
            </div>
          </div>
        </section>

        {/* Verification Code Screen */}
        <section className="relative w-full max-w-[1162px] h-[2516px] mx-auto bg-white overflow-hidden">
          <Button
            variant="ghost"
            className="absolute w-[87px] h-[84px] top-[177px] left-[77px]"
          >
            <div className="relative w-[51px] h-[49px]">
              <div className="relative w-14 h-[54px] -top-0.5 -left-0.5">
                <img
                  className="absolute w-14 h-[5px] top-[25px] left-0"
                  alt="Back arrow"
                  src="/figmaAssets/vector-5.svg"
                />
                <img
                  className="absolute w-[30px] h-[54px] top-0 left-0"
                  alt="Back arrow"
                  src="/figmaAssets/vector-6.svg"
                />
              </div>
            </div>
          </Button>

          <div className="absolute w-[1079px] h-[287px] top-80 left-[77px]">
            <h2 className="absolute w-[747px] h-28 top-0 left-0 font-['Overpass'] font-bold text-[#090f47] text-[74.4px] text-center leading-[99.2px]">
              Enter the verify code
            </h2>
            <p className="absolute w-[1075px] top-[140px] left-0 font-['Overpass'] font-normal text-[#090f4773] text-[43.4px] leading-[65.1px]">
              We just send you a verification code via phone
              <br />
              +91 9265614292
            </p>
          </div>

          <div className="absolute w-[1087px] h-40 top-[702px] left-[42px]">
            <InputOTP maxLength={6} className="gap-[48px]">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPGroup key={index} className="w-[139px]">
                  <InputOTPSlot
                    index={index}
                    className="w-14 h-[123px] font-['Overpass'] font-normal text-[#090f4773] text-[70.8px]"
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>
            <div className="flex justify-between mt-8">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Separator
                  key={index}
                  className="w-[139px] h-[3px] bg-[#090f4773]"
                />
              ))}
            </div>
          </div>

          <Button className="absolute w-[1024px] h-[180px] top-[958px] left-[62px] bg-[url(/figmaAssets/rectangle.svg)] bg-[100%_100%] font-['Overpass'] font-bold text-white text-[49.7px] text-center">
            SUBMIT CODE
          </Button>

          <p className="absolute w-[796px] top-[1218px] left-[183px] font-['Overpass'] font-normal text-[#090f4773] text-[43.4px] text-center leading-[58.9px]">
            The verify code will expire in 00:59
          </p>

          <Button
            variant="link"
            className="absolute w-[297px] top-[1340px] left-[428px] font-['Overpass'] font-normal text-[#4157ff] text-[43.4px] text-center leading-[58.9px]"
          >
            Resend Code
          </Button>
        </section>

        {/* Login Success Screen */}
        <section className="relative w-full max-w-[1162px] h-[2516px] mx-auto bg-white overflow-hidden">
          <img
            className="absolute w-[833px] h-[668px] top-[533px] left-[174px]"
            alt="Success illustration"
            src="/figmaAssets/taddaaa-image.png"
          />

          <div className="absolute w-[870px] h-[408px] top-[1366px] left-[148px] text-center">
            <h2 className="font-['Overpass'] font-bold text-[#090f47] text-[74.4px] leading-[99.2px]">
              You have login successfully!!
            </h2>
            <p className="font-['Overpass'] font-light text-[#090f4773] text-[49.6px] leading-[74.4px] mt-[163px]">
              Congratulations, you have login successfully. You can start using
              the app
            </p>
          </div>

          <Button className="absolute w-[1026px] h-[140px] top-[2184px] left-[74px] bg-[url(/figmaAssets/image.png)] bg-cover bg-center font-['Overpass'] font-bold text-white text-[49.7px] text-center">
            CONTINUE
          </Button>
        </section>

        {/* Language Selection Screen */}
        <section className="relative w-full max-w-[1220px] h-[2642px] mx-auto bg-white overflow-hidden">
          <img
            className="absolute w-full h-[143px] top-0 left-0"
            alt="Header"
            src="/figmaAssets/--.png"
          />

          <Card className="absolute w-[1054px] h-[273px] top-[267px] left-[68px] bg-[#5589f40d] rounded-[45.07px] shadow-[0px_4px_26px_5px_#409f8f40]">
            <CardContent className="p-0">
              <h2 className="absolute w-[869px] top-[49px] left-[74px] font-['Inter'] font-bold text-[#1e1c1c] text-[58.6px]">
                What language would you like to learn?
              </h2>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-[58.56px] absolute top-[644px] left-[65px]">
            {languageOptions.map((language, index) => (
              <Card
                key={index}
                className="flex w-[1089.87px] items-start gap-[32.53px] px-[65.07px] py-[39.04px] bg-white rounded-[30px] border-[6px] border-solid border-[#eff1f5] shadow-[0px_3.01px_0px_#eff1f5]"
              >
                <CardContent className="p-0 flex items-center gap-[32.53px]">
                  <Checkbox className="w-[61px] h-[61px]" />
                  <span className="font-['Inter'] font-bold text-[#1e1c1c] text-[52.1px]">
                    {language}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="absolute w-[1220px] h-[111px] bottom-0 left-0 bg-white flex justify-center items-center">
            <div className="w-[436px] h-4 bg-label-colorlightprimary rounded-[325.33px]" />
          </div>
        </section>

        {/* Financial Knowledge Screen */}
        <section className="relative w-full max-w-[1220px] h-[2642px] mx-auto bg-white overflow-hidden">
          <img
            className="absolute w-full h-[143px] top-0 left-0"
            alt="Header"
            src="/figmaAssets/---1.png"
          />

          <div className="absolute w-[1220px] h-[156px] top-[143px] left-0 flex items-center">
            <Button
              variant="ghost"
              className="absolute w-[52px] h-[52px] left-[98px]"
            >
              <div className="w-[52px] h-[52px] bg-[url(/figmaAssets/icon---24-px---caretleft-.svg)] bg-[100%_100%]" />
            </Button>

            <div className="absolute w-[325px] h-5 left-[446px] bg-[#f2f2f2] rounded-[13.01px]">
              <div className="w-[65px] h-5 bg-[#000000] rounded-[13.01px]" />
            </div>
          </div>

          <Card className="absolute w-[1054px] h-[274px] top-[377px] left-[68px] bg-[#5589f40d] rounded-[45.07px] shadow-[0px_4px_26px_5px_#409f8f40]">
            <CardContent className="p-0">
              <h2 className="absolute w-[869px] top-[49px] left-[74px] font-['Inter'] font-bold text-[#1e1c1c] text-[58.6px]">
                How much do you know about Finance?
              </h2>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-[58.56px] absolute top-[755px] left-[65px]">
            {knowledgeLevels.map((level, index) => (
              <Card
                key={index}
                className="flex flex-col h-[208.21px] items-start gap-[32.53px] px-[65.07px] py-[39.04px] bg-white rounded-[30px] border-[6px] border-solid border-[#eff1f5] shadow-[0px_3.01px_0px_#eff1f5]"
              >
                <CardContent className="p-0 flex w-[959.73px] items-center gap-[32.53px]">
                  <div className="flex items-center gap-[39.04px]">
                    <div className="relative w-[110.61px] h-[110.61px]">
                      {level.bars.map((bar, barIndex) => (
                        <div
                          key={barIndex}
                          className={`absolute w-[26px] ${bar.height} ${bar.bg} rounded-[6.51px] ${
                            barIndex === 0
                              ? "top-[59px] left-[13px]"
                              : barIndex === 1
                                ? "top-9 left-[42px]"
                                : "top-[23px] left-[72px]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-['Inter'] font-bold text-[#1e1c1c] text-[45.5px]">
                      {level.level}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Practice Time Screen */}
        <section className="relative w-full max-w-[1220px] h-[2642px] mx-auto bg-white">
          <img
            className="absolute w-full h-[143px] top-0 left-0"
            alt="Header"
            src="/figmaAssets/---2.png"
          />

          <div className="absolute w-[1220px] h-[156px] top-[143px] left-0 flex items-center">
            <Button
              variant="ghost"
              className="absolute w-[52px] h-[52px] left-[98px]"
            >
              <div className="w-[52px] h-[52px] bg-[url(/figmaAssets/icon---24-px---caretleft-.svg)] bg-[100%_100%]" />
            </Button>

            <div className="absolute w-[325px] h-5 left-[446px] bg-[#f2f2f2] rounded-[13.01px]">
              <div className="w-[195px] h-5 bg-[#000000] rounded-[13.01px]" />
            </div>
          </div>

          <Card className="absolute w-[1054px] h-[274px] top-[377px] left-[68px] bg-[#5589f40d] rounded-[45.07px] shadow-[0px_4px_26px_5px_#409f8f40]">
            <CardContent className="p-0">
              <h2 className="absolute w-[869px] top-[49px] left-[74px] font-['Inter'] font-bold text-[#1e1c1c] text-[58.6px]">
                What is your daily goal for practicing?
              </h2>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-[58.56px] absolute top-[755px] left-[65px]">
            {practiceTimeOptions.map((option, index) => (
              <Card
                key={index}
                className="flex flex-col h-[208.21px] items-start gap-[32.53px] px-[65.07px] py-[39.04px] bg-white rounded-[30px] border-[6px] border-solid border-[#eff1f5] shadow-[0px_3.01px_0px_#eff1f5]"
              >
                <CardContent className="p-0 flex w-[959.73px] items-center justify-between">
                  <div className="flex items-center gap-[39.04px]">
                    <div className="relative w-[110.61px] h-[110.61px]">
                      <div
                        className={`absolute w-[26px] ${index === 0 ? "h-5 top-[68px]" : index === 1 ? "h-[26px] top-[62px]" : index === 2 ? "h-[29px] top-[59px]" : "h-5 top-[78px]"} left-[13px] ${option.color} rounded-[6.51px]`}
                      />
                      <div
                        className={`absolute w-[26px] ${index === 0 ? "h-[29px] top-[59px]" : index === 1 ? "h-9 top-[52px]" : index === 2 ? "h-[52px] top-9" : "h-[55px] top-[42px]"} left-[42px] ${option.secondColor} rounded-[6.51px]`}
                      />
                      <div
                        className={`absolute w-[26px] ${index === 0 ? "h-[39px] top-[49px]" : index === 1 ? "h-[49px] top-[39px]" : index === 2 ? "h-[68px] top-5" : "h-[85px] top-[13px]"} left-[72px] ${option.thirdColor} rounded-[6.51px]`}
                      />
                    </div>
                    <span className="font-['Inter'] font-bold text-[#1e1c1c] text-[58.6px]">
                      {option.time}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Age Selection Screen */}
        <section className="relative w-full max-w-[1220px] h-[2642px] mx-auto bg-white overflow-hidden">
          <img
            className="absolute w-full h-[143px] top-0 left-0"
            alt="Header"
            src="/figmaAssets/---3.png"
          />

          <div className="absolute w-[1220px] h-[156px] top-[143px] left-0 flex items-center">
            <Button
              variant="ghost"
              className="absolute w-[52px] h-[52px] left-[98px]"
            >
              <div className="w-[52px] h-[52px] bg-[url(/figmaAssets/icon---24-px---caretleft-.svg)] bg-[100%_100%]" />
            </Button>

            <div className="absolute w-[325px] h-5 left-[446px] bg-[#f2f2f2] rounded-[13.01px]">
              <div className="w-[260px] h-5 bg-[#1e1c1c] rounded-[13.01px]" />
            </div>
          </div>

          <Card className="absolute w-[1054px] h-[189px] top-[377px] left-[68px] bg-[#5589f40d] rounded-[45.07px] shadow-[0px_4px_26px_5px_#409f8f40]">
            <CardContent className="p-0">
              <h2 className="absolute w-[869px] top-[49px] left-[74px] font-['Inter'] font-bold text-[#1e1c1c] text-[58.6px]">
                How old are you?
              </h2>
            </CardContent>
          </Card>

          <div className="flex flex-col w-[1054px] gap-[58.56px] absolute top-[696px] left-[68px]">
            {ageGroups.map((age, index) => (
              <Card
                key={index}
                className="flex flex-col h-[164px] items-start justify-center gap-[32.53px] px-[65.07px] py-[39.04px] bg-white rounded-[30px] border-[6px] border-solid border-[#eff1f5] shadow-[0px_3.01px_0px_#eff1f5]"
              >
                <CardContent className="p-0 flex items-center gap-[39.04px]">
                  <span className="font-['Inter'] font-bold text-[#1e1c1c] text-[45.5px]">
                    {age}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="absolute w-[1220px] h-[111px] bottom-0 left-0 bg-white flex justify-center items-center">
            <div className="w-[436px] h-4 bg-label-colorlightprimary rounded-[325.33px]" />
          </div>
        </section>
      </div>
    </div>
  );
};
