import React from 'react'

const Error = (props) => {
    return (
        <div>
            <div>Something went wrong.</div>
            {
                props.error ? (
                    <div>
                        {props.error.message}
                    </div>
                ) : (
                    <div>
                        Please try again later
                    </div>
                )
            }
        </div>
    )
}

export default Error;