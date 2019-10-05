import React from "react";
import withStyles from "@material-ui/styles/withStyles";
import { Field, reduxForm } from "redux-form";
import {
  RadioGroup,
  MenuItem,
  TextField,
  Checkbox,
  Select,
  Radio,
  Button
} from "@material-ui/core";
import validate from "./validate";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    margin="normal"
    Error={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
);

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const renderSelect = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <Select
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);

const ProductionForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="name"
          component={renderTextField}
          label="Lệnh sản xuất số"
        />
      </div>
      <div>
        <Field name="name" component={renderTextField} label="Số lượng" />
      </div>

      <div>
        <Button type="submit" disabled={pristine || submitting}>
          Submit
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </div>
    </form>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["A500"],
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    marginTop: 20,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    width: 1000
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default withStyles(styles)(
  reduxForm({
    form: "ProductionForm", // a unique identifier for this form
    validate
  })(ProductionForm)
);
