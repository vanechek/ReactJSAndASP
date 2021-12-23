import React, { Component } from 'react'
import './Layout.css'
import MenuItems from '../MenuItem/menuItem.js'

class Layout extends Component {
	render() {
		return (
			<div className="Layout">
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}
export default Layout