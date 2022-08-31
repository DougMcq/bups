import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import GeneralLayout from "../components/GeneralLayout";
import emailjs from "@emailjs/browser";

const pageTitle = "Boat Used Part Search- Daily Alert";

const DailyAlert = () => {
  const router = useRouter();
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailInputFocussed, setIsEmailInputFocussed] = useState(false);
  const [isNameInputFocussed, setIsNameInputFocussed] = useState(false);
  const [isBrandInputFocussed, setIsBrandInputFocussed] = useState(false);
  const [isPartInputFocussed, setIsPartInputFocussed] = useState(false);
  const [isDescriptionInputFocussed, setIsDescriptionInputFocussed] =
    useState(false);
  const [lastSearched, setLastSearched] = useState({
    name: "",
    part: "",
    brand: "",
    description: "",
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("BUPSSearch"));
    if (items) {
      setLastSearched(items);
      setIsLoaded(true);
    }
    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: lastSearched.name,
      part: lastSearched.part,
      brand: lastSearched.brand,
      description: lastSearched.description,
      additionalInfo: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
      if (!values.name) {
        setErrors({
          ...formik.errors,
          name: "Search name is required.",
        });
        return;
      } else if (!values.email) {
        setErrors({
          ...formik.errors,
          email: "Email is required.",
        });
        return;
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        setErrors({
          ...formik.errors,
          email: "Invalid email address.",
        });
        return;
      } else if (!values.part & !values.brand & !values.description) {
        setErrors({
          ...formik.errors,
          brand: "At least one search term is required.",
        });
        return;
      }
      setIsSubmitting(true);
      setIsLoading(true);
      try {
        const response = await axios.post(`/api/dailyAlert`, {
          name: values.name,
          part: values.part,
          brand: values.brand,
          description: values.description,
          email: values.email,
        });
        emailjs
          .send(`${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`, `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`, values, `${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`).then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );

        const data = response.data.data;
        if (!data) {
          toast.success("Sending failed. Please try anytime.");
        }
        setIsSubmitting(false);
        setIsLoading(false);
        router.push("/");
        toast.success(
          "You'll hear from us shortly about your requested alert."
        );
      } catch (error) {
        setIsSubmitting(false);
        setIsLoading(false);
        toast.error("Sending failed. Please try anytime.");
        console.error(error, "here is the error");
      }
    },
  });

  const onNameFocus = () => {
    setIsNameInputFocussed(true);
  };
  const onNameBlur = () => {
    setIsNameInputFocussed(false);
  };
  const onBrandFocus = () => {
    setIsBrandInputFocussed(true);
  };
  const onBrandBlur = () => {
    setIsBrandInputFocussed(false);
  };
  const onPartFocus = () => {
    setIsPartInputFocussed(true);
  };
  const onPartBlur = () => {
    setIsPartInputFocussed(false);
  };
  const onDescriptionFocus = () => {
    setIsDescriptionInputFocussed(true);
  };
  const onDescriptionBlur = () => {
    setIsDescriptionInputFocussed(false);
  };
  const onEmailFocus = () => {
    setIsEmailInputFocussed(true);
  };
  const onEmailBlur = () => {
    setIsEmailInputFocussed(false);
  };

  const onNameChange = (e) => {
    const value = e.target.value;
    if (!/^[A-Za-z0-9]+$/g.test(value) & (value.length > 0)) {
      formik.setFieldError(
        "name",
        "Search name can only contain letters and numbers."
      );
      return;
    }

    formik.setFieldValue("name", value);
  };
  const onBrandChange = (e) => {
    const value = e.target.value;
    if (!/^[A-Za-z0-9\-,]+$/g.test(value) & (value.length > 0)) {
      formik.setFieldError(
        "brand",
        "Search brand should only contain letters, numbers, hyphens and commas."
      );
      return;
    } else {
      formik.setFieldValue("brand", value);
    }
  };
  const onPartChange = (e) => {
    const value = e.target.value;
    if (!/^[A-Za-z0-9\-,]+$/i.test(value) & (value.length > 0)) {
      formik.setFieldError(
        "part",
        "Search part should only contain letters, numbers, hyphens and commas."
      );
      return;
    }

    formik.setFieldValue("part", value);
  };
  const onDescriptionChange = (e) => {
    const value = e.target.value;
    if (!/^[A-Za-z0-9\-,]+$/i.test(value) & (value.length > 0)) {
      formik.setFieldError(
        "description",
        "Search description should only contain letters, numbers, hyphens and commas."
      );
      return;
    }

    formik.setFieldValue("description", value);
  };
  const onEmailChange = (e) => {
    const value = e.target.value;
    if (!/^[A-Za-z0-9@._%+-]+$/i.test(value) & (value.length > 0)) {
      formik.setFieldError("email", "Invalid email address.");
      return;
    }

    formik.setFieldValue("email", value);
  };

  const onAdditionalInformationChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue("additionalInfo", value);
  };

  return (
    <GeneralLayout name={pageTitle}>
      <div className="text-center grid place-items-center bg-hero p-6 w-full relative">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="max-w-5xl flex flex-col items-center justify-center text-white font-bold text-2xl my-12 z-10">
          <h1>
            Boat Used Part Search (BUPS) is a free search service for US
            boaters. BUPS strives to keep boaters on the water & parts out of
            the landfill by matching buyers with sellers of used, re-built, NOS,
            vintage, NLA & clearance boat parts.
          </h1>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col items-center text-center max-w-6xl my-8">
        <div className="w-full max-w-6xl bg-gray-50 shadow sm:rounded-lg text-left mt-4 sm:mt-6 lg:mt-8 px-4 lg:px-8 pb-4">
          <h3 className="pt-4">What happens after submit?</h3>
          <ul className="pt-4 list-none space-y-4">
            <li>
              {`A.  You will receive an email from us with more information within 1-2 days.`}
            </li>
            <li>
              {`B.    Your search will run daily for one year (earlier if you ask us to stop).`}
            </li>
            <li>
              {`C.    Your request will be forwarded to our collaborating sellers with "offline" inventory.`}
            </li>
          </ul>
          {isLoaded && (
            <form onSubmit={formik.handleSubmit} ref={form}>
              <div className="overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 uppercase"
                      >
                        Search Name:
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={(e) => onNameChange(e)}
                        onFocus={onNameFocus}
                        onBlur={onNameBlur}
                        autoComplete="name"
                        placeholder="Name Your BUPS Search."
                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {formik.errors?.name && (
                        <div className="text-sm text-red-500">
                          {formik.errors?.name}
                        </div>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="brand"
                        className="block text-sm font-medium text-gray-700 uppercase"
                      >
                        Brand:
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formik.values.brand}
                        onChange={(e) => onBrandChange(e)}
                        onFocus={onBrandFocus}
                        onBlur={onBrandBlur}
                        autoComplete="brand"
                        placeholder="Enter the search brand."
                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {formik.errors?.brand && (
                        <div className="text-sm text-red-500">
                          {formik.errors?.brand}
                        </div>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="part"
                        className="block text-sm font-medium text-gray-700 uppercase"
                      >
                        Part:
                      </label>
                      <input
                        type="text"
                        name="part"
                        value={formik.values.part}
                        onChange={(e) => onPartChange(e)}
                        onFocus={onPartFocus}
                        onBlur={onPartBlur}
                        autoComplete="part"
                        placeholder="Enter the search part."
                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {formik.errors?.part && (
                        <div className="text-sm text-red-500">
                          {formik.errors?.part}
                        </div>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 uppercase"
                      >
                        Description:
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={formik.values.description}
                        onChange={(e) => onDescriptionChange(e)}
                        onFocus={onDescriptionFocus}
                        onBlur={onDescriptionBlur}
                        autoComplete="description"
                        placeholder="Enter search terms not brand nor part."
                        className="mt-1 focus:ring-gray-500 placeholder: focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {formik.errors?.description && (
                        <div className="text-sm text-red-500">
                          {formik.errors?.description}
                        </div>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 uppercase"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={(e) => onEmailChange(e)}
                        onFocus={onEmailFocus}
                        onBlur={onEmailBlur}
                        autoComplete="email"
                        placeholder="Enter your email address."
                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {formik.errors?.email && (
                        <div className="text-sm text-red-500">
                          {formik.errors?.email}
                        </div>
                      )}
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="additionalInfo"
                        className="block text-sm font-medium text-gray-700 uppercase"
                      >
                        Additional Search Information:
                      </label>
                      <input
                        type="text"
                        name="additionalInfo"
                        value={formik.values.additionalInfo}
                        onChange={(e) => onAdditionalInformationChange(e)}
                        autoComplete="additionalInfo"
                        placeholder="Provide additional search information if available."
                        className="mt-1 focus:ring-gray-500 placeholder: focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
          <div className="px-4 sm:px-6 sm:py-0">
            <p
              className={`${
                isEmailInputFocussed ? "block" : "hidden"
              } text-base`}
            >
              *A valid email address example (yourname@gmail.com).
            </p>
            <p
              className={`${
                isNameInputFocussed ? "block" : "hidden"
              } text-base`}
            >
              *The SEARCH NAME should only contain letters and numbers.
            </p>
            <div
              className={`${
                isBrandInputFocussed ? "block" : "hidden"
              } text-base`}
            >
              EXAMPLES FOR BRAND:
              <ul>
                <li>Sparkman & Stephens =&gt; Sparkman-stephens</li>
                <li>Johnson OR Evinrude =&gt; Johnson,Evenrude</li>
                <li>Catalina 30 =&gt; Catalina-30</li>
              </ul>
            </div>
            <div
              className={`${
                isPartInputFocussed ? "block" : "hidden"
              } text-base`}
            >
              EXAMPLES FOR PART:
              <ul>
                <li>Prop OR propeller =&gt; prop,propeller</li>
                <li>Running gear =&gt; running-gear</li>
                <li>
                  Shaft OR Strat Or Running gear =&gt; shaft,strut,running-gear
                </li>
              </ul>
            </div>
            <div
              className={`${
                isDescriptionInputFocussed ? "block" : "hidden"
              } text-base`}
            >
              EXAMPLES FOR DESCRIPTION:
              <ul>
                <li>Stainless OR SS =&gt; stainless,ss</li>
                <li>Left Hand =&gt; left-hand</li>
                <li>Left Hand OR LH =&gt; left-hand,lh</li>
              </ul>
            </div>
          </div>
          {isLoading && <Loader />}
        </div>
      </div>
    </GeneralLayout>
  );
};

export default DailyAlert;
