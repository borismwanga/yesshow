import React from 'react'
import './dashboard.scss'

export default function dashboard() {
  return (
<div className='parent blur'>   
    <div className="d-rating"> Ratings </div>
    <div className="d-invitation"> Invitations </div>
    <div className="d-push">Notification push </div>
    <div className="d-calendar blur">Calendar </div>
    <div className="d-calendarlist">Calendar List </div>
</div>
  )
}
