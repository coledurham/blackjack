'use strict'

import React from 'react'

const Controls = ({card}) => {

  return <ul className="controls">
    <li>
      <button onClick={(e) => e.preventDefault}>Bet</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault}>Hit</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault}>Stay</button>
    </li>
    <li>
      <button onClick={(e) => e.preventDefault}>Fold</button>
    </li>
  </ul>
}

export default Controls
