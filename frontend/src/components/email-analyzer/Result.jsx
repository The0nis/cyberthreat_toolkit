import React from "react";
import { useState } from "react";
import dompurify from "dompurify";
import moment from "moment";

import Email from "../ioc-analyzer/Email.jsx";
import Hash from "../ioc-analyzer/Hash.jsx";
import OpenAi from "./ShowOpenAiAnswer.jsx";
import Url from "../ioc-analyzer/Url.jsx";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import Alert from "@mui/material/Alert";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import DescriptionIcon from "@mui/icons-material/Description";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import HorizontalSplitIcon from "@mui/icons-material/HorizontalSplit";
import InfoIcon from "@mui/icons-material/Info";
import LinkIcon from "@mui/icons-material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import ReplyIcon from "@mui/icons-material/Reply";
import RouteIcon from "@mui/icons-material/Route";
import SubjectIcon from "@mui/icons-material/Subject";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ThreePIcon from "@mui/icons-material/ThreeP";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function Result(props) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const card_style = {
    p: 2,
    mt: 2,
    backgroundColor: theme.palette.background.card,
    boxShadow: 0,
    borderRadius: 5,
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const tableCellStyle = {
    backgroundColor: theme.palette.background.tablecell,
  };

  const tableContainerStyle = {
    borderRadius: 5,
    maxWidth: "95%",
    boxShadow: 0,
    border: 0,
    borderColor: "lightgrey",
    m: 2,
  };

  const result = props.result;

  console.log("result----", result);
  const ioc = result?.meta?.file_info?.sha1;
  const stats = result?.data?.attributes?.stats;
  const results = result?.data?.attributes?.results;
  console.log("results", results?.ALYac?.category);

  const [showHashAnalysisAttachements, setShowHashAnalysisAttachements] =
    React.useState(false);
  function hashAnalysis(props) {
    return (
      <>
        <br />
        <br />
        <Hash ioc={ioc} />
        <br />
      </>
    );
  }

  const [showHashAnalysisEml, setShowHashAnalysisEml] = React.useState(false);
  function hashAnalysisEml(props) {
    const ioc = props;
    return (
      <>
        <br />
        <br />
        <Hash ioc={ioc} />
        <br />
      </>
    );
  }

  const [showEmailAnalyse, setShowEmailAnalyse] = React.useState(false);
  function emailAnalyse(props) {
    const ioc = props;
    return (
      <>
        <br />
        <br />
        <Email ioc={ioc} />
        <br />
      </>
    );
  }

  const [url, setUrl] = React.useState(null);
  const [showUrlAnalyse, setShowUrlAnalyse] = React.useState(false);
  function urlAnalyse(props) {
    return (
      <>
        <br />
        <br />
        <Url ioc={url} />
        <br />
      </>
    );
  }

  const extractEmailAddress = (inputString) => {
    const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
    const matches = inputString.match(emailRegex);
    if (matches && matches.length > 0) {
      return matches[0];
    } else {
      return null;
    }
  };

  // console.log("stats", result?.data?.attributes?.stats);

  function showHeaderFields() {
    if (result?.results != null) {
      return (
        <>
          <TableContainer component={Paper} sx={tableContainerStyle}>
            <Table aria-label="simple table" sx={tableCellStyle}>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={tableCellStyle}>
                    {" "}
                    <b> Keys </b>{" "}
                  </TableCell>
                  <TableCell align="left" sx={tableCellStyle}>
                    {" "}
                    <b> Value </b>{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              {Object.entries(result?.results).map((key, index) => (
                <React.Fragment key={index}>
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{Object.keys(key[1])}</TableCell>
                      <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                        {Object.values(key[1])}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </React.Fragment>
              ))}
            </Table>
          </TableContainer>
        </>
      );
    }
  }

  function showUrls() {
    if (result?.links?.length > 0) {
      return (
        <React.Fragment key="urls_fragment">
          <TableContainer component={Paper} sx={tableContainerStyle}>
            <Table aria-label="simple table" sx={tableCellStyle}>
              <TableBody>
                {result?.links?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      {row}
                    </TableCell>
                    <TableCell sx={{ overflowWrap: "anywhere" }}>
                      <Button
                        variant="outlined"
                        disableElevation
                        size="small"
                        onClick={() => {
                          setShowUrlAnalyse(!showUrlAnalyse);
                          setUrl(row);
                        }}
                        sx={{ float: "right", whiteSpace: "nowrap" }}
                      >
                        Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {showUrlAnalyse ? urlAnalyse(url) : <></>}
        </React.Fragment>
      );
    } else {
      return <p>No URLs found...</p>;
    }
  }

  return (
    <>
      {/* General information card */}
      <Grow in={true}>
        <Card key={"ema_general_info_card"} sx={card_style}>
          <h2>
            <InfoIcon /> General information
          </h2>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    {" "}
                    <PersonIcon />{" "}
                  </ListItemIcon>
                  <ListItemText
                    // primary={result?.attributes?.date}
                    primary={moment
                      .unix(result?.data?.attributes?.date)
                      .format("DD/MM/YYYY")}
                    secondary="From"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {" "}
                    <ReplyIcon />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      result?.data?.meta?.file_info?.size
                        ? result?.data?.meta?.file_info?.size
                        : "N/A"
                    }
                    secondary="Reply To"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {" "}
                    <ThreePIcon />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={moment
                      .unix(result?.data?.attributes?.date)
                      .format("DD/MM/YYYY")}
                    secondary="To"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {" "}
                    <CalendarMonthIcon />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={moment
                      .unix(result?.data?.attributes?.date)
                      .format("DD/MM/YYYY")}
                    secondary="Date"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {" "}
                    <SubjectIcon />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={result?.data?.type}
                    secondary="Subject"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" component="div">
                <b>Hash values of the .eml file itself</b>
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    {" "}
                    <DescriptionIcon />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={result?.meta?.file_info?.md5}
                    secondary="MD5"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {" "}
                    <DescriptionIcon />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={result?.meta?.file_info?.sha1}
                    secondary="SHA1"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {" "}
                    <DescriptionIcon />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={result?.meta?.file_info?.sha256}
                    secondary="SHA256"
                  />
                </ListItem>
              </List>
              <Button
                variant="outlined"
                disableElevation
                size="small"
                onClick={() => setShowHashAnalysisEml(!showHashAnalysisEml)}
                sx={{ float: "left" }}
              >
                Analyze .eml hash
              </Button>
            </Grid>
          </Grid>
          {showHashAnalysisEml
            ? hashAnalysisEml(result?.meta?.file_info?.md5)
            : null}
          {showEmailAnalyse &&
          emailAnalyse(extractEmailAddress(result?.data?.links?.self)) != null
            ? emailAnalyse(extractEmailAddress(result?.data?.links?.self))
            : null}
        </Card>
      </Grow>

      {/* Basic security checks card */}
      <Grow in={true}>
        <Card key={"ema_basic_checks_card"} sx={card_style}>
          <h2>
            <VerifiedUserIcon /> Basic security checks
          </h2>
          {/* {showWarnings()} */}

          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Malicious — <strong>{stats?.malicious}</strong>
            </Alert>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              Failure — <strong>{stats?.failure}</strong>
            </Alert>
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              Undetected — <strong>{stats?.undetected}</strong>
            </Alert>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Harmless — <strong>{stats?.harmless}</strong>
            </Alert>
          </Stack>
        </Card>
      </Grow>

      {/* Attachements card */}
      <Grow in={true}>
        <Card key={"ema_attachements_card"} sx={card_style}>
          <h2>
            <AttachFileIcon /> Attachments ({result?.data?.links.length})
          </h2>
          <React.Fragment>
            <TableContainer sx={tableContainerStyle}>
              <Table aria-label="simple table" sx={tableCellStyle}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      sx={{
                        backgroundColor: theme.palette.background.tablecell,
                      }}
                    >
                      <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="h6"
                        // id={row?.md5}
                        component="div"
                      >
                        <b>
                          {/* {row?.filename != null
                          ? row?.filename */}
                          File Analysis
                        </b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      {" "}
                      <b> MD5 </b>{" "}
                    </TableCell>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      {" "}
                      {result?.meta?.file_info?.md5}{" "}
                    </TableCell>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      <Button
                        variant="outlined"
                        disableElevation
                        size="small"
                        onClick={() =>
                          setShowHashAnalysisAttachements(
                            !showHashAnalysisAttachements
                          )
                        }
                        sx={{ float: "right" }}
                      >
                        Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      {" "}
                      <b> SHA1 </b>{" "}
                    </TableCell>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      {" "}
                      {result?.meta?.file_info?.sha1}{" "}
                    </TableCell>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      <Button
                        variant="outlined"
                        disableElevation
                        size="small"
                        onClick={() =>
                          setShowHashAnalysisAttachements(
                            !showHashAnalysisAttachements
                          )
                        }
                        sx={{ float: "right" }}
                      >
                        Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      {" "}
                      <b> SHA256 </b>{" "}
                    </TableCell>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      {" "}
                      {result?.meta?.file_info?.sha256}{" "}
                    </TableCell>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      <Button
                        variant="outlined"
                        disableElevation
                        size="small"
                        onClick={() =>
                          setShowHashAnalysisAttachements(
                            !showHashAnalysisAttachements
                          )
                        }
                        sx={{ float: "right" }}
                      >
                        Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {showHashAnalysisAttachements ? (
              hashAnalysis(result?.meta?.file_info?.md5)
            ) : (
              <></>
            )}
          </React.Fragment>
        </Card>
      </Grow>

      {/* URLs card */}
      <Grow in={true}>
        <Card key={"ema_urls_card"} sx={card_style}>
          <h2>
            <LinkIcon /> URLs in body ({result?.data?.links?.length})
          </h2>
          {/* {showUrls()} */}
          <React.Fragment key="urls_fragment">
            <TableContainer component={Paper} sx={tableContainerStyle}>
              <Table aria-label="simple table" sx={tableCellStyle}>
                <TableBody>
                  <TableRow>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      {result?.data?.links?.self}
                    </TableCell>
                    <TableCell sx={{ overflowWrap: "anywhere" }}>
                      <Button
                        variant="outlined"
                        disableElevation
                        size="small"
                        onClick={() => {
                          setShowUrlAnalyse(!showUrlAnalyse);
                          setUrl(result?.data?.links?.self);
                        }}
                        sx={{ float: "right", whiteSpace: "nowrap" }}
                      >
                        Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" sx={{ overflowWrap: "anywhere" }}>
                      {result?.data?.links?.item}
                    </TableCell>
                    <TableCell sx={{ overflowWrap: "anywhere" }}>
                      <Button
                        variant="outlined"
                        disableElevation
                        size="small"
                        onClick={() => {
                          setShowUrlAnalyse(!showUrlAnalyse);
                          setUrl(result?.data?.links?.item);
                        }}
                        sx={{ float: "right", whiteSpace: "nowrap" }}
                      >
                        Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {showUrlAnalyse ? urlAnalyse(url) : <></>}
          </React.Fragment>
        </Card>
      </Grow>

      {/* Full header card */}

      {result?.data?.attributes?.status === "completed" && (
        <Grow in={true}>
          <Card key={"ema_file_header_card"} sx={card_style}>
            <h2>
              <HorizontalSplitIcon /> Complete Header (
              {result?.data?.attributes?.results?.length} fields)
            </h2>
            {/* {showHeaderFields()} */}
            <TableContainer component={Paper} sx={tableContainerStyle}>
              <Table aria-label="simple table" sx={tableCellStyle}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={tableCellStyle}>
                      <b>Engine Name</b>
                    </TableCell>
                    <TableCell align="left" sx={tableCellStyle}>
                      <b>Category</b>
                    </TableCell>
                    <TableCell align="left" sx={tableCellStyle}>
                      <b>Method</b>
                    </TableCell>
                    <TableCell align="left" sx={tableCellStyle}>
                      <b>Engine Version</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <React.Fragment>
                    <TableRow
                      sx={{
                        border: 0,
                        backgroundColor: "#f0f8ff",
                      }}
                    >
                      <TableCell align="left">
                        {results?.ALYac?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.ALYac?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.ALYac?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.ALYac?.engine_version}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        border: 0,
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <TableCell align="left">
                        {results?.Avast?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Avast?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Avast?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Avast?.engine_version}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">
                        {results?.BitDefender?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.BitDefender?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.BitDefender?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.BitDefender?.engine_version}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        border: 0,
                        backgroundColor: "#f0f8ff",
                      }}
                    >
                      <TableCell align="left">
                        {results?.CrowdStrike?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.CrowdStrike?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.CrowdStrike?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.CrowdStrike?.engine_version}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        border: 0,
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <TableCell align="left">
                        {results?.Fortinet?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Fortinet?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Fortinet?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Fortinet?.engine_version}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">
                        {results?.Google?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Google?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Google?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Google?.engine_version}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        border: 0,
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <TableCell align="left">
                        {results?.Kaspersky?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Kaspersky?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Kaspersky?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Kaspersky?.engine_version}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        border: 0,
                        backgroundColor: "#f0f8ff",
                      }}
                    >
                      <TableCell align="left">
                        {results?.Microsoft?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Microsoft?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Microsoft?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Microsoft?.engine_version}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        border: 0,
                        backgroundColor: "#fff",
                      }}
                    >
                      <TableCell align="left">
                        {results?.SUPERAntiSpyware?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.SUPERAntiSpyware?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.SUPERAntiSpyware?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.SUPERAntiSpyware?.engine_version}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        border: 0,
                        backgroundColor: "#f0f8ff",
                      }}
                    >
                      <TableCell align="left">
                        {results?.ZoneAlarm?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.ZoneAlarm?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.ZoneAlarm?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.ZoneAlarm?.engine_version}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        border: 0,
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <TableCell align="left">
                        {results?.Kingsoft?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Kingsoft?.engine_name}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Kingsoft?.method}
                      </TableCell>
                      <TableCell align="left">
                        {results?.Kingsoft?.engine_version}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grow>
      )}

      {/* Message text card */}
      <Grow in={true}>
        <Card key={"ema_message_text_card"} sx={card_style}>
          <h2>
            <ChatIcon /> Message body (HTML sanitized)
          </h2>
          {expanded
            ? dompurify.sanitize(result?.data?.id, {
                USE_PROFILES: { html: false, svg: false, svgFilters: false },
              })
            : dompurify
                .sanitize(result?.data?.id, {
                  USE_PROFILES: { html: false, svg: false, svgFilters: false },
                })
                .slice(0, 700)}
          {dompurify.sanitize(result?.data?.id, {
            USE_PROFILES: { html: false, svg: false, svgFilters: false },
          }).length > 700 ? (
            <Button onClick={toggleExpanded}>
              {expanded ? "Read Less" : "Read More"}
            </Button>
          ) : null}
        </Card>
      </Grow>
      <br />
      <div align="center">
        <OpenAi
          input={dompurify.sanitize(result?.data?.id, {
            USE_PROFILES: { html: false, svg: false, svgFilters: false },
          })}
        />
      </div>
    </>
  );
}
