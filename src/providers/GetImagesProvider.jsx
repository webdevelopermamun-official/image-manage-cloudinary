import axios from "axios";
import {useEffect, useState } from "react";
import GetImagesContext from "../context/GetImagesContext";

const GetImagesProvider = ({children}) => {
    // get api images user
    const [userImage, setUserImage] = useState([])

    // get json api data
    const getDataApi = async () => {
        const response = await axios.get("http://localhost:7000/apiImages?_sort=id&_order=desc");
        setUserImage(response.data);
    };

    // call function when component is mounted
    useEffect(()=>{
        getDataApi();
    },[])

  
    const contextValue = {
        getDataApi,
        userImage,
        setUserImage
      };
  return (
    <GetImagesContext.Provider value={contextValue}>
      {children}
    </GetImagesContext.Provider>
  )
}

export default GetImagesProvider
