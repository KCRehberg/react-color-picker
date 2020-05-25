import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      newPaletteName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handlePaletteName = (evt) => {
    this.setState({
      newPaletteName: evt.target.value,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  savePalette = (emoji) => {
    let newName = this.state.newPaletteName;
    const newPalette = {
      paletteName: newName,
      emoji: emoji.native,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.props.colors,
    };
    this.props.savePalette(newPalette);
    this.props.history.push("/");
    this.setState({ stage: "emoji" });
  };

  showEmojiPicker() {
    this.setState({ stage: "emoji" });
  }

  render() {
    const { hideForm } = this.props;
    return (
      <div>
        <Dialog open={this.state.stage === "emoji"} onClose={hideForm}>
          <Picker onSelect={this.savePalette}/>
        </Dialog>
        <Dialog
          open={this.state.stage === "form"}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure
                it's unique!
              </DialogContentText>

              <TextValidator
                label="Palette Name"
                value={this.state.newPaletteName}
                name="newPaletteName"
                onChange={this.handlePaletteName}
                fullWidth
                margin="normal"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already used"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
