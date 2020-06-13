import React, { useState, useEffect } from 'react';
import './Team.css';

// Routing
import { useParams } from 'react-router-dom';

// Services
import footballAPI from '../../services/footballAPI';
import newsAPI from '../../services/newsAPI';

// My Components
import NewsList from '../NewsList/NewsList';
import FixtureList from '../FixtureList/FixtureList';
import MainSpinner from '../MainSpinner/MainSpinner';
import Squad from '../Squad/Squad';

const Team = () => {
  const { teamID, leagueID, teamName, leagueName } = useParams();

  const [selected, setSelected] = useState()
  const [teamInfo, setTeamInfo] = useState({});
  const [teamFixtures, setTeamFixtures] = useState([]);
  const [playerStats, setPlayerStats] = useState([])
  const [teamNews, setTeamNews] = useState([]);

  const handleClick = (e) => {
    switch (e.target.name) {
      case 'fixtures':
        setSelected(<FixtureList fixtures={teamFixtures} />) // Organise fixtures by date/time
        break;
      case 'squad':
        setSelected(<Squad playerStats={playerStats} />) 
        break;
      default: 
        setSelected(<NewsList news={teamNews} />)
        break;
    }
  }
      
  useEffect(() => {
    footballAPI.getTeamInfo(teamID)
      .then(team => setTeamInfo(team))
    footballAPI.getTeamFixtures(teamID, leagueID)
      .then(fixtures => setTeamFixtures(fixtures))
    footballAPI.getPlayerStatistics(teamID, '2019-2020', leagueName.replace('-', ' '))
      .then(stats => setPlayerStats(stats))
    newsAPI.getTeamNews(teamName)
      .then(news => setTeamNews(news))
  }, [teamID, leagueID, teamName, leagueName])

  return (
    <div className="Team">
      {teamInfo.team_id ?
          <React.Fragment>
            <div className='team__header'>
              <div className='team__logo'>
                <img alt="Home Team Logo" src={teamInfo.logo} width={100}/>
              </div>
              <div className='team__details'>
                <p>TEAM</p>
                <h2>{teamInfo.name}</h2> 
              </div>
            </div>
            <div className="team__views borderXwidth">
              <button name='news' onClick={handleClick}>News</button>
              <button name='squad' onClick={handleClick}>Squad</button>
              <button name='fixtures' onClick={handleClick}>Fixtures</button>
            </div>
            <div className='team__view'>
              {selected ?
                selected
                : <NewsList news={teamNews} />
              }
            </div>
          </React.Fragment>
          : <MainSpinner />
      }
    </div>
  );
}

export default Team;