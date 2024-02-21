import { useState } from 'react'
import Folder from './Folder'
import File from './File'
import data from '../api/data.json'
import { useReducer } from 'react'

const FileManager = () => {
  // We can use conventional fetch instead of import when actual API is available
  const [files] = useState(data)

  // Using reducer to manage state of opened file so we don't have to do prop drilling
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'openFile':
          return { ...state, openedFile: action.payload }
        default:
          return state
      }
    },
    {
      openedFile: null
    }
  )

  const root = (dispatch) => {
    if (files.type === 'file') {
      return <File name={files.name} dispatch={dispatch} />
    } else if (files.type === 'folder') {
      return <Folder data={files.data} name={files.name} dispatch={dispatch} />
    }
  }

  return (
    <div style={{ display: 'flex', width: '100%', gap: 20 }}>
      {/* Inflection point of recursion, starting point, it can be file or folder */}
      <div style={{ width: '20%' }}>{root(dispatch)}</div>

      {/* Preview of file opened. */}
      {state?.openedFile ? (
        <div
          style={{
            width: '80%',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: 20,
            height: '100%',
            marginTop: 0
          }}
        >
          <h4
            style={{
              margin: 0
            }}
          >
            {state?.openedFile}
          </h4>
          <div
            style={{
              height: '200px',
              width: 'calc(100% - 20px)',
              border: '1px solid white',
              borderRadius: 5,
              margin: 20,
              flexGrow: 1
            }}
          >
            {}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default FileManager
