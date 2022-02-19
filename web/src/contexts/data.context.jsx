import React, {useState} from 'react';

const context = React.createContext();

const DataContextProvider = (props) => {
  const [isAllDataFetched, setIsAllDataFetched] = useState(true);

  return (
    <context.Provider value={[isAllDataFetched, setIsAllDataFetched]}>
      {props.children}
    </context.Provider>
  );
};

export default {
  provider: DataContextProvider,
  consumer: context.Consumer,
  context
}



