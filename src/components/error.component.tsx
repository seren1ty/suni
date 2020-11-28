import React from 'react'

const Error = (props) => {
    return (
        <div className="">
            <div className="">
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
        </div>
    )
}

export default Error;