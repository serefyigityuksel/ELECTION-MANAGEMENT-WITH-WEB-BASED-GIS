import React,{useState} from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


function SideBar(props) {
   const options = props.chestData.map(chestCity => chestCity.name)
    
  return (
    <div className='side-bar'>
        <div className='choose-text'>
          Choose Location
        </div>
        <form className='form'>
          <select 
          className='drop-down'
          value={props.selected} 
          onChange={(e) => props.setSelected(e.target.value)}>
            {options.map((value) => (
              <option value={value} key={value} className='options'>
                {value}
              </option>
            ))}
          </select>
           <button type="button" onClick={props.handleClick} className='button-78'>Chest Locations</button>
        </form>
    </div>
  )
}

export default SideBar