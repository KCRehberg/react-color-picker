import React, { useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm";
import ColorPickerForm from "./ColorPickerForm";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import { ValidatorForm } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";
import useStyles from "./styles/NewPaletteFormStyles";
import seedColors from "./seedColors";

function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setColor] = React.useState("teal");
  const [colorName, setName] = React.useState("");
  const [colors, updateColors] = React.useState(seedColors[0].colors);
  const [formShowing, updateFormShowing] = React.useState(false);
  const maxColors = 20;
  const paletteIsFull = colors.length >= maxColors;

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== currentColor)
    );
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    setColor(newColor.hex);
  };

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: colorName,
    };
    updateColors([...colors, newColor]);
    setName("");
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        (color) => color.name === randomColor.name
      );
    }
    updateColors([...colors, randomColor]);
  };

  const removeColor = (colorName) => {
    updateColors(colors.filter((color) => color.name !== colorName));
  };

  const clearColors = () => {
    updateColors([]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    updateColors(arrayMove(colors, oldIndex, newIndex));
  };

  const showForm = () => {
    updateFormShowing(!formShowing);
  };

  return (
    <div className={classes.root}>
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
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              className={classes.navBtn}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={showForm}
            className={classes.navBtn}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={props.palettes}
          colors={colors}
          savePalette={props.savePalette}
          history={props.history}
          hideForm={showForm}
        />
      )}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            currentColor={currentColor}
            updateCurrentColor={updateCurrentColor}
            addNewColor={addNewColor}
            colorName={colorName}
            handleNameChange={handleNameChange}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={10}
        />
      </main>
    </div>
  );
}

export default NewPaletteForm;
