import React from 'react';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MainListItems from "./MainListItems";
import SecondaryListItems from "./SecondaryListItems";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Logo from "../images/logo.png";
import BucketsTree from "../components/BucketsTree.component";
import DocumentsGrid from "../components/DocumentsGrid.component";
import TreeGrid from "../components/TreeGrid.component";
import Users from "../components/Users.component"
import { Provider } from 'react-redux';
import { store } from '../redux/Redux';
import Exaple from "../redux/Example";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Priint
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: "10px",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: "#00b0bc",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height:'85%',
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {

  const bucketsTree = <BucketsTree />;
  let contentTreeGridLayout = null;
  let documentsGrid = null;
  let usersLayout = null;
  let flatPlanning = null;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentLayoutState, setCurrentLayoutState] = React.useState(bucketsTree);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeLayout = (layoutId) => {
    if("content" === layoutId){
      setCurrentLayoutState(bucketsTree);
    } else if("documents" === layoutId){
      if(documentsGrid == null){
        documentsGrid = <DocumentsGrid />;
      }
      setCurrentLayoutState(documentsGrid);
    } else if("contentTreeGrid" === layoutId){
      if(contentTreeGridLayout == null){
        contentTreeGridLayout = <TreeGrid />;
      }
      setCurrentLayoutState(contentTreeGridLayout);
    }  else if("users" === layoutId){
      if(usersLayout == null){
        usersLayout = <Users />;
      }
      setCurrentLayoutState(usersLayout);
    } else if("flat_planning" === layoutId){
      if(flatPlanning == null){
        flatPlanning = <Provider store={store}>
          <Exaple />
        </Provider>;
      }
      setCurrentLayoutState(flatPlanning);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} className={classes.logo} alt="PriintSuite logo" />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            priint:suite
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{<MainListItems changeLayout={changeLayout} />}</List>
        <Divider />
        <List>{<SecondaryListItems changeLayout={changeLayout}/>}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {currentLayoutState}
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
