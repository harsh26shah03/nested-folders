/* eslint-disable react/prop-types */
import File from './File'
import { useState } from 'react'

const getRandomColors = () => {
  const contrastColors = [
    '#F94144',
    '#F3722C',
    '#F8961E',
    '#F9844A',
    '#F9C74F',
    '#90BE6D',
    '#43AA8B',
    '#577590',
    '#277DA1',
    '#6D597A',
    '#B56576',
    '#E56B6F',
    '#EAAC8B',
    '#E6D72A',
    '#92A8D1',
    '#034732',
    '#008148',
    '#C6D166',
    '#F7EE7F'
  ]
  return contrastColors[Math.floor(Math.random() * contrastColors.length)]
}

const Folder = ({ data, name, dispatch }) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false)
  const [color] = useState(getRandomColors())
  const [hover, setHover] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
      <button
        onClick={() => setIsFolderOpen(!isFolderOpen)}
        style={{
          width: '100%',
          transition: '0.5s all',
          marginBottom: 20,
          ...(hover ? { borderColor: color } : {})
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10
          }}
        >
          <span>{name}</span>
          <span>{isFolderOpen ? '-' : '+'}</span>
        </div>
      </button>

      {isFolderOpen ? (
        <div
          style={{
            borderLeft: `1px solid ${color}`,
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 20,
            borderBottom: `1px solid ${color}`
          }}
        >
          {data?.map((item, idx) => {
            if (item.type === 'file') {
              return <File name={item.name} key={idx} dispatch={dispatch} />
            } else if (item.type === 'folder') {
              return <Folder data={item.data} name={item.name} key={idx} dispatch={dispatch} />
            }
          })}
        </div>
      ) : null}
    </div>
  )
}

export default Folder