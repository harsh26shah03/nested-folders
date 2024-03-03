import { useState } from 'react'
import data from '../api/data.json'
import { useReducer } from 'react'
import FileExplorer from './FileExplorer'
import ContextMenu from './ContextMenu'
import Notification from './Notification'

const FileManager = () => {
  // We can use conventional fetch instead of import when actual API is available
  const [files] = useState(data)

  // Using reducer to manage state of opened file so we don't have to do prop drilling
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'openFile':
          return { ...state, openedFile: action.payload }
        case 'contextMenuOpen':
          return {
            ...state,
            contextMenuOpen: action.payload.open,
            contextMenuPosition: action.payload.position,
            contextMenuDestination: action.payload.destination
          }
        case 'contextMenuClose':
          return {
            ...state,
            contextMenuOpen: false,
            contextMenuPosition: { x: 0, y: 0 }
          }
        case 'contextMenuType':
          return { ...state, contextMenuType: action.payload }
        case 'contextMenuTypeClear':
          return { ...state, contextMenuType: '' }
        case 'contextMenuDestination':
          return { ...state, contextMenuDestination: action.payload }
        case 'contextMenuDestinationClear':
          return { ...state, contextMenuDestination: '' }
        case 'contextMenuNotification':
          return { ...state, contextMenuNotification: action.payload }
        default:
          return state
      }
    },
    {
      openedFile: null,
      contextMenuOpen: false,
      contextMenuPosition: { x: 0, y: 0 },
      contextMenuDestination: '',
      contextMenuType: '',
      contextMenuNotification: false
    }
  )

  return (
    <div
      style={{ display: 'flex', width: '100%', gap: 20, position: 'relative' }}
      onClick={() => {
        dispatch({ type: 'contextMenuClose' })
      }}
    >
      {/* Inflection point of recursion, starting point, it can be file or folder */}
      <ContextMenu
        position={state.contextMenuPosition}
        folder={state.contextMenuDestination}
        dispatch={dispatch}
        open={state.contextMenuOpen}
      />
      <Notification
        open={state.contextMenuNotification}
        destination={state.contextMenuDestination}
        type={state.contextMenuType}
      />
      <div
        style={{
          width: '20%',
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}
      >
        <FileExplorer dispatch={dispatch} files={files} />
      </div>

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
