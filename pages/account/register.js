import React, { useState, useEffect, useRef } from "react";

// NextJs
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import Input from "../../components/form/Input";

// Auth
import { getSession } from "next-auth/react";
import { fullNameVal, emailVal } from "../../utils/validationHandler";
const Register = () => {
  const router = useRouter();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
  const [inputs, setInputs] = useState(initialValues);
  const [errorMessages, setErrorMessages] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (errorMessages.length > 0) return;
    //POST form values
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    //Await for data for any desirable next steps
    if (res.status != 201) {
      const data = await res.json();

      setErrorMessages([...data.map((e) => e)]);
      return;
    }
    // MUST SEND A EMAIL FOR VERIFICATION
    await fetch("/api/account/forgotten/verifyingAcc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: inputs.email }),
    });
    // Redirect
    router.push("/account/verifyRegistration");
  };
  const formHandlerInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  useEffect(() => {
    const inputEntries = Object.entries(inputs);

    const isTrue = [];
    const errors = [];

    for (let [key, value] of inputEntries) {
      if (!value) isTrue.push(false);
    }
    if (inputs.fullName.length > 0) {
      const fullNameCheck = fullNameVal(inputs.fullName);
      if (!fullNameCheck.result) errors.push(fullNameCheck.message);
    }

    if (inputs.email.length > 0) {
      const emailCheck = emailVal(inputs.email);

      if (!emailCheck.result) errors.push(emailCheck.message);
    }
    if (inputs.password != inputs.repeatPassword)
      errors.push("???????????????? ???????????? ???? ????????????????");

    if (errors.length > 0) {
      setErrorMessages([...errors]);
      return;
    } else setErrorMessages([]);

    if (isTrue.length == 0) setDisabled(false);
    else setDisabled(true);
  }, [inputs]);
  return (
    <>
      <Head>
        <title>IvdaGeo register page</title>
        <meta name="description" content="???????????? ?????????????? IvdaGeo" />
      </Head>

      <main>
        <div className="container flex justify-center my-24">
          <div className="w-full bg-white rounded shadow-xl lg:w-1/2">
            <div className="mt-5 ml-8">
              <h3 className="text-2xl">?????????????????????????? ????, ??????????????????!</h3>
              <p className="mt-1">
                ???????? ?????????? ?????????????
                <Link href="/account/login">
                  <span className="ml-1 cursor-pointer text-primary-lighter hover:font-bold">
                    ????????
                  </span>
                </Link>
              </p>
              {errorMessages && (
                <div className="my-2 font-medium text-center text-secondary">
                  <ul>
                    {errorMessages &&
                      errorMessages.map((e) => {
                        return <li key={e}>{e}</li>;
                      })}
                  </ul>
                </div>
              )}
            </div>

            <form
              className="px-8 pt-1 pb-8 mt-6 mb-4"
              onChange={(e) => formHandlerInputs(e)}
              onSubmit={(e) => onFormSubmit(e)}
            >
              <Input
                placeholder="?????? ?? ??????????????"
                type="text"
                id="fullName"
                isReq={true}
                iconType="fullName"
                val={inputs.fullName}
              />
              <Input
                placeholder="??-????????"
                type="email"
                id="email"
                isReq={true}
                iconType="email"
                val={inputs.email}
              />
              <Input
                placeholder="????????????"
                type="password"
                id="password"
                isReq={true}
                iconType="password"
                val={inputs.password}
              />
              <Input
                placeholder="???????????????????? ????????????????"
                type="password"
                id="repeatPassword"
                isReq={true}
                iconType="password"
                val={inputs.repeatPassword}
              />
              {/* <div className="flex justify-between mb-2 select-none">
                <div>
                  <input
                    className="w-4 h-4 mt-1 mr-2 align-top border-gray accent-primary-lighter"
                    type="checkbox"
                    id="term????nd??onditions"
                    value="term????nd??onditions"
                  />
                  <label
                    className="inline-block form-check-label"
                    htmlFor="term????nd??onditions"
                  >
                    ??????????????
                    <Link href="/rulesAndPrivacy">
                      <span className="mx-1 cursor-pointer text-primary-lighter hover:underline">
                        ?????????????????? ?? ??????????????????
                      </span>
                    </Link>
                    ???? ??????????????
                  </label>
                </div>
              </div>
              <div className="flex justify-between mb-5 select-none">
                <div>
                  <input
                    className="w-4 h-4 mt-1 mr-2 align-top border-gray accent-primary-lighter"
                    type="checkbox"
                    id="personalData"
                    value="personalData"
                  />
                  <label
                    className="inline-block form-check-label"
                    htmlFor="personalData"
                  >
                    ??????????????
                    <Link href="/rulesAndPrivacy">
                      <span className="mx-1 cursor-pointer text-primary-lighter hover:underline">
                        ?????????????????? ???? ?????????????????????????? ???? ?????????? ??????????
                      </span>
                    </Link>
                    ???? ??????????????
                  </label>
                </div>
              </div> */}
              <div className="flex items-center justify-center ">
                <button
                  className="w-full px-4 py-2 font-bold text-white rounded shadow-md disabled:opacity-25 bg-primary hover:bg-primary focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={disabled}
                >
                  ??????????????????????
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
