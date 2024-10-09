import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FuzzySearch from 'fuzzy-search'; 
import { ClickAwayListener } from '@mui/material';

const main_data = data;

const Legislator = (props) => {

  const [filtered_results, set_filtered_results] = useState([]);
  const [current_search, set_current_search] = useState('');
  const [show_all, set_show_all] = useState(false);
  const [open_list, set_open_list] = useState(false);

  function filterResults(search_term) {
    set_current_search(search_term);
    set_show_all(false);
    const searcher = new FuzzySearch(props.legislators_data, ['name'], {
      caseSensitive: false,
    });
    const results = searcher.search(search_term);
    set_filtered_results(results);
  }
  
  return (
    <div className="App-container">
      <div className="App-subtitle">You can type the name of the <b>legislator</b> you want to find or click at the arrow button see the full list</div>
      <div className="App-search">
        <div className="App-search-box">
          <div className="App-search-input-container">
            <div className="App-search-input">
              <input className="App-search-input-text" type="text" value={current_search} onChange={(e) => {filterResults(e.target.value)}} />
            </div>
            <div className="App-search-input-arrow">
              <span className="material-icons-outlined" onClick={() => set_open_list(!open_list)}>
                expand_circle_down
              </span> 
            <div onClick={() => {set_show_all(!show_all), set_filtered_results(main_data.legislators), set_current_search('')}} className="App-search-all-button">SHOW ALL</div>
          </div>
          </div>
          {open_list &&
            <ClickAwayListener onClickAway={() => set_open_list(false)}>
              <div className="App-search-list">
                {main_data.legislators.map((legislator) => (
                  <div className="App-search-list-item" key={legislator.id} onClick={() => {set_open_list(false), filterResults(legislator.name)}}>{legislator.name}</div>
                ))}
              </div>
            </ClickAwayListener>
          }
        </div>
      </div>
      {((filtered_results.length > 0 && current_search.length > 0) || show_all) &&
        <div className="App-search-table">

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Legislator</TableCell>
                  <TableCell align="right">Supported bills</TableCell>
                  <TableCell align="right">Opposed bills</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered_results.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.opposed_bills}</TableCell>
                    <TableCell align="right">{row.supported_bills}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      }
    </div>
  )
}

const Bills = (props) => {

  const [filtered_results, set_filtered_results] = useState([]);
  const [current_search, set_current_search] = useState('');
  const [show_all, set_show_all] = useState(false);
  const [open_list, set_open_list] = useState(false);

  function filterResults(search_term) {
    set_current_search(search_term);
    set_show_all(false);
    const searcher = new FuzzySearch(props.bills_data, ['title'], {
      caseSensitive: false,
    });
    const results = searcher.search(search_term);
    set_filtered_results(results);
  }
  
  return (
    <div className="App-container">
      <div className="App-subtitle">You can type the name of the <b>bill</b> you want to find or click at the arrow button see the full list</div>
      <div className="App-search">
        <div className="App-search-box">
          <div className="App-search-input-container">
            <div className="App-search-input">
              <input className="App-search-input-text" type="text" value={current_search} onChange={(e) => {filterResults(e.target.value)}} />
            </div>
            <div className="App-search-input-arrow">
              <span className="material-icons-outlined" onClick={() => set_open_list(!open_list)}>
                expand_circle_down
              </span> 
            <div onClick={() => {set_show_all(!show_all), set_filtered_results(main_data.bills), set_current_search('')}} className="App-search-all-button">SHOW ALL</div>
          </div>
          </div>
          {open_list &&
            <ClickAwayListener onClickAway={() => set_open_list(false)}>
              <div className="App-search-list">
                {main_data.bills.map((bill) => (
                  <div className="App-search-list-item" key={bill.id} onClick={() => {set_open_list(false), filterResults(bill.title)}}>{bill.title}</div>
                ))}
              </div>
            </ClickAwayListener>
          }
        </div>
      </div>
      {((filtered_results.length > 0 && current_search.length > 0) || show_all) &&
        <div className="App-search-table">

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Bill</TableCell>
                  <TableCell align="right">Supporters</TableCell>
                  <TableCell align="right">Opposers</TableCell>
                  <TableCell align="right">Primary Sponsor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered_results.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.supporters}</TableCell>
                    <TableCell align="right">{row.opposers}</TableCell>
                    <TableCell align="right">{row.sponsor_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      }
    </div>
  )
}

const App = (props) => {

  const [legislators_data, set_legislators_data] = useState(main_data.legislators);
  const [bills_data, set_bills_data] = useState(main_data.bills);
  
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className="App">
      <h1 className="App-header">Search Tool</h1>
      <div className="App-tabs">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Legislators" />
              <Tab label="Bills" />
            </Tabs>
          </Box>
        </Box>
      </div>
      {tab === 0 &&
        <Legislator legislators_data={legislators_data} />
      }
      {tab === 1 &&
        <Bills bills_data={bills_data} />
      }
    </div>
  );
};

export default App;