const ContextMenu = ({ position, folder, dispatch, open }) => {
  const handleClick = (e, event) => {
    e.preventDefault()
    dispatch({ type: 'contextMenuClose' })
    dispatch({ type: 'contextMenuType', payload: event })
    dispatch({ type: 'contextMenuDestination', payload: folder })
    setTimeout(() => {
      dispatch({ type: 'contextMenuNotification', payload: true })
      setTimeout(() => {
        dispatch({ type: 'contextMenuNotification', payload: false })
      }, 2000)
    }, 100)
  }

  return open ? (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        background: 'white',
        border: '1px solid black',
        color: 'black'
      }}
      className="context-menu"
    >
      <div onClick={(e) => handleClick(e, 'cut')} className="context-menu-item">
        Cut
      </div>
      <div
        onClick={(e) => handleClick(e, 'copy')}
        className="context-menu-item"
      >
        Copy
      </div>
    </div>
  ) : null
}

export default ContextMenu
