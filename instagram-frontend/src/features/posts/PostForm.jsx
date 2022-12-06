import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Wizard = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form>
          <p>
            Step {stepNumber + 1} of {totalSteps}
          </p>
          {step}
          <div style={{ display: "flex" }}>
            {stepNumber > 0 && (
              <button onClick={() => previous(formik.values)} type="button">
                Back
              </button>
            )}
            <div>
              <button disabled={formik.isSubmitting} type="submit">
                {isLastStep ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const WizardStep = ({ children }) => children;

const PostForm = () => (
  <div>
    <p>A multi-step form for post</p>
    <Wizard
      initialValues={{
        images: [],
      }}
      onSubmit={async (values) =>
        sleep(300).then(() => console.log("Wizard submit", values))
      }
    >
      <WizardStep
        onSubmit={(values, props) => {
          let data = new FormData();
          values.images.forEach((image, index) => {
            data.append(`image${index}`, image);
          });
        }}
        validationSchema={Yup.object({
          images: Yup.array().min(1, "Upload atleast 1 image."),
        })}
      >
        <div>
          <label htmlFor="images">Image</label>
          <Field
            id="images"
            name="images"
            type="file"
            multiple
            onChange={(event) => {
              const files = event.target.files;
              let myFiles = Array.from(files);
              formik.setFieldValue("images", myFiles);
            }}
          />
          <ErrorMessage className="error" component="div" name="image" />
        </div>
      </WizardStep>
      <WizardStep
        onSubmit={() => console.log("Step2 onSubmit")}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("required"),
        })}
      >
        <div>
          <label htmlFor="email">Email</label>
          <Field
            autoComplete="email"
            component="input"
            id="email"
            name="email"
            placeholder="Email"
            type="text"
          />
          <ErrorMessage className="error" component="div" name="email" />
        </div>
      </WizardStep>
    </Wizard>
  </div>
);

export default PostForm;
