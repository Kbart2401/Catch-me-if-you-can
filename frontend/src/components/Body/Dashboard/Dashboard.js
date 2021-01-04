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

  const totalTime = useSelector(state => state.session.total_run_time)
  const totalDistance = useSelector(state => state.session.total_distance_ran)
  const [totalRuns, setTotalRuns] = useState(0)
  const [totalHours, setTotalHours] = useState(0)
  const [recentRun, setRecentRun] = useState({})

  const calculateTime = (time) => {
    const hr = Math.trunc(time * (1 / 60))
    const min = Math.trunc(((time * (1 / 60)) - hr) * 60)
    const sec = Math.trunc(((((time * (1 / 60)) - hr) * 60) - min) * 60)
    return `${hr}:${min}:${sec}`
  }

  useEffect(() => {
    if (user) {
      try {
        (async function () {
          const res = await fetch(`api/users/dashboard/${user.id}`)
          const data = await res.json()

          setRecentRun(data.recent_run)
          setTotalRuns(data.run_count)

          setIsLoaded(true)
        })()
      } catch (e) {
        console.error(e)
      }
    }
  }, [user])

  return isLoaded && (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant={'h5'}>DashBoard</Typography>
      </div>
      <div className={classes.dashboard_circle}>
        <div className={classes.dashboard_circle_stat_container}>
          {/* <div className={classes.dashboard_circle_stat}><Typography variant={'h5'}>{recentTime}</Typography></div> */}
          <div className={classes.dashboard_circle_stat}><Typography variant={'h5'}>{recentRun.distance} km</Typography></div>
          <div className={classes.dashboard_circle_stat}><Typography variant={'h5'}>{Math.floor((8.5 * recentRun.distance) * Math.trunc(recentRun.time * (1 / 60)))} Ca</Typography></div>
        </div>
      </div>
      <div className={classes.dashboard_totalStat_container}>
        <div className={classes.dashboard_totalStat_stats}>
          <Typography variant={'h4'}>{calculateTime(totalTime)}</Typography>
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
          <Typography variant={'h4'}>{`${Math.floor((8.5 * totalDistance) * Math.trunc(totalTime * (1 / 60)))}`}</Typography>
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
            <History user={user} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>My Routes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Routes />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default Dashboard
