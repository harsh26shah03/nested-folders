const Notification = ({ open, type, destination }) => {
  return open ? (
    <div className="notification">
      {destination} {type}
    </div>
  ) : null
}

export default Notification
