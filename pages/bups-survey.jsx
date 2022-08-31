import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import { useState } from "react";
import GeneralLayout from "../components/GeneralLayout";

const Survey = () => {
  const router = useRouter();
  const pageTitle = "Boat Used Part Search- Survey";
  const [isLoading, setIsLoading] = useState(false);
  return (
    <GeneralLayout title={pageTitle}>
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
      <main className="flex w-full flex-1 flex-col items-center text-center mb-8 max-w-6xl">
        <div className="px-4 lg:px-8 mx-auto max-w-6xl mt-4 lg:mt-8 overflow-auto text-left">
          <div className="w-full bg-gray-100 shadow sm:rounded-lg text-left mt-4 sm:mt-6 lg:mt-8 px-4 lg:px-8 pb-4 text-gray-700">
            <h3 className="font-semibold text-center pb-0 pt-4">
              BUPS Prototype Survey Form
            </h3>
            <Formik
              initialValues={{
                recommend: "yes",
                refer: "",
                feedback: "",
                alert: "yes",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.refer) {
                  errors.refer = "Required";
                }
                if (!values.feedback) {
                  errors.feedback = "Required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setIsLoading(true);
                try {
                  const response = await axios.post(`/api/survey`, {
                    recommend: values.recommend,
                    refer: values.refer,
                    feedback: values.feedback,
                    alert: values.alert,
                  });
                  const data = response.data.data;
                  if (!data) {
                    toast.success("Sending failed. Please try anytime.");
                  }
                  if (values.alert === "yes") {
                    setSubmitting(false);
                    setIsLoading(false);
                    router.push("/daily-alert");
                  } else {
                    setSubmitting(false);
                    setIsLoading(false);
                    router.push("/");
                    toast.success("Thanks for your feedback.");
                  }
                } catch (error) {
                  setSubmitting(false);
                  setIsLoading(false);
                  toast.error("Sending failed. Please try anytime.");
                  console.error(error);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6 text-base">
                        <div className="col-span-6 sm:col-span-3">
                          <div>
                            A) Would you use BUPS again and/or recommend to
                            others?
                          </div>
                          <div
                            role="group"
                            className="pt-2 flex justify-end space-x-8 px-4"
                          >
                            <label>
                              <Field
                                type="radio"
                                name="recommend"
                                value="yes"
                              />
                              Yes
                            </label>
                            <label>
                              <Field type="radio" name="recommend" value="no" />
                              No
                            </label>
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="refer" className="block ">
                            B) How did you hear about us?
                          </label>
                          <Field
                            type="text"
                            name="refer"
                            autoComplete="refer"
                            placeholder="Your referral?"
                            className="mt-1 focus:ring-gray-500 placeholder: focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="refer"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="feedback" className="block ">
                            C) Please provide feedback regarding your BUPS
                            experience.
                          </label>
                          <Field
                            as="textarea"
                            type="text"
                            name="feedback"
                            autoComplete="feedback"
                            placeholder="Your feedback here."
                            className="mt-1 focus:ring-gray-500 placeholder: focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="feedback"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <div>
                            D) Would you be willing to spend $10 for a year’s
                            worth of daily searches that would include:
                            <ul className="pl-8 list-decimal text-sm">
                              <li>
                                Review & optimization of your search taking into
                                account 5+ years of search experience as well as
                                advanced search features.
                              </li>
                              <li>
                                Access to an additional 5-10M “fresh” online
                                listings during this year.
                              </li>
                              <li>
                                Immediate access to tens of thousands of used
                                boat parts not listed online from salvage yards,
                                consignment stores, etc.
                              </li>
                            </ul>
                          </div>
                          <div
                            role="group"
                            className="pt-4 flex justify-end space-x-8 px-4"
                          >
                            <label>
                              <Field type="radio" name="alert" value="yes" />
                              Yes
                            </label>
                            <label>
                              <Field type="radio" name="alert" value="no" />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded-md text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            {isLoading && <Loader />}
          </div>
        </div>
      </main>
    </GeneralLayout>
  );
};

export default Survey;
