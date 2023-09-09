import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import classnames from "classnames";
import { Button, CircularProgress } from '@mui/material';

import classes from "./Addnewurl.module.css";
import { useNavigate } from "react-router-dom";

const AddnewUrl = () => {
  const[isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = (newEntryData) => {
    setIsSubmitting(true);
    axios.post("/api/addNew", newEntryData).then((res) => {
      reset();
      setIsSubmitting(false);
      navigate("/");
    });
  };

  return (
    <div className={classes.addnewurl}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Add new url</legend>
          <div className={classnames(classes.m_1, classes.mb_2)}>
            <label htmlFor="name" className={classes.form_label}>
              {" "}
              Website{" "}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Website Name"
              className={classnames(
                classes.form_input,
                errors.name && errors.name.type === "required"
                  ? classes.form_error
                  : "",
              )}
              {...register("name", {
                required: true,
              })}
            />
          </div>

          <div className={classnames(classes.m_1, classes.mb_2)}>
            <label htmlFor="dr" className={classes.form_label}>
              Dr
            </label>
            <input
              type="text"
              name="dr"
              id="dr"
              placeholder="Dr"
              className={classnames(
                classes.form_input,
                errors.dr && errors.dr.type === "required"
                  ? classes.form_error
                  : "",
              )}
              {...register("dr", {
                required: true,
              })}
            />
          </div>

          <div className={classnames(classes.m_1, classes.mb_2)}>
            <label htmlFor="email" className={classes.form_label}>
              Contact email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Contact email"
              className={classnames(
                classes.form_input,
                errors.email && errors.email.type === "required"
                  ? classes.form_error
                  : "",
              )}
              {...register("email", {
                required: true,
              })}
            />
          </div>

          <div className={classnames(classes.m_1, classes.mb_2)}>
            <label htmlFor="price" className={classes.form_label}>
              Price paid (€)
            </label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price paid (€)"
              className={classnames(
                classes.form_input,
                errors.price && errors.price.type === "required"
                  ? classes.form_error
                  : "",
              )}
              {...register("price", {
                required: true,
              })}
            />
          </div>

          <div className={classnames(classes.m_1, classes.mb_2)}>
            <label htmlFor="linkUrl" className={classes.form_label}>
              Link URL
            </label>
            <input
              type="text"
              name="linkUrl"
              id="linkUrl"
              placeholder="Link URL"
              className={classnames(
                classes.form_input,
                errors.linkUrl && errors.linkUrl.type === "required"
                  ? classes.form_error
                  : "",
              )}
              {...register("linkUrl", {
                required: true,
              })}
            />
          </div>

          <div className={classnames(classes.m_1, classes.mb_2)}>
            <label htmlFor="anchorText" className={classes.form_label}>
              Anchor text
            </label>
            <input
              type="text"
              name="anchorText"
              id="anchorText"
              placeholder="anchor text"
              className={classnames(
                classes.form_input,
                errors.anchortext && errors.anchortext.type === "required"
                  ? classes.form_error
                  : "",
              )}
              {...register("anchorText", {
                required: true,
              })}
            />
          </div>

          <div className={classnames(classes.m_1, classes.mb_2)}>
            <label htmlFor="targetUrl" className={classes.form_label}>
              Target Url
            </label>
            <input
              type="text"
              name="targetUrl"
              id="targetUrl"
              placeholder="targeturl"
              className={classnames(
                classes.form_input,
                errors.targeturl && errors.targeturl.type === "required"
                  ? classes.form_error
                  : "",
              )}
              {...register("targetUrl", {
                required: true,
              })}
            />
          </div>

          <div className={classes.form_button}>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Submit"}
            </Button>
          </div>
          
        </fieldset>
      </form>
    </div>
  );
};

export default AddnewUrl;
