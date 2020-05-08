import Container from "@material-ui/core/Container";
import PublicationTree from "../components/PublicationTree.component";
import DocumentsGrid from "../components/DocumentsGrid.component";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));



export default function MainCointainer() {
    const publicationTree = <PublicationTree />;
    const documentsGridTree = <DocumentsGrid />;
    const [containerComponent] = React.useState(publicationTree);
    const classes = useStyles();
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

    function changeLayout(layoutId) {
        console.log(layoutId);
    }

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
          {containerComponent}
      </Container>
      <Box pt={4}>
        <Copyright />
      </Box>
    </div>
  );
}
