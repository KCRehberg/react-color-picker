import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {
  render() {
    const {
      paletteIsFull,
      currentColor,
      updateCurrentColor,
      addNewColor,
      colorName,
      handleNameChange,
      classes,
    } = this.props;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm
          onSubmit={addNewColor}
          ref="form"
          instantValidate={false}
        >
          <TextValidator
            value={colorName}
            className={classes.colorNameInput}
            placeholder="Color Name"
            name="colorName"
            variant="filled"
            margin="normal"
            onChange={handleNameChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a color name",
              "Color name must be unique",
              "Color already used!",
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={paletteIsFull}
            className={classes.addColor}
            style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
