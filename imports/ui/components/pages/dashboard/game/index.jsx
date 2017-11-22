import React from 'react';

import Card from '/imports/ui/components/pages/dashboard/game/card';

const Game = () => (
  <div className="table">
    <div className="opponent">
      <Card />
      <Card />
      <Card />
    </div>
    <input type="button" value="I'm ready" />
    <div className="user">
      <Card />
      <Card />
      <Card />
    </div>
  </div>
);

export default Game;
