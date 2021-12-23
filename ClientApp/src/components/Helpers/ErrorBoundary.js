import React from 'react'
class ErrorBoundary extends React.Component {

    state = {
        error: null,
        errorInfo: null
    }


    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        return <React.Fragment>
            {
                this.state.errorInfo ?
                    <div className={this.props.name} style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </div> :
                    this.props.children
            }
        </React.Fragment>

    }
}
export default ErrorBoundary