import {Provider} from "react-redux";
import {App} from "./App";
import {store} from "./src/store/store";
import React, {FC} from "react";




const Root: FC = () => {
    return(
       <Provider store={store}>
           <App/>
       </Provider>
    )
}



export default Root
