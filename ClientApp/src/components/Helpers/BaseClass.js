import React from "react"

const BaseClass = (Component, classname) => {
    return props => {
        return (
            <div className={classname}>
                <Component {...props} />
            </div>
        )
    }
}
export default BaseClass