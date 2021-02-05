import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Components
import BarGraph from './Graph';
import Routes from './myRoutes';
import History from "./History";

//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';
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
    // maxWidth: '690px',
    margin: '1rem',
    borderRadius: '.5rem',
    backgroundColor: 'white',
    minWidth: '40rem'
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    margin: '1rem',
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
  // dashboard_circle_stat_container: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // margin: '5rem 0',
  //   minHeight: '50%'
  // },
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

  accordion: {
    minWidth: '35rem',
  }

}))

const Dashboard = (props) => {
  const classes = useStyles()
  const user = useSelector(state => state.session.user)
  const userId = parseInt(useParams().userId)

  const [isLoaded, setIsLoaded] = useState(false)

  const [totalTime, setTotalTime] = useState(0)
  const [totalDistance, setTotalDistance] = useState(0)

  const [username, setUsername] = useState('')
  const [totalRuns, setTotalRuns] = useState(0)
  const [recentRuns, setRecentRuns] = useState([])
  const [weekData, setWeekData] = useState([])

  const calculateTime = (time) => {
    const hr = Math.trunc(time * (1 / 60))
    const min = Math.trunc(((time * (1 / 60)) - hr) * 60)
    const sec = Math.trunc(((((time * (1 / 60)) - hr) * 60) - min) * 60)
    return `${(hr < 10) ? 0 : ''}${hr}:${(min < 10) ? 0 : ''}${min}:${(sec < 10) ? 0 : ''}${sec}`
  }

  const calculateCalories = (totalDist, totalTime) => {
    //918
    //10
    const calories = ((8.5 * totalDist) * totalTime * (1 / 60))

    return calories
  }

  const handleGraphData = (weekData) => {
    let arr = []

    weekData.dayOrder.map(day => {
      let sum = 0

      weekData.days[day].map(run => {
        sum += run.distance
      })

      arr.push(sum)
    })

    return arr
  }

  const calcRecentDistance = () => {
    let totalRecentDistance = 0

    for (let i = 0; i < recentRuns.length; i++) {
      totalRecentDistance += (recentRuns[i].distance)
    }

    return totalRecentDistance.toFixed(1);
  }

  const calcRecentCalories = () => {
    let sum = 0;
    let totalRecentDistance = 0;

    for (let i = 0; i < recentRuns.length; i++) {
      totalRecentDistance += recentRuns[i].distance
    }

    totalRecentDistance = totalRecentDistance / 1000

    for (let i = 0; i < recentRuns.length; i++) {
      // sum += Math.floor((8.5 * totalRecentDistance) * Math.trunc(recentRuns[i].time * (1 / 60)))
      sum += calculateCalories(totalRecentDistance, recentRuns[i].time)
    }

    return (sum).toFixed(2)
  }

  useEffect(() => {
    if (user) {
      try {
        (async function () {
          const res = await fetch(`/api/users/dashboard/${userId}`)
          const data = await res.json()

          setUsername(`${data.first_name} ${data.last_name}`, setTotalRuns((data) ? data.run_count : null))
          setWeekData(data.week_data)
          setRecentRuns(data.recent_run)
          setTotalDistance(data.total_distance, setTotalTime(data.total_runtime))
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
        <Typography variant={'h5'} className='header-font'>DashBoard</Typography>
        <Typography className='dashboard-font username'>{username}</Typography>
        {
          (user.id !== userId) && <Button variant="outlined"><Typography>Make Rival</Typography></Button>
        }
      </div>

      <div className={classes.dashboard_circle}>
        <div className={classes.dashboard_circle_stat_container} className='dashboard-font' >
          <div className={classes.dashboard_circle_stat} > <Typography variant={'h5'}>Weekly Stats</Typography></div>
          <div className={classes.dashboard_circle_stat}><Typography variant={'h5'}>
            {recentRuns ? calcRecentDistance() : 0} meters
            </Typography></div>
          <div className={classes.dashboard_circle_stat}><Typography variant={'h5'}>{recentRuns ? calcRecentCalories() : 0} Ca</Typography></div>
        </div>
      </div>

      <div className={classes.dashboard_totalStat_container}>
        <div className={classes.dashboard_totalStat_stats}>
          <Typography variant={'h4'}>{totalTime ? calculateTime(totalTime) : calculateTime(0)}</Typography>
          <Typography>Total Time</Typography>
        </div>
        <div className={classes.dashboard_totalStat_stats}>
          <Typography variant={'h4'}>{totalRuns ? totalRuns : 0}</Typography>
          <Typography>Total Runs</Typography>
        </div>
        <div className={classes.dashboard_totalStat_stats}>
          <Typography variant={'h4'}>{totalDistance ? totalDistance.toFixed(0) : 0}</Typography>
          <Typography>Total Km</Typography>
        </div>
        <div className={classes.dashboard_totalStat_stats}>
          <Typography variant={'h4'}>{(totalTime && totalDistance) && calculateCalories(totalDistance, totalTime)}</Typography>
          <Typography>Total Ca</Typography>
        </div>
      </div>

      <div className={classes.dashboard_activity_container}>
        <BarGraph weekData={handleGraphData(weekData)} />
      </div>

      <div className={classes.dashboard_accordian_container}>
        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ color: '#3f51b5', fontWeight: '550' }}>History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <History user={user} />
          </AccordionDetails>
        </Accordion>

        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ color: '#3f51b5', fontWeight: '550' }}>My Routes</Typography>
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
