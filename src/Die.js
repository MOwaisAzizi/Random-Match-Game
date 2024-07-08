import React from "react";

export default function Die(props) {
    const style = {
        backgroundColor: props.isheld ? 'rgb(18, 241, 18)' : 'white',
        color: props.isheld ? 'white' : 'black',
    }
    return (
        <div className='die' onClick={props.isStart || props.sec == 0 || props.isWin ? null : props.click} style={style}>{props.die}</div>
    )
}