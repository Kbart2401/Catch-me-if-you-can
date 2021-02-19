import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as sessionActions from "../../../store/actions/session.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
  },
  dashboard_activity_container: {
    display: 'flex',
    alignItems: 'center',
    height: '15rem',
    width: '25rem',
  },

  accordion: {
    minWidth: '35rem',
  }

}))

const Dashboard = (props) => {
  const classes = useStyles()
  const user = useSelector(state => state.session.user)
  const rivals = useSelector(state => state.session.rivals)
  const userId = parseInt(useParams().userId)
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false)
  const [dashboardData, setDashboardData] = useState({})

  const calculateTime = (time) => {
    const hr = Math.trunc(time * (1 / 60))
    const min = Math.trunc(((time * (1 / 60)) - hr) * 60)
    const sec = Math.trunc(((((time * (1 / 60)) - hr) * 60) - min) * 60)
    return `${(hr < 10) ? 0 : ''}${hr}:${(min < 10) ? 0 : ''}${min}:${(sec < 10) ? 0 : ''}${sec}`
  }

  const calculateCalories = (totalDist, time) => {
    const calories = ((8.5 * totalDist) * time * (1 / 60))

    return calories / 10
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

    for (let i = 0; i < dashboardData.recent_run.length; i++) {
      totalRecentDistance += (dashboardData.recent_run[i].distance)
    }

    return totalRecentDistance.toFixed(0);
  }

  const calcRecentCalories = () => {
    let sum = 0;
    let totalRecentDistance = 0;

    for (let i = 0; i < dashboardData.recent_run.length; i++) {
      totalRecentDistance += dashboardData.recent_run[i].distance
    }

    totalRecentDistance = totalRecentDistance 

    for (let i = 0; i < dashboardData.recent_run.length; i++) {
      // sum += Math.floor((8.5 * totalRecentDistance) * Math.trunc(dashboardData.recent_run[i].time * (1 / 60)))
      sum += calculateCalories(totalRecentDistance, dashboardData.recent_run[i].time)
    }

    return (sum).toFixed(0)
  }



  useEffect(() => {
    if (user) {
      try {
        (async function () {
          const res = await fetch(`/api/users/dashboard/${userId}`)
          const data = await res.json()

          setDashboardData(data)
          setIsLoaded(true)
        })()
      } catch (e) {
        console.error(e)
      }
    }
  }, [user])
  console.log(dashboardData); 

  const communityReturn = (userId) => {
    history.push(`/community`);
  };

  // console.log(dashboardData)

  return (
    <>
      {isLoaded && (
        <div className={classes.root}>
          <div className={classes.title}>
            <Typography variant={"h5"} className="header-font">
              DashBoard
            </Typography>
            <Typography className="dashboard-font username">
              {dashboardData.first_name && dashboardData.last_name
                ? `${dashboardData.first_name} ${dashboardData.last_name}`
                : ""}
            </Typography>
            {user.id !== userId && (
              <Button
                variant="outlined"
                onClick={() => {
                  communityReturn();
                }}
              >
                <Typography>Return to Community</Typography>
              </Button>
            )}
          </div>

          <div className={classes.dashboard_circle}>
            <div
              className={classes.dashboard_circle_stat_container}
              className="dashboard-font"
            >
              <div className={classes.dashboard_circle_stat}>
                {" "}
                <Typography variant={"h5"}>Weekly Stats</Typography>
              </div>
              <div className={classes.dashboard_circle_stat}>
                <Typography variant={"h5"}>
                  {dashboardData.recent_run ? calcRecentDistance() : 0} meters
                </Typography>
              </div>
              <div className={classes.dashboard_circle_stat}>
                <Typography variant={"h5"}>
                  {dashboardData.recent_run ? calcRecentCalories() : 0} Cal
                </Typography>
              </div>
            </div>
          </div>

          <div className={classes.dashboard_totalStat_container}>
            <div className={classes.dashboard_totalStat_stats}>
              <Typography variant={"h4"}>
                {dashboardData.total_runtime
                  ? calculateTime(dashboardData.total_runtime)
                  : calculateTime(0)}
              </Typography>
              <Typography>Total Time</Typography>
            </div>
            <div className={classes.dashboard_totalStat_stats}>
              <Typography variant={"h4"}>
                {dashboardData.run_count ? dashboardData.run_count : 0}
              </Typography>
              <Typography>Total Runs</Typography>
            </div>
            <div className={classes.dashboard_totalStat_stats}>
              <Typography variant={"h4"}>
                {dashboardData.total_distance
                  ? (dashboardData.total_distance/1000).toFixed(2)
                  : 0}
              </Typography>
              <Typography>Total Km</Typography>
            </div>
            <div className={classes.dashboard_totalStat_stats}>
              <Typography variant={"h4"}>
                {dashboardData.total_runtime &&
                  dashboardData.total_distance &&
                  calculateCalories(
                    dashboardData.total_distance,
                    dashboardData.total_runtime
                  ).toFixed(0)}
              </Typography>
              <Typography>Total Cal</Typography>
            </div>
          </div>

          <div className={classes.dashboard_activity_container}>
            <BarGraph weekData={handleGraphData(dashboardData.week_data)} />
          </div>

          <div className={classes.dashboard_accordian_container}>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ color: "#3f51b5", fontWeight: "550" }}>
                  History
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <History userId={userId} />
              </AccordionDetails>
            </Accordion>

            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ color: "#3f51b5", fontWeight: "550" }}>
                  My Routes
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Routes created_routes={dashboardData.created_routes} />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      )}
      {!isLoaded && (
        <>
          <Typography variant={'h5'} className='header-font'>Dashboard</Typography>
          <Typography>No Dashboard stats available until you log your first route!</Typography>
        </>
      )}
    </>
	);
}

export default Dashboard
