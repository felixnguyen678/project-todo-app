import React, {useState} from 'react';

const context = React.createContext(null);

const DataContextProvider = (props) => {
  const [isAllDataFetched, setIsAllDataFetched] = useState(true);

  return (
    <context.Provider value={[isAllDataFetched, setIsAllDataFetched]}>
      {props.children}
    </context.Provider>
  );
};

export default {
  Provider: DataContextProvider,
  Consumer: context.Consumer,
  context
}



