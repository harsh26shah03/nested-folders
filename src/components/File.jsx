import { useState } from 'react'

// Base case of recursion. File with name

const File = ({ name, dispatch }) => {
  
  const [fileHovered, setFileHovered] = useState(false)
  return (
    <div style={{ marginLeft: 20, marginBottom: 20 }}>
      <div
        style={{
          fontStyle: 'italic',
          userSelect: 'none',
          ...(fileHovered ? { cursor: 'pointer' } : {})
        }}
        onClick={() => {
          dispatch({ type: 'openFile', payload: name })
        }}
        onMouseEnter={() => setFileHovered(true)}
        onMouseLeave={() => setFileHovered(false)}
      >
        {name}
      </div>
    </div>
  )
}

export default File
