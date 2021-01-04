import React, { useEffect, useState } from 'react';

//Components
import BarGraph from './Graph';
import Routes from './myRoutes';
import History from "./History";

//MUI
import { makeStyles, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

//Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',

    margin: '1rem',
    borderRadius: '.5rem',
    backgroundColor: 'white',
  },
  title: {
    margin: '1rem'
  },

  dashboard_circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#caf0f8',
    borderRadius: '50%',
    height: '20rem',
    width: '20rem',
    margin: '1rem',
  },
  dashboard_circle_stat_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: '5rem 0',
    minHeight: '50%'
  },
  dashboard_circle_stat: {
    margin: '.5rem 0',
  },

  dashboard_totalStat_container: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem',
  },
  dashboard_totalStat_stats: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 1rem',
    // justifyContent: 'center',
  },
  dashboard_activity_container: {
    display: 'flex',
    alignItems: 'center',
    height: '15rem',
    width: '25rem',
    // width: '1rem',
  },

}))

const Dashboard = (props) => {
  const classes = useStyles()
  const user = useSelector(state => state.session.user)

  const [isLoaded, setIsLoaded] = useState(false)

  const [totalTime, setTotalTime] = useState(0)
  const [totalDistance, setTotalDistance] = useState(0)
  const [totalCalories, setTotalCalories] = useState(0)
  const [totalRuns, setTotalRuns] = useState(0)

  const [recentTime, setRecentTime] = useState(0)
  const [recentDistance, setRecentDistance] = useState(0)
  const [recentCalories, setRecentCalories] = useState(0)

  useEffect(() => {
    if (user) {

      setIsLoaded(true)
    }
  }, [user])

  console.log(user)

  return isLoaded && (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant={'h5'}>DashBoard</Typography>
      </div>
      <div className={classes.dashboard_circle}>
        <div className={classes.dashboard_circle_stat_container}>
          <div className={classes.dashboard_circle_stat}><Typography variant={'h5'}>{recentTime}</Typography></div>
          <div className={classes.dashboard_circle_stat}><Typography variant={'h5'}>{recentDistance} km</Typography></div>
          <div className={classes.dashboard_circle_stat}><Typography variant={'h5'}>{recentCalories} Ca</Typography></div>
        </div>
      </div>
      <div className={classes.dashboard_totalStat_container}>
        <div className={classes.dashboard_totalStat_stats}>
          <Typography variant={'h4'}>{totalTime}</Typography>
          <Typography>Total Time</Typography>
        </div>
        <div className={classes.dashboard_totalStat_stats}>
          <Typography variant={'h4'}>{totalRuns}</Typography>
          <Typography>Total Runs</Typography>
        </div>
        <div className={classes.dashboard_totalStat_stats}>
          <Typography variant={'h4'}>{totalDistance}</Typography>
          <Typography>Total km</Typography>
        </div>
        <div className={classes.dashboard_totalStat_stats}>
          <Typography variant={'h4'}>{totalCalories}</Typography>
          <Typography>Total Ca</Typography>
        </div>
      </div>
      <div className={classes.dashboard_activity_container}>
        <BarGraph />
      </div>
      <div className={classes.dashboard_accordian_container}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <History />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>My Routes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Routes routes={ } />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default Dashboard
