import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Sidebar from 'components/Sidebar';
import Dashboard from 'components/Dashboard';
import Notes from 'components/Notes';
import Integrations from 'components/Integrations';
import SmartTips from 'components/SmartTips';

const SidebarLayout = ({ user, setUser }) => {
  if (!user.email) return <Redirect to='login' />;

  return (
    <>
      <Sidebar user={user} setUser={setUser} />
      <div className='sidebar-layout relative bg-gray-200'>
        <Route
          path='/dashboard'
          exact
          render={(props) => <Dashboard user={user} {...props} />}
        />
        <Route
          path='/notes/:id'
          render={(props) => <Notes user={user} {...props} />}
        />
        <Route
          path='/integrations'
          exact
          render={(props) => <Integrations user={user} {...props} />}
        />
        <Route path='/tips' exact component={SmartTips} />
      </div>
    </>
  );
};

export default SidebarLayout;
  