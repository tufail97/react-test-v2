import React from 'react';

const HandleState = (state,value,props) => {
    props(state, value);
}

export default HandleState;