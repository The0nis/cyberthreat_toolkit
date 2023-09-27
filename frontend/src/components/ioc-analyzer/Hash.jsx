import React from "react";
import { useRecoilValue } from "recoil";

import Grow from "@mui/material/Grow";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";


import NoApikeys from "./NoApikeys";
import keys from "../../config/keys";
import Virustotal from "./services/multi/Virustotal";

export default function Hash(props) {
  // const apiKeys = useRecoilValue(apiKeysState);
  // const apiKeys = keys.REACT_APP_API_KEY_VIRUS_TOTAL;

  const apiKeys = process.env.NODE_ENV === "development"
  ? keys.REACT_APP_API_KEY_VIRUS_TOTAL 
  : process.env.REACT_APP_API_KEY_VIRUS_TOTAL;

  const theme = useTheme();

  function showResult() {
    if (!apiKeys) {
      return (
        <>
          <NoApikeys />
        </>
      );
    } else {
      return (
        <>
          <Grow in={true}>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: 0,
                borderRadius: 5,
                border: 1,
                borderColor: theme.palette.background.tableborder,
              }}
            >
              <Table aria-label="result_table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ bgcolor: theme.palette.background.tablecell }}
                    />
                    <TableCell
                      sx={{
                        bgcolor: theme.palette.background.tablecell,
                        fontWeight: "bold",
                      }}
                    >
                      Service
                    </TableCell>
                    <TableCell
                      sx={{
                        bgcolor: theme.palette.background.tablecell,
                        fontWeight: "bold",
                      }}
                    >
                      Result
                    </TableCell>
                    <TableCell
                      sx={{ bgcolor: theme.palette.background.tablecell }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apiKeys ? (
                    <Virustotal ioc={props.ioc} type="hash" apiKey={apiKeys}/>
                  ) : (
                    <></>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grow>
        </>
      );
    }
  }

  return <>{showResult()}</>;
}
