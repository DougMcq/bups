import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function SearchForm({ setResultData, setIsLoading }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInputsFocussed, setIsInputsFocussed] = useState(true);
  const [isNameInputFocussed, setIsNameInputFocussed] = useState(false);
  const [isBrandInputFocussed, setIsBrandInputFocussed] = useState(false);
  const [isPartInputFocussed, setIsPartInputFocussed] = useState(false);
  const [isDescriptionInputFocussed, setIsDescriptionInputFocussed] =
    useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      part: "",
      brand: "",
      description: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
      if (!values.name) {
        setErrors({
          ...formik.errors,
          name: "Search name is required.",
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
      router.push(
        "/",
        `?SEARCHNAME=${values.name}&EMAIL=noemail&PART=${values.part}&BRAND=${values.brand}&DESCRIPTION=${values.description}`,
        { shallow: true }
      );
      try {
        const response = await axios.post(`/api/search`, {
          name: values.name,
          part: values.part,
          brand: values.brand,
          description: values.description,
        });
        const data = response.data.data;
        const slicedData = data.substring(data.search(/<!DOCTYPE/i));
        setResultData(slicedData);
        localStorage.setItem(
          "BUPSSearch",
          JSON.stringify({
            name: values.name,
            part: values.part,
            brand: values.brand,
            description: values.description,
          })
        );
        setIsSubmitting(false);
        setIsLoading(false);
        toast.success("Search results are ready.");
      } catch (error) {
        setIsSubmitting(false);
        setIsLoading(false);
        toast.error("Search result not found.");
        console.error(error);
      }
    },
  });

  const onNameFocus = () => {
    setIsInputsFocussed(false);
    setIsNameInputFocussed(true);
  };
  const onNameBlur = () => {
    setIsInputsFocussed(true);
    setIsNameInputFocussed(false);
  };
  const onBrandFocus = () => {
    setIsInputsFocussed(false);
    setIsBrandInputFocussed(true);
  };
  const onBrandBlur = () => {
    setIsInputsFocussed(true);
    setIsBrandInputFocussed(false);
  };
  const onPartFocus = () => {
    setIsInputsFocussed(false);
    setIsPartInputFocussed(true);
  };
  const onPartBlur = () => {
    setIsInputsFocussed(true);
    setIsPartInputFocussed(false);
  };
  const onDescriptionFocus = () => {
    setIsInputsFocussed(false);
    setIsDescriptionInputFocussed(true);
  };
  const onDescriptionBlur = () => {
    setIsInputsFocussed(true);
    setIsDescriptionInputFocussed(false);
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

  return (
    <div className="w-full max-w-6xl bg-gray-50 shadow sm:rounded-lg text-left mt-4 sm:mt-6 lg:mt-8 px-4 lg:px-8 pb-8">
      <form onSubmit={formik.handleSubmit}>
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
      <div className="px-4 sm:px-6 -mt-4 sm:-mt-10 sm:py-0">
        <div
          className={`${
            isInputsFocussed ? "block" : "hidden"
          } text-gray-700 text-base mt-4 sm:mt-10`}
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 space-y-1 overflow-x-hidden sm:mt-4 xl:mt-0">
            <li>Visit the BUPS tutorial on YouTube:</li>
            <a href="https://www.youtube.com/channel/UC-2uBVnWvaTXTTQgwAI1inA" target="_blank" className="text-sm">
              https://www.youtube.com/channel/UC-2uBVnWvaTXTTQgwAI1inA
            </a>
            <li>BUPS About, Press, Testimonial, etc.</li>
            <a href="http://www.boatusedpartsearch.com/" target="_blank" className="text-sm">
              http://www.boatusedpartsearch.com/
            </a>
          </ul>
        </div>
        <p className={`${isNameInputFocussed ? "block" : "hidden"} text-base`}>
          *The SEARCH NAME should only contain letters and numbers.
        </p>
        <div className={`${isBrandInputFocussed ? "block" : "hidden"} text-base`}>
          EXAMPLES FOR BRAND:
          <ul>
            <li>Sparkman & Stephens =&gt; Sparkman-stephens</li>
            <li>Johnson OR Evinrude =&gt; Johnson,Evenrude</li>
            <li>Catalina 30 =&gt; Catalina-30</li>
          </ul>
        </div>
        <div className={`${isPartInputFocussed ? "block" : "hidden"} text-base`}>
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
    </div>
  );
}