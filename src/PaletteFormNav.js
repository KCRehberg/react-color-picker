import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useStyles from "./styles/PaletteFormNavStyles";

function PaletteFormNav(props) {
  const classes = useStyles();
  const {
    handleDrawerOpen,
    handleSubmit,
    newPaletteName,
    handlePaletteName,
    palettes,
  } = props;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <AddToPhotosIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handlePaletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
            <Link to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PaletteFormNav;
